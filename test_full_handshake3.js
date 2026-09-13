const WebSocket = require('ws');

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
    
    // Wait for DataChannel
    setTimeout(() => {
        devWs.send(JSON.stringify({
            id: 4, method: 'Runtime.evaluate',
            params: { expression: 'JSON.stringify({dc: window.dataChannel?.readyState || "none"})', returnByValue: true }
        });
    }, 10000);
    
    // Try sending handshake at 15s
    setTimeout(() => {
        const expr = '(function() { ' +
            'if(!window.dataChannel || window.dataChannel.readyState!=="open") return "DC not ready"; ' +
            'function pushVarInt(bytes, val) { while(true){if((val&~0x7F)===0){bytes.push(val);return;}bytes.push((val&0x7F)|0x80);val>>>=7;} } ' +
            'function pushString(bytes, s) { const b=Buffer.from(s,"utf8"); pushVarInt(bytes,b.length); for(let i=0;i<b.length;i++) bytes.push(b[i]); } ' +
            'var bytes = []; ' +
            'bytes.push(0); ' +  // frame length placeholder
            'pushVarInt(bytes, 0x00); ' +  // packet ID
            'pushVarInt(bytes, 767); ' +  // protocol version
            'pushString(bytes, "localhost"); ' +  // host
            'bytes.push(0x64, 0x14); ' +  // port 25620
            'pushVarInt(bytes, 1); ' +  // next state: login
            'var frameLen = bytes.length - 1; ' +
            'bytes[0] = frameLen & 0x7F; ' +
            'if (frameLen >= 128) { bytes[0] |= 0x80; bytes.splice(1, 0, (frameLen >>> 7) & 0x7F); } ' +
            'var handshake = new Uint8Array(bytes); ' +
            '// Login start packet ' +
            'var bytes2 = []; bytes2.push(0); ' +
            'pushVarInt(bytes2, 0x00); ' +
            'pushString(bytes2, "BrowserPlayer"); ' +
            'var fl2 = bytes2.length - 1; ' +
            'bytes2[0] = fl2 & 0x7F; if (fl2 >= 128) { bytes2[0] |= 0x80; bytes2.splice(1, 0, (fl2 >>> 7) & 0x7F); } ' +
            'var loginStart = new Uint8Array(bytes2); ' +
            'window.dataChannel.send(handshake); ' +
            'setTimeout(() => window.dataChannel.send(loginStart), 100); ' +
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
