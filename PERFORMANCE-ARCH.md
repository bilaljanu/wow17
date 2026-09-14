# Performance Architecture & Benchmarking Guide

## Current State

**Status:** Rendering not yet implemented
**Baseline FPS:** N/A (no render loop exists)
**TeaVM Build:** Currently broken (LambdaMetafactorySubstitutor NPE)

## Performance Targets

| Metric | Target | Notes |
|--------|--------|-------|
| RAM | 2 GB | Low-end Chromebook target |
| CPU | 4 cores | Sustained load |
| FPS | 40-50 stable | During normal gameplay |
| 1% low FPS | ≥ 40 | Frame pacing matters |
| Frame time | ≤ 25ms | Average, no spikes > 50ms |

## Known Performance Hotspots (Analysis)

### 1. GlBridge.convertBufferToFloatArrayView() - HIGH PRIORITY

**Location:** `src/main/java/poc/compat/jso/GlBridge.java`

**Problem:** Every `bufferData()` call creates:
- `float[]` array (8 bytes per float)
- `Float32ArrayView` wrapper
- Multiple TeaVM boxing allocations

**Impact:** At 1000 chunks × 1000 faces = 1M calls/frame → 2M allocations/frame

**Status:** Fix attempted but build is broken. Will implement once build is fixed.

### 2. JavaScript Boundary Crossings - HIGH PRIORITY

**Problem:** Each Java→JS call is a separate boundary crossing with overhead.

**Current:** Potential for thousands of calls per frame if rendering loops naively.

**Solution:** Batch operations:
```java
// BAD: One call per vertex
for (Vertex v : vertices) {
    GlBridge.bufferData(...);
}

// GOOD: One call with all vertices
GlBridge.bufferData(allVertices, GL_DYNAMIC_DRAW);
```

### 3. No State Tracking in WebGL Bridge

**Problem:** `glint.js` wraps every WebGL call without state caching.

**Solution:** Track bound buffers, VAOs, textures to avoid redundant bind calls.

## Performance Monitoring Infrastructure

### Java Side (`poc.performance`)

- `PerfMonitor.java` - Collects FPS, frame time, allocations
- `PerfOverlay.java` - In-game FPS counter

### JavaScript Side (`js/perf-monitor.js`)

- Real-time FPS tracking
- Frame time percentiles (1%, 5%)
- Draw call counting
- Memory usage monitoring
- Benchmark scenarios

## Benchmark Protocol

### Standard Test Scenario

```
1. Launch client
2. Connect to sandbox server
3. Spawn player at world origin
4. Wait for initial chunk loading (~3 chunks radius)
5. Walk forward at sprint speed for 60 seconds
6. Turn camera 360° every 10 seconds
7. Continue moving through generated terrain
8. Record metrics at 60s mark
```

### Metrics to Record

```
Average FPS:
1% Low FPS:
5% Low FPS:
Min FPS:
Max FPS:
Frame Time (avg):
Frame Time (1% low):
Frame Time (max):
Draw Calls:
Memory Usage (JS heap):
CPU Usage:
```

### Repeatable Comparison

After any optimization:
1. Run same benchmark scenario
2. Record all metrics
3. Compare to baseline
4. Document improvement or regression

## Optimization Priority List

### P0 (Critical - Must Fix First)

- [ ] Reduce Java→JS boundary crossings in render loop
- [ ] Eliminate per-frame allocations in buffer uploads
- [ ] Implement chunk mesh caching (don't rebuild every frame)

### P1 (Important)

- [ ] Implement frustum culling for chunks
- [ ] Batch similar draw calls together
- [ ] Reduce WebGL state changes
- [ ] Implement entity distance culling

### P2 (Nice to Have)

- [ ] Face culling (remove invisible faces)
- [ ] Texture atlas batching
- [ ] LOD (Level of Detail) for distant chunks
- [ ] Async chunk loading

## Sodium/Lithium Techniques to Investigate

### Sodium-Style (Rendering)

1. **Chunk Mesh Batching**
   - Combine adjacent faces into single draw calls
   - Use instancing for repeated geometry
   
2. **Frustum Culling**
   - Only render chunks within view frustum
   - Cull off-screen chunks before mesh generation

3. **Face Culling**
   - Remove faces between solid blocks
   - Reduces vertex count by ~60-80%

### Lithium-Style (Game Logic)

1. **Entity Culling**
   - Don't process entities outside render distance
   - Skip AI for distant entities

2. **Chunk Updates**
   - Only re-mesh chunks that changed
   - Batch chunk updates

### Memory Reduction (FerriteCore-style)

1. **Bounded Chunk Cache**
   - Limit cached chunks to render distance + margin
   - Evict oldest chunks when cache full

2. **Reuse Buffers**
   - Recycle Float32Array buffers
   - Avoid allocation in hot loops

## Git Workflow for Performance Work

```bash
# Before making changes
git status --short
git diff --stat

# After changes
git diff --stat
git diff src/main/java/poc/

# Commit with clear message
git add src/main/java/poc/performance/
git commit -m "perf: add performance monitoring infrastructure

- PerfMonitor.java for FPS/frame-time tracking
- PerfOverlay.java for in-game display
- Documentation for benchmark protocol

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

## When Build is Fixed - Next Steps

1. Build TeaVM target
2. Open test.html in browser
3. Run `window.PerfMonitor.runBenchmark('standard')`
4. Capture baseline metrics
5. Implement optimizations one at a time
6. Re-run benchmark after each change
7. Document before/after comparison

## References

- [SPRINT-INSTRUCTIONS.md](SPRINT-INSTRUCTIONS.md) - Full sprint requirements
- [PROJECT_STATE.md](PROJECT_STATE.md) - Current project status
- [MASTER_PROMPT.md](MASTER_PROMPT.md) - Project overview
