const { RTCPeerConnection, RTCSessionDescription } = require('@roamhq/wrtc');
const WebSocket = require('ws');
const fs = require('fs');

const PROXY_WS = 'ws://localhost:8766';
const LOG = '/home/bilal/wow17/test-server/logs/latest.log';

const getLoginCount = () => {
    try {
        const content = fs.readFileSync(LOG, 'utf8');
        return (content.match(/logged in with entity id/g) || []).length;
    } catch (e) { return 0; }
};

async function main() {
    console.log('[E2E] Starting full WebRTC test at', new Date().toISOString());
    const startLogins = getLoginCount();
    console.log('[E2E] Current login count:', startLogins);
    
    const ws = new WebSocket(PROXY_WS);
    let pc = null;
    
    ws.on('open', () => {
        console.log('[E2E] WebSocket connected');
        
        pc = new RTCPeerConnection({ iceServers: [] });
        console.log('[E2E] PeerConnection created');
        
        // Collect ICE candidates
        pc.onicecandidate = (e) => {
            if (e.candidate) {
                console.log('[E2E] ICE candidate');
                ws.send(JSON.stringify({ type: 'ice-candidate', candidate: e.candidate }));
            }
        };
        
        // Handle data channel
        pc.ondatachannel = (event) => {
            const channel = event.channel;
            console.log('[E2E] DataChannel received from proxy');
            
            channel.onopen = () => {
                console.log('[E2E] DataChannel opened!');
                
                // Send test packet
                const packet = Buffer.from([0x00, 0x01, 0x02, 0x03]);
                console.log('[E2E] Sending test packet:', packet.length, 'bytes');
                channel.send(packet);
            };
            
            channel.onmessage = (event) => {
                console.log('[E2E] Received from proxy:', event.data.byteLength, 'bytes');
            };
            
            channel.onerror = (err) => {
                console.error('[E2E] DataChannel error:', err);
            };
        };
        
        // Create offer as client
        pc.createOffer()
            .then(offer => {
                console.log('[E2E] Created offer');
                return pc.setLocalDescription(offer);
            })
            .then(() => {
                console.log('[E2E] Set local description');
                ws.send(JSON.stringify({
                    type: 'offer',
                    sdp: pc.localDescription
                }));
                console.log('[E2E] Sent offer to proxy');
            })
            .catch(err => console.error('[E2E] Offer error:', err));
        
        // Listen for proxy responses
        ws.on('message', (data) => {
            try {
                const msg = JSON.parse(data.toString());
                console.log('[E2E] WS Received:', msg.type);
                
                if (msg.type === 'answer') {
                    console.log('[E2E] Setting remote description...');
                    pc.setRemoteDescription(new RTCSessionDescription(msg))
                        .then(() => console.log('[E2E] Remote description set OK'))
                        .catch(err => console.error('[E2E] Remote desc error:', err.message));
                } else if (msg.type === 'ice-candidate') {
                    pc.addIceCandidate(new RTCIceCandidate(msg.candidate))
                        .catch(err => console.warn('[E2E] ICE error:', err.message));
                }
            } catch (e) {
                console.log('[E2E] Raw message:', data.toString().substring(0, 100));
            }
        });
    });
    
    ws.on('error', (err) => console.error('[E2E] WS error:', err.message));
    
    // Check results after timeout
    setTimeout(() => {
        console.log('\n[E2E] Results:');
        const endLogins = getLoginCount();
        console.log('[E2E] Logins before:', startLogins);
        console.log('[E2E] Logins after:', endLogins);
        console.log('[E2E] New logins:', endLogins - startLogins);
        
        if (endLogins > startLogins) {
            console.log('[E2E] SUCCESS! New login detected');
            const recent = fs.readFileSync(LOG, 'utf8').split('\n').filter(l => 
                l.includes('logged in') && l.includes('TestPlayer')
            ).slice(-3);
            recent.forEach(l => console.log('  ' + l.trim()));
        } else {
            console.log('[E2E] No new logins - checking proxy logs...');
        }
        
        if (pc) pc.close();
        ws.close();
        process.exit(0);
    }, 15000);
}

main().catch(console.error);
