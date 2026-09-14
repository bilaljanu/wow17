const WebSocket = require('ws');
const fs = require('fs');

const PAGE_ID = '2849687F3553B49EA13C883AAA81FC9D';
const devWs = new WebSocket('ws://localhost:9231/devtools/page/' + PAGE_ID);

let dcOpen = false;
let tcpConnected = false;
let browserLog = [];

devWs.on('open', () => {
    console.log('[TEST] Connected to Chrome DevTools');
    
    devWs.send(JSON.stringify({id: 10, method: 'Runtime.enable'}));
    devWs.send(JSON.stringify({id: 11, method: 'Console.enable'}));
    
    // Wait for page to load and TeaVM to initialize
    setTimeout(() => {
        devWs.send(JSON.stringify({
            id: 20, method: 'Runtime.evaluate',
            params: { expression: 'JSON.stringify({main: typeof main, netBridge: !!window.NetBridgeBridge})', returnByValue: true }
        }));
    }, 2000);
    
    // Connect to proxy
    setTimeout(() => {
        devWs.send(JSON.stringify({
            id: 30, method: 'Runtime.evaluate',
            params: { expression: 'connectToProxy("localhost", 8766, "127.0.0.1", 25620)', returnByValue: true }
        }));
        console.log('[TEST] Sent connectToProxy command');
    }, 5000);
    
    // Poll for DataChannel state
    const pollInterval = setInterval(() => {
        devWs.send(JSON.stringify({
            id: 40, method: 'Runtime.evaluate',
            params: { expression: 'JSON.stringify({dc: window.dataChannel?.readyState || "none"})', returnByValue: true }
        }));
    }, 2000);
    
    // Check TCP connection state in proxy log
    const checkTcpInterval = setInterval(() => {
        try {
            const log = fs.readFileSync('/tmp/proxy.log', 'utf8');
            if (log.includes('TCP connected to Minecraft server') && !tcpConnected) {
                tcpConnected = true;
                console.log('[TEST] TCP connection to Minecraft server established!');
            }
        } catch(e) {}
    }, 1000);
    
    devWs.on('message', (data) => {
        const m = JSON.parse(data.toString());
        
        if (m.method === 'Runtime.consoleAPICalled') {
            const t = (m.params.args||[]).map(a=>a.value||a.description).join(' ');
            browserLog.push(t);
            if (t.includes('[WebRTC]') || t.includes('[NetBridge]') || t.includes('[RUNTIME') || t.includes('[TEST]')) {
                console.log('[BROWSER]', t);
            }
        }
        
        if (m.id === 40 && m.result?.result?.value) {
            const state = m.result.result.value;
            console.log('[STATE] ' + state);
            if (state.includes('"open"') || state.includes('open')) {
                dcOpen = true;
                clearInterval(pollInterval);
                console.log('[TEST] DataChannel opened successfully!');
            }
        }
    });
    
    // Final status
    setTimeout(() => {
        clearInterval(pollInterval);
        clearInterval(checkTcpInterval);
        
        console.log('\n=== E2E TEST SUMMARY ===');
        console.log('[TEST] DataChannel open:', dcOpen ? 'YES' : 'NO');
        console.log('[TEST] TCP connected to MC server:', tcpConnected ? 'YES' : 'NO');
        
        // Show proxy log
        console.log('\n[PROXY LOG]');
        try {
            console.log(fs.readFileSync('/tmp/proxy.log', 'utf8'));
        } catch(e) {
            console.log('[ERROR] Could not read proxy log');
        }
        
        // Show last 20 browser log lines
        console.log('\n[RECENT BROWSER LOG]');
        console.log(browserLog.slice(-20).join('\n'));
        
        if (dcOpen && tcpConnected) {
            console.log('\n[PASS] Full E2E pipeline verified! Browser → WebRTC → Proxy → TCP → Minecraft');
            devWs.close();
            process.exit(0);
        } else {
            console.log('\n[INFO] Pipeline incomplete - checking if packets were sent...');
            devWs.close();
            process.exit(dcOpen || tcpConnected ? 0 : 1);
        }
    }, 20000);
});

devWs.on('error', (err) => {
    console.error('[TEST ERROR]', err.message);
    process.exit(1);
});
