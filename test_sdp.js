const WebSocket = require('ws');
const PAGE_WS = 'ws://localhost:9222/devtools/page/51A7DF2E6E80CCCA9260F30432E0213B';
const ws = new WebSocket(PAGE_WS);
let messageId = 0;

ws.on('open', function() {
    console.log('Connected to Chrome');
    ws.send(JSON.stringify({ id: ++messageId, method: 'Runtime.enable' }));
    
    // Check what the offer looks like
    setTimeout(function() {
        ws.send(JSON.stringify({
            id: ++messageId,
            method: 'Runtime.evaluate',
            params: {
                expression: '(function() { ' +
                    'if (window.peerConnection && window.peerConnection.localDescription) { ' +
                    '    return JSON.stringify({ ' +
                    '        type: window.peerConnection.localDescription.type, ' +
                    '        sdp_preview: window.peerConnection.localDescription.sdp.substring(0, 100) ' +
                    '    }); ' +
                    '} return "no connection"; ' +
                    '})()',
                returnByValue: true
            }
        }));
        
        // Now click connect to see what happens
        setTimeout(function() {
            ws.send(JSON.stringify({
                id: ++messageId,
                method: 'Runtime.evaluate',
                params: {
                    expression: '(function() { console.log("[TEST] Clicking Connect"); document.getElementById("connectBtn").click(); return "clicked"; })()',
                    returnByValue: true
                }
            }));
            
            setTimeout(function() {
                console.log('\nTest complete');
                ws.close();
                process.exit(0);
            }, 5000);
        }, 1000);
    }, 1000);
});

ws.on('message', function(data) {
    var msg = JSON.parse(data.toString());
    if (msg.id && msg.result && msg.result.result && msg.result.result.value !== undefined) {
        console.log('[Result ' + msg.id + '] ' + msg.result.result.value);
    }
    if (msg.id && msg.result && msg.result.exceptionDetails) {
        console.log('[Error ' + msg.id + '] ' + msg.result.exceptionDetails.text);
    }
});

ws.on('error', function(err) {
    console.error('[WS Error] ' + err.message);
});
