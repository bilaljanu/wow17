const WebSocket = require('ws');
const fs = require('fs');

const PAGE_WS = 'ws://localhost:9228/devtools/page/A7C43B8CF33C8698FA537DAA9DB9F237';
const ws = new WebSocket(PAGE_WS);
let messageId = 0;
const consoleMessages = [];

ws.on('open', function() {
    console.log('[TEST] Connected to Chrome DevTools\n');
    ws.send(JSON.stringify({ id: ++messageId, method: 'Runtime.enable' }));
    ws.send(JSON.stringify({ id: ++messageId, method: 'Console.enable' }));

    setTimeout(function() {
        console.log('[TEST] Step 1: Clicking Connect button...\n');
        ws.send(JSON.stringify({
            id: ++messageId,
            method: 'Runtime.evaluate',
            params: {
                expression: '(function() { console.log("[TEST] Clicking Connect to WebRTC Proxy"); document.getElementById("connectBtn").click(); return "clicked"; })()',
                returnByValue: true
            }
        }));
    }, 500);

    // Wait for connection, then check state
    setTimeout(function() {
        console.log('\n[TEST] Step 2: Checking connection state...');
        ws.send(JSON.stringify({
            id: ++messageId,
            method: 'Runtime.evaluate',
            params: {
                expression: '(function() { return { dataChannel: window.dataChannel ? window.dataChannel.readyState : "none" }; })()',
                returnByValue: true
            }
        }));
    }, 6000);

    // Click join button with correct port
    setTimeout(function() {
        console.log('\n[TEST] Step 3: Calling onJoinServer with port 30000...');
        var expr = '(function() { ';
        expr += 'console.log("[TEST] Calling onJoinServer with port 30000"); ';
        expr += 'if (window.NetBridgeBridge && window.NetBridgeBridge.onJoinServer) { ';
        expr += 'window.NetBridgeBridge.onJoinServer("127.0.0.1", 30000); ';
        expr += 'return "join sent"; ';
        expr += '} return "bridge not ready"; })()';
        ws.send(JSON.stringify({
            id: ++messageId,
            method: 'Runtime.evaluate',
            params: { expression: expr, returnByValue: true }
        }));
    }, 8000);

    // Check state after 12 seconds
    setTimeout(function() {
        console.log('\n[TEST] Step 4: Final state check...');
        ws.send(JSON.stringify({
            id: ++messageId,
            method: 'Runtime.evaluate',
            params: {
                expression: '(function() { return { dataChannel: window.dataChannel ? window.dataChannel.readyState : "none" }; })()',
                returnByValue: true
            }
        }));
    }, 12000);

    // Print results after 15 seconds
    setTimeout(function() {
        console.log('\n=== Browser Console Logs ===');
        consoleMessages.forEach(function(m, i) {
            console.log((i+1) + '. [' + m.type.toUpperCase() + '] ' + m.text);
        });

        var runtimeLogs = consoleMessages.filter(function(m) {
            return m.text.includes('RUNTIME') || m.text.includes('[TEST');
        });

        console.log('\n=== Verification ===');
        console.log('[RUNTIME A] WebRTC onmessage:', runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME A]'); }) ? 'YES' : 'NO');
        console.log('[RUNTIME B] NetBridge_receivePacket:', runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME B]'); }) ? 'YES' : 'NO');
        console.log('[RUNTIME C] onReceiveFrame entered:', runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME C]'); }) ? 'YES' : 'NO');
        console.log('[RUNTIME F] frameLength parsed:', runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME F]'); }) ? 'YES' : 'NO');
        console.log('[RUNTIME G] packetId parsed:', runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME G]'); }) ? 'YES' : 'NO');

        console.log('\n=== Proxy Log ===');
        try {
            var proxyLog = fs.readFileSync('/tmp/proxy_fixed.log', 'utf8');
            console.log(proxyLog);

            console.log('\n=== Proxy Verification ===');
            console.log('[PROXY D] WebRTC connected:', proxyLog.includes('[PROXY D]') && proxyLog.includes('connected') ? 'YES' : 'NO');
            console.log('[PROXY E] DataChannel open:', proxyLog.includes('[PROXY E]') ? 'YES' : 'NO');
            console.log('[PROXY F] TCP connected:', proxyLog.includes('[PROXY F]') && proxyLog.includes('connected') ? 'YES' : 'NO');
            console.log('[PROXY G] Received data:', proxyLog.includes('[PROXY G]') ? 'YES' : 'NO');
            console.log('[PROXY H] Forwarded to browser:', proxyLog.includes('[PROXY H]') ? 'YES' : 'NO');
        } catch(e) {
            console.log('Proxy log not found');
        }

        console.log('\n=== Minecraft Server Logs ===');
        try {
            var mcLog = fs.readFileSync('/home/bilal/wow17/logs/latest.log', 'utf8');
            var lines = mcLog.split('\n');
            var relevant = lines.filter(function(l) {
                return l.includes('connected') || l.includes('Disconnected') || l.includes('logged in');
            });
            relevant.slice(-10).forEach(function(line) { console.log(line); });
            if (relevant.length === 0) console.log('(no connection logs)');
        } catch(e) {
            console.log('Minecraft log not found');
        }

        ws.close();
        process.exit(0);
    }, 15000);
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
