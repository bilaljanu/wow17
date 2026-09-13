const WebSocket = require('ws');
const fs = require('fs');

const PAGE_ID = 'E3D56FAB77D80CF414B3501DAA36BA7C';
const ws = new WebSocket('ws://localhost:9230/devtools/page/' + PAGE_ID);
let msgId = 0;
const logs = [];

ws.on('open', () => {
    console.log('[TEST] Connected to Chrome\n');
    ws.send(JSON.stringify({id: ++msgId, method: 'Runtime.enable'}));
    ws.send(JSON.stringify({id: ++msgId, method: 'Console.enable'}));

    // Wait for page to load, then trigger connection
    setTimeout(() => {
        console.log('[TEST] Step 1: Connecting to WebRTC proxy...');
        ws.send(JSON.stringify({
            id: ++msgId,
            method: 'Runtime.evaluate',
            params: {
                expression: 'connectToProxy("localhost", 8766, "127.0.0.1", 25620)',
                returnByValue: true
            }
        }));
    }, 3000);

    // Wait for DataChannel to open, then send join
    setTimeout(() => {
        console.log('\n[TEST] Step 2: Checking DataChannel state...');
        ws.send(JSON.stringify({
            id: ++msgId,
            method: 'Runtime.evaluate',
            params: {
                expression: 'JSON.stringify({ dc: window.dataChannel ? window.dataChannel.readyState : "none" })',
                returnByValue: true
            }
        }));
    }, 10000);

    // Send join request through NetBridge
    setTimeout(() => {
        console.log('\n[TEST] Step 3: Sending join request...');
        ws.send(JSON.stringify({
            id: ++msgId,
            method: 'Runtime.evaluate',
            params: {
                expression: '(function() { if (window.NetBridgeBridge && window.NetBridgeBridge.onJoinServer) { window.NetBridgeBridge.onJoinServer("127.0.0.1", 25620); return "join sent"; } return "bridge not ready"; })()',
                returnByValue: true
            }
        }));
    }, 15000);

    // Final check
    setTimeout(() => {
        console.log('\n[TEST] Step 4: Final state check...');
        ws.send(JSON.stringify({
            id: ++msgId,
            method: 'Runtime.evaluate',
            params: {
                expression: 'JSON.stringify({ dc: window.dataChannel ? window.dataChannel.readyState : "none", pc: window.peerConnection ? window.peerConnection.connectionState : "none" })',
                returnByValue: true
            }
        }));
    }, 20000);

    // Final results
    setTimeout(() => {
        console.log('\n=== Browser Console (filtered) ===');
        logs.filter(l => l.includes('[WebRTC]') || l.includes('[TEST]') || l.includes('DataChannel') || l.includes('Signaling')).forEach((l, i) => console.log((i+1) + '. ' + l));

        console.log('\n--- Proxy Log ---');
        try { console.log(fs.readFileSync('/tmp/proxy.log', 'utf8')); } catch(e) {}

        console.log('\n--- Minecraft Server Log ---');
        try {
            const mcLog = fs.readFileSync('/home/bilal/wow17/test-server/logs/latest.log', 'utf8');
            const lines = mcLog.split('\n').filter(l => l.includes('logged in') || l.includes('joined'));
            lines.slice(-5).forEach(l => console.log(l));
            if (!lines.length) console.log('(no login entries)');
        } catch(e) { console.log('(cannot read MC log)'); }

        ws.close();
        process.exit(0);
    }, 25000);
});

ws.on('message', (data) => {
    const m = JSON.parse(data.toString());
    if (m.method === 'Runtime.consoleAPICalled') {
        const text = (m.params.args || []).map(a => a.value || a.description).join(' ');
        logs.push(text);
        if (text.includes('[WebRTC]') || text.includes('[TEST]') || text.includes('DataChannel') || text.includes('Signaling')) {
            console.log(text);
        }
    }
    if (m.id && m.result?.result?.value !== undefined) {
        console.log('[Result ' + m.id + '] ' + m.result.result.value);
    }
});

ws.on('error', (err) => console.error('[WS Error]', err.message));
