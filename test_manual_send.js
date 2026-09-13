const WebSocket = require('ws');
const PAGE_ID = 'E3D56FAB77D80CF414B3501DAA36BA7C';
const ws = new WebSocket('ws://localhost:9230/devtools/page/' + PAGE_ID);
ws.on('open', () => {
    ws.send(JSON.stringify({id: 1, method: 'Runtime.enable'}));
    ws.send(JSON.stringify({id: 2, method: 'Console.enable'}));
    
    // Connect to proxy
    setTimeout(() => {
        ws.send(JSON.stringify({
            id: 3, method: 'Runtime.evaluate',
            params: { expression: 'connectToProxy("localhost", 8766, "127.0.0.1", 25620)', returnByValue: true }
        }));
    }, 2000);
    
    // Send Minecraft handshake when DataChannel is ready
    setTimeout(() => {
        const expr = '(function() { ' +
            'if(!window.dataChannel || window.dataChannel.readyState!=="open") return "DC not ready"; ' +
            'function writeVarInt(val) { ' +
            '  const bytes = []; ' +
            '  while (true) { ' +
            '    if ((val & ~0x7F) === 0) { bytes.push(val); return bytes; } ' +
            '    bytes.push((val & 0x7F) | 0x80); val >>>= 7; ' +
            '  } ' +
            '} ' +
            'function writeString(str) { ' +
            '  const bytes = []; ' +
            '  for(let i=0;i<str.length;i++) bytes.push(str.charCodeAt(i)); ' +
            '  return bytes; ' +
            '} ' +
            'var bytes = []; ' +
            '// Frame length placeholder ' +
            'bytes.push(0); ' +
            '// Packet ID 0x00 (Handshake) ' +
            'function pushVarInt(val) { while(true){if((val&~0x7F)===0){bytes.push(val);return;}bytes.push((val&0x7F)|0x80);val>>>=7;}} ' +
            'pushVarInt(0); ' +  // packet ID
            'pushVarInt(767); ' +  // protocol version
            'pushVarInt(9); ' +  // string length "localhost"
            'function pushString(s) { for(let i=0;i<s.length;i++) bytes.push(s.charCodeAt(i)); } pushString("localhost"); ' +
            'bytes.push(0x64, 0x14); ' +  // port 25620
            'pushVarInt(1); ' +  // next state: login
            '// Fix frame length ' +
            'var frameLen = bytes.length - 1; ' +
            'bytes[0] = frameLen & 127; ' +
            'if (frameLen >= 128) { bytes[0] |= 128; bytes.splice(1, 0, (frameLen >>> 7) & 127); } ' +
            'var arr = new Uint8Array(bytes); ' +
            'window.dataChannel.send(arr); ' +
            'return "sent " + arr.length + " bytes"; ' +
            '})()';
        
        ws.send(JSON.stringify({
            id: 3, method: 'Runtime.evaluate',
            params: { expression: expr, returnByValue: true }
        }));
    }, 10000);
});
ws.on('message', (data) => {
    const m = JSON.parse(data.toString());
    if (m.method === 'Runtime.consoleAPICalled') {
        const t = (m.params.args||[]).map(a=>a.value||a.description).join(' ');
        if (t.includes('[TEST]') || t.includes('sent') || t.includes('DC')) console.log(t);
    }
    if (m.id===3 && m.result?.result?.value) console.log('[Result] ' + m.result.result.value);
});
setTimeout(() => ws.close(), 15000);
