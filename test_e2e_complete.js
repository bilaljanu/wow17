const WebSocket = require('ws');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function runTest() {
    console.log('=== E2E Pipeline Test: Browser -> WebRTC -> Proxy -> TCP -> Minecraft Server ===\n');

    // Step 1: Kill existing processes
    console.log('[1] Cleaning up existing processes...');
    try { execSync('pkill -9 -f "node.*proxy" 2>/dev/null || true'); } catch(e) {}
    try { execSync('pkill -9 -f "chrome.*headless" 2>/dev/null || true'); } catch(e) {}
    await sleep(2);

    // Step 2: Start proxy
    console.log('[2] Starting WebRTC proxy...');
    fs.writeFileSync('/tmp/proxy_test.log', '');
    const proxyProcess = execSync('node /home/bilal/wow17/server/proxy_fixed.js > /tmp/proxy_test.log 2>&1 &', { stdio: 'pipe' });
    await sleep(2);

    // Check proxy started
    const proxyLog = fs.readFileSync('/tmp/proxy_test.log', 'utf8');
    console.log('Proxy log:', proxyLog.trim().split('\n').slice(0, 5).join('\n'));

    // Step 3: Start Chrome
    console.log('[3] Starting Chrome...');
    const chromeDir = `/tmp/chrome_test_${Date.now()}`;
    execSync(`mkdir -p ${chromeDir}`);
    execSync(`google-chrome --headless=new --disable-gpu --remote-debugging-port=9224 --no-sandbox --user-data-dir=${chromeDir} http://localhost:5050/test.html > /tmp/chrome.log 2>&1 &`);
    await sleep(4);

    // Get page ID
    let pageId = null;
    for (let i = 0; i < 5; i++) {
        try {
            const json = JSON.parse(execSync('curl -s http://localhost:9224/json').toString());
            pageId = json.find(p => p.url.includes('test.html'))?.id;
            if (pageId) break;
        } catch(e) {}
        await sleep(1);
    }

    if (!pageId) {
        console.error('ERROR: Could not find Chrome page');
        process.exit(1);
    }
    console.log(`[3] Chrome page ID: ${pageId}`);

    // Step 4: Connect to DevTools
    console.log('[4] Connecting to Chrome DevTools...');
    const ws = new WebSocket(`ws://localhost:9224/devtools/page/${pageId}`);
    const messages = [];
    let messageId = 0;

    await new Promise((resolve, reject) => {
        ws.on('open', resolve);
        ws.on('error', reject);
    });
    console.log('[4] Connected to Chrome DevTools');

    // Enable runtime and console
    ws.send(JSON.stringify({ id: ++messageId, method: 'Runtime.enable' }));
    ws.send(JSON.stringify({ id: ++messageId, method: 'Console.enable' }));

    await sleep(1);

    // Step 5: Wait for page to load and NetBridgeBridge to be ready
    console.log('[5] Waiting for NetBridgeBridge to be ready...');
    for (let i = 0; i < 30; i++) {
        await sleep(500);
        const result = await evaluate(ws, messageId++, 'window.NetBridgeBridge && typeof window.NetBridgeBridge.onJoinServer === "function"');
        if (result) {
            console.log('[5] NetBridgeBridge is ready!');
            break;
        }
        if (i === 29) {
            console.log('[5] WARNING: NetBridgeBridge not ready after 15s');
        }
    }

    // Step 6: Click connect button
    console.log('\n[6] Clicking Connect button...');
    await evaluate(ws, messageId++, '(function() { console.log("[TEST] Clicking Connect"); document.getElementById("connectBtn").click(); return "clicked"; })()');

    // Step 7: Wait for connection to establish
    console.log('[7] Waiting for WebRTC connection...');
    await sleep(3000);

    // Step 8: Click join button
    console.log('[8] Clicking Join Server button...');
    await evaluate(ws, messageId++, '(function() { console.log("[TEST] Clicking Join Server"); document.getElementById("joinBtn").click(); return "clicked"; })()');

    // Step 9: Wait for data to flow
    console.log('[9] Waiting for Minecraft protocol exchange...');
    await sleep(5000);

    // Step 10: Check final state
    console.log('\n[10] Checking final state...');
    const finalState = await evaluate(ws, messageId++, `
        (function() {
            return {
                netBridgeReceivePacket: typeof window.NetBridge_receivePacket,
                dataChannel: window.dataChannel ? { readyState: window.dataChannel.readyState, label: window.dataChannel.label } : null,
                peerConnection: window.peerConnection ? { state: window.peerConnection.connectionState } : null
            };
        })()
    `);
    console.log('[10] Final state:', JSON.stringify(finalState, null, 2));

    // Step 11: Print all logs
    console.log('\n=== Console Logs ===');
    messages.filter(m => m.text.includes('RUNTIME') || m.text.includes('[TEST') || m.text.includes('[PROXY') || m.text.includes('[WebRTC')).forEach((m, i) => {
        console.log(`${i+1}. [${m.type.toUpperCase()}] ${m.text}`);
    });

    // Step 12: Verify
    console.log('\n=== Verification ===');
    const runtimeLogs = messages.filter(m => m.text.includes('RUNTIME'));
    console.log('[RUNTIME A] WebRTC onmessage:', runtimeLogs.some(m => m.text.includes('[RUNTIME A]')) ? 'YES' : 'NO');
    console.log('[RUNTIME B] NetBridge_receivePacket called:', runtimeLogs.some(m => m.text.includes('[RUNTIME B]')) ? 'YES' : 'NO');
    console.log('[RUNTIME C] onReceiveFrame entered:', runtimeLogs.some(m => m.text.includes('[RUNTIME C]')) ? 'YES' : 'NO');
    console.log('[RUNTIME F] frameLength parsed:', runtimeLogs.some(m => m.text.includes('[RUNTIME F]')) ? 'YES' : 'NO');
    console.log('[RUNTIME G] packetId parsed:', runtimeLogs.some(m => m.text.includes('[RUNTIME G]')) ? 'YES' : 'NO');

    const proxyLogs = fs.readFileSync('/tmp/proxy_test.log', 'utf8');
    console.log('\n[PROXY D] WebRTC connected:', proxyLogs.includes('[PROXY D] WebRTC connectionState=connected') ? 'YES' : 'NO');
    console.log('[PROXY E] DataChannel open:', proxyLogs.includes('[PROXY E] DataChannel open') ? 'YES' : 'NO');
    console.log('[PROXY F] TCP connected:', proxyLogs.includes('[PROXY F] TCP connected') ? 'YES' : 'NO');
    console.log('[PROXY G] Received data:', proxyLogs.includes('[PROXY G]') ? 'YES' : 'NO');
    console.log('[PROXY H] Forwarded to DataChannel:', proxyLogs.includes('[PROXY H]') ? 'YES' : 'NO');

    console.log('\n=== Full Proxy Log ===');
    console.log(proxyLogs);

    console.log('\n=== Test Complete ===');
    ws.close();
    process.exit(0);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function evaluate(ws, id, expression) {
    return new Promise((resolve) => {
        ws.send(JSON.stringify({
            id: id,
            method: 'Runtime.evaluate',
            params: { expression: expression, returnByValue: true }
        }));

        const handler = (data) => {
            const msg = JSON.parse(data);
            if (msg.id === id) {
                ws.removeListener('message', handler);
                if (msg.result?.result?.value !== undefined) {
                    resolve(msg.result.result.value);
                } else if (msg.result?.exceptionDetails) {
                    resolve(null);
                } else {
                    resolve(null);
                }
            }
        };
        ws.on('message', handler);
    });
}

// Override ws message handler to capture console
const originalWsOn = WebSocket.prototype.on;
WebSocket.prototype.on = function(event, handler) {
    if (event === 'message') {
        const wrappedHandler = (data) => {
            try {
                const msg = JSON.parse(data.toString());
                if (msg.method === 'Runtime.consoleAPICalled') {
                    const args = (msg.params.args || []).map(a => a.value !== undefined ? a.value : a.description).join(' ');
                    testMessages.push({ type: msg.params.type, text: args });
                }
            } catch(e) {}
            handler(data);
        };
        return originalWsOn.call(this, event, wrappedHandler);
    }
    return originalWsOn.call(this, event, handler);
};

const testMessages = [];

runTest().catch(err => {
    console.error('Test failed:', err);
    process.exit(1);
});
