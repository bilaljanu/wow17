const { RTCPeerConnection } = require('@roamhq/wrtc');
const WebSocket = require('ws');
const net = require('net');

const PROXY_WS_PORT = 8766;
const MINECRAFT_SERVER_HOST = '127.0.0.1';
const MINECRAFT_SERVER_PORT = 25620;

const wss = new WebSocket.Server({ port: PROXY_WS_PORT });
console.log(`[PROXY] WebRTC proxy listening on ws://localhost:${PROXY_WS_PORT}`);
console.log(`[PROXY] Connecting to Minecraft server at ${MINECRAFT_SERVER_HOST}:${MINECRAFT_SERVER_PORT}`);

wss.on('connection', (ws) => {
    console.log('[PROXY] New browser client connected via WebSocket');
    
    // Create WebRTC peer connection
    const pc = new RTCPeerConnection({ iceServers: [] });
    
    // Create data channel (browser will request one, we need to accept it)
    let dataChannel = null;
    
    pc.ondatachannel = (event) => {
        dataChannel = event.channel;
        console.log('[PROXY] DataChannel received from browser');
        
        dataChannel.onopen = () => {
            console.log('[PROXY] DataChannel opened!');
            ws.send(JSON.stringify({ type: 'dc-open' }));
        };
        
        dataChannel.onmessage = (event) => {
            // Forward browser data to Minecraft server.
            //
            // Each DataChannel message maps to exactly one TCP write. Coalescing
            // messages into a single write is NOT safe: Paper's login listener
            // ignores a handshake+login_start pair delivered in one segment, and
            // the connection is dropped with no response and no log line.
            const buf = toBuffer(event.data);
            console.log(`[PROXY] Browser -> Server: ${buf.length} bytes`);

            if (tcpSocket && !tcpSocket.destroyed && tcpSocket.writable) {
                tcpSocket.write(buf);
            } else {
                console.log('[PROXY] TCP not ready, buffering data');
                pendingData.push(buf);
            }
        };
        
        dataChannel.onclose = () => {
            console.log('[PROXY] DataChannel closed');
        };
        
        dataChannel.onerror = (err) => {
            console.log(`[PROXY] DataChannel error: ${err.message || err}`);
        };
    };
    
    // Connect to Minecraft server via TCP
    let tcpSocket = null;
    let pendingData = [];
    let outbound = [];   // server -> browser queue, drained with backpressure
    
    function connectToServer() {
        console.log('[PROXY] Connecting to Minecraft server...');
        tcpSocket = net.connect(MINECRAFT_SERVER_PORT, MINECRAFT_SERVER_HOST, () => {
            console.log('[PROXY] TCP connected to Minecraft server');
            
            // Send any buffered data
            for (const buf of pendingData) {
                tcpSocket.write(buf);
            }
            pendingData = [];
        });
        
        // Send with backpressure. Chunk traffic can hit megabytes per second and the
        // DataChannel buffers what is not yet acknowledged; pushing without
        // checking bufferedAmount overruns the buffer and the browser silently
        // loses frames.
        const HIGH_WATER = 1 << 20;   // 1 MiB in flight
        let dropped = 0;

        function pump() {
            if (!dataChannel || dataChannel.readyState !== 'open') return;
            while (outbound.length > 0) {
                if (dataChannel.bufferedAmount > HIGH_WATER) {
                    setTimeout(pump, 5);
                    return;
                }
                dataChannel.send(outbound.shift());
            }
        }

        let sentBytes = 0;
        let sentMsgs = 0;
        let maxMsg = 0;

        tcpSocket.on('data', (data) => {
            sentBytes += data.length;
            sentMsgs++;
            if (data.length > maxMsg) maxMsg = data.length;
            if (dataChannel && dataChannel.readyState === 'open') {
                outbound.push(data);
                pump();
            } else {
                dropped += data.length;
            }
        });

        setInterval(() => {
            console.log(`[PROXY] server->browser: ${sentBytes} bytes / ${sentMsgs} msgs, largest=${maxMsg}, buffered=${dataChannel ? dataChannel.bufferedAmount : 'n/a'}`);
            sentBytes = 0; sentMsgs = 0; maxMsg = 0;
        }, 5000);

        ws.on('message', () => {});
        setInterval(() => {
            if (dropped > 0) {
                console.log(`[PROXY] dropped ${dropped} bytes (datachannel not open)`);
                dropped = 0;
            }
        }, 10000);
        
        tcpSocket.on('error', (err) => {
            console.log(`[PROXY] TCP error: ${err.message}`);
        });
        
        tcpSocket.on('close', () => {
            console.log('[PROXY] TCP connection closed');
            if (dataChannel) {
                dataChannel.close();
            }
        });
    }
    
    // Start connection when ICE candidates are ready
    pc.onicecandidate = (event) => {
        if (event.candidate) {
            ws.send(JSON.stringify({ type: 'ice-candidate', candidate: event.candidate }));
        }
    };
    
    // Handle WebSocket messages
    ws.on('message', (data) => {
        try {
            const msg = JSON.parse(data.toString());
            
            if (msg.type === 'offer') {
                console.log('[PROXY] Received SDP offer');
                pc.setRemoteDescription({ type: msg.type, sdp: msg.sdp })
                    .then(() => pc.createAnswer())
                    .then(answer => pc.setLocalDescription(answer))
                    .then(() => {
                        console.log('[PROXY] Answer created');
                        ws.send(JSON.stringify(pc.localDescription));
                        // Start TCP connection after WebRTC is set up
                        connectToServer();
                    })
                    .catch(err => console.error('[PROXY] Answer error:', err));
            } else if (msg.type === 'answer') {
                console.log('[PROXY] Received answer');
                pc.setRemoteDescription({ type: msg.type, sdp: msg.sdp })
                    .then(() => console.log('[PROXY] Answer set'))
                    .catch(err => console.error('[PROXY] Error setting answer:', err));
            } else if (msg.type === 'ice-candidate') {
                pc.addIceCandidate(msg.candidate)
                    .catch(err => console.error('[PROXY] ICE candidate error:', err));
            }
        } catch (e) {
            console.log('[PROXY] Invalid message:', e.message);
        }
    });
    
    ws.on('close', () => {
        console.log('[PROXY] Browser disconnected');
        if (dataChannel) dataChannel.close();
        if (tcpSocket) tcpSocket.destroy();
    });
});

console.log('[PROXY] Ready to accept browser connections');

// DataChannel messages arrive as ArrayBuffer (we set binaryType accordingly),
// but tolerate the other shapes a browser may hand us.
function toBuffer(data) {
    if (Buffer.isBuffer(data)) return data;
    if (data instanceof ArrayBuffer) return Buffer.from(data);
    if (ArrayBuffer.isView(data)) return Buffer.from(data.buffer, data.byteOffset, data.byteLength);
    if (typeof data === 'string') return Buffer.from(data, 'binary');
    const len = data.length || 0;
    const out = Buffer.alloc(len);
    for (let i = 0; i < len; i++) out[i] = data[i];
    return out;
}
