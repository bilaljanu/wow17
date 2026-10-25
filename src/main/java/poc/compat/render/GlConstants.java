package poc.compat.render;

import java.nio.ByteBuffer;

/**
 * Centralized GL constants shims for Minecraft's use.
 * All GL constants from GL11/GL13/GL14/GL15/GL20/GL30 that MC actually uses
 * are defined here to avoid having to patch every GlStateManager method.
 *
 * Points to note:
 * - GL enums are int constants. No JSO handlers needed.
 * - Only concrete Java overloads that MC calls are here.
 * - Added incrementally as needed (not a complete GL spec coverage).
 */
public final class GlConstants {

    // GL11
    public static final int GL_DEPTH_TEST = 0x0B71;
    public static final int GL_BLEND = 0x0BE2;
    public static final int GL_SCISSOR_TEST = 0x0C11;
    public static final int GL_CULL_FACE = 0x0B44;
    public static final int GL_TEXTURE_2D = 0x0DE1;
    public static final int GL_ARRAY_BUFFER = 0x8892;
    public static final int GL_STATIC_DRAW = 0x88E4;
    public static final int GL_DYNAMIC_DRAW = 0x88E8;
    public static final int GL_FRAGMENT_SHADER = 0x8B30;
    public static final int GL_VERTEX_SHADER = 0x8B31;
    public static final int GL_COMPILE_STATUS = 0x8B81;
    public static final int GL_LINK_STATUS = 0x8B82;
    public static final int GL_ARRAY_BUFFER_BINDING = 0x8894;
    public static final int GL_VERTEX_ATTRIB_ARRAY_POINTER = 0x8645;
    public static final int GL_COMPRESSED_RGB_S3TC_DXT1_EXT = 0x83F0;
    public static final int GL_COMPRESSED_RGBA_S3TC_DXT5_EXT = 0x83F1;
    public static final int GL_NEAREST_MIPMAP_LINEAR = 0x2703;
    public static final int GL_LINEAR_MIPMAP_LINEAR = 0x2703;
    public static final int GL_TEXTURE_MIN_FILTER = 0x2801;
    public static final int GL_TEXTURE_MAG_FILTER = 0x2800;
    public static final int GL_TEXTURE_WRAP_S = 0x2802;
    public static final int GL_TEXTURE_WRAP_T = 0x2803;
    public static final int GL_REPEAT = 0x2901;
    public static final int GL_CLAMP_TO_EDGE = 0x812F;

    // GL13
    public static final int GL_TEXTURE_CUBE_MAP = 0x8513;
    public static final int GL_TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
    public static final int GL_TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516;
    public static final int GL_TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517;
    public static final int GL_TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518;
    public static final int GL_TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519;
    public static final int GL_TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851A;
    public static final int GL_TEXTURE_CUBE_MAP_ARRAY = 0x9009;
    public static final int GL_NORMALIZED = 0x881A;

    // GL14
    public static final int GL_UNSIGNED_BYTE = 0x1401;
    public static final int GL_ALPHA = 0x1906;
    public static final int GL_RGB = 0x1907;
    public static final int GL_RGBA = 0x1908;
    public static final int GL_DEPTH_COMPONENT = 0x1902;
    public static final int GL_RED = 0x1903;
    public static final int GL_GREEN = 0x1904;
    public static final int GL_BLUE = 0x1905;
    public static final int GL_UNSIGNED_SHORT = 0x1403;
    public static final int GL_UNSIGNED_SHORT_4_4_4_4 = 0x8033;
    public static final int GL_UNSIGNED_SHORT_5_5_5_1 = 0x8034;
    public static final int GL_UNSIGNED_SHORT_5_6_5 = 0x8363;
    public static final int GL_UNSIGNED_INT = 0x1405;
    public static final int GL_FLOAT = 0x1406;
    public static final int GL_FLOAT_VEC2 = 0x8B50;
    public static final int GL_FLOAT_VEC3 = 0x8B51;
    public static final int GL_FLOAT_VEC4 = 0x8B52;
    public static final int GL_INT = 0x1404;
    public static final int GL_INT_VEC2 = 0x8B53;
    public static final int GL_INT_VEC3 = 0x8B54;
    public static final int GL_INT_VEC4 = 0x8B55;
    public static final int GL_BOOL = 0x8B56;
    public static final int GL_BOOL_VEC2 = 0x8B57;
    public static final int GL_BOOL_VEC3 = 0x8B58;
    public static final int GL_BOOL_VEC4 = 0x8B59;
    public static final int GL_TEXTURE_3D = 0x806F;  // GL15 actual flag, MC uses it
    public static final int GL_TEXTURE_BASE_LEVEL = 0x813C;
    public static final int GL_TEXTURE_MAX_LEVEL = 0x813D;
    public static final int GL_STENCIL_TEST = 0x0B96;
    public static final int GL_POLYGON_OFFSET_FILL = 0x8037;

    // GL15
    public static final int GL_VERTEX_ARRAY = 0x8074;
    public static final int GL_COLOR_ARRAY = 0x8077;
    public static final int GL_NORMAL_ARRAY = 0x807A;
    public static final int GL_TEXTURE_COORD_ARRAY = 0x8078;
    public static final int GL_ELEMENT_ARRAY_BUFFER = 0x8893;

    // GL20
    public static final int GL_DRAW_ARRAYS = 0x0004;
    public static final int GL_TEXTURE0 = 0x84C0;
    public static final int GL_TEXTURE1 = 0x84C1;
    public static final int GL_TEXTURE2 = 0x84C2;
    public static final int GL_TEXTURE3 = 0x84C3;
    public static final int GL_TEXTURE4 = 0x84C4;

    // GL30
    public static final int GL_VERTEX_ARRAY_BINDING = 0x85B5;
    public static final int GL_COLOR = 0x1800;
    public static final int GL_BACK = 0x0405;
    public static final int GL_FRONT = 0x0404;
    public static final int GL_FRONT_AND_BACK = 0x0408;
    public static final int GL_NO_ERROR = 0x0;
    public static final int GL_INVALID_ENUM = 0x0500;
    public static final int GL_INVALID_VALUE = 0x0501;
    public static final int GL_INVALID_OPERATION = 0x0502;
    public static final int GL_OUT_OF_MEMORY = 0x0505;
    public static final int GL_TRIANGLE_STRIP = 0x0005;
    public static final int GL_LINES = 0x0001;
    public static final int GL_LINE_STRIP = 0x0003;
    public static final int GL_POINTS = 0x0000;
    public static final int GL_ONE = 0x0001;
    public static final int GL_ZERO = 0x0000;
    public static final int GL_FUNC_ADD = 0x8006;
    public static final int GL_LESS = 0x0201;

    private GlConstants() {
        // Static utility class - prevent instantiation
    }
}