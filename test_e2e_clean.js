const WebSocket = require('ws');

const PAGE_ID = '7924CF024F63A0CDC2D1F1861952A561';
const devWs = new WebSocket('ws://localhost:9230/devtools/page/' + PAGE_ID);

let dcOpen = false;
let testsPassed = 0;
let testsFailed = 0;

devWs.on('open', () => {
    console.log('[TEST] Connected to Chrome DevTools');
    
    devWs.send(JSON.stringify({id: 1, method: 'Runtime.enable'}));
    devWs.send(JSON.stringify({id: 2, method: 'Console.enable'}));
    
    // Wait for page to load and TeaVM to initialize
    setTimeout(() => {
        devWs.send(JSON.stringify({
            id: 3, method: 'Runtime.evaluate',
            params: { expression: 'JSON.stringify({main: typeof main, netBridge: typeof window.NetBridgeBridge, dc: window.dataChannel?.readyState || "none"})', returnByValue: true }
        }));
    }, 3000);
    
    // Try to connect to proxy
    setTimeout(() => {
        devWs.send(JSON.stringify({
            id: 4, method: 'Runtime.evaluate',
            params: { expression: 'connectToProxy("localhost", 8766, "127.0.0.1", 25620)', returnByValue: true }
        }));
        console.log('[TEST] Initiated WebRTC connection to proxy');
    }, 6000);
    
    // Poll for DataChannel state
    const checkInterval = setInterval(() => {
        devWs.send(JSON.stringify({
            id: 5, method: 'Runtime.evaluate',
            params: { expression: 'JSON.stringify({dc: window.dataChannel?.readyState || "none"})', returnByValue: true }
        }));
    }, 2000);
    
    devWs.on('message', (data) => {
        const m = JSON.parse(data.toString());
        if (m.method === 'Runtime.consoleAPICalled') {
            const t = (m.params.args||[]).map(a=>a.value||a.description).join(' ');
            if (t.includes('[WebRTC]') || t.includes('[NetBridge]') || t.includes('[RUNTIME') || t.includes('[TEST]')) {
                console.log('[BROWSER]', t);
            }
        }
        if (m.id === 3 && m.result?.result?.value) {
            console.log('[RESULT] Initial state:', m.result.result.value);
        }
        if (m.id === 4 && m.result?.result?.value) {
            console.log('[RESULT] Connect result:', m.result.result.value);
        }
        if (m.id === 5 && m.result?.result?.value) {
            const state = m.result.result.value;
            console.log('[RESULT] DC state:', state);
            if (state.includes('open')) {
                dcOpen = true;
                clearInterval(checkInterval);
                testsPassed++;
                console.log('[TEST] DataChannel opened successfully!');
            }
        }
    });
    
    // Final status check
    setTimeout(() => {
        clearInterval(checkInterval);
        devWs.send(JSON.stringify({
            id: 99, method: 'Runtime.evaluate',
            params: { expression: 'JSON.stringify({finalDc: window.dataChannel?.readyState || "none", finalWs: window.signalingSocket?.readyState || "none"})', returnByValue: true }
        }));
        setTimeout(() => {
            console.log(`\n[SUMMARY] Tests passed: ${testsPassed}, Tests failed: ${testsFailed}`);
            if (dcOpen) {
                console.log('[PASS] Browser successfully established WebRTC DataChannel!');
            } else {
                console.log('[FAIL] DataChannel did not open');
            }
            devWs.close();
            process.exit(dcOpen ? 0 : 1);
        }, 3000);
    }, 15000);
});

devWs.on('error', (err) => console.error('[DEVTOOLS ERROR]', err.message));
setTimeout(() => devWs.close(), 25000);
