package poc.rendering;

/**
 * Minimal render loop for the browser Minecraft client.
 * Provides per-frame clearing and timing.
 */
public final class RenderLoop {

    private static boolean running = false;
    private static long lastFrameTime = 0;

    /**
     * Start the render loop.
     */
    public static void start() {
        if (running) return;
        running = true;
        lastFrameTime = System.currentTimeMillis();
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
     * Called each frame to clear the screen and track timing.
     * Should be called from the browser's requestAnimationFrame callback.
     *
     * @param timestamp current time in milliseconds
     */
    public static void onFrame(long timestamp) {
        if (!running) return;

        long delta = timestamp - lastFrameTime;
        lastFrameTime = timestamp;

        // Clear screen with dark blue-gray each frame
        GlStateManager.clearColor(0.1f, 0.15f, 0.2f, 1.0f);
        GlStateManager.clear(0x4000 | 0x100); // GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT

        // TODO: Add chunk rendering here once mesh generation exists

        // Schedule next frame via JS interop
        scheduleNextFrame();
    }

    /**
     * Schedule next frame via browser requestAnimationFrame.
     */
    public static void scheduleNextFrame() {
        if (!running) return;
        // This will be implemented via TeaVM JS interop
    }

    /**
     * Get current time in milliseconds.
     */
    public static long getTime() {
        return System.currentTimeMillis();
    }

    /**
     * Check if the render loop is active.
     */
    public static boolean isRunning() {
        return running;
    }

    private RenderLoop() {
    }
}