# Signaling Server

Minimal WebSocket signaling server for WebRTC SDP/ICE exchange.

## Run

```bash
npm install ws
node docs/signaling-server.js
```

Server listens on `ws://localhost:8765`.

## Protocol

Messages are JSON objects:

- `{ "type": "offer", "sdp": "<sdp>" }` — forwarded to the other peer.
- `{ "type": "answer", "sdp": "<sdp>" }` — forwarded to the other peer.
- `{ "type": "ice", "candidate": { ... } }` — forwarded to the other peer.

The server relays the first message it receives to the second client, and vice versa. It is a dumb pipe; no SDP validation or authentication is performed.

## Usage

Open two browser tabs (or two browsers). In the WebUI, select **WebSocket signaling**, enter `ws://localhost:8765`, and click **Connect**. Both sides will exchange offer/answer and ICE candidates automatically.
