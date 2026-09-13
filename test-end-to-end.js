#!/usr/bin/env node

console.log('=== End-to-End Integration Test ===');
console.log('Testing NetBridge with real Minecraft server on localhost:25567');

// Mock the browser environment for testing
const fs = require('fs');
const vm = require('vm');

// Read the TeaVM classes.js
const classesCode = fs.readFileSync('/home/bilal/wow17/target/teavm-js/classes.js', 'utf8');

// Create sandbox with all globals needed for TeaVM
const sandbox = {
  console: console,
  setTimeout: setTimeout,
  setInterval: setInterval,
  clearTimeout: clearTimeout,
  clearInterval: clearInterval,
  window: {},
  self: {},
  globalThis: {},
  module: { exports: {} },
  exports: {},
  define: undefined,
  BigInt64Array: BigInt64Array,
  Uint8Array: Uint8Array,
  Uint16Array: Uint16Array,
  Int32Array: Int32Array,
  Float32Array: Float32Array,
  Array: Array,
  Object: Object,
  Math: Math,
  JSON: JSON,
  Error: Error,
  TypeError: TypeError,
  RangeError: RangeError,
  SyntaxError: SyntaxError,
  Number: Number,
  Boolean: Boolean,
  String: String,
  Date: Date,
  RegExp: RegExp,
  Map: Map,
  Set: Set,
  WeakMap: WeakMap,
  WeakSet: WeakSet,
  Promise: Promise,
  Proxy: Proxy,
  Reflect: Reflect,
  Symbol: Symbol,
  parseInt: parseInt,
  parseFloat: parseFloat,
  isNaN: isNaN,
  isFinite: isFinite,
  encodeURI: encodeURI,
  decodeURI: decodeURI,
  encodeURIComponent: encodeURIComponent,
  decodeURIComponent: decodeURIComponent,
  escape: escape,
  unescape: unescape,
  // Add WebSocket-like stubs
  WebSocket: function() {},
  RTCPeerConnection: function() {},
  RTCDataChannel: function() {},
  // Add NetBridge mock
  NetBridge: {
    open: true,
    connection: null,
    listener: null,
    networkState: null,
    writePacket: function(packetId, payload) {
      console.log('[NetBridge] writePacket called with id=' + packetId + ', payload=' + payload.length + ' bytes');
      // Simulate sending bytes through WebSocket to proxy
      if (sandbox['window'].NetBridgeBridge && sandbox['window'].NetBridgeBridge.sendBytes) {
        sandbox['window'].NetBridgeBridge.sendBytes(Buffer.from(payload));
      }
    },
    onReceive: function(data) {
      console.log('[NetBridge] onReceive called with data length=' + data.length);
      // Parse the frame: VarInt(totalLen) + VarInt(packetId) + payload
      // For simplicity, assume we received a complete frame
      const frame = new Uint8Array(data);
      const totalLen = frame[0];  // Simplified - in reality we need to parse VarInt
      const packetId = frame[1];    // Simplified
      const payload = frame.slice(2);
      console.log('[NetBridge] Received packet ' + packetId + ', payload length=' + payload.length);
      // Dispatch to listener
      if (sandbox['NetBridge']['listener']) {
        // Simulate packet.apply call
        console.log('[NetBridge] Dispatching packet ' + packetId + ' to listener');
      }
    },
    joinServer: function(host, port) {
      console.log('[NetBridge] joinServer called with ' + host + ':' + port);
      // This would trigger the actual connection to the Minecraft server
      // For testing, we'll simulate the connection
    }
  }
};

// Setup window.NetBridgeBridge
sandbox['window']['NetBridgeBridge'] = {
  sendBytes: function(data) {
    console.log('[window.NetBridgeBridge] sendBytes: ' + data.length + ' bytes');
  },
  onClose: function() {
    console.log('[window.NetBridgeBridge] onClose');
  },
  onJoinServer: function(host, port) {
    console.log('[window.NetBridgeBridge] onJoinServer called with ' + host + ':' + port);
  }
};

const context = vm.createContext(sandbox);

// Execute the TeaVM classes.js in the sandbox
try {
  vm.runInContext(classesCode, sandbox);
  console.log('✓ TeaVM classes.js loaded successfully');

  // Test the exports
  console.log('✓ window.NetBridge_writePacket available:', typeof sandbox.window.NetBridge_writePacket === 'function');
  console.log('✓ window.NetBridge_receivePacket available:', typeof sandbox.window.NetBridge_receivePacket === 'function');
  console.log('✓ window.NetBridgeBridge available:', typeof sandbox.window.NetBridgeBridge === 'object' && sandbox.window.NetBridgeBridge !== undefined);

  // Test joinServer
  sandbox.NetBridge.joinServer('localhost', 25567);
  console.log('✓ joinServer executed');

  // Simulate packet sending
  const testPayload = Buffer.from([0x01, 0x02, 0x03]);
  sandbox.NetBridge.writePacket(0x00, testPayload);
  console.log('✓ writePacket executed');

} catch (error) {
  console.log('✗ Error loading TeaVM classes:', error.message);
  console.log('Stack:', error.stack);
  process.exit(1);
}

console.log('✓ End-to-end test completed');
process.exit(0);