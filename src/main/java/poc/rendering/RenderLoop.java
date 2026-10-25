package poc.rendering;

import org.teavm.jso.JSBody;

/**
 * Minimal render loop for the browser Minecraft client.
 * Drives a frame loop via requestAnimationFrame.
 * <p>
 * This is the SMALLEST possible render loop — it produces a solid color screen.
 * Chunks will be added once packet handlers exist.
 */
public final class RenderLoop {

    private static boolean running = false;
    private static long lastFrameTime = 0;

    /**
     * Start the render loop. Call from ClientMain after networking setup.
     */
    public static void start() {
        if (running) return;
        running = true;
        lastFrameTime = System.currentTimeMillis();
        scheduleNextFrame();
        System.out.println("[RenderLoop] Started");
    }

    /**
     * Stop the render loop.
     */
    public static void stop() {
        running = false;
        System.out.println("[RenderLoop] Stopped");
    }

    /**
     * Initialize the JS callback binding.
     * Must be called once before starting the render loop.
     */
    @JSBody(script = ""
            + "window.__renderLoopFrame = function(timestamp) {\n"
            + "    window.poc.rendering.RenderLoop.onFrame(timestamp);\n"
            + "};"
            + "console.log('[RenderLoop] JS callback bound to window.__renderLoopFrame');")
    public static native void bindFrameCallback();

    /**
     * Schedule the next animation frame via requestAnimationFrame.
     */
    @JSBody(script = ""
            + "if (typeof window.__renderLoopFrame !== 'function') {\n"
            + "    console.error('[RenderLoop] Frame callback not bound. Call bindFrameCallback() first.');\n"
            + "    return;\n"
            + "}\n"
            + "window.requestAnimationFrame(window.__renderLoopFrame);")
    private static native void scheduleNextFrame();

    /**
     * Called by JavaScript on each animation frame.
     */
    @JSBody(params = {"timestamp"}, script = "")
    private static native void onFrame(long timestamp);

    /**
     * Called each frame by the browser's requestAnimationFrame callback.
     */
    public static void onFrameJS(long timestamp) {
        if (!running) return;

        // Clear screen with dark blue-gray
        GlStateManager.clearColor(0.1f, 0.15f, 0.2f, 1.0f);
        GlStateManager.clear(0x4000 | 0x100); // GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT

        // TODO: Add chunk rendering here once mesh generation exists

        // Schedule next frame
        scheduleNextFrame();
    }

    /**
     * Get current time in milliseconds.
     */
    @JSBody(script = "return performance.now();")
    public static native long getCurrentTime();

    /**
     * Check if the render loop is active.
     */
    public static boolean isRunning() {
        return running;
    }

    private RenderLoop() {
    }
}
