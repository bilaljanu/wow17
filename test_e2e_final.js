const WebSocket = require('ws');

const PAGE_WS = 'ws://localhost:9223/devtools/page/4D4E0D22C96AA6058431315324B81E17';
const ws = new WebSocket(PAGE_WS);
let messageId = 0;
const consoleMessages = [];

ws.on('open', function() {
    console.log('Connected to Chrome DevTools');
    ws.send(JSON.stringify({ id: ++messageId, method: 'Runtime.enable' }));
    ws.send(JSON.stringify({ id: ++messageId, method: 'Console.enable' }));

    setTimeout(function() {
        console.log('\n=== Starting E2E Test ===\n');

        // Click connect button
        ws.send(JSON.stringify({
            id: ++messageId,
            method: 'Runtime.evaluate',
            params: {
                expression: '(function() { console.log("[TEST] Clicking Connect to WebRTC Proxy"); var btn = document.getElementById("connectBtn"); if (btn) { btn.click(); return "clicked"; } return "button not found"; })()',
                returnByValue: true
            }
        }));
    }, 500);

    // Check state after 5 seconds
    setTimeout(function() {
        ws.send(JSON.stringify({
            id: ++messageId,
            method: 'Runtime.evaluate',
            params: {
                expression: '(function() { return { NetBridge_receivePacket: typeof window.NetBridge_receivePacket, dataChannel: window.dataChannel ? { readyState: window.dataChannel.readyState } : null, peerConnection: window.peerConnection ? { state: window.peerConnection.connectionState } : null }; })()',
                returnByValue: true
            }
        }));
    }, 5000);

    // Check state after 10 seconds
    setTimeout(function() {
        ws.send(JSON.stringify({
            id: ++messageId,
            method: 'Runtime.evaluate',
            params: {
                expression: '(function() { return { NetBridge_receivePacket: typeof window.NetBridge_receivePacket, dataChannel: window.dataChannel ? { readyState: window.dataChannel.readyState } : null, peerConnection: window.peerConnection ? { state: window.peerConnection.connectionState } : null }; })()',
                returnByValue: true
            }
        }));
    }, 10000);

    // Final results after 15 seconds
    setTimeout(function() {
        console.log('\n=== Test Results ===');
        var runtimeLogs = consoleMessages.filter(function(m) {
            return m.text.includes('RUNTIME') || m.text.includes('[TEST') || m.text.includes('[PROXY');
        });

        runtimeLogs.forEach(function(msg, i) {
            console.log((i+1) + '. [' + msg.type.toUpperCase() + '] ' + msg.text);
        });

        var hasA = runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME A]'); });
        var hasC = runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME C]'); });
        var hasE = runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME E]'); });
        var hasF = runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME F]'); });
        var hasG = runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME G]'); });

        console.log('\n=== Verification ===');
        console.log('[RUNTIME A] present:', hasA ? 'YES' : 'NO');
        console.log('[RUNTIME C] present:', hasC ? 'YES' : 'NO');
        console.log('[RUNTIME E] present:', hasE ? 'YES' : 'NO');
        console.log('[RUNTIME F] present:', hasF ? 'YES' : 'NO');
        console.log('[RUNTIME G] present:', hasG ? 'YES' : 'NO');

        var proxySuccess = consoleMessages.some(function(m) {
            return m.text.includes('[PROXY D]') && m.text.includes('connected');
        });
        var tcpSuccess = consoleMessages.some(function(m) {
            return m.text.includes('[PROXY F]') && m.text.includes('TCP connected');
        });

        console.log('\n[PROXY D] WebRTC connected:', proxySuccess ? 'YES' : 'NO');
        console.log('[PROXY F] TCP connected:', tcpSuccess ? 'YES' : 'NO');

        ws.close();
        process.exit(0);
    }, 15000);
});

ws.on('message', function(data) {
    var msg = JSON.parse(data.toString());

    if (msg.id && msg.result) {
        if (msg.result.result && msg.result.result.value !== undefined) {
            console.log('[Result ' + msg.id + '] ' + JSON.stringify(msg.result.result.value));
        }
        if (msg.result && msg.result.exceptionDetails) {
            console.log('[Error ' + msg.id + '] ' + msg.result.exceptionDetails.text);
        }
    } else if (msg.method === 'Runtime.consoleAPICalled') {
        var args = (msg.params.args || []).map(function(a) {
            return a.value !== undefined ? a.value : a.description;
        }).join(' ');
        consoleMessages.push({ type: msg.params.type, text: args });
    }
});

ws.on('error', function(err) {
    console.error('[WS Error] ' + err.message);
});
