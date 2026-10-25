const WebSocket = require('ws');
const fs = require('fs');

const PAGE_WS = 'ws://localhost:9228/devtools/page/A7C43B8CF33C8698FA537DAA9DB9F237';
const ws = new WebSocket(PAGE_WS);
let messageId = 0;
const consoleMessages = [];
let testsPassed = 0;
let testsFailed = 0;

function check(name, condition) {
    if (condition) {
        testsPassed++;
        console.log(`  PASS: ${name}`);
    } else {
        testsFailed++;
        console.log(`  FAIL: ${name}`);
    }
}

ws.on('open', function() {
    console.log('[TEST] Connected to Chrome DevTools\n');
    ws.send(JSON.stringify({ id: ++messageId, method: 'Runtime.enable' }));
    ws.send(JSON.stringify({ id: ++messageId, method: 'Console.enable' }));

    // Wait for DataChannel to be open
    setTimeout(function waitForDC() {
        ws.send(JSON.stringify({
            id: ++messageId,
            method: 'Runtime.evaluate',
            params: {
                expression: '(function() { return window.dataChannel ? window.dataChannel.readyState : "none"; })()',
                returnByValue: true
            }
        }));
    }, 100);
    
    // After DC is open, send login packet
    setTimeout(function sendPacket() {
        console.log('\n[TEST] Sending Minecraft login_start packet...\n');
        
        var expr = buildMinecraftLoginPacket();
        ws.send(JSON.stringify({
            id: ++messageId,
            method: 'Runtime.evaluate',
            params: { expression: expr, returnByValue: true }
        }));
    }, 4000);
    
    // Check results
    setTimeout(function checkResults() {
        console.log('\n=== Final Results ===');
        
        var runtimeLogs = consoleMessages.filter(function(m) {
            return m.text.includes('RUNTIME') || m.text.includes('[TEST') || m.text.includes('[PROXY');
        });
        
        console.log('\n--- Browser Console ---');
        runtimeLogs.forEach(function(m, i) {
            console.log((i+1) + '. [' + m.type.toUpperCase() + '] ' + m.text);
        });
        
        console.log('\n--- Verification ---');
        check('[RUNTIME C] onReceiveFrame called', 
            runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME C]') && m.text.includes('ENTERED'); }));
        check('[RUNTIME F] frameLength parsed', 
            runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME F]'); }));
        check('[RUNTIME G] packetId parsed', 
            runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME G]'); }));
        check('[RUNTIME A] WebRTC onmessage received data', 
            runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME A]') && m.text.includes('byteLength'); }));
        check('[RUNTIME B] NetBridge_receivePacket called', 
            runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME B]'); }));
        
        console.log('\n--- Proxy Log ---');
        try {
            var proxyLog = fs.readFileSync('/tmp/proxy_fixed.log', 'utf8');
            var proxyLines = proxyLog.split('\n').filter(function(l) { 
                return l.includes('[PROXY') || l.includes('Error'); 
            }).slice(-20);
            proxyLines.forEach(function(line) { console.log(line); });
            
            check('[PROXY D] WebRTC connected', 
                proxyLog.includes('[PROXY D]') && proxyLog.includes('connectionState=connected'));
            check('[PROXY E] DataChannel open', 
                proxyLog.includes('[PROXY E]') && proxyLog.includes('open'));
            check('[PROXY F] TCP connected', 
                proxyLog.includes('[PROXY F]') && proxyLog.includes('TCP connected'));
            check('[PROXY G] Data received from server', 
                proxyLog.includes('[PROXY G]'));
            check('[PROXY H] Data forwarded to browser', 
                proxyLog.includes('[PROXY H]'));
        } catch(e) {
            console.log('Could not read proxy log');
        }
        
        console.log('\n--- Minecraft Server Logs ---');
        try {
            var mcLog = fs.readFileSync('/home/bilal/wow17/logs/latest.log', 'utf8');
            var mcLines = mcLog.split('\n').filter(function(l) {
                return l.includes('connected') || l.includes('Disconnected') || l.includes('logged in') || l.includes('HANDSHAKE');
            });
            mcLines.slice(-5).forEach(function(line) { console.log(line); });
            if (mcLines.length === 0) console.log('(no relevant logs)');
        } catch(e) {
            console.log('Could not read Minecraft log');
        }
        
        console.log('\n=== Summary ===');
        console.log(`Passed: ${testsPassed}`);
        console.log(`Failed: ${testsFailed}`);
        
        if (testsFailed === 0) {
            console.log('\n*** ALL TESTS PASSED - Pipeline verified! ***');
        } else {
            console.log('\n*** SOME TESTS FAILED ***');
        }
        
        ws.close();
        process.exit(testsFailed > 0 ? 1 : 0);
    }, 8000);
});

function buildMinecraftLoginPacket() {
    // Build a login_start packet (packet ID 0x00 in LOGIN stage)
    // Format: VarInt(frame_length) + VarInt(packet_id) + VarInt(protocol_version) + VarInt(hostname_length) + hostname + VarInt(port) + VarInt(next_state)
    return '(function() { ' +
        'console.log("[TEST] Building Minecraft login packet"); ' +
        'var dc = window.dataChannel; ' +
        'if (!dc || dc.readyState !== "open") { ' +
        '  console.log("[TEST] ERROR: DataChannel not ready:", dc ? dc.readyState : "none"); ' +
        '  return "failed"; ' +
        '} ' +
        'var bytes = []; ' +
        'function writeVarInt(val) { ' +
        '  while (true) { ' +
        '    if ((val & -128) === 0) { bytes.push(val & 0xFF); return; } ' +
        '    bytes.push((val & 127) | 128); val >>>= 7; ' +
        '  } ' +
        '} ' +
        '// Packet ID 0x00 (login_start) ' +
        'writeVarInt(0); ' +
        '// Protocol version 766 (1.20.2) ' +
        'writeVarInt(766); ' +
        '// Hostname "localhost" ' +
        'var host = "localhost"; ' +
        'writeVarInt(host.length); ' +
        'for (var i = 0; i < host.length; i++) bytes.push(host.charCodeAt(i)); ' +
        '// Port 30000 ' +
        'writeVarInt(30000); ' +
        '// Next state 1 (login) ' +
        'writeVarInt(1); ' +
        '// Prepend frame length ' +
        'var frameLen = bytes.length; ' +
        'var frame = []; ' +
        'writeVarInt(frameLen); ' +
        'bytes = bytes.concat(frame.slice(0, frame.length - (bytes.length - frameLen))); ' +
        'console.log("[TEST] Sending", bytes.length, "bytes to Minecraft server"); ' +
        'console.log("[TEST] Bytes:", Array.from(bytes).map(function(b) { return "0x" + b.toString(16).padStart(2, "0"); }).join(" ")); ' +
        'dc.send(new Uint8Array(bytes)); ' +
        'return "sent"; ' +
        '})()';
}

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
