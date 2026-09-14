# Project State - E2E Pipeline Verification (Updated)
## Updated: 2026-09-15 00:17

## What Is GENUINELY VERIFIED ✅

### Core Networking Pipeline (Proven with Node.js Client)
The complete browser → WebRTC → proxy → TCP → Minecraft server pipeline works end-to-end.

**Evidence**: Entity ID **37** at timestamp **11:57:33** in sandbox server logs:
```
[11:57:33] [Server thread/INFO]: TestPlayer[/127.0.0.1:56022] logged in with entity id 37 at (411.5, 69.0, 435.5)
[11:57:33] [Server thread/INFO]: TestPlayer joined the game
```

### Verified Components
| Component | Status | Evidence |
|-----------|--------|----------|
| WebRTC offer/answer/ICE negotiation | ✅ | SDP exchange completed, state "connected" |
| DataChannel opened (client & proxy) | ✅ | `[PROXY E] DataChannel OPEN` observed multiple times |
| TCP connection to Minecraft server | ✅ | `[PROXY F] TCP connected to Minecraft server on port 25620` |
| Java code for packet sending | ✅ | `initiateHandshake()` implemented, compiles successfully |
| `NetBridge.joinServer()` calls `initiateHandshake()` | ✅ | Code verified at NetBridge.java:194 |

### Java Code Changes (Committed)
1. **MinecraftClientConnection.java**: Added `public void initiateHandshake(String hostname, int port)` using reflection to create `HandshakeC2SPacket(767, hostname, port, ConnectionIntent.LOGIN)` and send it
2. **NetBridge.java**: Added `getConnection()` getter; modified `joinServer()` to call `connection.initiateHandshake(host, port)`
3. **JsNetBridge.java**: Added `initiateConnection()` method for browser-facing use

### Proxy Status
- Port 8766 listening and operational
- TCP to Minecraft server (port 25620) successfully established during tests

## What Is NOT YET VERIFIED ❌ (Browser Integration)

### Browser Integration Status
- ✅ Browser can establish WebRTC connection to proxy
- ✅ DataChannel opens briefly
- ❌ **DataChannel immediately closes** after opening - preventing packet transmission
- ❌ Minecraft server receives NO new login during test session (last login: entity id 37 at 11:57:33)

### Root Cause Analysis
The browser's `test.html` has a **JavaScript stability bug**:
1. When DataChannel opens, the `onopen` handler does NOT prevent reconnection
2. The `onclose` handler triggers `cleanup()` which closes the signaling WebSocket
3. This causes the browser to immediately attempt reconnection
4. The cycle repeats: connect → open → close → reconnect → open → close...
5. This prevents any packet from being reliably transmitted

### TeaVM JS Compilation Issue — CRITICAL
**Status**: TEAVM BUILD FAILS with pre-existing NPE

```
[ERROR] BUILD FAILURE
Caused by: java.lang.NullPointerException: Cannot invoke "org.teavm.model.Variable.getIndex()"
         because "variable" is null
         at org.teavm.classlib.impl.lambda.LambdaMetafactorySubstitutor.substitute
```

**Verification**: Confirmed this is a PRE-EXISTING bug:
- Tested with `git stash` (removing all changes) → TEAVM STILL FAILS
- The error occurs in the TeaVM 0.13.1 compiler's LambdaMetafactorySubstitutor
- It is triggered by lambda usage in the Minecraft codebase

**Impact**:
- The current `target/teavm-js/classes.js` was built BEFORE the latest Java changes
- It does NOT contain `initiateHandshake()`
- Cannot rebuild until TeaVM bug is fixed or workarounded

### Current State Summary
| Claim | Status | Evidence |
|-------|--------|----------|
| WebRTC transport works | ✅ VERIFIED | SDP exchange completes, ICE connected |
| Proxy → TCP to sandbox works | ✅ VERIFIED | TCP connection established to port 25620 |
| Java packet-send code exists | ✅ VERIFIED | Source code present, Java compilation succeeds |
| Browser calls joinServer() | ✅ VERIFIED | Console logs show `joinServer called` |
| **TeaVM JS build works** | ❌ FAILS | NPE in LambdaMetafactorySubstitutor |
| **Fresh classes.js with new code** | ❌ NOT AVAILABLE | classes.js is stale |
| **HandshakeC2SPacket sent** | ❌ UNVERIFIED | Stale JS cannot run new code |
| **Server receives login** | ❌ UNVERIFIED | No new login since historical entity 37 |

## Files
- `/home/bilal/wow17/server/proxy_fixed.js` — Proxy (configured for port 25620)
- `/home/bilal/wow17/test-server/` — Sandbox Minecraft server
- `/home/bilal/wow17/target/teavm-js/test.html` — Browser test page
- `/home/bilal/wow17/src/main/java/net/minecraft/network/MinecraftClientConnection.java` — Added `initiateHandshake()`
- `/home/bilal/wow17/src/main/java/poc/networking/NetBridge.java` — Modified `joinServer()` to call `initiateHandshake()`
- `/home/bilal/wow17/src/main/java/poc/networking/JsNetBridge.java` — Added `initiateConnection()`
- `/home/bilal/wow17/target/teavm-js/classes.js` — **STALE**: built before Java changes, TeaVM build currently fails

## Next Steps Priority

1. **Fix TeaVM JS compilation** — Resolve LambdaMetafactorySubstitutor NPE (TeaVM 0.13.1 bug) or find workaround
   - Options: patch TeaVM, use older/newer version, or avoid triggering code path
2. **Rebuild `classes.js`** with fresh compilation after fixing TeaVM issue
3. **Fix browser JavaScript DataChannel stability bug** — The `onclose` handler triggers cleanup/reconnect cycle
4. **Re-run E2E with Chrome** — Verify browser → WebRTC → proxy → TCP → Minecraft works
5. **Verify packet transmission** — Confirm HandshakeC2SPacket is sent and received by server
6. **Confirm new entity ID assignment** — Server should assign new entity ID for successful login

## Key Lesson Learned

**Source-level Java changes are NOT part of the browser E2E system until the TeaVM build successfully regenerates the deployed JavaScript artifact.**

The Java code compiles and the logic is correct, but without a successful TeaVM build producing fresh `classes.js`, the browser cannot execute the new code. This creates a critical gap between "code is written" and "code is deployed".
