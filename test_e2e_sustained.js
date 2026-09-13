const WebSocket = require('ws');
const fs = require('fs');

const PAGE_ID = 'E3D56FAB77D80CF414B3501DAA36BA7C';
const ws = new WebSocket('ws://localhost:9230/devtools/page/' + PAGE_ID);
let msgId = 0;

ws.on('open', () => {
    console.log('[TEST] Connected to Chrome\n');
    ws.send(JSON.stringify({id: ++msgId, method: 'Runtime.enable'}));
    ws.send(JSON.stringify({id: ++msgId, method: 'Console.enable'}));

    // Step 1: Connect to proxy
    setTimeout(() => {
        console.log('[TEST] Step 1: Connecting to WebRTC proxy...');
        ws.send(JSON.stringify({
            id: ++msgId, method: 'Runtime.evaluate',
            params: { expression: 'connectToProxy("localhost", 8766, "127.0.0.1", 25620)', returnByValue: true }
        }));
    }, 2000);

    // Step 2: Wait for DataChannel to open, then trigger join
    setTimeout(() => {
        console.log('\n[TEST] Step 2: Triggering join...');
        ws.send(JSON.stringify({
            id: ++msgId, method: 'Runtime.evaluate',
            params: { 
                expression: '(function() { if(window.NetBridgeBridge && window.NetBridgeBridge.onJoinServer) { window.NetBridgeBridge.onJoinServer("127.0.0.1", 25620); return "join triggered"; } return "not ready"; })()',
                returnByValue: true 
            }
        }));
    }, 8000);

    // Step 3: Check state after 5 more seconds
    setTimeout(() => {
        console.log('\n[TEST] Step 3: Checking final state...');
        ws.send(JSON.stringify({
            id: ++msgId, method: 'Runtime.evaluate',
            params: { 
                expression: 'JSON.stringify({ dc: window.dataChannel ? window.dataChannel.readyState : "none", pc: window.peerConnection ? window.peerConnection.connectionState : "none" })',
                returnByValue: true 
            }
        }));
    }, 15000);

    // Step 4: Final results
    setTimeout(() => {
        console.log('\n=== PROXY LOG ===');
        try { console.log(fs.readFileSync('/tmp/proxy.log', 'utf8')); } catch(e) {}

        console.log('\n=== MC SERVER LOG (last 5 entries) ===');
        try {
            const lines = fs.readFileSync('/home/bilal/wow17/test-server/logs/latest.log', 'utf8').split('\n')
                .filter(l => l.includes('logged in') || l.includes('joined') || l.includes('Disconnect'));
            lines.slice(-5).forEach(l => console.log(l));
            if (!lines.length) console.log('(no login entries)');
        } catch(e) {}

        ws.close();
        process.exit(0);
    }, 20000);
});

ws.on('message', (data) => {
    const m = JSON.parse(data.toString());
    if (m.method === 'Runtime.consoleAPICalled') {
        const text = (m.params.args || []).map(a => a.value || a.description).join(' ');
        if (text.includes('[TEST]') || text.includes('[WebRTC]') || text.includes('DataChannel') || text.includes('Signaling')) {
            console.log(text);
        }
    }
    if (m.id && m.result?.result?.value !== undefined) {
        console.log('[Result ' + m.id + '] ' + m.result.result.value);
    }
});
