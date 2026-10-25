package poc.compat.jso;

import java.nio.ByteBuffer;

/**
 * JSO bridge for WebGL2 operations.
 * This class provides a static facade that Java code can call, with
 * the actual WebGL2RenderingContext injected from JavaScript at runtime.
 *
 * @TEAVM_JSO_NON_NATIVE: true
 */
public final class GlBridge {

    private static WebGL2Context webglContext;

    /**
     * Inject the WebGL2 context before the first rendering call.
     * Must be called from JavaScript at startup.
     */
    public static void setWebGLContext(WebGL2Context context) {
        webglContext = context;
    }

    /**
     * Helper for WebGL boolean status.
     */
    private static boolean checkContext() {
        if (webglContext == null) {
            throw new IllegalStateException("WebGL context not injected. Call setWebGLContext from JS first.");
        }
        return true;
    }

    // ========== Viewport ==========
    public static void viewport(int x, int y, int width, int height) {
        checkContext();
        webglContext.viewport(x, y, width, height);
    }

    // ========== Clearing ==========
    public static void clearColor(float red, float green, float blue, float alpha) {
        checkContext();
        webglContext.clearColor(red, green, blue, alpha);
    }

    public static void clear(int mask) {
        checkContext();
        webglContext.clear(mask);
    }

    // ========== Shader / Program ==========
    public static int createShader(int type) {
        checkContext();
        return webglContext.createShader(type);
    }

    public static void shaderSource(int shader, String source) {
        checkContext();
        webglContext.shaderSource(shader, source);
    }

    public static void compileShader(int shader) {
        checkContext();
        webglContext.compileShader(shader);
    }

    public static boolean getShaderParameter(int shader, int pname) {
        checkContext();
        return webglContext.getShaderParameter(shader, pname).intValue() != 0;
    }

    public static String getShaderInfoLog(int shader) {
        checkContext();
        return webglContext.getShaderInfoLog(shader);
    }

    public static int createProgram() {
        checkContext();
        return webglContext.createProgram();
    }

    public static void attachShader(int program, int shader) {
        checkContext();
        webglContext.attachShader(program, shader);
    }

    public static void linkProgram(int program) {
        checkContext();
        webglContext.linkProgram(program);
    }

    public static boolean getProgramParameter(int program, int pname) {
        checkContext();
        return webglContext.getProgramParameter(program, pname).intValue() != 0;
    }

    public static String getProgramInfoLog(int program) {
        checkContext();
        return webglContext.getProgramInfoLog(program);
    }

    public static void useProgram(int program) {
        checkContext();
        webglContext.useProgram(program);
    }

    public static int getUniformLocation(int program, String name) {
        checkContext();
        return webglContext.getUniformLocation(program, name);
    }

    public static void uniform1i(int location, int x) {
        checkContext();
        webglContext.uniform1i(location, x);
    }

    public static void uniform2f(int location, float x, float y) {
        checkContext();
        webglContext.uniform2f(location, x, y);
    }

    public static void uniform3f(int location, float x, float y, float z) {
        checkContext();
        webglContext.uniform3f(location, x, y, z);
    }

    public static void uniform4f(int location, float x, float y, float z, float w) {
        checkContext();
        webglContext.uniform4f(location, x, y, z, w);
    }

    // ========== Buffers ==========
    public static int createBuffer() {
        checkContext();
        return webglContext.createBuffer();
    }

    public static void bindBuffer(int target, int buffer) {
        checkContext();
        webglContext.bindBuffer(target, buffer);
    }

    public static void bufferData(int target, ByteBuffer data, int usage) {
        checkContext();
        Float32ArrayView floats = convertBufferToFloatArrayView(data);
        webglContext.bufferData(target, floats, usage);
    }

    public static void bufferSubData(int target, int offset, ByteBuffer data) {
        checkContext();
        Float32ArrayView floats = convertBufferToFloatArrayView(data);
        webglContext.bufferSubData(target, offset, floats);
    }

    // ========== Vertex Arrays ==========
    public static int createVertexArray() {
        checkContext();
        return webglContext.createVertexArray();
    }

    public static void bindVertexArray(int vao) {
        checkContext();
        webglContext.bindVertexArray(vao);
    }

    public static void enableVertexAttribArray(int index) {
        checkContext();
        webglContext.enableVertexAttribArray(index);
    }

    public static void vertexAttribPointer(
            int index, int size, int type, boolean normalized,
            int stride, long offset) {
        checkContext();
        webglContext.vertexAttribPointer(index, size, type, normalized, stride, offset);
    }

    // ========== Drawing ==========
    public static void drawArrays(int mode, int first, int count) {
        checkContext();
        webglContext.drawArrays(mode, first, count);
    }

    public static void drawElements(int mode, int count, int type, long offset) {
        checkContext();
        webglContext.drawElements(mode, count, type, offset);
    }

    // ========== Enable states ==========
    public static void enable(int cap) {
        checkContext();
        webglContext.enable(cap);
    }

    public static void disable(int cap) {
        checkContext();
        webglContext.disable(cap);
    }

    // ========== Error checking ==========
    public static int getError() {
        checkContext();
        return webglContext.getError();
    }

    // ========== Texture operations (GL3.0+) ==========
    public static int createTexture() {
        checkContext();
        return webglContext.createTexture();
    }

    public static void bindTexture(int target, int texture) {
        checkContext();
        webglContext.bindTexture(target, texture);
    }

    public static void texImage2D(
            int target, int level, int internalFormat,
            int width, int height, int border,
            int format, int type, ByteBuffer pixels) {
        checkContext();
        // WebGL2 texImage2D with ArrayBufferView only for non-null, non-zero data
        if (pixels != null && pixels.capacity() > 0) {
            Float32ArrayView view = convertBufferToFloatArrayView(pixels);
            webglContext.texImage2D(target, level, internalFormat,
                    width, height, border, format, type, view);
        } else {
            webglContext.texImage2D(target, level, internalFormat,
                    width, height, border, format, type, (Float32ArrayView) null);
        }
    }

    public static void texParameterf(int target, int pname, float param) {
        checkContext();
        webglContext.texParameterf(target, pname, param);
    }

    public static void texParameteri(int target, int pname, int param) {
        checkContext();
        webglContext.texParameteri(target, pname, param);
    }

    // ========== Blending ==========
    public static void blendFunc(int sfactor, int dfactor) {
        checkContext();
        webglContext.blendFunc(sfactor, dfactor);
    }

    public static void blendFuncSeparate(int srcRGB, int dstRGB, int srcAlpha, int dstAlpha) {
        checkContext();
        webglContext.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
    }

    public static void blendEquation(int mode) {
        checkContext();
        webglContext.blendEquation(mode);
    }

    public static void blendEquationSeparate(int modeRGB, int modeAlpha) {
        checkContext();
        webglContext.blendEquationSeparate(modeRGB, modeAlpha);
    }

    public static void blendColor(float red, float green, float blue, float alpha) {
        checkContext();
        webglContext.blendColor(red, green, blue, alpha);
    }

    public static void colorMask(boolean red, boolean green, boolean blue, boolean alpha) {
        checkContext();
        webglContext.colorMask(red, green, blue, alpha);
    }

    public static void cullFace(int mode) {
        checkContext();
        webglContext.cullFace(mode);
    }

    // ========== Depth testing ==========
    public static void depthRange(double near, double far) {
        checkContext();
        webglContext.depthRange(near, far);
    }

    // ========== Depth testing ==========
    public static void depthFunc(int func) {
        checkContext();
        webglContext.depthFunc(func);
    }

    public static void depthMask(boolean flag) {
        checkContext();
        webglContext.depthMask(flag);
    }

    // ========== Texture units ==========
    public static void activeTexture(int texture) {
        checkContext();
        webglContext.activeTexture(texture);
    }

    // ========== Object deletion ==========
    public static void deleteTexture(int texture) {
        checkContext();
        webglContext.deleteTexture(texture);
    }

    public static void deleteBuffer(int buffer) {
        checkContext();
        webglContext.deleteBuffer(buffer);
    }

    public static void deleteVertexArray(int vertexArray) {
        checkContext();
        webglContext.deleteVertexArray(vertexArray);
    }

    // ========== Vertex attributes ==========
    public static void disableVertexAttribArray(int index) {
        checkContext();
        webglContext.disableVertexAttribArray(index);
    }

    // ========== Line and point width ==========
    public static void lineWidth(float width) {
        checkContext();
        webglContext.lineWidth(width);
    }

    public static void pointSize(float size) {
        checkContext();
        webglContext.pointSize(size);
    }

    // ========== Polygon offset ==========
    public static void polygonOffset(float factor, float units) {
        checkContext();
        webglContext.polygonOffset(factor, units);
    }

    // ========== Scissor test ==========
    public static void scissor(int x, int y, int width, int height) {
        checkContext();
        webglContext.scissor(x, y, width, height);
    }

    // ========== Stencil testing ==========
    public static void stencilFunc(int func, int ref, int mask) {
        checkContext();
        webglContext.stencilFunc(func, ref, mask);
    }

    public static void stencilMask(int mask) {
        checkContext();
        webglContext.stencilMask(mask);
    }

    public static void stencilOp(int fail, int zfail, int zpass) {
        checkContext();
        webglContext.stencilOp(fail, zfail, zpass);
    }

    public static void clearStencil(int s) {
        checkContext();
        webglContext.clearStencil(s);
    }

    // ========== Query timer (GL3.0+) ==========
    public static void deleteQuery(int query) {
        checkContext();
        webglContext.deleteQuery(query);
    }

    // ========== Flush and finish ==========
    public static void flush() {
        checkContext();
        webglContext.flush();
    }

    public static void finish() {
        checkContext();
        webglContext.finish();
    }

    // ========== Query timer (GL3.0+) ==========
    public static int createQuery() {
        checkContext();
        return webglContext.createQuery();
    }

    public static void beginQuery(int target, int query) {
        checkContext();
        webglContext.beginQuery(target, query);
    }

    public static void endQuery(int target) {
        checkContext();
        webglContext.endQuery(target);
    }

    public static boolean getQueryParameter(int query, int pname) {
        checkContext();
        Object value = webglContext.getQueryParameter(query, pname);
        return value instanceof Number && ((Number) value).intValue() != 0;
    }

    public static int getQueryObjectu(int query, int pname) {
        checkContext();
        // WebGL2 doesn't have a direct getQueryObjectu equivalent that returns unsigned int
        // For now, we return 0 as a placeholder. A proper implementation would need
        // to track query results or use WebGL extensions.
        return 0;
    }

    // ========== Data conversions helper ==========
    private static Float32ArrayView convertBufferToFloatArrayView(ByteBuffer buf) {
        if (buf == null || buf.remaining() == 0) {
            return null;
        }

        // WebGL2 only accepts Float32ArrayView for buffer data, not raw byte arrays
        // Create a temporary Float32ArrayView from the contents
        float[] array = new float[buf.remaining() / 4];
        for (int i = 0; i < array.length; i++) {
            array[i] = buf.getFloat();
        }

        // Create an array view (will be deoptimized to array in JS)
        Float32ArrayView view = new Float32ArrayView(array);
        return view;
    }

    private GlBridge() {
        // Static utility class - prevent instantiation
    }
}