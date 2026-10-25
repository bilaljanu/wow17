package poc.compat.jso;

import java.nio.ByteBuffer;

/**
 * JSO interface representing WebGL2RenderingContext.
 * This is implemented on the JS side; Java code calls abstract methods that
 * are stubbed/optimized away during compilation (no native dispatch).
 *
 * @TEAVM_JSO_NON_NATIVE: true
 */
public interface WebGL2Context {

    // ========== Viewport ==========
    void viewport(int x, int y, int width, int height);

    // ========== Clearing ==========
    void clearColor(float red, float green, float blue, float alpha);
    void clear(int mask);

    // ========== Shader / Program ==========
    int createShader(int type);
    void shaderSource(int shader, String source);
    void compileShader(int shader);
    Number getShaderParameter(int shader, int pname);  // Returns Integer
    String getShaderInfoLog(int shader);

    int createProgram();
    void attachShader(int program, int shader);
    void linkProgram(int program);
    Number getProgramParameter(int program, int pname);  // Returns Integer
    String getProgramInfoLog(int program);

    void useProgram(int program);
    int getUniformLocation(int program, String name);

    void uniform1i(int location, int x);
    void uniform2f(int location, float x, float y);
    void uniform3f(int location, float x, float y, float z);
    void uniform4f(int location, float x, float y, float z, float w);

    // ========== Buffers ==========
    int createBuffer();
    void bindBuffer(int target, int buffer);

    // WebGL2 bufferData accepts JSO Float32ArrayView for data
    void bufferData(int target, Float32ArrayView data, int usage);
    void bufferSubData(int target, int offset, Float32ArrayView data);

    // ========== Vertex Arrays ==========
    int createVertexArray();
    void bindVertexArray(int vao);
    void enableVertexAttribArray(int index);
    void vertexAttribPointer(
            int index, int size, int type, boolean normalized,
            int stride, long offset);

    // ========== Drawing ==========
    void drawArrays(int mode, int first, int count);
    void drawElements(int mode, int count, int type, long offset);

    // ========== Enable states ==========
    void enable(int cap);
    void disable(int cap);

    // ========== Error checking ==========
    int getError();

    // ========== Texture operations (GL3.0+) ==========
    int createTexture();
    void bindTexture(int target, int texture);

    // texImage2D accepts JSO Float32ArrayView for non-null data
    void texImage2D(
            int target, int level, int internalFormat,
            int width, int height, int border,
            int format, int type, Float32ArrayView pixels);

    void texSubImage2D(
            int target, int level, int xoffset, int yoffset,
            int width, int height, int format, int type, Float32ArrayView pixels);

    void texParameterf(int target, int pname, float param);
    void texParameteri(int target, int pname, int param);

    // ========== Query timer (GL3.0+) ==========
    int createQuery();
    void beginQuery(int target, int query);
    void endQuery(int target);

    // ========== Additional WebGL2 methods needed by GlStateManager ==========
    void blendFuncSeparate(int srcRGB, int dstRGB, int srcAlpha, int dstAlpha);
    void blendFunc(int sfactor, int dfactor);
    void colorMask(boolean red, boolean green, boolean blue, boolean alpha);
    void lineWidth(float width);
    void polygonOffset(float factor, float units);
    void logicOp(int op);
    void deleteTexture(int texture);
    void deleteVertexArray(int vao);
    void deleteShader(int shader);
    void deleteProgram(int program);
    void deleteQuery(int query);
    // Note: getQueryObjectu is not directly available in WebGL2, we'll return 0 for now
    int getQueryObjectu(int query, int pname);
    void sampleCoverage(float value, boolean invert);
    void clearStencil(int s);
    void stencilFunc(int func, int ref, int mask);
    void stencilMask(int mask);
    void stencilOp(int fail, int zfail, int zpass);
    void blendColor(float red, float green, float blue, float alpha);
    void blendEquation(int mode);
    void blendEquationSeparate(int modeRGB, int modeAlpha);
    void pointSize(float size);
    void polygonMode(int face, int mode);
    void cullFace(int mode);
    void depthFunc(int func);
    void depthMask(boolean flag);

    // Query parameter support
    Object getQueryParameter(int query, int pname);
    void depthRange(double zNear, double zFar);
    void finish();
    void flush();
    void activeTexture(int texture);

    // Additional methods for GlStateManager
    void scissor(int x, int y, int width, int height);
    void deleteBuffer(int buffer);
    void disableVertexAttribArray(int index);
}