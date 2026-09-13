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

    // Send a Minecraft login handshake packet directly via DataChannel
    setTimeout(function() {
        console.log('[TEST] Sending direct Minecraft login handshake...\n');
        
        // Build a simple login_start packet (protocol 766 for 1.20.2, but let's use a generic one)
        // Packet ID 0x00 in login stage = login_start
        // Format: VarInt( Protocol Version ) + VarInt( Player Name ) + VarInt( Login Request Length ) + Bytes
        
        var expr = '(function() { ';
        expr += 'console.log("[TEST] Building login packet"); ';
        expr += 'var dc = window.dataChannel; ';
        expr += 'if (!dc || dc.readyState !== "open") { ';
        expr += 'console.log("[TEST] DataChannel not ready:", dc ? dc.readyState : "none"); ';
        expr += 'return "not ready"; ';
        expr += '} ';
        
        // Build the packet bytes
        expr += 'var bytes = []; ';
        expr += '// Protocol version (VarInt = 766) ';
        expr += 'function writeVarInt(val) { ';
        expr += '  while (true) { ';
        expr += '    if ((val & -128) === 0) { bytes.push(val); return; } ';
        expr += '    bytes.push((val & 127) | 128); val >>>= 7; ';
        expr += '  } ';
        expr += '} ';
        expr += '// Frame length (total bytes after this) ';
        expr += 'writeVarInt(0); // placeholder ';
        expr += '// Packet ID 0x00 (login_start) ';
        expr += 'writeVarInt(0); ';
        expr += '// Protocol version 766 ';
        expr += 'writeVarInt(766); ';
        expr += '// Host string "localhost" ';
        expr += 'var host = "localhost"; ';
        expr += 'writeVarInt(host.length); ';
        expr += 'for (var i = 0; i < host.length; i++) bytes.push(host.charCodeAt(i)); ';
        expr += '// Port (30000) ';
        expr += 'writeVarInt(30000); ';
        expr += '// Next state 1 (login) ';
        expr += 'writeVarInt(1); ';
        
        // Fix frame length
        expr += 'var packetLen = bytes.length - 1; ';
        expr += 'bytes[0] = packetLen & 127; ';
        expr += 'if (packetLen >= 128) { bytes[0] |= 128; bytes.splice(1, 0, (packetLen >>> 7) & 127); } ';
        
        expr += 'console.log("[TEST] Sending packet of", bytes.length, "bytes"); ';
        expr += 'dc.send(new Uint8Array(bytes)); ';
        expr += 'return "sent"; ';
        expr += '})()';
        
        ws.send(JSON.stringify({
            id: ++messageId,
            method: 'Runtime.evaluate',
            params: { expression: expr, returnByValue: true }
        }));
    }, 3000);

    // Wait and check results
    setTimeout(function() {
        console.log('\n=== Browser Console Logs ===');
        consoleMessages.forEach(function(m, i) {
            if (m.text.includes('TEST') || m.text.includes('RUNTIME') || m.text.includes('PROXY')) {
                console.log((i+1) + '. [' + m.type.toUpperCase() + '] ' + m.text);
            }
        });

        console.log('\n=== Proxy Log ===');
        try {
            var proxyLog = fs.readFileSync('/tmp/proxy_fixed.log', 'utf8');
            var lines = proxyLog.split('\n').filter(function(l) { return l.includes('PROXY') || l.includes('Error'); });
            lines.slice(-15).forEach(function(line) { console.log(line); });
        } catch(e) {}

        console.log('\n=== Minecraft Server Logs ===');
        try {
            var mcLog = fs.readFileSync('/home/bilal/wow17/logs/latest.log', 'utf8');
            var lines = mcLog.split('\n');
            var relevant = lines.filter(function(l) {
                return l.includes('connected') || l.includes('Disconnected') || l.includes('logged in');
            });
            relevant.slice(-5).forEach(function(line) { console.log(line); });
            if (relevant.length === 0) console.log('(no connection logs)');
        } catch(e) {}

        ws.close();
        process.exit(0);
    }, 8000);
});

ws.on('message', function(data) {
    var msg = JSON.parse(data.toString());

    if (msg.id && msg.result) {
        if (msg.result.result && msg.result.result.value !== undefined) {
            console.log('[Result ' + msg.id + '] ' + JSON.stringify(msg.result.result.value));
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
