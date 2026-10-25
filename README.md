# mc-browser (TeaVM Minecraft Browser Client)

A proof-of-concept TeaVM project that compiles a Minecraft 1.21.1 Java client into JavaScript/WebGL, enabling browser-based Minecraft play through a WebRTC-to-TCP bridge.

## Pipeline

```
Browser (WebGL/Java) → WebRTC DataChannel → Node.js Proxy → TCP → Minecraft Server
```

## What's here

- `src/main/java/poc/` — TeaVM target source: networking bridges, render loop, GlStateManager, PacketPool
- `stubs-src/` — Stub implementations for missing Java APIs (logging, concurrent collections, etc.)
- `patch/` — Patcher3 plugin and stub generator for modifying the Minecraft classlib
- `dashboard/` — Python-based activity dashboard and watchdog
- `browser-minecraft-support/` — Companion Bukkit/Spigot plugin for in-game browser integration
- `docs/` — Signaling server reference implementation
- `server/` — WebRTC proxy server (Node.js)
- `tests/` — Organized test suites (unit, integration, protocol, browser)
- `webport/` — Browser client (TeaVM output + HTML)

## Prerequisites

- JDK 21
- Maven 3.9+
- Node.js 20+ (for proxy/browser tests)
- Minecraft 1.21.1 server JAR (must be acquired separately)
- Official Mojang mappings for deobfuscation

## Build (TeaVM)

```bash
mvn clean package -Pteavm
```

This will:
1. Run Patcher3 to deobfuscate the Minecraft client JAR
2. Compile the TeaVM source code
3. Generate `webport/classes.js` and supporting files

## Run Proxy

```bash
node server/webrtc_proxy.js
```

The proxy listens on port 8766 for WebRTC signaling and forwards TCP to the Minecraft server on port 25620.

## Test Server

A Purpur-compatible test server configuration is expected at `test-server/server.properties` on port 25620.
The server JAR and world data are **not** included in this repository.

## Run Browser Client

```bash
# Serve the webport directory
python3 -m http.server 9091 --directory webport

# Open http://localhost:9091/index.html in a browser
```

## Run Tests

```bash
# Protocol tests
node tests/protocol/test-netbridge-packets.js
node tests/protocol/test_send_packets.js
node tests/protocol/test_join.js

# Integration tests
node tests/integration/test_e2e_complete.js
node tests/integration/test_full_pipeline.js
node tests/integration/test_pipeline_simple.js

# Browser tests (requires running proxy and browser automation)
node tests/browser/test_browser.js
node tests/browser/test_browser_join_v3.js
```

## Companion Purpur Plugin

Located in `browser-minecraft-support/`. Build with Maven:

```bash
cd browser-minecraft-support
mvn clean package
```

This produces a Spigot/Paper plugin JAR that exposes controlled server features to external browser clients via public Bukkit APIs.

## Architecture

### Java → TeaVM Compilation

The `src/main/java/poc/` source is compiled by TeaVM 0.13.1 to JavaScript. Key components:

- **ClientMain** — Browser bootstrap entry point
- **NetBridge** — Core networking: frame parsing, packet dispatch, VarInt utilities
- **JsNetBridge** — JavaScript interop layer (`@JSBody` exports)
- **MinecraftClientConnection** — Handshake initiation via reflection
- **PacketPool** — Byte buffer pooling to reduce GC pressure
- **GlStateManager / RenderLoop** — WebGL rendering bridge

### WebRTC Bridge

```
Browser (WebRTC DataChannel)
    ↓
Node.js Proxy (ws://localhost:8766) — signaling + DataChannel relay
    ↓
Minecraft Server (TCP localhost:25620)
```

The proxy handles:
- WebSocket signaling (offer/answer/ICE)
- DataChannel message relay
- Backpressure control
- TCP connection management to Minecraft server

### Minecraft Protocol

- Protocol version: 767 (1.21.1)
- Handshake → Login Start → Encryption → Compression → Play
- Packet format: `VarInt(length) + VarInt(packetId) + payload`

## Current Status (2026-10-25)

| Component | Status | Notes |
|-----------|--------|-------|
| TeaVM Compilation | ❌ Blocked | Pre-existing `LambdaMetafactorySubstitutor` NPE in TeaVM 0.13.1 |
| Deobfuscation | ⚠️ Partial | `mc-remapped.jar` exists but incomplete |
| WebRTC Proxy | ✅ Working | Port 8766, backpressure, ICE negotiation |
| Browser UI | ✅ Built | WebGL2 canvas, chunk parser, handshake trigger |
| Handshake Packet | ✅ Implemented | `NetBridge.initiateHandshake()` via reflection |
| Purpur Plugin | ✅ Building | `browser-minecraft-support` module |
| Test Coverage | ⚠️ Partial | Organized in `tests/` but need CI integration |

### Known Blockers

1. **TeaVM Lambda NPE**: `LambdaMetafactorySubstitutor` crashes on lambdas. Workaround: replace lambdas with anonymous classes or patch TeaVM.
2. **Incomplete Deobfuscation**: ~8,000/8,269 classes mapped; some remain obfuscated.
3. **Missing Class References**: Source imports reference classes not in remapped JAR (e.g., `Packet`, `Text`, `DisconnectionInfo`).

## Troubleshooting

### TeaVM Build Fails with NPE

This is a known TeaVM 0.13.1 bug. Options:
- Patch TeaVM locally
- Replace all lambdas in Minecraft source with anonymous classes
- Downgrade to TeaVM 0.12.x

### Classes Missing from Remapped JAR

Verify `build/mc-remapped.jar` contains expected classes:

```bash
unzip -l build/mc-remapped.jar | grep net/minecraft/network
```

### WebRTC Connection Drops

Check proxy logs for ICE candidate exchange failures. Ensure:
- Both peers can reach the signaling server
- No firewall blocking UDP ports for WebRTC
- Browser allows WebRTC (some privacy settings block it)

## Development

### Adding Tests

Place new tests in appropriate `tests/` subdirectory:
- `tests/unit/` — Fast, isolated logic tests
- `tests/integration/` — Full pipeline tests (require proxy + server)
- `tests/protocol/` — Packet encoding/decoding tests
- `tests/browser/` — Browser automation tests (CDP, Playwright)

### Modifying TeaVM Source

Edit files in `src/main/java/poc/`. Rebuild with:

```bash
mvn process-classes -Pteavm
```

### Modifying Purpur Plugin

Edit files in `browser-minecraft-support/src/main/java/io/browserminecraft/`.

## License

Private / personal project.
