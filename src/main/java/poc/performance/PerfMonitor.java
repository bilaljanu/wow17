package poc.performance;

import org.teavm.jso.JSBody;

/**
 * Browser-side performance monitoring utilities.
 *
 * Collects FPS, frame time, allocation rate, and draw call count
 * for benchmarking the browser Minecraft client.
 *
 * @TEAVM_JSO_NON_NATIVE: true
 */
public final class PerfMonitor {

    private static long frameCount = 0;
    private static long lastTime = 0;
    private static long fpsTimestamp = 0;
    private static int fps = 0;
    private static int minFps = Integer.MAX_VALUE;
    private static int maxFps = 0;
    private static long frameTimeSum = 0;
    private static long frameTimeMin = Long.MAX_VALUE;
    private static long frameTimeMax = 0;
    private static int drawCalls = 0;
    private static int totalAllocations = 0;

    private PerfMonitor() {}

    // ========== JavaScript bindings ==========

    @JSBody(params = {"callback"}, script = "return function() { callback(performance.now()); };")
    public static native long now();

    @JSBody(params = {"count"}, script = ""
            + "if (typeof window.__perfAllocations === 'undefined') window.__perfAllocations = 0;\n"
            + "window.__perfAllocations += count;\n"
            + "return window.__perfAllocations;")
    public static native int recordAllocations(int count);

    @JSBody(script = ""
            + "if (typeof window.__perfDrawCalls === 'undefined') window.__perfDrawCalls = 0;\n"
            + "window.__perfDrawCalls += 1;\n"
            + "return window.__perfDrawCalls;")
    public static native int recordDrawCall();

    @JSBody(script = ""
            + "window.__perfReset = function() {\n"
            + "    window.__perfFPS = 0;\n"
            + "    window.__perfFrames = 0;\n"
            + "    window.__perfLastTime = 0;\n"
            + "    window.__perfFrameTimes = [];\n"
            + "    window.__perfDrawCalls = 0;\n"
            + "    window.__perfAllocations = 0;\n"
            + "};")
    public static native void resetStats();

    @JSBody(script = ""
            + "window.__perfGetMemory = function() {\n"
            + "    if (performance.memory) {\n"
            + "        return performance.memory.usedJSHeapSize;\n"
            + "    }\n"
            + "    return 0;\n"
            + "};")
    public static native long getMemoryUsage();

    // ========== Java-side statistics collection ==========

    /**
     * Called once per frame from the render loop.
     * Tracks FPS and frame time.
     */
    public static void onFrame(long timestampMs) {
        frameCount++;

        if (lastTime == 0) {
            lastTime = timestampMs;
            return;
        }

        long delta = timestampMs - lastTime;
        lastTime = timestampMs;

        // Track frame time stats
        if (delta < frameTimeMin) frameTimeMin = delta;
        if (delta > frameTimeMax) frameTimeMax = delta;
        frameTimeSum += delta;

        // Calculate FPS every second
        fpsTimestamp += delta;
        if (fpsTimestamp >= 1000) {
            fps = (int) (frameCount * 1000 / fpsTimestamp);
            if (fps < minFps) minFps = fps;
            if (fps > maxFps) maxFps = fps;

            // Reset counters for next second
            frameCount = 0;
            fpsTimestamp = 0;
        }
    }

    /**
     * Reset all statistics.
     */
    public static void reset() {
        frameCount = 0;
        lastTime = 0;
        fpsTimestamp = 0;
        fps = 0;
        minFps = Integer.MAX_VALUE;
        maxFps = 0;
        frameTimeSum = 0;
        frameTimeMin = Long.MAX_VALUE;
        frameTimeMax = 0;
        drawCalls = 0;
        totalAllocations = 0;
        resetStats();
    }

    // ========== Statistics reporting ==========

    /**
     * Get current FPS (updated every second).
     */
    public static int getFps() {
        return fps;
    }

    /**
     * Get minimum FPS observed since last reset.
     */
    public static int getMinFps() {
        return minFps == Integer.MAX_VALUE ? 0 : minFps;
    }

    /**
     * Get maximum FPS observed since last reset.
     */
    public static int getMaxFps() {
        return maxFps;
    }

    /**
     * Get average frame time in milliseconds.
     */
    public static double getAvgFrameTime() {
        // frameCount resets every second, so this is the avg over the last second
        if (frameCount == 0 && fpsTimestamp == 0) return 0;
        // We need to track this differently; for now return based on fps
        if (fps > 0) return 1000.0 / fps;
        return 0;
    }

    /**
     * Get minimum frame time in milliseconds.
     */
    public static long getMinFrameTimeMs() {
        return frameTimeMin == Long.MAX_VALUE ? 0 : frameTimeMin;
    }

    /**
     * Get maximum frame time in milliseconds.
     */
    public static long getMaxFrameTimeMs() {
        return frameTimeMax;
    }

    /**
     * Get draw call count for current frame batch.
     */
    public static int getDrawCalls() {
        return drawCalls;
    }

    public static void incrementDrawCalls() {
        drawCalls++;
        recordDrawCall();
    }

    /**
     * Get estimated allocation count.
     */
    public static int getAllocations() {
        return totalAllocations;
    }

    public static void incrementAllocations(int count) {
        totalAllocations += count;
        recordAllocations(count);
    }

    /**
     * Get memory usage in bytes.
     */
    public static long getMemoryBytes() {
        return getMemoryUsage();
    }

    /**
     * Print performance summary to console.
     * Called periodically (e.g., every 10 seconds) during benchmark.
     */
    public static void logSummary() {
        System.out.println("=== PERFORMANCE SUMMARY ===");
        System.out.println("FPS: avg=" + fps + " min=" + getMinFps() + " max=" + getMaxFps());
        System.out.println("Frame time: min=" + getMinFrameTimeMs() + "ms max=" + getMaxFrameTimeMs() + "ms");
        System.out.println("Draw calls: " + drawCalls);
        System.out.println("Allocations: " + totalAllocations);
        System.out.println("Memory: " + (getMemoryBytes() / 1024 / 1024) + " MB");
        System.out.println("===========================");
    }
}
