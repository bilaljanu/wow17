import WebSocket from 'ws';

const PAGE_WS = 'ws://localhost:9222/devtools/page/0CD8376EF6D80DB90057C714DB7A2475';
const ws = new WebSocket(PAGE_WS);
let messageId = 0;
const consoleMessages = [];

ws.on('open', () => {
    console.log('Connected to Chrome');
    ws.send(JSON.stringify({ id: ++messageId, method: 'Runtime.enable' }));
    ws.send(JSON.stringify({ id: ++messageId, method: 'Console.enable' }));

    setTimeout(() => {
        console.log('\n=== Testing Pipeline ===\n');
        ws.send(JSON.stringify({
            id: ++messageId,
            method: 'Runtime.evaluate',
            params: {
                expression: '(function() { console.log("[TEST] Clicking Connect"); document.getElementById("connectBtn").click(); return "connect clicked"; })()',
                returnByValue: true
            }
        });
    }, 500);
});

const consoleMessages = [];

ws.on('message', (data) => {
    const msg = JSON.parse(data.toString());

    if (msg.id && msg.result) {
        if (msg.result.result && msg.result.result.value !== undefined) {
            console.log('[Result] ' + msg.result.result.value);
        }
        if (msg.result && msg.result.exceptionDetails) {
            console.log('[Error] ' + msg.result.exceptionDetails.text);
        }
    } else if (msg.method === 'Runtime.consoleAPICalled') {
        const args = (msg.params.args || []).map(a => a.value !== undefined ? a.value : a.description).join(' ');
        consoleMessages.push({ type: msg.params.type, text: args });
    }
});

ws.on('error', (err) => {
    console.error('[WS Error] ' + err.message);
});

ws.on('close', () => {
    console.log('\n=== Final Results ===');
    const runtimeLogs = consoleMessages.filter(m =>
        m.text.includes('RUNTIME') || m.text.includes('[TEST') || m.text.includes('[PROXY') || m.text.includes('[PROXY ERROR')
    );

    runtimeLogs.forEach((msg, i) => {
        console.log((i+1) + '. [' + msg.type.toUpperCase() + '] ' + msg.text);
    });

    const hasC = runtimeLogs.some(m => m.text.includes('[RUNTIME C]'));
    const hasF = runtimeLogs.some(m => m.text.includes('[RUNTIME F]'));
    const hasG = runtimeLogs.some(m => m.text.includes('[RUNTIME G]'));

    console.log('\n=== Verification ===');
    console.log('[RUNTIME C] present:', hasC ? 'YES' : 'NO');
    console.log('[RUNTIME F] present:', runtimeLogs.some(m => m.text.includes('[RUNTIME F]')) ? 'YES' : 'NO');
    console.log('[RUNTIME G] present:', runtimeLogs.some(m => m.text.includes('[RUNTIME G]')) ? 'YES' : 'NO');

    process.exit(0);
});

ws.on('error', (err) => {
    console.error('[WS Error] ' + err.message);
});