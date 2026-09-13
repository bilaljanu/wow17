# Project Brief: Minecraft Java 1.21.1 → Browser via TeaVM (Fresh Start)

## What this actually is
An attempt to compile the real Minecraft Java Edition 1.21.1 client (via TeaVM,
targeting JS) to run in a browser tab, no external helper apps. This is a
research/hobby project, not a proven-feasible port. Treat every phase below as
"try this and report what actually happens," not "execute this and it will work."

## Ground truth from prior attempts (read before doing anything)
A previous attempt (project dir `wow17`) got the build pipeline itself working:
TeaVM compiled, ran whole-program analysis for ~5.5 minutes, and produced real
diagnostics instead of OOM-crashing. That's the good news — the compile
pipeline is achievable. The diagnostics revealed two categories of failure that
are NOT the same difficulty as each other, and conflating them wastes time:

1. **Cheap, mechanical gaps** — missing methods on stub classes, missing
   TeaVM classlib support. Normal burn-down work: add the method, rebuild, repeat.
2. **Structural, non-mechanical gaps** — GL14/OpenGL calls baked directly
   into GlStateManager (needs a real WebGL2 backend, not a stub), and Netty's
   real-OS-thread execution model (needs replacing the transport or bypassing
   Netty, not stubbing Thread to a no-op).

Do not let category 2 problems get treated like category 1 problems.

## Toolchain
- TeaVM 0.13.0, target JAVASCRIPT (WASM-GC backend unstable, don't use it)
- MC 1.21.1, Yarn 1.21.1+build.3 mappings (intermediary -> named)
- JDK 21 required — JDK 26 breaks TeaVM's ASM class reader
- ASM 9.6 for bytecode relocation/patching
- Storage: OPFS via a dedicated Worker
- Networking: WebRTC DataChannels (no proxy) — only works once Netty is
  replaced or bypassed
- Renderer: raw WebGL2 via TeaVM JSO bindings

## OS note
This is Linux, not macOS. Install JDK 21 via distro package manager
(apt install openjdk-21-jdk on Debian/Ubuntu). Set JAVA_HOME by resolving
the real path (e.g. /usr/lib/jvm/java-21-openjdk-amd64), verify with
java -version and mvn -version before building.

## Non-goals for the first several sessions
- Fabric mod loader support: out of scope until vanilla renders a frame.
- "Extremely optimized": premature. Correctness first, optimization later.

## Phase order
1. Rebuild the compile pipeline from scratch, confirm no OOM.
2. Burn down stub/classlib gaps until only GL/threading errors remain.
3. Decide rendering strategy (GL-interception layer vs patched GlStateManager
   calling a JSO/WebGL2 bridge) before writing WebGL2 code. Log the decision.
4. Decide networking strategy (replace Netty transport vs bypass Netty and
   implement only needed packets over WebRTC) before touching Netty. Log it.
5. Only after 3 and 4 are locked in: first-frame render, movement/input,
   world loading, multiplayer.

## Resumability
Maintain PROJECT_STATE.md at repo root. Read it first on every start or
resume, including after being stopped/killed mid-task. Update it after every
meaningful step, not just at session end. If it disagrees with actual repo/
build state, trust the build state and correct the file.

Token budget is large (2.1B tokens) — do not truncate logs or skip
verification to save tokens.

## Sub-agents
Can spin up as many as useful, not limited to build-pipeline,
rendering-bridge, networking-bridge, verification (see agent/subagents/).
All agents read/write the same shared error-list file as source of truth.
No agent should fix a GL/threading error by adding a no-op stub — that's the
signal to stop and flag it for the right specialist role instead. Rebuild
and re-verify after every agent's change before another agent builds on it.

## Progress dashboard
dashboard/index.html reads dashboard/dashboard.json to show phase, error
counts by category, last build result, active subagents, and the phase 3/4
decisions once made. Regenerate dashboard.json after every state update.
Serve with: cd dashboard && python3 -m http.server 8080 --bind 0.0.0.0

## Phase 6 — Chromebook / low-end hardware optimization (after phase 5)
Only start this phase once phase 5 is done: vanilla client compiles, renders
a frame, accepts input/movement, loads a world, and multiplayer works over
WebRTC. Do not chase performance targets before there's a working baseline
to measure against — "is this fast enough for a Celeron with 4GB RAM" is
unanswerable when nothing runs yet.

Original target hardware: low-end Chromebooks, Celeron-class CPU, 4GB RAM.
Once there's a working baseline:
- Profile first. Identify actual bottlenecks (JS heap size, GC pauses,
  chunk mesh rebuild cost, texture memory) before guessing at fixes.
- Strip unused MC systems not needed for the target experience (e.g.
  advancements, unused entity types, sound events) — but only once removing
  them doesn't break something that phase 1-5 already got working.
- Consider Fabric mod loader support here too, if still wanted — same rule
  applies: don't add mod-loading complexity to a client that isn't already
  stable, since it multiplies the debugging surface.
- Update PROJECT_STATE.md and dashboard.json with before/after perf numbers
  once measurement starts — a stub-count dashboard doesn't capture perf
  work, so this phase may need its own metrics section.

## Evidence rule (non-negotiable, applies to every agent, every claim)
This project has a documented, repeated failure pattern: agents declaring
work "complete," "verified," or "operational" using confident formatting
(checkmarks, tables, boxes) with no actual evidence attached — and repeating
this even after being explicitly told to stop. This rule exists specifically
to prevent that pattern from recurring, and it is not optional or subject to
being "mostly" followed.

- **A claim of "working," "complete," "verified," or "operational" is invalid
  unless the same message includes the raw, literal, pasteable output that
  proves it** — real command output, a real log line, a real grep result, a
  real screenshot description with what was actually seen. Not a summary of
  what the output showed. The actual output.
- If you cannot produce that raw output right now, the correct word is
  **"unverified,"** not "complete," not "should work," not "implemented and
  tested." Say what is proven and what is assumed, separately, every time.
- Formatting (checkmarks, tables, boxes, "MOST SIGNIFICANT ACHIEVEMENT") is
  not evidence and does not substitute for it. Confident presentation of an
  unverified claim is a worse failure than plainly saying "I don't know yet."
- Before claiming any phase or workstream is done, state in plain language
  exactly what test would prove it, then run that specific test, then show
  the result — in that order. Do not declare success and retroactively
  describe what "must have" happened.
- If asked to verify something and the honest answer is "I can't fully
  verify this without X" (a real server, a real browser, a real second
  peer) — say that plainly. It is a correct, useful answer, not a failure.
- This rule applies retroactively too: if a past claim in PROJECT_STATE.md
  turns out to lack evidence when checked, correct it immediately and say so
  plainly, rather than defending or rephrasing the original claim.
- One unresolved claim at a time: do not fan out into new features or new
  workstreams while a previous "complete" claim is still unverified. Settle
  it first — pass or fail — before starting anything new.

## PROJECT_STATE.md must separate "Verified" from "Claimed/Unverified"
Structure every status section as two explicit lists, not one blended one:
- **Verified** — only things with evidence already shown (grep counts with
  line numbers, real log excerpts, real test output). Link or quote the
  actual evidence inline, don't just assert the conclusion.
- **Unverified / Assumed** — things believed true but not yet proven, stated
  plainly as such. It is normal and expected for this list to be non-empty
  most of the time. A shrinking "Unverified" list over time is real progress;
  a "Verified" list that grows without evidence attached is not.
Never collapse these into one "Status: COMPLETE" line. If a future session
(human or agent) reads only the top of the file, it should still be
impossible to mistake "unverified" for "done."
