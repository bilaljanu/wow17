# Minecraft Browser Client — Project Documentation

## Project Architecture

This is a Minecraft Java Edition 1.21.1 browser client that connects to offline-mode servers via WebRTC.

### Core Components

1. **WebRTC Proxy** (`server/webrtc_proxy.js`)
   - WebSocket signaling server on port 8766
   - WebRTC data channel for low-latency packet transport
   - TCP bridge to Minecraft server on port 25620

2. **TeaVM Java Client** (`src/main/java/`)
   - Compiled to JavaScript via TeaVM (`webport/classes.js`)
   - Handles protocol logic, packet serialization
   - NetBridge integration for JS↔Java communication

3. **Gameplay Modules** (`webport/js/`)
   - `camera.js` — First-person camera with pointer-lock mouse look
   - `player.js` — WASD movement, jumping, gravity, AABB collision
   - `chunkRenderer.js` — WebGL2 instanced chunk rendering, Map Chunk (0x27) decoder
   - `game.js` — Main game loop, integrates all systems

4. **HTML Entry Point** (`webport/index.html`)
   - Loads gameplay modules first, then TeaVM client
   - Contains full networking stack: VarInt, frame parsing, compression, packet state machine
   - WebGL2 context injection for TeaVM GlBridge

### Data Flow

```
Browser (WebGL2 + JS Game Loop)
    ↓ WebRTC DataChannel
WebRTC Proxy (server/webrtc_proxy.js:8766)
    ↓ TCP
Minecraft Server (127.0.0.1:25620)
```

## Build and Test Commands

```bash
# Start WebRTC proxy (required for client to connect)
node server/webrtc_proxy.js

# Build TeaVM client (if Java sources changed)
cd /DATA/bilal-filer/wow17
mvn teavm:build

# Serve webport for testing
npx serve webport -p 8080
# Then open http://localhost:8080?auto=1

# Run Playwright tests (if configured)
npx playwright test
```

## Server and Port Safety Rules

- **Production server on port 25565**: NEVER stop, restart, kill, or reconfigure without explicit permission
- **Development server on port 25620**: Use isolated Purpur server for testing
- **WebRTC proxy on port 8766**: Local development only
- All server management commands require explicit user approval

## Offline-Mode Compatibility

- Client uses offline-mode login (no Mojang auth)
- Login Start packet includes dummy UUID derived from username
- Protocol version 767 (1.21.1)
- Compatible with Paper/Purpur servers in offline-mode

## Daily Commit and Push Procedure

1. Verify all tests pass
2. Commit meaningful milestones with descriptive messages
3. Push to `destination/master` (GitHub: bilaljanu/wow17)
4. Never force-push
5. Never commit secrets, credentials, server worlds, or private config
6. Report exact commit hash and push result

### Git Remotes

- `origin`: https://github.com/NotReaalBloxify/wow17.git (upstream)
- `destination`: https://github.com/bilaljanu/wow17.git (publishing target)

## Preserve Uncommitted Changes

- Do not reset git or overwrite uncommitted changes
- Local modifications to `server/`, `src/`, `webport/classes.js` are intentional
- Backup before major changes: `cp webport/index.html /tmp/wow17-recovery/`

## Completion Evidence Requirements

At end of each session, report:
- Files changed
- Features implemented
- Tests executed
- Browser screenshots (when applicable)
- Minecraft server evidence
- Build/artifact verification
- Performance measurements
- Remaining work
- Git commit hash
- Destination remote and branch
- Push success/failure

## Current Status

**Implemented:**
- ✅ WebRTC connection & TCP proxy
- ✅ Offline-mode login & protocol handling
- ✅ Packet parsing (VarInt, frames, compression)
- ✅ Full packet state machine (Handshake → Config → Play)
- ✅ Map Chunk packet (0x27) decoding infrastructure
- ✅ WebGL2 context initialization
- ✅ First-person camera with pointer lock
- ✅ WASD movement, jumping, gravity
- ✅ AABB collision detection with chunk world
- ✅ Instanced chunk rendering (WebGL2)
- ✅ Game loop integrating all systems

**In Progress / Next:**
- [ ] Full Map Chunk palette/block-state decoding (1.21.1 format)
- [ ] Server-synchronized movement (position/look packets)
- [ ] Raycasting for block breaking/placing
- [ ] Hotbar and inventory handling
- [ ] Performance optimization (frustum culling, chunk meshing)

## Testing

To test the client:
1. Start a Purpur/Paper server on port 25620 in offline-mode
2. Run `node server/webrtc_proxy.js`
3. Serve `webport/` and navigate with `?auto=1`
4. Click canvas to engage pointer lock
5. Use WASD/Space/Shift to move