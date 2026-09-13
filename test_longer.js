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

    // Trigger connection
    setTimeout(() => {
        console.log('[TEST] Triggering connectToProxy...');
        ws.send(JSON.stringify({
            id: ++msgId,
            method: 'Runtime.evaluate',
            params: {
                expression: 'connectToProxy("localhost", 8766, "127.0.0.1", 25620)',
                returnByValue: true
            }
        }));
    }, 2000);

    // Check state
    setTimeout(() => {
        console.log('\n[TEST] Checking state after 20s...');
        ws.send(JSON.stringify({
            id: ++msgId,
            method: 'Runtime.evaluate',
            params: {
                expression: 'JSON.stringify({ dc: window.dataChannel ? window.dataChannel.readyState : "none", pc: window.peerConnection ? window.peerConnection.connectionState : "none", ice: window.peerConnection ? window.peerConnection.iceConnectionState : "none", ws: window.signalingSocket ? window.signalingSocket.readyState : "none" })',
                returnByValue: true
            }
        }));
    }, 22000);

    // Final results
    setTimeout(() => {
        console.log('\n=== Browser Console Logs (filtered) ===');
        logs.filter(l => l.includes('WebRTC') || l.includes('Signaling') || l.includes('offer') || l.includes('answer') || l.includes('ICE') || l.includes('DataChannel')).forEach((l, i) => console.log((i+1) + '. ' + l));

        console.log('\n--- Proxy Log ---');
        try { console.log(fs.readFileSync('/tmp/proxy.log', 'utf8')); } catch(e) {}

        ws.close();
        process.exit(0);
    }, 30000);
});

ws.on('message', (data) => {
    const m = JSON.parse(data.toString());
    if (m.method === 'Runtime.consoleAPICalled') {
        const text = (m.params.args || []).map(a => a.value || a.description).join(' ');
        logs.push(text);
        if (text.includes('WebRTC') || text.includes('Signaling') || text.includes('offer') || text.includes('answer') || text.includes('ICE') || text.includes('DataChannel') || text.includes('error')) {
            console.log(text);
        }
    }
    if (m.id && m.result?.result?.value !== undefined) {
        console.log('[Result ' + m.id + '] ' + m.result.result.value);
    }
});

ws.on('error', (err) => console.error('[WS Error]', err.message));
