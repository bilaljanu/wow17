package poc.compat.render;

import java.nio.ByteBuffer;

/**
 * Shim for GlStateManager GL3.0 calls (mapped to WebGL2).
 * This file provides the intersection between MC's GlStateManager and
 * the GlBridge/WGL2Context JSO bridge by implementing overloads that
 * Java would use but that are substituted in the browser.
 *
 * This is considered a stub for the GL calls, but NOT a no-op — it
 * actually translates to WebGL2 operations.
 */
public final class GlManagerGL30 {

    // ========== Viewport ==========
    public static void viewport(int x, int y, int width, int height) {
        poc.compat.jso.GlBridge.viewport(x, y, width, height);
    }

    // ========== Clearing ==========
    public static void clearColor(float red, float green, float blue, float alpha) {
        poc.compat.jso.GlBridge.clearColor(red, green, blue, alpha);
    }

    public static void clear(int mask) {
        poc.compat.jso.GlBridge.clear(mask);
    }

    // ========== Shader / Program ==========
    public static int createShader(int type) {
        return poc.compat.jso.GlBridge.createShader(type);
    }

    public static void shaderSource(int shader, String source) {
        poc.compat.jso.GlBridge.shaderSource(shader, source);
    }

    public static void compileShader(int shader) {
        poc.compat.jso.GlBridge.compileShader(shader);
    }

    public static boolean getShaderParameter(int shader, int pname) {
        return poc.compat.jso.GlBridge.getShaderParameter(shader, pname);
    }

    public static String getShaderInfoLog(int shader) {
        return poc.compat.jso.GlBridge.getShaderInfoLog(shader);
    }

    public static int createProgram() {
        return poc.compat.jso.GlBridge.createProgram();
    }

    public static void attachShader(int program, int shader) {
        poc.compat.jso.GlBridge.attachShader(program, shader);
    }

    public static void linkProgram(int program) {
        poc.compat.jso.GlBridge.linkProgram(program);
    }

    public static boolean getProgramParameter(int program, int pname) {
        return poc.compat.jso.GlBridge.getProgramParameter(program, pname);
    }

    public static String getProgramInfoLog(int program) {
        return poc.compat.jso.GlBridge.getProgramInfoLog(program);
    }

    public static void useProgram(int program) {
        poc.compat.jso.GlBridge.useProgram(program);
    }

    public static int getUniformLocation(int program, String name) {
        return poc.compat.jso.GlBridge.getUniformLocation(program, name);
    }

    public static void uniform1i(int location, int x) {
        poc.compat.jso.GlBridge.uniform1i(location, x);
    }

    public static void uniform2f(int location, float x, float y) {
        poc.compat.jso.GlBridge.uniform2f(location, x, y);
    }

    public static void uniform3f(int location, float x, float y, float z) {
        poc.compat.jso.GlBridge.uniform3f(location, x, y, z);
    }

    public static void uniform4f(int location, float x, float y, float z, float w) {
        poc.compat.jso.GlBridge.uniform4f(location, x, y, z, w);
    }

    // ========== Buffers ==========
    public static int createBuffer() {
        return poc.compat.jso.GlBridge.createBuffer();
    }

    public static void bindBuffer(int target, int buffer) {
        poc.compat.jso.GlBridge.bindBuffer(target, buffer);
    }

    public static void bufferData(int target, ByteBuffer data, int usage) {
        // ByteBuffer -> Float32ArrayView handled by GlBridge
        poc.compat.jso.GlBridge.bufferData(target, data, usage);
    }

    public static void bufferSubData(int target, int offset, ByteBuffer data) {
        poc.compat.jso.GlBridge.bufferSubData(target, offset, data);
    }

    // ========== Vertex Arrays ==========
    public static int createVertexArray() {
        return poc.compat.jso.GlBridge.createVertexArray();
    }

    public static void bindVertexArray(int vao) {
        poc.compat.jso.GlBridge.bindVertexArray(vao);
    }

    public static void enableVertexAttribArray(int index) {
        poc.compat.jso.GlBridge.enableVertexAttribArray(index);
    }

    public static void vertexAttribPointer(
            int index, int size, int type, boolean normalized,
            int stride, long offset) {
        poc.compat.jso.GlBridge.vertexAttribPointer(index, size, type, normalized, stride, offset);
    }

    // ========== Drawing ==========
    public static void drawArrays(int mode, int first, int count) {
        poc.compat.jso.GlBridge.drawArrays(mode, first, count);
    }

    public static void drawElements(int mode, int count, int type, long offset) {
        poc.compat.jso.GlBridge.drawElements(mode, count, type, offset);
    }

    // ========== Enable states ==========
    public static void enable(int cap) {
        poc.compat.jso.GlBridge.enable(cap);
    }

    public static void disable(int cap) {
        poc.compat.jso.GlBridge.disable(cap);
    }

    // ========== Error checking ==========
    public static int getError() {
        return poc.compat.jso.GlBridge.getError();
    }

    // ========== Texture operations (GL3.0+) ==========
    public static int createTexture() {
        return poc.compat.jso.GlBridge.createTexture();
    }

    public static void bindTexture(int target, int texture) {
        poc.compat.jso.GlBridge.bindTexture(target, texture);
    }

    public static void texImage2D(
            int target, int level, int internalFormat,
            int width, int height, int border,
            int format, int type, ByteBuffer pixels) {
        poc.compat.jso.GlBridge.texImage2D(target, level, internalFormat,
                width, height, border, format, type, pixels);
    }

    public static void texParameterf(int target, int pname, float param) {
        poc.compat.jso.GlBridge.texParameterf(target, pname, param);
    }

    public static void texParameteri(int target, int pname, int param) {
        poc.compat.jso.GlBridge.texParameteri(target, pname, param);
    }

    // ========== Query timer (GL3.0+) ==========
    public static int createQuery() {
        return poc.compat.jso.GlBridge.createQuery();
    }

    public static void beginQuery(int target, int query) {
        poc.compat.jso.GlBridge.beginQuery(target, query);
    }

    public static void endQuery(int target) {
        poc.compat.jso.GlBridge.endQuery(target);
    }

    public static boolean getQueryParameter(int query, int pname) {
        return poc.compat.jso.GlBridge.getQueryParameter(query, pname);
    }

    private GlManagerGL30() {
        // Static utility class - prevent instantiation
    }
}