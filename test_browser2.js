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

    // Wait for page to settle
    setTimeout(() => {
        console.log('[TEST] Step 1: Connecting to proxy...');
        // Call connect directly instead of clicking
        ws.send(JSON.stringify({
            id: ++msgId,
            method: 'Runtime.evaluate',
            params: {
                expression: '(function() { try { connectToProxy("localhost", 8766, "127.0.0.1", 25620); return "connect initiated"; } catch(e) { return "error: " + e.message; } })()',
                returnByValue: true
            }
        }));
    }, 2000);

    // Check state after connection attempt
    setTimeout(() => {
        console.log('\n[TEST] Step 2: Checking state after 10s...');
        ws.send(JSON.stringify({
            id: ++msgId,
            method: 'Runtime.evaluate',
            params: {
                expression: 'JSON.stringify({ dc: window.dataChannel ? window.dataChannel.readyState : "none", pc: window.peerConnection ? window.peerConnection.connectionState : "none", ice: window.peerConnection ? window.peerConnection.iceConnectionState : "none", ws: window.signalingSocket ? window.signalingSocket.readyState : "none" })',
                returnByValue: true
            }
        }));
    }, 12000);

    // Final results
    setTimeout(() => {
        console.log('\n=== FINAL RESULTS ===');
        logs.forEach((l, i) => console.log((i+1) + '. ' + l));

        console.log('\n--- Proxy Log ---');
        try { console.log(fs.readFileSync('/tmp/proxy.log', 'utf8')); } catch(e) {}

        ws.close();
        process.exit(0);
    }, 15000);
});

ws.on('message', (data) => {
    const m = JSON.parse(data.toString());
    if (m.method === 'Runtime.consoleAPICalled') {
        const text = (m.params.args || []).map(a => a.value || a.description).join(' ');
        logs.push(text);
        // Log everything WebRTC-related
        if (text.includes('WebRTC') || text.includes('PROXY') || text.includes('DataChannel') || 
            text.includes('Signaling') || text.includes('connect') || text.includes('TEST')) {
            console.log(text);
        }
    }
    if (m.id && m.result?.result?.value !== undefined) {
        console.log('[Result ' + m.id + '] ' + m.result.result.value);
    }
    if (m.id && m.result?.result?.exceptionDetails) {
        console.log('[Exception ' + m.id + '] ' + m.result.result.exceptionDetails.text);
    }
});

ws.on('error', (err) => console.error('[WS Error]', err.message));
