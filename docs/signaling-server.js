const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 8765;
const wss = new WebSocketServer({ port: PORT });

let clients = [];

wss.on('connection', (ws) => {
  console.log('Signaling client connected');
  clients.push(ws);

  ws.on('message', (data) => {
    const msg = data.toString();
    console.log('Signaling RX:', msg.substring(0, 120));
    clients.forEach((c) => {
      if (c !== ws && c.readyState === 1) {
        try { c.send(msg); } catch (e) { /* ignore */ }
      }
    });
  });

  ws.on('close', () => {
    console.log('Signaling client disconnected');
    clients = clients.filter((c) => c !== ws);
  });

  ws.on('error', (err) => {
    console.error('Signaling WS error:', err.message);
  });
});

console.log(`Signaling server listening on ws://localhost:${PORT}`);
