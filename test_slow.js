const WebSocket = require('ws');
const fs = require('fs');

const PAGE_ID = 'E3D56FAB77D80CF414B3501DAA36BA7C';
const ws = new WebSocket('ws://localhost:9230/devtools/page/' + PAGE_ID);

ws.on('open', () => {
    ws.send(JSON.stringify({id: 1, method: 'Runtime.enable'}));
    
    setTimeout(() => {
        console.log('[TEST] Connecting to proxy...');
        ws.send(JSON.stringify({
            id: 2,
            method: 'Runtime.evaluate',
            params: {
                expression: 'connectToProxy("localhost", 8766, "127.0.0.1", 25620)',
                returnByValue: true
            }
        }));
    }, 2000);

    setTimeout(() => {
        console.log('[TEST] Checking DataChannel state...');
        ws.send(JSON.stringify({
            id: 3,
            method: 'Runtime.evaluate',
            params: {
                expression: 'JSON.stringify({ dc: window.dataChannel ? window.dataChannel.readyState : "none" })',
                returnByValue: true
            }
        }));
    }, 10000);

    setTimeout(() => {
        console.log('[TEST] Checking proxy log...');
        try {
            const log = fs.readFileSync('/tmp/proxy.log', 'utf8');
            console.log(log);
        } catch(e) {}
        
        ws.close();
        process.exit(0);
    }, 15000);
});

ws.on('message', (data) => {
    const m = JSON.parse(data.toString());
    if (m.method === 'Runtime.consoleAPICalled') {
        const text = (m.params.args || []).map(a => a.value || a.description).join(' ');
        if (text.includes('[TEST]') || text.includes('[WebRTC]') || text.includes('DataChannel')) {
            console.log(text);
        }
    }
    if (m.id && m.result?.result?.value !== undefined) {
        console.log('[Result ' + m.id + '] ' + m.result.result.value);
    }
});
