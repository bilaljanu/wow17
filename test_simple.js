const WebSocket = require('ws');

const PAGE_WS = 'ws://localhost:9222/devtools/page/0CD8376EF6D80DB90057C714DB7A2475';
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
    }, 500);
});

ws.on('message', function(data) {
    var msg = JSON.parse(data.toString());

    if (msg.id && msg.result) {
        if (msg.result.result && msg.result.result.value !== undefined) {
            console.log('[Result] ' + msg.result.result.value);
        }
        if (msg.result && msg.result.exceptionDetails) {
            console.log('[Error] ' + msg.result.exceptionDetails.text);
        }
    } else if (msg.method === 'Runtime.consoleAPICalled') {
        var args = (msg.params.args || []).map(function(a) { return a.value !== undefined ? a.value : a.description; }).join(' ');
        consoleMessages.push({ type: msg.params.type, text: args });
    }
});

ws.on('close', function() {
    console.log('\n=== Final Results ===');
    var runtimeLogs = consoleMessages.filter(function(m) {
        return m.text.includes('RUNTIME') || m.text.includes('[TEST') || m.text.includes('[PROXY') || m.text.includes('[PROXY ERROR');
    });

    runtimeLogs.forEach(function(msg, i) {
        console.log((i+1) + '. [' + msg.type.toUpperCase() + '] ' + msg.text);
    });

    var hasC = runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME C]'); });
    var hasF = runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME F]'); });
    var hasG = runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME G]'); });

    console.log('\n=== Verification ===');
    console.log('[RUNTIME C] present:', hasC ? 'YES' : 'NO');
    console.log('[RUNTIME F] present:', runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME F]'); }) ? 'YES' : 'NO');
    console.log('[RUNTIME G] present:', runtimeLogs.some(function(m) { return m.text.includes('[RUNTIME G]'); }) ? 'YES' : 'NO');

    process.exit(0);
});

ws.on('error', function(err) {
    console.error('[WS Error] ' + err.message);
});