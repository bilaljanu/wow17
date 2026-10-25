/**
 * Browser-side performance monitoring system.
 *
 * Provides:
 * - Real-time FPS counter
 * - Frame time tracking
 * - Draw call counting
 * - Memory usage monitoring
 * - Benchmark scenario runner (60 seconds)
 * - Status detection (no-renderer | rendering | world-loaded | playable)
 *
 * Integrates with benchmark.js for extended metrics (percentiles, JSON export)
 */

(function() {
    'use strict';

    // ========== Performance State ==========
    const state = {
        frames: 0,
        lastTime: performance.now(),
        fps: 0,
        minFps: Infinity,
        maxFps: 0,
        frameTimes: [],
        drawCalls: 0,
        startTime: 0,
        running: false,
        enabled: false,
        // Benchmark state
        benchmarkRunning: false,
        benchmarkStartTime: 0,
        benchmarkDuration: 60000,
        benchmarkElapsed: 0,
        benchmarkScenario: 'standard',
        benchmarkResults: null,
        // World state
        rendererActive: false,
        worldLoaded: false,
        chunksLoaded: 0,
        totalChunks: 0,
        playerMoving: false,
        cameraTurning: false
    };

    // ========== Status Detection ==========
    /**
     * Determine benchmark status from current conditions.
     * @returns {string} no-renderer | rendering | world-loaded | playable
     */
    function getStatus() {
        if (!state.rendererActive) return 'no-renderer';
        if (!state.worldLoaded) return 'rendering';
        if (state.worldLoaded && (state.playerMoving || state.cameraTurning)) return 'playable';
        return 'world-loaded';
    }

    // ========== FPS Calculation ==========
    function updateFPS(now) {
        state.frames++;

        const delta = now - state.lastTime;
        if (delta >= 1000) {
            state.fps = Math.round((state.frames * 1000) / delta);
            state.minFps = Math.min(state.minFps, state.fps);
            state.maxFps = Math.max(state.maxFps, state.fps);
            state.frames = 0;
            state.lastTime = now;
        }
    }

    // ========== Frame Time Tracking ==========
    function recordFrameTime(ms) {
        state.frameTimes.push(ms);
        if (state.frameTimes.length > 600) {
            state.frameTimes.shift();
        }
    }

    // ========== Percentile Calculations ==========
    function getPercentile(arr, p) {
        if (arr.length === 0) return 0;
        const sorted = arr.slice().sort((a, b) => a - b);
        const index = Math.ceil((p / 100) * sorted.length) - 1;
        return sorted[Math.max(0, index)];
    }

    function getFrameTimeStats() {
        if (state.frameTimes.length === 0) {
            return { avg: 0, p1: 0, p5: 0, max: 0 };
        }
        const sum = state.frameTimes.reduce((a, b) => a + b, 0);
        const avg = sum / state.frameTimes.length;
        return {
            avg: avg.toFixed(2),
            p1: getPercentile(state.frameTimes, 1).toFixed(2),
            p5: getPercentile(state.frameTimes, 5).toFixed(2),
            p99: getPercentile(state.frameTimes, 99).toFixed(2),
            min: Math.min(...state.frameTimes).toFixed(2),
            max: Math.max(...state.frameTimes).toFixed(2)
        };
    }

    // ========== Memory Monitoring ==========
    function getMemoryUsage() {
        if (performance.memory) {
            return {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit
            };
        }
        return null;
    }

    function getMemoryMb() {
        const mem = getMemoryUsage();
        if (!mem) return 0;
        return Math.round((mem.used / 1024 / 1024) * 100) / 100;
    }

    // ========== Benchmark Scenario ==========
    const benchmarks = {
        standard: {
            name: 'Standard Gameplay',
            duration: 60000,
            description: '60s of movement + camera turns + chunk loading'
        },
        stress: {
            name: 'Chunk Loading Stress',
            duration: 30000,
            description: 'Fast movement through newly generated terrain'
        },
        idle: {
            name: 'Idle / Menu',
            duration: 30000,
            description: 'Static camera, no world loaded'
        }
    };

    let activeBenchmark = null;
    let benchmarkTimer = null;

    // ========== Benchmark Result Template ==========
    function createReportTemplate() {
        return {
            timestamp: new Date().toISOString(),
            scenario: 'standard',
            duration_ms: 60000,
            fps: { avg: 0, min: 0, max: 0, p1: 0 },
            frameTime: { avg_ms: 0, p1_ms: 0, p5_ms: 0, p99_ms: 0, max_ms: 0 },
            drawCalls: 0,
            memory_mb: 0,
            status: 'no-renderer'
        };
    }

    // ========== Public API ==========
    window.PerfMonitor = {
        start() {
            if (state.running) return;
            state.running = true;
            state.startTime = performance.now();
            state.lastTime = state.startTime;
            this.tick();
            console.log('[Perf] Monitor started');
        },

        stop() {
            state.running = false;
            if (benchmarkTimer) {
                clearTimeout(benchmarkTimer);
                benchmarkTimer = null;
            }
            console.log('[Perf] Monitor stopped');
        },

        tick() {
            if (!state.running) return;
            const now = performance.now();
            const frameTime = now - state.lastTime;
            state.lastTime = now;

            updateFPS(now);
            recordFrameTime(frameTime);

            requestAnimationFrame(() => this.tick());
        },

        recordDrawCall() {
            state.drawCalls++;
        },

        getStats() {
            const ft = getFrameTimeStats();
            const mem = getMemoryUsage();
            return {
                fps: state.fps,
                minFps: state.minFps === Infinity ? 0 : state.minFps,
                maxFps: state.maxFps,
                frameTime: ft,
                drawCalls: state.drawCalls,
                memory: mem,
                elapsed: performance.now() - state.startTime,
                status: getStatus(),
                rendererActive: state.rendererActive,
                worldLoaded: state.worldLoaded,
                playerMoving: state.playerMoving,
                cameraTurning: state.cameraTurning
            };
        },

        reset() {
            state.frames = 0;
            state.lastTime = performance.now();
            state.fps = 0;
            state.minFps = Infinity;
            state.maxFps = 0;
            state.frameTimes = [];
            state.drawCalls = 0;
            state.startTime = performance.now();
            console.log('[Perf] Stats reset');
        },

        report() {
            const stats = this.getStats();
            const mem = stats.memory;
            console.log('=== PERFORMANCE REPORT ===');
            console.log(`Status: ${stats.status}`);
            console.log(`FPS: avg=${stats.fps} min=${stats.minFps} max=${stats.maxFps}`);
            console.log(`Frame Time: avg=${stats.frameTime.avg}ms p1=${stats.frameTime.p1}ms p5=${stats.frameTime.p5}ms p99=${stats.frameTime.p99}ms`);
            console.log(`Frame Time Range: ${stats.frameTime.min}ms - ${stats.frameTime.max}ms`);
            console.log(`Draw Calls: ${stats.drawCalls}`);
            if (mem) {
                console.log(`Memory: ${(mem.used / 1024 / 1024).toFixed(1)}MB / ${(mem.total / 1024 / 1024).toFixed(1)}MB`);
            }
            console.log(`Elapsed: ${(stats.elapsed / 1000).toFixed(1)}s`);
            console.log('==========================');
        },

        runBenchmark(name) {
            const bench = benchmarks[name];
            if (!bench) {
                console.error(`[Perf] Unknown benchmark: ${name}`);
                return;
            }

            activeBenchmark = bench;
            state.benchmarkRunning = true;
            state.benchmarkStartTime = performance.now();
            state.benchmarkDuration = bench.duration;
            state.benchmarkScenario = name;
            this.reset();
            this.start();

            console.log(`[Perf] Starting benchmark: ${bench.name}`);
            console.log(`[Perf] ${bench.description}`);

            benchmarkTimer = setTimeout(() => {
                this.stop();
                state.benchmarkRunning = false;
                this.report();
                activeBenchmark = null;
                benchmarkTimer = null;
            }, bench.duration);
        },

        isBenchmarkRunning() {
            return activeBenchmark !== null;
        },

        getBenchmarkProgress() {
            if (!activeBenchmark) return 0;
            const elapsed = performance.now() - state.startTime;
            return Math.min(1, elapsed / activeBenchmark.duration);
        },

        // --- Renderer/World State Setters ---
        setRendererActive(active) {
            state.rendererActive = active;
        },

        setWorldState(loaded, chunksLoaded, totalChunks) {
            state.worldLoaded = loaded;
            state.chunksLoaded = chunksLoaded || 0;
            state.totalChunks = totalChunks || 0;
        },

        setPlayerInput(moving, turning) {
            state.playerMoving = moving;
            state.cameraTurning = turning;
        },

        // --- Report Template ---
        getReportTemplate() {
            return createReportTemplate();
        },

        // --- Status ---
        getStatus() {
            return getStatus();
        }
    };

    // ========== Initial Setup ==========
    window.__perfOverlayEnabled = false;
    window.__perfReset = window.PerfMonitor.reset;
    window.__perfReport = window.PerfMonitor.report;
    window.__benchmarkTemplate = createReportTemplate;

    console.log('[Perf] Performance monitor initialized');
})();
