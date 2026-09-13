const WebSocket = require('ws');
const PAGE_WS = 'ws://localhost:9222/devtools/page/58D1A0A2E51E3DF09F1C3E38D7D4C598';
const ws = new WebSocket(PAGE_WS);
let messageId = 0;
const consoleMessages = [];

ws.on('open', function() {
    console.log('Connected to Chrome');
    ws.send(JSON.stringify({ id: ++messageId, method: 'Runtime.enable' }));
    ws.send(JSON.stringify({ id: ++messageId, method: 'Console.enable' }));
    
    setTimeout(function() {
        console.log('\n=== Testing Pipeline ===\n');
        ws.send(JSON.stringify({
            id: ++messageId,
            method: 'Runtime.evaluate',
            params: {
                expression: '(function() { console.log("[TEST] Clicking Connect"); document.getElementById("connectBtn").click(); return "connect clicked"; })()',
                returnByValue: true
            }
        }));
    }, 1000);
});

ws.on('message', function(data) {
    var msg = JSON.parse(data.toString());
    if (msg.id && msg.result) {
        if (msg.result.result && msg.result.result.value !== undefined) {
            console.log('[Result ' + msg.id + '] ' + msg.result.result.value);
        }
        if (msg.result && msg.result.exceptionDetails) {
            console.log('[Error ' + msg.id + '] ' + msg.result.exceptionDetails.text);
        }
    } else if (msg.method === 'Runtime.consoleAPICalled') {
        var args = (msg.params.args || []).map(function(a) { return a.value !== undefined ? a.value : a.description; }).join(' ');
        consoleMessages.push({ type: msg.params.type, text: args });
    }
});

ws.on('close', function() {
    console.log('\n=== Results ===');
    consoleMessages.forEach(function(msg, i) {
        console.log((i+1) + '. [' + msg.type.toUpperCase() + '] ' + msg.text);
    });
    process.exit(0);
});
