/**
 * Benchmark harness for Minecraft 1.21.1 TeaVM browser project.
 *
 * Measures performance across four renderer/world states:
 *   - no-renderer:  WebGL context absent or failed
 *   - rendering:    WebGL active, no world loaded (blank screen)
 *   - world-loaded: Chunks loaded, camera static
 *   - playable:     Active movement + camera turning + chunk streaming
 *
 * Features:
 *   - 60-second timed runs with progress reporting
 *   - FPS, 1% low FPS, frame-time percentiles (p1, p5, p99)
 *   - Draw-call counting via WebGL query interception
 *   - JS heap memory tracking (performance.memory where available)
 *   - JSON report export with timestamp and scenario metadata
 *   - Manual and automated modes
 */
(function() {
    'use strict';

    // ========== Configuration ==========
    const BENCHMARK_DURATION_MS = 60000;
    const FRAME_HISTORY_SIZE = 600; // 10 seconds at 60fps
    const REPORT_VERSION = '1.0.0';

    // ========== State ==========
    const state = {
        running: false,
        startTime: 0,
        elapsed: 0,
        frames: 0,
        frameTimes: [],       // raw per-frame times in ms
        fpsSamples: [],       // FPS computed per-second window
        drawCalls: 0,
        lastFpsCalc: 0,
        framesInSecond: 0,
        benchmarkTimer: null,
        scenario: 'standard',
        rendererStatus: 'no-renderer',   // no-renderer | rendering | world-loaded | playable
        worldLoaded: false,
        playerMoving: false,
        cameraTurning: false,
        chunksLoaded: 0,
        totalChunks: 0,
        memorySamples: []
    };

    // ========== Renderer Detection ==========
    function detectRenderer() {
        const canvas = document.getElementById('glcanvas') ||
                       document.querySelector('canvas');
        if (!canvas) return 'no-renderer';

        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (!gl) return 'no-renderer';

        // WebGL context exists — renderer is active
        return 'rendering';
    }

    // ========== Frame Time Tracking ==========
    let lastFrameTime = 0;

    function recordFrame(now) {
        if (!state.running) return;

        const frameTime = now - lastFrameTime;
        lastFrameTime = now;

        state.frames++;
        state.framesInSecond++;
        state.frameTimes.push(frameTime);
        if (state.frameTimes.length > FRAME_HISTORY_SIZE) {
            state.frameTimes.shift();
        }

        // Per-second FPS sample
        if (now - state.lastFpsCalc >= 1000) {
            state.fpsSamples.push(state.framesInSecond);
            state.framesInSecond = 0;
            state.lastFpsCalc = now;
        }

        // Memory sample every 2 seconds
        const elapsed = now - state.startTime;
        if (Math.floor(elapsed / 2000) !== Math.floor((elapsed - frameTime) / 2000)) {
            state.memorySamples.push(getMemoryMb());
        }
    }

    // ========== Memory ==========
    function getMemoryMb() {
        if (performance.memory) {
            return Math.round(performance.memory.usedJSHeapSize / 1024 / 1024 * 100) / 100;
        }
        return 0;
    }

    // ========== Statistics Helpers ==========
    function percentile(arr, p) {
        if (arr.length === 0) return 0;
        const sorted = arr.slice().sort((a, b) => a - b);
        const idx = Math.ceil((p / 100) * sorted.length) - 1;
        return sorted[Math.max(0, idx)];
    }

    function mean(arr) {
        if (arr.length === 0) return 0;
        return arr.reduce((a, b) => a + b, 0) / arr.length;
    }

    // ========== Public API ==========
    window.Benchmark = {
        // --- Renderer / World State ---

        /**
         * Set renderer presence. Call after WebGL context creation attempt.
         * @param {boolean} active - true if WebGL context succeeded
         */
        setRendererActive(active) {
            state.rendererStatus = active ? 'rendering' : 'no-renderer';
        },

        /**
         * Set world loaded state.
         * @param {boolean} loaded
         * @param {number} chunksLoaded
         * @param {number} totalChunks
         */
        setWorldState(loaded, chunksLoaded, totalChunks) {
            state.worldLoaded = loaded;
            state.chunksLoaded = chunksLoaded || 0;
            state.totalChunks = totalChunks || 0;
            if (loaded && state.rendererStatus === 'rendering') {
                state.rendererStatus = 'world-loaded';
            } else if (!loaded && state.rendererStatus === 'world-loaded') {
                state.rendererStatus = 'rendering';
            }
        },

        /**
         * Set player input state for gameplay detection.
         * @param {boolean} moving - player is pressing movement keys
         * @param {boolean} turning - camera is being rotated
         */
        setPlayerInput(moving, turning) {
            state.playerMoving = moving;
            state.cameraTurning = turning;
            if (moving && turning && state.worldLoaded && state.rendererStatus === 'world-loaded') {
                state.rendererStatus = 'playable';
            } else if (!moving && !turning && state.rendererStatus === 'playable') {
                state.rendererStatus = 'world-loaded';
            }
        },

        // --- Benchmark Control ---

        /**
         * Start a benchmark run.
         * @param {string} scenario - name of scenario (default: 'standard')
         */
        start(scenario) {
            if (state.running) {
                console.warn('[Benchmark] Already running, stopping first');
                this.stop();
            }

            state.scenario = scenario || 'standard';
            state.running = true;
            state.startTime = performance.now();
            state.lastFpsCalc = state.startTime;
            state.frames = 0;
            state.frameTimes = [];
            state.fpsSamples = [];
            state.drawCalls = 0;
            state.memorySamples = [];
            state.playerMoving = false;
            state.cameraTurning = false;
            state.worldLoaded = false;
            state.chunksLoaded = 0;
            state.totalChunks = 0;
            state.rendererStatus = detectRenderer();

            // Start progress reporter
            this._tick();

            // Auto-stop after duration
            state.benchmarkTimer = setTimeout(() => {
                this.stop();
            }, BENCHMARK_DURATION_MS);

            console.log(`[Benchmark] Started: ${state.scenario} for ${BENCHMARK_DURATION_MS}ms`);
        },

        /**
         * Stop the benchmark and return results.
         */
        stop() {
            if (!state.running) return null;

            state.running = false;
            if (state.benchmarkTimer) {
                clearTimeout(state.benchmarkTimer);
                state.benchmarkTimer = null;
            }

            const results = this._computeResults();
            console.log('[Benchmark] Complete:', JSON.stringify(results, null, 2));
            return results;
        },

        /**
         * Check if benchmark is running.
         */
        isRunning() {
            return state.running;
        },

        /**
         * Get progress 0-1.
         */
        getProgress() {
            if (!state.running) return 0;
            return Math.min(1, (performance.now() - state.startTime) / BENCHMARK_DURATION_MS);
        },

        /**
         * Get current status string.
         */
        getStatus() {
            return state.rendererStatus;
        },

        // --- Internal ---

        _tick() {
            if (!state.running) return;
            const progress = this.getProgress();
            const elapsed = Math.floor((performance.now() - state.startTime) / 1000);
            console.log(`[Benchmark] Progress: ${(progress * 100).toFixed(1)}% (${elapsed}s / 60s) Status: ${state.rendererStatus}`);
            // Schedule next tick in 5 seconds
            state.benchmarkTimer = setTimeout(() => this._tick(), 5000);
        },

        _computeResults() {
            const frameTimes = state.frameTimes;
            const totalFrames = state.frames;
            const durationMs = performance.now() - state.startTime;

            // FPS calculations
            const fpsValues = frameTimes.map(ft => Math.round(1000 / Math.max(ft, 1)));
            const avgFps = totalFrames > 0 ? Math.round((totalFrames / durationMs) * 1000) : 0;
            const minFps = fpsValues.length > 0 ? Math.min(...fpsValues) : 0;
            const maxFps = fpsValues.length > 0 ? Math.max(...fpsValues) : 0;

            // 1% low FPS: drop lowest 1% of frames, take min of remainder
            const p1Fps = this._percentileLowFps(fpsValues, 1);

            // Frame time percentiles
            const avgFrameTime = mean(frameTimes);
            const p1FrameTime = percentile(frameTimes, 1);
            const p5FrameTime = percentile(frameTimes, 5);
            const p99FrameTime = percentile(frameTimes, 99);
            const maxFrameTime = frameTimes.length > 0 ? Math.max(...frameTimes) : 0;

            // Memory
            const memMb = state.memorySamples.length > 0
                ? Math.round(mean(state.memorySamples) * 100) / 100
                : getMemoryMb();

            // Final status
            const finalStatus = this._determineFinalStatus();

            return {
                timestamp: new Date().toISOString(),
                scenario: state.scenario,
                duration_ms: Math.round(durationMs),
                fps: {
                    avg: avgFps,
                    min: minFps,
                    max: maxFps,
                    p1: p1Fps
                },
                frameTime: {
                    avg_ms: Math.round(avgFrameTime * 100) / 100,
                    p1_ms: Math.round(p1FrameTime * 100) / 100,
                    p5_ms: Math.round(p5FrameTime * 100) / 100,
                    p99_ms: Math.round(p99FrameTime * 100) / 100,
                    max_ms: Math.round(maxFrameTime * 100) / 100
                },
                drawCalls: state.drawCalls,
                memory_mb: memMb,
                status: finalStatus,
                rendererStatus: state.rendererStatus,
                worldLoaded: state.worldLoaded,
                chunksLoaded: state.chunksLoaded,
                totalChunks: state.totalChunks,
                playerMoving: state.playerMoving,
                cameraTurning: state.cameraTurning,
                fpsSamples: state.fpsSamples,
                memorySamples: state.memorySamples
            };
        },

        _percentileLowFps(fpsValues, pct) {
            if (fpsValues.length === 0) return 0;
            const sorted = fpsValues.slice().sort((a, b) => a - b);
            const dropCount = Math.floor(sorted.length * (pct / 100));
            const remaining = sorted.slice(dropCount);
            return remaining.length > 0 ? Math.min(...remaining) : sorted[0];
        },

        _determineFinalStatus() {
            if (state.rendererStatus === 'no-renderer') return 'no-renderer';
            if (state.rendererStatus === 'rendering') return 'rendering';
            if (state.rendererStatus === 'world-loaded') return 'world-loaded';
            if (state.rendererStatus === 'playable') return 'playable';
            return state.rendererStatus;
        },

        // --- Draw Call Counting ---

        /**
         * Call this after each WebGL draw call.
         */
        recordDrawCall() {
            state.drawCalls++;
        },

        /**
         * Get current draw call count.
         */
        getDrawCalls() {
            return state.drawCalls;
        },

        // --- Report Export ---

        /**
         * Generate JSON report and download it.
         * @param {string} filename - optional filename prefix
         */
        exportReport(filename) {
            const results = this._computeResults();
            const json = JSON.stringify(results, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = (filename || 'benchmark') + '-' + Date.now() + '.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            console.log('[Benchmark] Report exported:', a.download);
            return results;
        },

        /**
         * Get raw stats for dashboard display.
         */
        getStats() {
            return {
                running: state.running,
                progress: this.getProgress(),
                status: state.rendererStatus,
                frames: state.frames,
                drawCalls: state.drawCalls,
                elapsed_ms: state.running ? Math.round(performance.now() - state.startTime) : 0,
                memory_mb: getMemoryMb()
            };
        },

        // --- Automated Mode ---

        /**
         * Run automated benchmark with simulated player input.
         * This is useful for CI/automation where no real player exists.
         * @param {string} scenario
         * @param {function} inputSimulator - callback that receives (elapsedMs, progress)
         */
        runAutomated(scenario, inputSimulator) {
            this.start(scenario);

            // Simulate player input if callback provided
            if (typeof inputSimulator === 'function') {
                const tick = () => {
                    if (!state.running) return;
                    const elapsed = performance.now() - state.startTime;
                    const progress = elapsed / BENCHMARK_DURATION_MS;
                    inputSimulator(elapsed, progress);
                    state.benchmarkTimer = setTimeout(tick, 100);
                };
                state.benchmarkTimer = setTimeout(tick, 100);
            }
        }
    };

    // --- Render Loop Integration ---
    // Provide a hook to be called from your render loop
    window.__benchmarkTick = function() {
        if (!window.Benchmark) return;
        const now = performance.now();
        recordFrame(now);
    };

    // --- WebGL Draw Call Interception (optional auto-instrumentation) ---
    // If WebGL is available, monkey-patch draw calls to auto-count
    (function installDrawCallInterceptor() {
        const canvas = document.getElementById('glcanvas') || document.querySelector('canvas');
        if (!canvas) return;
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (!gl) return;

        const origDrawArrays = gl.drawArrays;
        const origDrawElements = gl.drawElements;

        gl.drawArrays = function(mode, first, count) {
            if (window.Benchmark && window.Benchmark.isRunning()) {
                window.Benchmark.recordDrawCall();
            }
            return origDrawArrays.call(this, mode, first, count);
        };

        gl.drawElements = function(mode, count, type, offset) {
            if (window.Benchmark && window.Benchmark.isRunning()) {
                window.Benchmark.recordDrawCall();
            }
            return origDrawElements.call(this, mode, count, type, offset);
        };

        console.log('[Benchmark] WebGL draw call interceptor installed');
    })();

    console.log('[Benchmark] Harness initialized (60s duration, 4 status levels)');
})();
