# mc-browser (TeaVM Minecraft Browser Client)

A proof-of-concept TeaVM project that compiles a Minecraft 1.21.1 Java client into JavaScript/WebGL, enabling browser-based Minecraft play through a WebRTC-to-TCP bridge.

## Pipeline

```
Browser (WebGL/Java) → WebRTC DataChannel → Node.js Proxy → TCP → Minecraft Server
```

## What's here

- `src/` — TeaVM target source: networking bridges, render loop, GlStateManager, PacketPool
- `stubs-src/` — Stub implementations for missing Java APIs (logging, concurrent collections, etc.)
- `patch/` — Patcher3 plugin and stub generator for modifying the Minecraft classlib
- `dashboard/` — Python-based activity dashboard and watchdog
- `browser-minecraft-support/src/` — Bukkit/Spigot plugin sources for in-game browser integration
- `docs/` — Signaling server reference implementation

## Prerequisites

- JDK 21
- Maven 3.9+
- Node.js 20+ (for proxy/browser tests)
- `server-1.21.1.jar` and `extracted-server.jar` must be present in the project root

## Build (TeaVM)

```bash
mvn clean package -Pteavm
```

## Run Proxy

```bash
node server/proxy_fixed.js
```

## Test Server

A Purpur-compatible test server runs on port 25620 by default (`test-server/server.properties`).

## Architecture

See `SPRINT-INSTRUCTIONS.md` for the full feature roadmap and known blocking issues (notably a pre-existing TeaVM `LambdaMetafactorySubstitutor` NPE).

## License

Private / personal project.
