const WebSocket = require('ws');
const fs = require('fs');

const PAGE_ID = 'E3D56FAB77D80CF414B3501DAA36BA7C';
const ws = new WebSocket('ws://localhost:9230/devtools/page/E3D56FAB77D80CF414B3501DAA36BA7C');
let msgId = 0;
const logs = [];

ws.on('open', () => {
    console.log('[TEST] Connected to Chrome\n');
    ws.send(JSON.stringify({id: ++msgId, method: 'Runtime.enable'}));
    ws.send(JSON.stringify({id: ++msgId, method: 'Console.enable'}));

    // Wait for page to load, then click Connect button
    setTimeout(() => {
        console.log('[TEST] Step 1: Clicking Connect button...');
        ws.send(JSON.stringify({
            id: ++msgId,
            method: 'Runtime.evaluate',
            params: {
                expression: '(function() { console.log("[TEST] Clicking connect button"); var btn = document.getElementById("connectBtn"); if(btn) { btn.click(); return "clicked"; } return "btn not found"; })()',
                returnByValue: true
            }
        }));
    }, 3000);

    // Check state after connection
    setTimeout(() => {
        console.log('\n[TEST] Step 2: Checking state after 15s...');
        ws.send(JSON.stringify({
            id: ++msgId,
            method: 'Runtime.evaluate',
            params: {
                expression: 'JSON.stringify({dc: window.dataChannel ? window.dataChannel.readyState : "none", pc: window.peerConnection ? window.peerConnection.connectionState : "none", ice: window.peerConnection ? window.peerConnection.iceConnectionState : "none"})',
                returnByValue: true
            }
        }));
    }, 18000);

    // Final results
    setTimeout(() => {
        console.log('\n=== FINAL RESULTS ===');
        logs.forEach((l, i) => console.log((i+1) + '. ' + l));

        console.log('\n--- Proxy Log ---');
        try { console.log(fs.readFileSync('/tmp/proxy.log', 'utf8')); } catch(e) {}

        console.log('\n--- MC Server Log ---');
        try {
            var lines = fs.readFileSync('/home/bilal/wow17/test-server/logs/latest.log', 'utf8').split('\n')
                .filter(l => l.includes('UUID') || l.includes('logged in'));
            lines.slice(-5).forEach(l => console.log(l));
            if (!lines.length) console.log('(no login entries)');
        } catch(e) {}

        ws.close();
        process.exit(0);
    }, 25000);
});

ws.on('message', (data) => {
    const m = JSON.parse(data.toString());
    if (m.method === 'Runtime.consoleAPICalled') {
        const text = (m.params.args || []).map(a => a.value || a.description).join(' ');
        logs.push(text);
        if (text.includes('TEST') || text.includes('WebRTC') || text.includes('PROXY') || text.includes('DataChannel') || text.includes('Signaling') || text.includes('joinServer')) {
            console.log(text);
        }
    }
    if (m.id && m.result?.result?.value !== undefined) {
        console.log('[Result ' + m.id + '] ' + m.result.result.value);
    }
});

ws.on('error', (err) => console.error('[WS Error]', err.message));