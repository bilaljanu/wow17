const WebSocket = require('ws');
const PAGE_ID = 'E3D56FAB77D80CF414B3501DAA36BA7C';
const devWs = new WebSocket('ws://localhost:9230/devtools/page/' + PAGE_ID);

devWs.on('open', () => {
    devWs.send(JSON.stringify({id: 1, method: 'Runtime.enable'}));
    devWs.send(JSON.stringify({id: 2, method: 'Console.enable'}));
    
    // Connect to proxy
    setTimeout(() => {
        devWs.send(JSON.stringify({
            id: 3, method: 'Runtime.evaluate',
            params: { expression: 'connectToProxy("localhost", 8766, "127.0.0.1", 25620)', returnByValue: true }
        }));
    }, 2000);
    
    // Check DataChannel state
    setTimeout(() => {
        devWs.send(JSON.stringify({
            id: 4, method: 'Runtime.evaluate',
            params: { expression: 'JSON.stringify({dc: window.dataChannel?.readyState || "none"})', returnByValue: true }
        });
    }, 10000);
    
    // Check again later
    setTimeout(() => {
        devWs.send(JSON.stringify({
            id: 5, method: 'Runtime.evaluate',
            params: { expression: 'JSON.stringify({dc: window.dataChannel?.readyState || "none"})', returnByValue: true }
        });
    }, 15000);
    
    // Check again later
    setTimeout(() => {
        devWs.send(JSON.stringify({
            id: 6, method: 'Runtime.evaluate',
            params: { expression: 'JSON.stringify({dc: window.dataChannel?.readyState || "none"})', returnByValue: true }
        });
    }, 20000);
});

devWs.on('message', (data) => {
    const m = JSON.parse(data.toString());
    if (m.method === 'Runtime.consoleAPICalled') {
        const t = (m.params.args||[]).map(a=>a.value||a.description).join(' ');
        if (t.includes('[TEST]') || t.includes('DC') || t.includes('DataChannel') || t.includes('join') || t.includes('NetBridge')) console.log(t);
    }
    if (m.id >= 4 && m.id <= 6 && m.result?.result?.value) console.log('[State ' + m.id + '] ' + m.result.result.value);
});

setTimeout(() => devWs.close(), 25000);
