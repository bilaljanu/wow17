#!/usr/bin/env node

const WebSocket = require('ws');
const net = require('net');

// Test the full flow: WebSocket -> Proxy -> Minecraft Server
console.log('Testing Minecraft server connection flow...');

// 1. First check if Minecraft server is accepting connections
const testMCConnection = () => {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(2000);

    socket.on('connect', () => {
      console.log('✓ Minecraft server accepting connections on port 25566');
      socket.end();
      resolve(true);
    });

    socket.on('timeout', () => {
      console.log('✗ Minecraft server connection timeout');
      socket.destroy();
      resolve(false);
    });

    socket.on('error', (err) => {
      console.log('✗ Minecraft server connection error:', err.message);
      socket.destroy();
      resolve(false);
    });

    socket.connect(25566, 'localhost');
  });
};

// 2. Test signaling server
const testSignalingServer = () => {
  return new Promise((resolve) => {
    const ws = new WebSocket('ws://localhost:8765');

    ws.on('open', () => {
      console.log('✓ Signaling server accepting connections on port 8765');
      ws.close();
      resolve(true);
    });

    ws.on('error', () => {
      console.log('✗ Signaling server not available on port 8765');
      resolve(false);
    });
  });
};

// 3. Test proxy server
const testProxyServer = () => {
  return new Promise((resolve) => {
    const ws = new WebSocket('ws://localhost:8766');

    ws.on('open', () => {
      console.log('✓ Proxy server accepting connections on port 8766');
      ws.close();
      resolve(true);
    });

    ws.on('error', () => {
      console.log('✗ Proxy server not available on port 8766');
      resolve(false);
    });
  });
};

// 4. Test the full joinServer flow
const testJoinServerFlow = () => {
  return new Promise((resolve) => {
    const ws = new WebSocket('ws://localhost:8766');
    let connected = false;

    ws.on('open', () => {
      console.log('Connected to proxy server, testing joinServer flow...');

      // Send join message
      ws.send(JSON.stringify({
        type: 'join',
        host: 'localhost',
        port: 25566
      }));

      // Wait for response
      ws.on('message', (data) => {
        const msg = JSON.parse(data);
        if (msg.type === 'offer') {
          console.log('✓ Proxy server created offer, WebRTC handshake initiated');
          connected = true;

          // Send back answer (simplified - in real scenario browser would handle this)
          ws.send(JSON.stringify({
            type: 'answer',
            sdp: msg.sdp
          }));
        }
      });

      // Set timeout
      setTimeout(() => {
        ws.close();
        if (connected) {
          console.log('✓ JoinServer flow completed successfully');
          resolve(true);
        } else {
          console.log('✗ JoinServer flow timed out');
          resolve(false);
        }
      }, 5000);
    });

    ws.on('error', () => {
      console.log('✗ Failed to connect to proxy server');
      ws.close();
      resolve(false);
    });
  });
};

// Run all tests
(async () => {
  console.log('='.repeat(60));
  console.log('Minecraft Server Integration Test');
  console.log('='.repeat(60));

  const results = {
    mcServer: await testMCConnection(),
    signaling: await testSignalingServer(),
    proxy: await testProxyServer(),
    joinFlow: await testJoinServerFlow()
  };

  console.log('\n' + '='.repeat(60));
  console.log('TEST RESULTS:');
  console.log('='.repeat(60));

  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${test.padEnd(15)}: ${passed ? '✓ PASS' : '✗ FAIL'}`);
  });

  const allPassed = Object.values(results).every(Boolean);
  console.log('\n' + (allPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'));
  process.exit(allPassed ? 0 : 1);
})();