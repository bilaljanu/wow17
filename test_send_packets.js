const WebSocket = require('ws');
const fs = require('fs');

function pushVarInt(bytes, val) {
  while (true) {
    if ((val & ~0x7F) === 0) { bytes.push(val); return; }
    bytes.push((val & 0x7F) | 0x80);
    val >>>= 7;
  }
}

function pushString(bytes, s) {
  const b = Buffer.from(s, 'utf8');
  pushVarInt(bytes, b.length);
  for (let i = 0; i < b.length; i++) bytes.push(b[i]);
}

// Build Minecraft Handshake packet (packet ID = 0x00)
const handshake = [];
pushVarInt(handshake, 0x00); // packet ID: Handshake
pushVarInt(handshake, 767); // protocol version: 767 (1.20.4)
pushString(handshake, "127.0.0.1"); // server address
pushVarInt(handshake, 25620); // port
pushVarInt(handshake, 0x01); // next state: Login (1)

// Build Minecraft Login Start packet (packet ID = 0x00)
const loginStart = [];
pushVarInt(loginStart, 0x00); // packet ID: Login Start
pushString(loginStart, "BrowserPlayer"); // username

console.log('Handshake packet:', handshake.length, 'bytes');
console.log('Login start packet:', loginStart.length, 'bytes');

const PAGE_ID = '2849687F3553B49EA13C883AAA81FC9D';
const devWs = new WebSocket('ws://localhost:9231/devtools/page/' + PAGE_ID);

devWs.on('open', () => {
    console.log('[TEST] Connected to Chrome DevTools');
    
    devWs.send(JSON.stringify({id: 1, method: 'Runtime.enable'}));
    devWs.send(JSON.stringify({id: 2, method: 'Console.enable'}));
    
    // Wait for DataChannel to be ready, then send packets
    setTimeout(() => {
        devWs.send(JSON.stringify({
            id: 3, method: 'Runtime.evaluate',
            params: { expression: `
                (function() {
                    if (!window.dataChannel || window.dataChannel.readyState !== 'open') {
                        return 'DC not ready';
                    }
                    // Send handshake
                    window.dataChannel.send(new Uint8Array(${JSON.stringify(handshake)}));
                    setTimeout(() => {
                        window.dataChannel.send(new Uint8Array(${JSON.stringify(loginStart)}));
                    }, 100);
                    return 'Sent packets';
                })()
            `, returnByValue: true }
        }));
        console.log('[TEST] Sent Minecraft protocol packets');
    }, 3000);
    
    // Monitor for incoming packets from server
    const pollInterval = setInterval(() => {
        devWs.send(JSON.stringify({
            id: 4, method: 'Runtime.evaluate',
            params: { expression: 'JSON.stringify({dc: window.dataChannel?.readyState || "none", bytes: window.lastReceivedBytes?.length || 0})', returnByValue: true }
        }));
    }, 2000);
    
    devWs.on('message', (data) => {
        const m = JSON.parse(data.toString());
        if (m.method === 'Runtime.consoleAPICalled') {
            const t = (m.params.args||[]).map(a=>a.value||a.description).join(' ');
            console.log('[BROWSER]', t);
        }
        if (m.id === 3 && m.result?.result?.value) {
            console.log('[RESULT]', m.result.result.value);
        }
        if (m.id === 4 && m.result?.result?.value) {
            console.log('[STATE]', m.result.result.value);
        }
    });
    
    // Final status
    setTimeout(() => {
        clearInterval(pollInterval);
        console.log('\n=== PACKET SEND TEST SUMMARY ===');
        
        console.log('\n[PROXY LOG]');
        try {
            console.log(fs.readFileSync('/tmp/proxy.log', 'utf8'));
        } catch(e) {}
        
        devWs.close();
        process.exit(0);
    }, 15000);
});

devWs.on('error', (err) => {
    console.error('[TEST ERROR]', err.message);
    process.exit(1);
});
