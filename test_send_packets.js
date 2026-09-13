const WebSocket = require('ws');

const PAGE_ID = 'E3D56FAB77D80CF414B3501DAA36BA7C';
const devWs = new WebSocket('ws://localhost:9230/devtools/page/' + PAGE_ID);

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

const handshakeBytes = [];
handshakeBytes.push(0);
function pushVarIntLocal(bytes, val) {
  while (true) {
    if ((val & ~0x7F) === 0) { bytes.push(val); return; }
    bytes.push((val & 0x7F) | 0x80);
    val >>>= 7;
  }
}
function pushStringLocal(bytes, s) {
  const b = Buffer.from(s, 'utf8');
  pushVarIntLocal(bytes, b.length);
  for (let i = 0; i < b.length; i++) bytes.push(b[i]);
}

const handshakeBytes = [];
handshakeBytes.push(0);
pushVarIntLocal(handshakeBytes, 0x00);
pushVarIntLocal(handshakeBytes, 767);
pushStringLocal(handshakeBytes, "localhost");
handshakeBytes.push(0x64, 0x14);
pushVarIntLocal(handshakeBytes, 1);

let frameLen = handshakeBytes.length - 1;
handshakeBytes[0] = frameLen & 0x7F;
if (frameLen >= 128) {
  handshakeBytes[0] |= 0x80;
  handshakeBytes.splice(1, 0, (frameLen >>> 7) & 0x7F);
}
const handshake = new Uint8Array(handshakeBytes);

const loginBytes = [];
loginBytes.push(0);
pushVarIntLocal(loginBytes, 0x00);
pushStringLocal(loginBytes, "BrowserPlayer");
let fl2 = loginBytes.length - 1;
loginBytes[0] = fl2 & 0x7F;
if (fl2 >= 128) {
  loginBytes[0] |= 0x80;
  loginBytes.splice(1, 0, (fl2 >>> 7) & 0x7F);
}
const loginStart = new Uint8Array(loginBytes);

console.log('Handshake:', handshake.length, 'bytes');
console.log('Login start:', loginStart.length, 'bytes');

const devWs = new WebSocket('ws://localhost:9230/devtools/page/E3D56FAB77D80CF414B3501DAA36BA7C');

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
    
    // Wait for DataChannel
    setTimeout(() => {
        devWs.send(JSON.stringify({
            id: 4, method: 'Runtime.evaluate',
            params: { expression: 'JSON.stringify({dc: window.dataChannel?.readyState || "none"})', returnByValue: true }
        });
    }, 10000);
    
    // Send handshake at 15s
    setTimeout(() => {
        const expr = '(function() { ' +
            'if(!window.dataChannel || window.dataChannel.readyState!=="open") return "DC not ready"; ' +
            'const hs = ' + JSON.stringify(Array.from(handshake)) + '; ' +
            'const ls = ' + JSON.stringify(Array.from(loginStart)) + '; ' +
            'window.dataChannel.send(new Uint8Array(hs)); ' +
            'setTimeout(() => window.dataChannel.send(new Uint8Array(ls)), 100); ' +
            'return "sent handshake and login start"; ' +
            '})()';
        devWs.send(JSON.stringify({
            id: 5, method: 'Runtime.evaluate',
            params: { expression: expr, returnByValue: true }
        }));
    }, 15000);
});

devWs.on('message', (data) => {
    const m = JSON.parse(data.toString());
    if (m.method === 'Runtime.consoleAPICalled') {
        const t = (m.params.args||[]).map(a=>a.value||a.description).join(' ');
        if (t.includes('[TEST]') || t.includes('sent') || t.includes('DC')) console.log(t);
    }
    if (m.id===5 && m.result?.result?.value) console.log('[Result] ' + m.result.result.value);
});
setTimeout(() => devWs.close(), 20000);
