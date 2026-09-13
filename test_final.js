const WebSocket = require('ws');
const PAGE_WS = 'ws://localhost:9224/devtools/page/';
const ws = new WebSocket(PAGE_WS);
let messageId = 0;
const consoleMessages = [];

ws.on('open', function() {
    console.log('Connected to Chrome');
    ws.send(JSON.stringify({ id: ++messageId, method: 'Runtime.enable' }));
    ws.send(JSON.stringify({ id: ++messageId, method: 'Console.enable' }));
    
    setTimeout(function() {
        console.log('\n=== E2E Test: Browser -> WebRTC -> Proxy -> TCP -> Minecraft ===\n');
        
        // Click connect
        ws.send(JSON.stringify({
            id: ++messageId,
            method: 'Runtime.evaluate',
            params: {
                expression: '(function() { console.log("[TEST] Clicking Connect"); document.getElementById("connectBtn").click(); return "clicked"; })()',
                returnByValue: true
            }
        }));
    }, 500);
    
    // Check state after 5 seconds
    setTimeout(function() {
        ws.send(JSON.stringify({
            id: ++messageId,
            method: 'Runtime.evaluate',
            params: {
                expression: '(function() { return { netBridge: typeof window.NetBridge_receivePacket, dc: window.dataChannel ? window.dataChannel.readyState : "none", pc: window.peerConnection ? window.peerConnection.connectionState : "none" }; })()',
                returnByValue: true
            }
        }));
    }, 6000);
    
    // Final check after 10 seconds
    setTimeout(function() {
        ws.send(JSON.stringify({
            id: ++messageId,
            method: 'Runtime.evaluate',
            params: {
                expression: '(function() { return { netBridge: typeof window.NetBridge_receivePacket, dc: window.dataChannel ? window.dataChannel.readyState : "none", pc: window.peerConnection ? window.peerConnection.connectionState : "none" }; })()',
                returnByValue: true
            }
        }));
    }, 11000);
    
    // Print results after 15 seconds
    setTimeout(function() {
        console.log('\n=== Results ===');
        consoleMessages.forEach(function(m, i) {
            if (m.text.includes('RUNTIME') || m.text.includes('[TEST') || m.text.includes('[PROXY')) {
                console.log((i+1) + '. [' + m.type.toUpperCase() + '] ' + m.text);
            }
        });
        
        var runtimeLogs = consoleMessages.filter(function(m) { 
            return m.text.includes('RUNTIME') || m.text.includes('[PROXY'); 
        });
        
        console.log('\n[PROXY D] WebRTC connected:', runtimeLogs.some(function(m) { return m.text.includes('[PROXY D]') && m.text.includes('connected'); }) ? 'YES' : 'NO');
        console.log('[PROXY E] DataChannel open:', runtimeLogs.some(function(m) { return m.text.includes('[PROXY E]'); }) ? 'YES' : 'NO');
        console.log('[PROXY F] TCP connected:', runtimeLogs.some(function(m) { return m.text.includes('[PROXY F]') && m.text.includes('connected'); }) ? 'YES' : 'NO');
        console.log('[RUNTIME C] onReceiveFrame:', runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME C]'); }) ? 'YES' : 'NO');
        console.log('[RUNTIME G] packetId parsed:', runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME G]'); }) ? 'YES' : 'NO');
        
        ws.close();
        process.exit(0);
    }, 16000);
});

ws.on('message', function(data) {
    var msg = JSON.parse(data.toString());
    
    if (msg.id && msg.result) {
        if (msg.result.result && msg.result.result.value !== undefined) {
            console.log('[Result ' + msg.id + '] ' + JSON.stringify(msg.result.result.value));
        }
        if (msg.result && msg.result.exceptionDetails) {
            console.log('[Error ' + msg.id + '] ' + msg.result.exceptionDetails.text);
        }
    } else if (msg.method === 'Runtime.consoleAPICalled') {
        var args = (msg.params.args || []).map(function(a) { 
            return a.value !== undefined ? a.value : a.description; 
        }).join(' ');
        consoleMessages.push({ type: msg.params.type, text: args });
    }
});

ws.on('error', function(err) {
    console.error('[WS Error] ' + err.message);
});
