const WebSocket = require('ws');

function writeVarInt(val) {
    const bytes = [];
    while (true) {
        if ((val & ~0x7F) === 0) { bytes.push(val); break; }
        bytes.push((val & 0x7F) | 0x80);
        val >>>= 7;
    }
    return bytes;
}

function writeString(str) {
    const bytes = [];
    const strBytes = Buffer.from(str, 'utf8');
    bytes.push(...writeVarInt(strBytes.length));
    bytes.push(...strBytes);
    return bytes;
}

function buildHandshake() {
    const bytes = [];
    bytes.push(...writeVarInt(0)); // frame length placeholder
    bytes.push(...writeVarInt(0x00)); // packet ID (handshake)
    bytes.push(...writeVarInt(767)); // protocol version
    bytes.push(...writeString("localhost"));
    bytes.push(0x64, 0x14); // port 25620
    bytes.push(...writeVarInt(1)); // next state: login
    // Fix frame length
    const frameLen = bytes.length - 1;
    bytes[0] = frameLen & 0x7F;
    if (frameLen >= 128) {
        bytes[0] |= 0x80;
        bytes.splice(1, 0, (frameLen >>> 7) & 0x7F);
    }
    return new Uint8Array(bytes);
}

function buildLoginStart(username) {
    const bytes = [];
    bytes.push(...writeVarInt(0)); // frame length placeholder
    bytes.push(...writeVarInt(0x00)); // packet ID (login start)
    bytes.push(...writeString(username));
    // Fix frame length
    const frameLen = bytes.length - 1;
    bytes[0] = frameLen & 0x7F;
    if (frameLen >= 128) {
        bytes[0] |= 0x80;
        bytes.splice(1, 0, (frameLen >>> 7) & 0x7F);
    }
    return new Uint8Array(bytes);
}

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
    
    // Wait for DataChannel, then send handshake - wait longer
    setTimeout(() => {
        devWs.send(JSON.stringify({
            id: 4, method: 'Runtime.evaluate',
            params: { 
                expression: 'JSON.stringify({dc: window.dataChannel?.readyState || "none"})',
                returnByValue: true 
            }
        });
    }, 10000);
    
    setTimeout(() => {
        devWs.send(JSON.stringify({
            id: 5, method: 'Runtime.evaluate',
            params: { 
                expression: 'JSON.stringify({dc: window.dataChannel?.readyState || "none"})',
                returnByValue: true 
            }
        });
    }, 15000);
    
    setTimeout(() => {
        devWs.send(JSON.stringify({
            id: 6, method: 'Runtime.evaluate',
            params: { 
                expression: 'JSON.stringify({dc: window.dataChannel?.readyState || "none"})',
                returnByValue: true 
            }
        });
    }, 20000);
    
    // Try sending handshake at 25s
    setTimeout(() => {
        const handshake = buildHandshake();
        const loginStart = buildLoginStart("BrowserPlayer");
        const expr = '(function() { ' +
            'if(!window.dataChannel || window.dataChannel.readyState!=="open") return "DC not ready"; ' +
            'const hs = ' + JSON.stringify(Array.from(buildHandshake())) + '; ' +
            'const ls = ' + JSON.stringify(Array.from(buildLoginStart("BrowserPlayer"))) + '; ' +
            'window.dataChannel.send(new Uint8Array(hs)); ' +
            'setTimeout(() => window.dataChannel.send(new Uint8Array(ls)), 100); ' +
            'return "sent handshake and login start"; ' +
            '})()';
        devWs.send(JSON.stringify({
            id: 7, method: 'Runtime.evaluate',
            params: { expression: expr, returnByValue: true }
        }));
    }, 25000);
});

devWs.on('message', (data) => {
    const m = JSON.parse(data.toString());
    if (m.method === 'Runtime.consoleAPICalled') {
        const t = (m.params.args||[]).map(a=>a.value||a.description).join(' ');
        if (t.includes('[TEST]') || t.includes('sent') || t.includes('DC')) console.log(t);
    }
    if (m.id===4 && m.result?.result?.value) console.log('[DC State 1] ' + m.result.result.value);
    if (m.id===5 && m.result?.result?.value) console.log('[DC State 2] ' + m.result.result.value);
    if (m.id===6 && m.result?.result?.value) console.log('[DC State 3] ' + m.result.result.value);
    if (m.id===7 && m.result?.result?.value) console.log('[Result] ' + m.result.result.value);
});
setTimeout(() => devWs.close(), 30000);
