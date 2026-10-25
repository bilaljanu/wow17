const WebSocket = require('ws');

const PAGE_ID = 'E3D56FAB77D80CF414B3501DAA36BA7C';
const ws = new WebSocket('ws://localhost:9230/devtools/page/' + PAGE_ID);
ws.on('open', () => {
    ws.send(JSON.stringify({id: 1, method: 'Runtime.enable'}));
    setTimeout(() => {
        ws.send(JSON.stringify({
            id: 2,
            method: 'Runtime.evaluate',
            params: {
                expression: '(function() { console.log("[TEST] Calling onJoinServer"); if (window.NetBridgeBridge && window.NetBridgeBridge.onJoinServer) { window.NetBridgeBridge.onJoinServer("127.0.0.1", 25620); return "called"; } return "not found"; })()',
                returnByValue: true
            }
        }));
    }, 500);
});
ws.on('message', (data) => {
    const m = JSON.parse(data.toString());
    if (m.method === 'Runtime.consoleAPICalled') {
        const text = (m.params.args || []).map(a => a.value || a.description).join(' ');
        if (text.includes('TEST') || text.includes('WebRTC')) console.log(text);
    }
    if (m.id && m.result?.result?.value !== undefined) {
        console.log('[Result ' + m.id + '] ' + m.result.result.value);
    }
});
setTimeout(() => ws.close(), 5000);
