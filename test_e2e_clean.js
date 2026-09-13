const WebSocket = require('ws');
const fs = require('fs');

const PAGE_ID = process.env.PAGE_ID || 'A7C43B8CF33C8698FA537DAA9DB9F237';
const ws = new WebSocket(`ws://localhost:9230/devtools/page/${PAGE_ID}`);
let messageId = 0;
const logs = { browser: [], proxy: [] };

ws.on('open', () => {
    console.log('[TEST] Connected to Chrome DevTools\n');
    ws.send(JSON.stringify({ id: ++messageId, method: 'Runtime.enable' }));
    ws.send(JSON.stringify({ id: ++messageId, method: 'Console.enable' }));
    
    // Wait for page to load and click connect
    setTimeout(() => {
        console.log('[TEST] Step 1: Connecting to proxy...\n');
        ws.send(JSON.stringify({
            id: ++messageId,
            method: 'Runtime.evaluate',
            params: {
                expression: '(function() { console.log("[TEST] Clicking Connect"); document.getElementById("connectBtn").click(); return "clicked"; })()',
                returnByValue: true
            }
        }));
    }, 2000);
    
    // Wait for DataChannel to open, then send login packet
    setTimeout(() => {
        console.log('[TEST] Step 2: Sending Minecraft login packet...');
        
        var expr = buildMinecraftPacket();
        ws.send(JSON.stringify({
            id: ++messageId,
            method: 'Runtime.evaluate',
            params: { expression: expr, returnByValue: true }
        }));
    }, 5000);
    
    // Final check
    setTimeout(() => {
        console.log('\n=== RESULTS ===\n');
        
        // Check browser logs
        console.log('[Browser Console]');
        logs.browser.forEach((l, i) => console.log(`  ${i+1}. [${l.type}] ${l.text}`));
        
        // Check proxy log
        console.log('\n[Proxy Log]');
        try {
            var proxyLog = fs.readFileSync('/tmp/proxy.log', 'utf8');
            proxyLog.split('\n').filter(l => l.includes('[PROXY')).forEach(l => console.log(`  ${l}`));
        } catch(e) {}
        
        // Verification
        console.log('\n=== VERIFICATION ===');
        check('[PROXY D] WebRTC connected', logs.proxy.some(l => l.includes('[PROXY D]') && l.includes('connected')));
        check('[PROXY E] DataChannel open', logs.proxy.some(l => l.includes('[PROXY E]') && l.includes('open')));
        check('[PROXY F] TCP connected', logs.proxy.some(l => l.includes('[PROXY F]') && l.includes('connected')));
        check('[PROXY G] Received from server', logs.proxy.some(l => l.includes('[PROXY G]')));
        check('[PROXY H] Forwarded to browser', logs.proxy.some(l => l.includes('[PROXY H]')));
        check('[RUNTIME A] onmessage', logs.browser.some(l => l.text.includes('[RUNTIME A]') && l.text.includes('byteLength')));
        check('[RUNTIME B] NetBridge called', logs.browser.some(l => l.text.includes('[RUNTIME B]')));
        check('[RUNTIME C] onReceiveFrame', logs.browser.some(l => l.text.includes('[RUNTIME C]')));
        check('[RUNTIME F] frameLength parsed', logs.browser.some(l => l.text.includes('[RUNTIME F]')));
        check('[RUNTIME G] packetId parsed', logs.browser.some(l => l.text.includes('[RUNTIME G]')));
        
        // Minecraft server logs
        console.log('\n[Minecraft Server]');
        try {
            var mcLog = fs.readFileSync('/home/bilal/wow17/logs/latest.log', 'utf8');
            var lines = mcLog.split('\n').filter(l => l.includes('connected') || l.includes('logged in'));
            lines.slice(-3).forEach(l => console.log(`  ${l}`));
            if (lines.length === 0) console.log('  (no login activity)');
        } catch(e) {}
        
        ws.close();
        process.exit(0);
    }, 10000);
});

function check(name, condition) {
    console.log(`  ${condition ? 'PASS' : 'FAIL'}: ${name}`);
}

function buildMinecraftPacket() {
    return '(function() { ' +
        'console.log("[TEST] Building login packet"); ' +
        'var dc = window.dataChannel; ' +
        'if (!dc || dc.readyState !== "open") { ' +
        '  console.log("[TEST] ERROR: DataChannel not ready:", dc ? dc.readyState : "none"); ' +
        '  return "failed"; ' +
        '} ' +
        'console.log("[TEST] DataChannel state:", dc.readyState); ' +
        'var bytes = []; ' +
        'function writeVarInt(val) { ' +
        '  while (true) { ' +
        '    if ((val & -128) === 0) { bytes.push(val & 0xFF); return; } ' +
        '    bytes.push((val & 127) | 128); val >>>= 7; ' +
        '  } ' +
        '} ' +
        '// Login start packet (ID 0x00) ' +
        'writeVarInt(0); ' +
        '// Protocol version 766 ' +
        'writeVarInt(766); ' +
        '// Hostname ' +
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
        'bytes = frame.concat(bytes); ' +
        'console.log("[TEST] Sending", bytes.length, "bytes:", Array.from(bytes).map(function(b){return "0x"+b.toString(16).padStart(2,"0");}).join(" ")); ' +
        'dc.send(new Uint8Array(bytes)); ' +
        'return "sent"; ' +
        '})()';
}

ws.on('message', (data) => {
    var msg = JSON.parse(data.toString());
    
    if (msg.id && msg.result) {
        if (msg.result.result?.value !== undefined) {
            console.log(`[Result ${msg.id}] ${JSON.stringify(msg.result.result.value)}`);
        }
    } else if (msg.method === 'Runtime.consoleAPICalled') {
        var args = (msg.params.args || []).map(a => a.value !== undefined ? a.value : a.description).join(' ');
        logs.browser.push({ type: msg.params.type, text: args });
    }
});

ws.on('error', (err) => console.error('[WS Error]', err.message));
