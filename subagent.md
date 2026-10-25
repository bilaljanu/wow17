# MANDATORY SUBAGENT RULE

You are one of three main agents:

```text
LEAD
PERFORMANCE
PLUGIN
```

You are NOT expected to do your entire area alone.

You MUST use subagents for independent work whenever the task is large enough to benefit from parallel investigation or implementation.

## GLOBAL REQUIREMENT

For every substantial task:

```text
Main Agent
    ↓
spawn appropriate subagents
    ↓
parallel investigation / implementation
    ↓
collect actual results
    ↓
review conflicts
    ↓
integrate only verified work
```

Do not simply mention subagents in a plan.

Actually spawn them and assign them work.

Do not create subagents that all do the same thing.

Each subagent must have a clearly isolated responsibility.

---

# LEAD AGENT

Lead owns:

```text
overall integration
TeaVM
browser client
WebRTC
Minecraft protocol
E2E
coordination
```

Lead MUST spawn subagents for major work.

Recommended Lead subagents:

```text
LEAD-A — TeaVM/compiler
LEAD-B — WebRTC/proxy
LEAD-C — Minecraft protocol
LEAD-D — Browser/rendering integration
LEAD-E — E2E testing
LEAD-F — Build/artifact verification
```

For larger tasks, add:

```text
LEAD-G — Source/dependency research
LEAD-H — Debugging/forensics
```

Do not have all Lead subagents modify the same files.

Example:

```text
LEAD-A → TeaVM
LEAD-B → proxy
LEAD-C → protocol
LEAD-E → test harness
```

Then Lead integrates the results.

---

# PERFORMANCE AGENT

Performance MUST also spawn subagents.

Recommended:

```text
PERF-A — Render loop
PERF-B — WebGL/GPU
PERF-C — Chunk/world
PERF-D — Java↔JS/TeaVM boundary
PERF-E — Memory/GC
PERF-F — Benchmarking
```

For large rendering work, add:

```text
PERF-G — Culling
PERF-H — Mesh/buffer optimization
```

Each must have a specific scope.

Examples:

```text
PERF-A:
find the actual frame loop and first-frame blocker

PERF-B:
profile WebGL state changes/draw calls

PERF-C:
investigate chunk representation/meshing

PERF-D:
find expensive bridge crossings/copies

PERF-E:
find memory leaks and allocation hotspots

PERF-F:
build reproducible FPS/frame-time benchmark
```

Performance subagents MUST NOT invent measurements.

They must distinguish:

```text
measured
estimated
not measurable yet
```

---

# PLUGIN AGENT

Plugin MUST also spawn subagents.

Recommended:

```text
PLUGIN-A — Purpur API implementation
PLUGIN-B — Protocol compatibility
PLUGIN-C — Security audit
PLUGIN-D — Purpur integration testing
PLUGIN-E — Performance/server overhead
PLUGIN-F — Packaging/version compatibility
```

For larger plugin work, add:

```text
PLUGIN-G — Authentication/trust model
PLUGIN-H — Browser capability detection
```

Each must stay focused.

Examples:

```text
PLUGIN-A:
public Bukkit/Paper API correctness

PLUGIN-B:
identify actual browser-vs-Java protocol differences

PLUGIN-C:
attack surface and permission/authentication audit

PLUGIN-D:
real Purpur test server

PLUGIN-E:
server tick/network overhead

PLUGIN-F:
JAR/build/plugin.yml/version compatibility
```

---

# SUBAGENT QUALITY RULE

Every subagent must follow:

```text
inspect
→ reproduce
→ implement OR investigate
→ build/test
→ report evidence
```

Do NOT allow:

```text
speculation-only reports
```

Do NOT accept:

```text
"should work"
"probably fixed"
"looks correct"
```

without testing where testing is possible.

---

# SUBAGENT RESULT FORMAT

Every subagent should return:

```text
ROLE
<what it owned>

FILES INSPECTED
<actual files>

FILES CHANGED
<actual files>

COMMANDS RUN
<actual commands>

RESULT
<actual result>

EVIDENCE
<raw useful output>

COMMIT
<hash, if committed>

REMAINING BLOCKER
<exact blocker>
```

---

# MAIN AGENT INTEGRATION

The main agent must NOT blindly merge subagent output.

For every completed subagent:

```text
read result
→ inspect changed files
→ inspect diff
→ run relevant build/test
→ integrate
```

Use:

```bash
git status --short
git diff --stat
git diff
```

before integration.

If two subagents conflict:

```text
do not merge both blindly
```

Determine which implementation is correct.

---

# PARALLEL WORK

Subagents should work in parallel whenever their work is independent.

For example:

```text
Lead
├── TeaVM agent
├── WebRTC agent
├── Protocol agent
└── E2E agent

Performance
├── Render agent
├── WebGL agent
├── Chunk agent
└── Memory agent

Plugin
├── API agent
├── Security agent
├── Protocol agent
└── Integration-test agent
```

The main agents should coordinate their own subagents instead of doing everything serially.

---

# IMPORTANT: DO NOT OVER-SPAWN

Do not create ten subagents to perform one tiny edit.

Spawn subagents when there is:

```text
parallelizable investigation
independent subsystem work
large research task
separate testing requirement
```

The purpose is faster real progress, not more reports.

---

# NO FAKE SUBAGENT WORK

Never say:

```text
"Agent X verified..."
```

unless Agent X actually ran the work and produced evidence.

Do not manufacture subagent results.

Do not summarize imagined outputs.

---

# CURRENT PROJECT OBJECTIVE

All three main agents are working toward the same final result:

```text
REAL Minecraft 1.21.1
browser client
+
Purpur
+
actual world
+
actual player movement
+
clean implementation
+
40–50 FPS target
+
2 GB RAM
+
4 CPU cores
```

The three main agents have different ownership, but they should communicate real blockers and evidence.

---

# PERMANENT PRIORITY

When there is a large task:

```text
1. Spawn subagents
2. Give each a narrow responsibility
3. Let them work in parallel
4. Collect their results
5. Verify results yourself
6. Integrate the good work
7. Build
8. Test
9. Continue
```

Never replace this workflow with a long speculative explanation.
