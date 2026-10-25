package poc.compat.render;

import java.nio.ByteBuffer;

/**
 * Additional GL function shims for GlStateManager that map directly to
 * the GlBridge/WGL2Context without pure overloads.
 * These are typically called as: GlManager.funcName(...)
 */
public final class GlFunctions {

    // ========== Shader management (GL11/GL20) ==========
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

    // ========== Buffer operations (GL11/GL15) ==========
    public static void bindBuffer(int target, int buffer) {
        poc.compat.jso.GlBridge.bindBuffer(target, buffer);
    }

    public static void bufferData(int target, ByteBuffer data, int usage) {
        poc.compat.jso.GlBridge.bufferData(target, data, usage);
    }

    public static void bufferSubData(int target, int offset, ByteBuffer data) {
        poc.compat.jso.GlBridge.bufferSubData(target, offset, data);
    }

    // ========== VAO operations (GL30) ==========
    public static void bindVertexArray(int vao) {
        poc.compat.jso.GlBridge.bindVertexArray(vao);
    }

    public static int createVertexArray() {
        return poc.compat.jso.GlBridge.createVertexArray();
    }

    public static void enableVertexAttribArray(int index) {
        poc.compat.jso.GlBridge.enableVertexAttribArray(index);
    }

    public static void vertexAttribPointer(
            int index, int size, int type, boolean normalized,
            int stride, long offset) {
        poc.compat.jso.GlBridge.vertexAttribPointer(index, size, type, normalized, stride, offset);
    }

    // ========== Draw calls (GL11/GL15) ==========
    public static void drawArrays(int mode, int first, int count) {
        poc.compat.jso.GlBridge.drawArrays(mode, first, count);
    }

    public static void drawElements(int mode, int count, int type, long offset) {
        poc.compat.jso.GlBridge.drawElements(mode, count, type, offset);
    }

    public static void enable(int cap) {
        poc.compat.jso.GlBridge.enable(cap);
    }

    public static void disable(int cap) {
        poc.compat.jso.GlBridge.disable(cap);
    }

    // ========== Texture operations (GL11/GL13/GL30) ==========
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

    public static int createShader(int type) {
        return poc.compat.jso.GlBridge.createShader(type);
    }

    public static int createProgram() {
        return poc.compat.jso.GlBridge.createProgram();
    }

    // ========== Validation/Debugging ==========
    public static int getError() {
        return poc.compat.jso.GlBridge.getError();
    }

    // ========== Primitive type constants for draw calls ==========
    public static final int GL_TRIANGLES = 0x0004;
    public static final int GL_TRIANGLE_STRIP = 0x0005;
    public static final int GL_LINES = 0x0001;
    public static final int GL_LINE_STRIP = 0x0003;
    public static final int GL_POINTS = 0x0000;

    // ========== Texture type constants ==========
    public static final int GL_TEXTURE_2D = 0x0DE1;
    public static final int GL_TEXTURE_CUBE_MAP = 0x8513;
    public static final int GL_TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
    public static final int GL_TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516;
    public static final int GL_TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517;
    public static final int GL_TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518;
    public static final int GL_TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519;
    public static final int GL_TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851A;

    // ========== Buffer target constants ==========
    public static final int GL_ARRAY_BUFFER = 0x8892;
    public static final int GL_ELEMENT_ARRAY_BUFFER = 0x8893;

    // ========== Usage hints ==========
    public static final int GL_STATIC_DRAW = 0x88E4;
    public static final int GL_DYNAMIC_DRAW = 0x88E8;
    public static final int GL_STREAM_DRAW = 0x88E0;

    // ========== Texture parameters ==========
    public static final int GL_TEXTURE_MIN_FILTER = 0x2801;
    public static final int GL_TEXTURE_MAG_FILTER = 0x2800;
    public static final int GL_TEXTURE_WRAP_S = 0x2802;
    public static final int GL_TEXTURE_WRAP_T = 0x2803;
    public static final int GL_NEAREST = 0x2600;
    public static final int GL_LINEAR = 0x2601;
    public static final int GL_NEAREST_MIPMAP_NEAREST = 0x2700;
    public static final int GL_NEAREST_MIPMAP_LINEAR = 0x2702;
    public static final int GL_LINEAR_MIPMAP_NEAREST = 0x2701;
    public static final int GL_LINEAR_MIPMAP_LINEAR = 0x2703;
    public static final int GL_CLAMP_TO_EDGE = 0x812F;
    public static final int GL_REPEAT = 0x2901;

    // ========== Pixel format/format type constants ==========
    public static final int GL_RED = 0x1903;
    public static final int GL_RED_INTEGER = 0x8D10;
    public static final int GL_GREEN = 0x1904;
    public static final int GL_GREEN_INTEGER = 0x8D11;
    public static final int GL_BLUE = 0x1905;
    public static final int GL_BLUE_INTEGER = 0x8D12;
    public static final int GL_RGB = 0x1907;
    public static final int GL_RGBA = 0x1908;
    public static final int GL_DEPTH_COMPONENT = 0x1902;
    public static final int GL_DEPTH_STENCIL = 0x84F9;
    public static final int GL_UNSIGNED_BYTE = 0x1401;
    public static final int GL_UNSIGNED_SHORT = 0x1403;
    public static final int GL_UNSIGNED_INT = 0x1405;
    public static final int GL_FLOAT = 0x1406;
    public static final int GL_HALF_FLOAT = 0x140D;
    public static final int GL_UNSIGNED_SHORT_5_6_5 = 0x8363;
    public static final int GL_UNSIGNED_SHORT_4_4_4_4 = 0x8033;
    public static final int GL_UNSIGNED_SHORT_5_5_5_1 = 0x8034;
    public static final int GL_BGRA = 0x80E1;
    public static final int GL_BGR = 0x80E0;

    // ========== Array attribute types ==========
    public static final int GL_BYTE = 0x1400;
    public static final int GL_SHORT = 0x1402;
    public static final int GL_INT = 0x1404;
    public static final int GL_DOUBLE = 0x140A;

    // ========== Normalized flag ==========
    public static final int GL_NORMALIZED = 0x881A;

    private GlFunctions() {
        // Static utility class - prevent instantiation
    }
}