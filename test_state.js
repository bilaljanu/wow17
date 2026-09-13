const WebSocket = require('ws');
const PAGE_ID = 'E3D56FAB77D80CF414B3501DAA36BA7C';
const ws = new WebSocket('ws://localhost:9230/devtools/page/' + PAGE_ID);
ws.on('open', () => {
    ws.send(JSON.stringify({id: 1, method: 'Runtime.enable'}));
    ws.send(JSON.stringify({id: 2, method: 'Console.enable'}));
    setTimeout(() => {
        ws.send(JSON.stringify({
            id: 3, method: 'Runtime.evaluate',
            params: { expression: 'connectToProxy("localhost", 8766, "127.0.0.1", 25620)', returnByValue: true }
        }));
    }, 2000);
    setTimeout(() => {
        ws.send(JSON.stringify({
            id: 4,
            method: 'Runtime.evaluate',
            params: { 
                expression: 'JSON.stringify({sendBytes: typeof window.NetBridgeBridge?.sendBytes, onJoinServer: typeof window.NetBridgeBridge?.onJoinServer, dc: window.dataChannel?.readyState})',
                returnByValue: true 
            }
        });
    }, 15000);
});
ws.on('message', (data) => {
    const m = JSON.parse(data.toString());
    if (m.method === 'Runtime.consoleAPICalled') {
        const t = (m.params.args||[]).map(a=>a.value||a.description).join(' ');
        if (t.includes('[TEST]') || t.includes('sendBytes') || t.includes('NetBridge')) console.log(t);
    }
    if (m.id===4 && m.result?.result?.value) console.log('[Result] ' + m.result.result.value);
});
setTimeout(() => ws.close(), 20000);
