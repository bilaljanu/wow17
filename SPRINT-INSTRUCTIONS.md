# PLAYABLE MINECRAFT 1.21.1 — Browser Sprint Instructions

## Single Source of Truth

This document is the authoritative sprint guide for the current development cycle. It supersedes all other planning documents and changelogs. Read it at the start of every session before beginning work.

---

## 1. PRIMARY OBJECTIVE

**Get a REAL playable Minecraft 1.21.1 browser client.**

- Browser → login → world → rendering → keyboard/mouse → movement → gameplay
- The goal is a *playable* client, not a demo or proof-of-concept
- Target: a user can open a browser tab, connect to a sandbox, log in, spawn into a world, and play Minecraft at ~40–50 FPS

> **Do not stop at speculative explanations.** Spawn subagents when useful. Actually execute commands. Inspect real code. Make real changes. Compile. Test. Iterate. Do not claim success without raw evidence.

---

## 2. MULTI-AGENT WORKFLOW

The development pipeline spans these domains. Each has a dedicated subagent or agent role. Phases are sequential — do not start a phase until its prerequisite is verified.

| Phase | Subagent / Focus | Key Deliverables |
|-------|-----------------|-----------------|
| **TeaVM build** | build-pipeline agent | Fresh `target/teavm-js/classes.js`; build succeeds (`mvn process-classes teavm:compile`); no OOM |
| **WebRTC/DataChannel** | networking-bridge agent | DataChannel stays open; signaling works; `onopen` / `onclose` handlers are stable; no reconnection loops |
| **Minecraft protocol** | networking-bridge agent | Handshake packets; login packets; entity telemetry; joinServer API wired |
| **Rendering / gameplay** | rendering-bridge agent | WebGL2 via TeaVM JSO bindings; first frame; chunk rendering; player movement; input |
| **Build / integration testing** | verification agent | E2E test harness; repeatable performance test; `node tmp/e2e-test.js` passes; evidence attached |
| **Performance** | performance engineer agent (Agent F) | Profiling data; hotspot identification; FPS before/after; memory/CPU measurements |
| **Purpur plugin** | dedicated agent | Installable JAR; integrates with browser/proxy architecture; does not create a fake server/player/login |
| **Security** | dedicated agent | Security review of all changes; no secrets; safe by design |
| **Purpur compatibility / API research** | research agent | Investigate Fabric/Forge mods (Sodium, Lithium, ImmediatelyFast, FerriteCore, etc.) and port useful techniques to TeaVM/browser architecture |
| **Real-server E2E testing** | lead engineer (you) | Final end-to-end test against real Crafty server (port 25565) with explicit human authorization |

**Phase ordering is strict.** Do not fan out into new features or workstreams while a previous phase's "complete" claim is still unverified. Settle it first — pass or fail — before starting anything new.

---

## 3. PERFORMANCE TARGET

| Metric | Target |
|--------|--------|
| **RAM** | 2 GB |
| **CPU** | 4 cores |
| **FPS** | 40–50 FPS stable during normal gameplay |
| **1% low FPS** | ≥ 40 FPS |
| **Frame pacing** | Stable; minimal major stutters |
| **Memory usage** | Appropriate for 2 GB RAM system (no unbounded chunk caches, no leaks) |
| **CPU usage** | Sustainable on 4 cores |

### Measurement Method

Run the same scenario every time:

1. Launch client
2. Connect to sandbox
3. Spawn player
4. Wait for initial chunk loading
5. Walk forward for 60 seconds
6. Turn camera periodically
7. Continue moving through terrain
8. Record performance

Record: average FPS, 1% low FPS, minimum FPS, frame time, CPU usage, memory usage.

> **Do not rely exclusively on the browser's instantaneous FPS display.** Measure during actual repeatable gameplay scenarios, not an empty world or looking at the sky.

### Optimization Priority Order

1. **Render loop** — minimize per-frame allocations, object creation, temporary arrays, repeated matrix allocations, repeated string creation, unnecessary Java↔JS boundary crossings, unnecessary WebGL state changes, duplicate draw calls
2. **JavaScript ↔ TeaVM boundary** — minimize Java→JS calls per frame, JS→Java calls per frame, array conversions, byte-array copies, object conversions, serialization/deserialization; prefer one batched operation over hundreds/thousands of tiny bridge calls
3. **Chunk / world rendering** — prioritize frustum culling, chunk visibility, distance-based chunk loading, efficient chunk mesh generation, mesh reuse, buffer reuse, avoiding rebuilding unchanged chunks
4. **Chunk loading** — do not allow chunk generation/loading to block rendering; spread expensive work across ticks/frames
5. **Memory** — bounded caches; release resources no longer needed; avoid unbounded chunk caches, duplicate chunk data, duplicate packet buffers, large temporary arrays, resource leaks, WebGL buffer leaks, texture duplication

### Optimization Techniques to Investigate (TeaVM / browser compatible)

- Sodium-style rendering optimizations
- Lithium-style game logic optimizations
- ImmediatelyFast-style rendering/batching optimizations
- FerriteCore-style memory reductions
- Entity-culling techniques
- ModernFix-style initialization/memory improvements

> **Do not blindly copy or install mods.** This is a TeaVM/browser port; normal Fabric/Forge mods may not work directly. Identify the optimization, understand what it improves, determine whether it is compatible with this port, and port the useful technique/code where legally and technically appropriate. Benchmark it.

> **Do not optimize only for an empty world or looking at the sky.** The performance test must include: player spawned in world, normal terrain visible, chunks loading, player moving, camera turning, entities nearby, normal Minecraft gameplay.

---

## 4. CODE-QUALITY REQUIREMENTS

- **Clean architecture:** simple, maintainable code; small focused classes/functions; clear ownership; minimal allocations; minimal unnecessary copies; predictable render loop; efficient data structures
- **No temporary debugging code left in production** — any instrumentation must either be removed or clearly isolated after debugging
- **No unnecessary polling** — use event-driven or signaled triggers instead
- **No busy loops** — yield to the event loop or use controlled work queues
- **No unbounded queues** — use bounded queues with backpressure
- **No duplicated networking paths** — one clear path for packets
- **No duplicated render paths** — one render pipeline
- **Performance optimizations must be evidence-based** — every change must be measured; FPS before/after; memory before/after; 1% low before/after; regression check
- **Do not accept an optimization merely because average FPS increased if frame-time spikes become worse.** Stable frame pacing matters.

---

## 5. PURPUR PLUGIN

Build an actual installable companion plugin for Purpur 1.21.1.

- **Integrate with the existing browser/proxy architecture** (WebRTC → proxy → TCP → Minecraft server)
- **Do not create a fake Minecraft server/player/login** — preserve normal Java client functionality
- **Prioritize the minimum server-side compatibility** required for the browser client to join and play
- Include:
  - Security review
  - Configuration
  - Testing
  - Documentation
- **Produce an actual JAR** — not a stub, not a mock

> **Do not turn the project into a giant mod-loader port merely to obtain performance.** The objective is the performance result, not mod-loader compatibility.

---

## 6. EVIDENCE RULES (Non-negotiable)

> This project has a documented, repeated failure pattern: agents declaring work "complete," "verified," or "operational" using confident formatting (checkmarks, tables, boxes) with no actual evidence attached — and repeating this even after being explicitly told to stop. This rule exists specifically to prevent that pattern from recurring, and it is not optional or subject to being "mostly" followed.

### Requirements for every claim:

| Claim Type | Required Evidence |
|------------|-------------------|
| **"working," "complete," "verified," "operational"** | Raw, literal, pasteable output that proves it — real command output, a real log line, a real grep result, a real screenshot description with what was actually seen |
| **Source inspection** | Not proof of runtime behavior |
| **Historical login evidence** | Does not count as current E2E evidence (e.g., entity ID 37 at 11:57:33 from prior sessions) |
| **Real browser + real sandbox/Purpur tests** | Required for any "verified" or "working" claim |

### Structure every status as two explicit lists:

- **Verified** — only things with evidence already shown (grep counts with line numbers, real log excerpts, real test output). Link or quote the actual evidence inline, don't just assert the conclusion.
- **Unverified / Assumed** — things believed true but not yet proven, stated plainly as such. It is normal and expected for this list to be non-empty most of the time. A shrinking "Unverified" list over time is real progress; a "Verified" list that grows without evidence attached is not.

> **Never collapse these into one "Status: COMPLETE" line.** If a future session (human or agent) reads only the top of the file, it should still be impossible to mistake "unverified" for "done."

> **One unresolved claim at a time:** do not fan out into new features or new workstreams while a previous "complete" claim is still unverified. Settle it first — pass or fail — before starting anything new.

---

## 7. INFRASTRUCTURE SAFETY

| Component | Path / Port | Rules |
|-----------|-------------|-------|
| **Sandbox server** | `~/wow17/test-server/`, port **25620** | You may start, stop, restart, or kill anything inside `~/wow17/test-server/` at any time without asking, using normal process management (`kill $(cat test-server/server.pid)` style, tracking your own PID file). Do not reference, copy, or touch `/crafty/servers/*` in any way. |
| **Real Crafty server** | port **25565** | Never start, stop, restart, or send signals to anything there without explicit human authorization. If you need to test against the real server for a final end-to-end check, ask me to confirm it's up first — exactly like before. |
| **Off-limits ports** | 25500–25595, 8443, 8449, 8123 | Belong to the real Crafty-managed infrastructure and other host services. |
| **Kill commands** | — | Do not use `fuser -k`, `lsof -ti:PORT | xargs kill`, or similar port-based kill commands against any port outside your sandbox list (25599, 25610, 25620). |

---

## 8. GIT WORKFLOW

- **Inspect status/diff before changes:** `git status` and `git diff` are your friends
- **Use focused commits:** One logical change per commit; small and reversible
- **Keep changes reversible:** If you're unsure, commit on a branch; you can always revert
- **Review diffs after implementation:** Never assume your changes are correct — verify with `git diff`
- **Branch only when directed:** Use `EnterWorktree` or `git worktree` when explicitly instructed; otherwise work on the current branch
- **Do not commit speculative changes** — only commit when you have verified the change works

> End git commit messages with:
> `Co-Authored-By: Claude Code <noreply@anthropic.com>`

> End pull request descriptions with:
> `🤖 Generated with [Claude Code](https://claude.com/claude-code)`

---

## 9. DEVELOPMENT PRIORITY

```text
P0 — Browser build
P0 — Minecraft login
P0 — World loading
P0 — Rendering
P0 — Keyboard/mouse/player movement
P0 — 40–50 FPS target

P1 — Chunk/render optimization
P1 — memory optimization
P1 — Java↔JS optimization
P1 — entity culling
P1 — batching/draw-call reduction

P2 — additional gameplay features
P2 — UI polish
P2 — nonessential effects

P3 — code cleanup/refactoring
```

> **Do not spend hours polishing UI while the game runs at 12 FPS.** P0–P1 work must be substantially complete before P2 begins.

---

## 10. WORK STYLE

- **Actually execute commands** — don't describe what you would do; do it
- **Inspect real code** — read actual files; don't guess
- **Make real changes** — edit files; don't just plan
- **Compile** — run `mvn process-classes teavm:compile`; verify it succeeds
- **Test** — run the test harness; record results
- **Iterate** — based on results, fix and re-run
- **Do not stop at speculative explanations** — if something is unclear, investigate until you have an answer
- **Spawn subagents when useful** — delegate parallel work (build pipeline, profiling, research)
- **Prioritize reaching a playable result quickly** — the goal is a playable Minecraft browser client, not architectural purity before there's something that runs

> Token budget is large (2.1B tokens) — do not truncate logs or skip verification to save tokens.

> Maintain `PROJECT_STATE.md` at repo root. Read it first on every start or resume, including after being stopped/killed mid-task. Update it after every meaningful step, not just at session end. If it disagrees with actual repo/build state, trust the build state and correct the file.

---

## 11. SUB-AGENT DELEGATION

When spawning subagents, specify the appropriate agent type and scope:

- **build-pipeline** — TeaVM build, Maven, compilation gaps
- **networking-bridge** — WebRTC, DataChannel, Minecraft protocol, Netty bypass
- **rendering-bridge** — WebGL2, TeaVM JSO bindings, chunk rendering
- **verification** — E2E tests, performance measurement, evidence collection
- **performance** — profiling, hotspot identification, FPS measurement, optimization
- **research** — mod compatibility, optimization techniques, API research
- **security** — security review, vulnerability scanning

Each subagent reads `PROJECT_STATE.md` and `SPRINT-INSTRUCTIONS.md` on start. After any subagent finishes a unit of work, update both `PROJECT_STATE.md` and `dashboard/dashboard.json` before doing anything else.

> **Hard rules:**
> - Never fix a GL14/OpenGL or Netty-threading error by adding a no-op stub. These are category-2 structural problems — flag them for the rendering-bridge or networking-bridge subagent instead.
> - Do not let Fabric mod loader work or "optimization" work start before the vanilla client renders a single frame.
> - Full rebuilds only, no partial/assumed-compatible edits between subagents. Re-run `mvn process-classes` after every subagent's change before another subagent builds on top of it.

---

## 12. DASHBOARD

After every meaningful step, run:

```bash
/home/bilal/wow17/dashboard/feed.sh "<icon>" "<text>" "<detail>" "<type>"
```

- Icons: `>` action, `+` file, `!` error, `◆` decision, `●` build, `✓` success
- Types: action, file, build, error, decision
- Example: `./dashboard/feed.sh "✓" "Build-006 success" "330→280 errors" "build"`

---