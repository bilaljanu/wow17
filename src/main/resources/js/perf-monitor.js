/**
 * Browser-side performance monitoring system.
 *
 * Provides:
 * - Real-time FPS counter
 * - Frame time tracking
 * - Draw call counting
 * - Memory usage monitoring
 * - Benchmark scenario runner
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
        enabled: false
    };

    // ========== FPS Calculation ==========
    function updateFPS(now) {
        state.frames++;

        const delta = now - state.lastTime;
        if (delta >= 1000) {
            // Calculate FPS over the last second
            state.fps = Math.round((state.frames * 1000) / delta);
            state.minFps = Math.min(state.minFps, state.fps);
            state.maxFps = Math.max(state.maxFps, state.fps);

            // Reset for next window
            state.frames = 0;
            state.lastTime = now;
        }
    }

    // ========== Frame Time Tracking ==========
    function recordFrameTime(ms) {
        state.frameTimes.push(ms);
        // Keep last 60 frames for percentile calculations
        if (state.frameTimes.length > 60) {
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
            return { avg: 0, p1: 0, p5: 0, min: 0, max: 0 };
        }
        const sum = state.frameTimes.reduce((a, b) => a + b, 0);
        const avg = sum / state.frameTimes.length;
        return {
            avg: avg.toFixed(2),
            p1: getPercentile(state.frameTimes, 1).toFixed(2),
            p5: getPercentile(state.frameTimes, 5).toFixed(2),
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

    // ========== Benchmark Scenario ==========
    const benchmarks = {
        /**
         * Standard benchmark: 60 seconds of movement + camera turns.
         * Run this for consistent comparisons.
         */
        standard: {
            name: 'Standard Gameplay',
            duration: 60000, // 60 seconds
            description: 'Walk forward for 60s, turn camera periodically'
        },

        /**
         * Stress test: maximum chunk loading + entities.
         */
        stress: {
            name: 'Chunk Loading Stress',
            duration: 30000,
            description: 'Fast movement through newly generated terrain'
        }
    };

    let activeBenchmark = null;
    let benchmarkTimer = null;

    // ========== Public API ==========
    window.PerfMonitor = {
        /**
         * Start the performance monitor.
         * Call this at the beginning of the render loop.
         */
        start() {
            if (state.running) return;
            state.running = true;
            state.startTime = performance.now();
            state.lastTime = state.startTime;
            this.tick();
            console.log('[Perf] Monitor started');
        },

        /**
         * Stop the performance monitor.
         */
        stop() {
            state.running = false;
            if (benchmarkTimer) {
                clearTimeout(benchmarkTimer);
                benchmarkTimer = null;
            }
            console.log('[Perf] Monitor stopped');
        },

        /**
         * Main loop tick - call from render loop.
         */
        tick() {
            if (!state.running) return;

            const now = performance.now();
            const frameTime = now - state.lastTime;
            state.lastTime = now;

            updateFPS(now);
            recordFrameTime(frameTime);

            requestAnimationFrame(() => this.tick());
        },

        /**
         * Record a draw call.
         * Call after each drawArrays/drawElements.
         */
        recordDrawCall() {
            state.drawCalls++;
        },

        /**
         * Get current stats object.
         */
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
                elapsed: performance.now() - state.startTime
            };
        },

        /**
         * Reset all statistics.
         */
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

        /**
         * Print detailed report to console.
         */
        report() {
            const stats = this.getStats();
            const mem = stats.memory;
            console.log('=== PERFORMANCE REPORT ===');
            console.log(`FPS: avg=${stats.fps} min=${stats.minFps} max=${stats.maxFps}`);
            console.log(`Frame Time: avg=${stats.frameTime.avg}ms p1=${stats.frameTime.p1}ms p5=${stats.frameTime.p5}ms`);
            console.log(`Frame Time Range: ${stats.frameTime.min}ms - ${stats.frameTime.max}ms`);
            console.log(`Draw Calls: ${stats.drawCalls}`);
            if (mem) {
                console.log(`Memory: ${(mem.used / 1024 / 1024).toFixed(1)}MB / ${(mem.total / 1024 / 1024).toFixed(1)}MB`);
            }
            console.log(`Elapsed: ${(stats.elapsed / 1000).toFixed(1)}s`);
            console.log('==========================');
        },

        /**
         * Start a named benchmark scenario.
         * Automatically reports when complete.
         */
        runBenchmark(name) {
            const bench = benchmarks[name];
            if (!bench) {
                console.error(`[Perf] Unknown benchmark: ${name}`);
                return;
            }

            activeBenchmark = bench;
            this.reset();
            this.start();

            console.log(`[Perf] Starting benchmark: ${bench.name}`);
            console.log(`[Perf] ${bench.description}`);

            benchmarkTimer = setTimeout(() => {
                this.stop();
                this.report();
                activeBenchmark = null;
                benchmarkTimer = null;
            }, bench.duration);
        },

        /**
         * Check if a benchmark is currently running.
         */
        isBenchmarkRunning() {
            return activeBenchmark !== null;
        },

        /**
         * Get benchmark progress (0-1).
         */
        getBenchmarkProgress() {
            if (!activeBenchmark) return 0;
            const elapsed = performance.now() - state.startTime;
            return Math.min(1, elapsed / activeBenchmark.duration);
        }
    };

    // ========== Initial Setup ==========
    window.__perfOverlayEnabled = false;
    window.__perfReset = window.PerfMonitor.reset;
    window.__perfReport = window.PerfMonitor.report;

    console.log('[Perf] Performance monitor initialized');
})();
