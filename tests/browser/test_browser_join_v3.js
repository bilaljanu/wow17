const WebSocket = require('ws');
const fs = require('fs');

const PAGE_ID = '2849687F3553B49EA13C883AAA81FC9D';
const devWs = new WebSocket('ws://localhost:9231/devtools/page/' + PAGE_ID);

let dcOpen = false;
let tcpConnected = false;
let joinSent = false;
let browserLog = [];
let packetSent = false;
let consecutiveOpenCount = 0;

devWs.on('open', () => {
    console.log('[TEST] Connected to Chrome DevTools');
    
    devWs.send(JSON.stringify({id: 10, method: 'Runtime.enable'}));
    devWs.send(JSON.stringify({id: 11, method: 'Console.enable'}));
    
    // Wait for page to load
    setTimeout(() => {
        devWs.send(JSON.stringify({
            id: 20, method: 'Runtime.evaluate',
            params: { expression: 'JSON.stringify({main: typeof main, netBridge: !!window.NetBridgeBridge})', returnByValue: true }
        }));
    }, 2000);
    
    // Connect to proxy - this should create ONE stable connection
    setTimeout(() => {
        devWs.send(JSON.stringify({
            id: 30, method: 'Runtime.evaluate',
            params: { expression: 'connectToProxy("localhost", 8766, "127.0.0.1", 25620)', returnByValue: true }
        }));
        console.log('[TEST] Sent connectToProxy command');
    }, 5000);
    
    // Poll for DataChannel state - wait for 3 consecutive opens to ensure stability
    const pollInterval = setInterval(() => {
        devWs.send(JSON.stringify({
            id: 40, method: 'Runtime.evaluate',
            params: { expression: 'JSON.stringify({dc: window.dataChannel?.readyState || "none", ws: window.signalingSocket?.readyState || "none"})', returnByValue: true }
        }));
    }, 500);
    
    // Call attemptJoin() only after DataChannel is stable (3 consecutive opens)
    const joinCheck = setInterval(() => {
        if (dcOpen && !joinSent) {
            consecutiveOpenCount++;
            if (consecutiveOpenCount >= 3) {
                joinSent = true;
                console.log('[TEST] DataChannel stable, calling onJoinServer with port 25620...');
                devWs.send(JSON.stringify({
                    id: 50, method: 'Runtime.evaluate',
                    params: { expression: 'window.NetBridgeBridge.onJoinServer("127.0.0.1", 25620)', returnByValue: true }
                }));
                clearInterval(joinCheck);
            }
        } else if (!dcOpen) {
            consecutiveOpenCount = 0;
        }
    }, 500);
    
    // Check TCP connection state in proxy log
    const checkTcpInterval = setInterval(() => {
        try {
            const log = fs.readFileSync('/tmp/proxy.log', 'utf8');
            if (log.includes('TCP connected to Minecraft server') && !tcpConnected) {
                tcpConnected = true;
                console.log('[TEST] TCP connection to Minecraft server established!');
            }
            if (log.includes('DataChannel received message') && !packetSent) {
                packetSent = true;
                console.log('[TEST] Packet received by proxy from browser!');
            }
        } catch(e) {}
    }, 500);
    
    devWs.on('message', (data) => {
        const m = JSON.parse(data.toString());
        
        if (m.method === 'Runtime.consoleAPICalled') {
            const t = (m.params.args||[]).map(a=>a.value||a.description).join(' ');
            browserLog.push(t);
            if (t.includes('[WebRTC]') || t.includes('[NetBridge]') || t.includes('[RUNTIME') || t.includes('[TEST]') || t.includes('[PROXY]')) {
                console.log('[BROWSER]', t);
            }
        }
        
        if (m.id === 40 && m.result?.result?.value) {
            const state = JSON.parse(m.result.result.value);
            const dcState = state.dc;
            const wsState = state.ws;
            
            if (dcState === 'open' && wsState === 1) {
                dcOpen = true;
                console.log('[TEST] DataChannel OPEN (stable connection)');
            } else if (dcState === 'closed' || dcState === 'closing') {
                console.log('[TEST] DataChannel CLOSED or CLOSING - connection unstable');
            }
        }
    });
    
    // Final status after 35 seconds
    setTimeout(() => {
        clearInterval(pollInterval);
        clearInterval(checkTcpInterval);
        clearInterval(joinCheck);
        
        console.log('\n=== E2E TEST SUMMARY ===');
        console.log('[TEST] DataChannel open:', dcOpen ? 'YES' : 'NO');
        console.log('[TEST] TCP connected to MC server:', tcpConnected ? 'YES' : 'NO');
        console.log('[TEST] attemptJoin() called:', joinSent ? 'YES' : 'NO');
        console.log('[TEST] Packet sent to server:', packetSent ? 'YES' : 'NO');
        
        console.log('\n[PROXY LOG - Last 30 lines]');
        try {
            const log = fs.readFileSync('/tmp/proxy.log', 'utf8');
            const lines = log.split('\n').slice(-30);
            console.log(lines.join('\n'));
        } catch(e) {
            console.log('[ERROR] Could not read proxy log');
        }
        
        console.log('\n[SERVER LOG - Last 5 lines]');
        try {
            const lines = fs.readFileSync('/home/bilal/wow17/test-server/logs/latest.log', 'utf8').split('\n').slice(-5);
            console.log(lines.join('\n'));
        } catch(e) {
            console.log('[ERROR] Could not read server log');
        }
        
        devWs.close();
        process.exit(0);
    }, 35000);
});
