package poc.performance;

import org.teavm.jso.JSBody;

/**
 * In-game FPS counter overlay.
 * Renders performance stats as text on the canvas.
 *
 * @TEAVM_JSO_NON_NATIVE: true
 */
public final class PerfOverlay {

    private PerfOverlay() {}

    @JSBody(params = {"x", "y", "text"}, script = ""
            + "var canvas = document.querySelector('canvas');\n"
            + "if (!canvas) return;\n"
            + "var ctx = canvas.getContext('2d');\n"
            + "ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';\n"
            + "ctx.fillRect(x, y, ctx.measureText(text).width + 4, 16);\n"
            + "ctx.fillStyle = '#ffffff';\n"
            + "ctx.font = '12px monospace';\n"
            + "ctx.fillText(text, x + 2, y + 12);")
    public static native void drawText(int x, int y, String text);

    @JSBody(params = {"enabled"}, script = ""
            + "window.__perfOverlayEnabled = enabled;")
    public static native void setEnabled(boolean enabled);

    @JSBody(script = ""
            + "return window.__perfOverlayEnabled === true;")
    public static native boolean isEnabled();

    /**
     * Render the FPS overlay at the given position.
     * Call this once per frame after rendering.
     */
    public static void render(int x, int y) {
        if (!isEnabled()) return;

        String text = "FPS: " + PerfMonitor.getFps()
                + " | Min: " + PerfMonitor.getMinFps()
                + " | Draw: " + PerfMonitor.getDrawCalls()
                + " | Mem: " + (PerfMonitor.getMemoryBytes() / 1024 / 1024) + "MB";
        drawText(x, y, text);
    }
}
