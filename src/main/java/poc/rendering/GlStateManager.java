package poc.rendering;

import poc.compat.jso.GlBridge;
import poc.compat.render.GlConstants;
import poc.compat.render.GlFunctions;

import java.nio.ByteBuffer;

/**
 * WebGL2-backed implementation of Minecraft's GlStateManager.
 *
 * This class provides the same API surface as Minecraft's GlStateManager
 * but translates all operations to WebGL2 via the GlBridge JSO layer.
 *
 * Design principles:
 * - State tracking to minimize redundant WebGL calls
 * - Direct mapping of GL constants to WebGL2 equivalents
 * - Thread-safe for single-threaded browser context
 * - Compatible with TeaVM JSO compilation
 */
public final class GlStateManager {

    // ========== State tracking ==========
    private static boolean depthTestEnabled = false;
    private static boolean blendEnabled = false;
    private static boolean cullFaceEnabled = false;
    private static boolean scissorTestEnabled = false;
    private static boolean stencilTestEnabled = false;
    private static boolean polygonOffsetFillEnabled = false;

    private static int activeTextureUnit = GlConstants.GL_TEXTURE0;
    private static int boundTexture2D = 0;
    private static int boundArrayBuffer = 0;
    private static int boundElementArrayBuffer = 0;
    private static int boundVertexArray = 0;
    private static int currentProgram = 0;

    private static int blendSrcRgb = GlConstants.GL_ONE;
    private static int blendDstRgb = GlConstants.GL_ZERO;
    private static int blendSrcAlpha = GlConstants.GL_ONE;
    private static int blendDstAlpha = GlConstants.GL_ZERO;
    private static int blendEquationRgb = GlConstants.GL_FUNC_ADD;
    private static int blendEquationAlpha = GlConstants.GL_FUNC_ADD;

    private static boolean colorMaskRed = true;
    private static boolean colorMaskGreen = true;
    private static boolean colorMaskBlue = true;
    private static boolean colorMaskAlpha = true;
    private static boolean depthMask = true;

    private static int depthFunc = GlConstants.GL_LESS;
    private static int cullFaceMode = GlConstants.GL_BACK;

    private static float lineWidth = 1.0f;
    private static float pointSize = 1.0f;

    // ========== Capability management ==========

    public static void enable(int cap) {
        switch (cap) {
            case GlConstants.GL_DEPTH_TEST:
                if (!depthTestEnabled) {
                    GlBridge.enable(cap);
                    depthTestEnabled = true;
                }
                break;
            case GlConstants.GL_BLEND:
                if (!blendEnabled) {
                    GlBridge.enable(cap);
                    blendEnabled = true;
                }
                break;
            case GlConstants.GL_CULL_FACE:
                if (!cullFaceEnabled) {
                    GlBridge.enable(cap);
                    cullFaceEnabled = true;
                }
                break;
            case GlConstants.GL_SCISSOR_TEST:
                if (!scissorTestEnabled) {
                    GlBridge.enable(cap);
                    scissorTestEnabled = true;
                }
                break;
            case GlConstants.GL_STENCIL_TEST:
                if (!stencilTestEnabled) {
                    GlBridge.enable(cap);
                    stencilTestEnabled = true;
                }
                break;
            case GlConstants.GL_POLYGON_OFFSET_FILL:
                if (!polygonOffsetFillEnabled) {
                    GlBridge.enable(cap);
                    polygonOffsetFillEnabled = true;
                }
                break;
            default:
                GlBridge.enable(cap);
        }
    }

    public static void disable(int cap) {
        switch (cap) {
            case GlConstants.GL_DEPTH_TEST:
                if (depthTestEnabled) {
                    GlBridge.disable(cap);
                    depthTestEnabled = false;
                }
                break;
            case GlConstants.GL_BLEND:
                if (blendEnabled) {
                    GlBridge.disable(cap);
                    blendEnabled = false;
                }
                break;
            case GlConstants.GL_CULL_FACE:
                if (cullFaceEnabled) {
                    GlBridge.disable(cap);
                    cullFaceEnabled = false;
                }
                break;
            case GlConstants.GL_SCISSOR_TEST:
                if (scissorTestEnabled) {
                    GlBridge.disable(cap);
                    scissorTestEnabled = false;
                }
                break;
            case GlConstants.GL_STENCIL_TEST:
                if (stencilTestEnabled) {
                    GlBridge.disable(cap);
                    stencilTestEnabled = false;
                }
                break;
            case GlConstants.GL_POLYGON_OFFSET_FILL:
                if (polygonOffsetFillEnabled) {
                    GlBridge.disable(cap);
                    polygonOffsetFillEnabled = false;
                }
                break;
            default:
                GlBridge.disable(cap);
        }
    }

    public static boolean isEnabled(int cap) {
        switch (cap) {
            case GlConstants.GL_DEPTH_TEST: return depthTestEnabled;
            case GlConstants.GL_BLEND: return blendEnabled;
            case GlConstants.GL_CULL_FACE: return cullFaceEnabled;
            case GlConstants.GL_SCISSOR_TEST: return scissorTestEnabled;
            case GlConstants.GL_STENCIL_TEST: return stencilTestEnabled;
            case GlConstants.GL_POLYGON_OFFSET_FILL: return polygonOffsetFillEnabled;
            default: return false;
        }
    }

    // ========== Viewport ==========
    public static void viewport(int x, int y, int width, int height) {
        GlBridge.viewport(x, y, width, height);
    }

    // ========== Clear ==========
    public static void clearColor(float red, float green, float blue, float alpha) {
        GlBridge.clearColor(red, green, blue, alpha);
    }

    public static void clear(int mask) {
        GlBridge.clear(mask);
    }

    public static void clearDepth(double depth) {
        // WebGL uses float for depth range
        GlBridge.depthRange(0.0, depth);
    }

    // ========== Depth test ==========
    public static void depthFunc(int func) {
        if (func != depthFunc) {
            GlBridge.depthFunc(func);
            depthFunc = func;
        }
    }

    public static void depthMask(boolean flag) {
        if (flag != depthMask) {
            GlBridge.depthMask(flag);
            depthMask = flag;
        }
    }

    public static void depthRange(double nearVal, double farVal) {
        GlBridge.depthRange(nearVal, farVal);
    }

    // ========== Blending ==========
    public static void blendFunc(int sfactor, int dfactor) {
        if (sfactor != blendSrcRgb || dfactor != blendDstRgb ||
            sfactor != blendSrcAlpha || dfactor != blendDstAlpha) {
            GlBridge.blendFunc(sfactor, dfactor);
            blendSrcRgb = blendSrcAlpha = sfactor;
            blendDstRgb = blendDstAlpha = dfactor;
        }
    }

    public static void blendFuncSeparate(
            int srcRGB, int dstRGB, int srcAlpha, int dstAlpha) {
        if (srcRGB != blendSrcRgb || dstRGB != blendDstRgb ||
            srcAlpha != blendSrcAlpha || dstAlpha != blendDstAlpha) {
            GlBridge.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
            blendSrcRgb = srcRGB;
            blendDstRgb = dstRGB;
            blendSrcAlpha = srcAlpha;
            blendDstAlpha = dstAlpha;
        }
    }

    public static void blendEquation(int mode) {
        if (mode != blendEquationRgb || mode != blendEquationAlpha) {
            GlBridge.blendEquation(mode);
            blendEquationRgb = blendEquationAlpha = mode;
        }
    }

    public static void blendEquationSeparate(int modeRGB, int modeAlpha) {
        if (modeRGB != blendEquationRgb || modeAlpha != blendEquationAlpha) {
            GlBridge.blendEquationSeparate(modeRGB, modeAlpha);
            blendEquationRgb = modeRGB;
            blendEquationAlpha = modeAlpha;
        }
    }

    public static void blendColor(float red, float green, float blue, float alpha) {
        GlBridge.blendColor(red, green, blue, alpha);
    }

    // ========== Color mask ==========
    public static void colorMask(boolean red, boolean green, boolean blue, boolean alpha) {
        if (red != colorMaskRed || green != colorMaskGreen ||
            blue != colorMaskBlue || alpha != colorMaskAlpha) {
            GlBridge.colorMask(red, green, blue, alpha);
            colorMaskRed = red;
            colorMaskGreen = green;
            colorMaskBlue = blue;
            colorMaskAlpha = alpha;
        }
    }

    // ========== Culling ==========
    public static void cullFace(int mode) {
        if (mode != cullFaceMode) {
            GlBridge.cullFace(mode);
            cullFaceMode = mode;
        }
    }

    // ========== Texture ==========
    public static void activeTexture(int texture) {
        if (texture != activeTextureUnit) {
            GlBridge.activeTexture(texture);
            activeTextureUnit = texture;
        }
    }

    public static void bindTexture(int target, int texture) {
        if (target == GlConstants.GL_TEXTURE_2D) {
            if (texture != boundTexture2D) {
                GlBridge.bindTexture(target, texture);
                boundTexture2D = texture;
            }
        } else {
            GlBridge.bindTexture(target, texture);
        }
    }

    public static int createTexture() {
        return GlBridge.createTexture();
    }

    public static void deleteTexture(int texture) {
        if (texture == boundTexture2D) {
            boundTexture2D = 0;
        }
        GlBridge.deleteTexture(texture);
    }

    public static void texImage2D(
            int target, int level, int internalFormat,
            int width, int height, int border,
            int format, int type, ByteBuffer pixels) {
        GlBridge.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
    }

    public static void texParameteri(int target, int pname, int param) {
        GlBridge.texParameteri(target, pname, param);
    }

    public static void texParameterf(int target, int pname, float param) {
        GlBridge.texParameterf(target, pname, param);
    }

    // ========== Shader / Program ==========
    public static int createShader(int type) {
        return GlBridge.createShader(type);
    }

    public static void shaderSource(int shader, String source) {
        GlBridge.shaderSource(shader, source);
    }

    public static void compileShader(int shader) {
        GlBridge.compileShader(shader);
    }

    public static boolean getShaderParameter(int shader, int pname) {
        return GlBridge.getShaderParameter(shader, pname);
    }

    public static String getShaderInfoLog(int shader) {
        return GlBridge.getShaderInfoLog(shader);
    }

    public static int createProgram() {
        return GlBridge.createProgram();
    }

    public static void attachShader(int program, int shader) {
        GlBridge.attachShader(program, shader);
    }

    public static void linkProgram(int program) {
        GlBridge.linkProgram(program);
    }

    public static boolean getProgramParameter(int program, int pname) {
        return GlBridge.getProgramParameter(program, pname);
    }

    public static String getProgramInfoLog(int program) {
        return GlBridge.getProgramInfoLog(program);
    }

    public static void useProgram(int program) {
        if (program != currentProgram) {
            GlBridge.useProgram(program);
            currentProgram = program;
        }
    }

    public static int getUniformLocation(int program, String name) {
        return GlBridge.getUniformLocation(program, name);
    }

    public static void uniform1i(int location, int x) {
        GlBridge.uniform1i(location, x);
    }

    public static void uniform2f(int location, float x, float y) {
        GlBridge.uniform2f(location, x, y);
    }

    public static void uniform3f(int location, float x, float y, float z) {
        GlBridge.uniform3f(location, x, y, z);
    }

    public static void uniform4f(int location, float x, float y, float z, float w) {
        GlBridge.uniform4f(location, x, y, z, w);
    }

    // ========== Buffers ==========
    public static int createBuffer() {
        return GlBridge.createBuffer();
    }

    public static void deleteBuffer(int buffer) {
        if (buffer == boundArrayBuffer) boundArrayBuffer = 0;
        if (buffer == boundElementArrayBuffer) boundElementArrayBuffer = 0;
        GlBridge.deleteBuffer(buffer); // Need to add this to GlBridge
    }

    public static void bindBuffer(int target, int buffer) {
        if (target == GlConstants.GL_ARRAY_BUFFER) {
            if (buffer != boundArrayBuffer) {
                GlBridge.bindBuffer(target, buffer);
                boundArrayBuffer = buffer;
            }
        } else if (target == GlConstants.GL_ELEMENT_ARRAY_BUFFER) {
            if (buffer != boundElementArrayBuffer) {
                GlBridge.bindBuffer(target, buffer);
                boundElementArrayBuffer = buffer;
            }
        } else {
            GlBridge.bindBuffer(target, buffer);
        }
    }

    public static void bufferData(int target, ByteBuffer data, int usage) {
        GlBridge.bufferData(target, data, usage);
    }

    public static void bufferSubData(int target, int offset, ByteBuffer data) {
        GlBridge.bufferSubData(target, offset, data);
    }

    // ========== Vertex Arrays ==========
    public static int createVertexArray() {
        return GlBridge.createVertexArray();
    }

    public static void deleteVertexArray(int vao) {
        if (vao == boundVertexArray) boundVertexArray = 0;
        GlBridge.deleteVertexArray(vao);
    }

    public static void bindVertexArray(int vao) {
        if (vao != boundVertexArray) {
            GlBridge.bindVertexArray(vao);
            boundVertexArray = vao;
        }
    }

    public static void enableVertexAttribArray(int index) {
        GlBridge.enableVertexAttribArray(index);
    }

    public static void disableVertexAttribArray(int index) {
        GlBridge.disableVertexAttribArray(index); // Need to add this to GlBridge
    }

    public static void vertexAttribPointer(
            int index, int size, int type, boolean normalized,
            int stride, long offset) {
        GlBridge.vertexAttribPointer(index, size, type, normalized, stride, offset);
    }

    // ========== Drawing ==========
    public static void drawArrays(int mode, int first, int count) {
        GlBridge.drawArrays(mode, first, count);
    }

    public static void drawElements(int mode, int count, int type, long offset) {
        GlBridge.drawElements(mode, count, type, offset);
    }

    // ========== Line/Point ==========
    public static void lineWidth(float width) {
        if (width != lineWidth) {
            GlBridge.lineWidth(width);
            lineWidth = width;
        }
    }

    public static void pointSize(float size) {
        if (size != pointSize) {
            GlBridge.pointSize(size);
            pointSize = size;
        }
    }

    // ========== Polygon Offset ==========
    public static void polygonOffset(float factor, float units) {
        GlBridge.polygonOffset(factor, units);
    }

    // ========== Scissor ==========
    public static void scissor(int x, int y, int width, int height) {
        GlBridge.scissor(x, y, width, height);
    }

    // ========== Stencil ==========
    public static void stencilFunc(int func, int ref, int mask) {
        GlBridge.stencilFunc(func, ref, mask);
    }

    public static void stencilMask(int mask) {
        GlBridge.stencilMask(mask);
    }

    public static void stencilOp(int fail, int zfail, int zpass) {
        GlBridge.stencilOp(fail, zfail, zpass);
    }

    public static void clearStencil(int s) {
        GlBridge.clearStencil(s);
    }

    // ========== Query ==========
    public static int createQuery() {
        return GlBridge.createQuery();
    }

    public static void deleteQuery(int query) {
        GlBridge.deleteQuery(query);
    }

    public static void beginQuery(int target, int query) {
        GlBridge.beginQuery(target, query);
    }

    public static void endQuery(int target) {
        GlBridge.endQuery(target);
    }

    public static boolean getQueryParameter(int query, int pname) {
        return GlBridge.getQueryParameter(query, pname);
    }

    // ========== State Management ==========
    public static void resetState() {
        // Reset all tracked state to defaults
        depthTestEnabled = false;
        blendEnabled = false;
        cullFaceEnabled = false;
        scissorTestEnabled = false;
        stencilTestEnabled = false;
        polygonOffsetFillEnabled = false;

        activeTextureUnit = GlConstants.GL_TEXTURE0;
        boundTexture2D = 0;
        boundArrayBuffer = 0;
        boundElementArrayBuffer = 0;
        boundVertexArray = 0;
        currentProgram = 0;

        blendSrcRgb = GlConstants.GL_ONE;
        blendDstRgb = GlConstants.GL_ZERO;
        blendSrcAlpha = GlConstants.GL_ONE;
        blendDstAlpha = GlConstants.GL_ZERO;
        blendEquationRgb = GlConstants.GL_FUNC_ADD;
        blendEquationAlpha = GlConstants.GL_FUNC_ADD;

        colorMaskRed = true;
        colorMaskGreen = true;
        colorMaskBlue = true;
        colorMaskAlpha = true;
        depthMask = true;

        depthFunc = GlConstants.GL_LESS;
        cullFaceMode = GlConstants.GL_BACK;

        lineWidth = 1.0f;
        pointSize = 1.0f;
    }

    public static void pushState() {
        // For future use - could push state onto a stack
    }

    public static void popState() {
        // For future use - could pop state from a stack
    }

    // ========== Utility ==========
    public static int getError() {
        return GlBridge.getError();
    }

    public static void flush() {
        GlBridge.flush();
    }

    public static void finish() {
        GlBridge.finish();
    }

    private GlStateManager() {
        // Static utility class
    }
}