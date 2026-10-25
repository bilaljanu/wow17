package poc.compat.java.util;
public class Base64 {
    public static class Encoder {
        public byte[] encode(byte[] src) { return new byte[0]; }
        public String encodeToString(byte[] src) { return ""; }
        public byte[] wrap(byte[] src) { return encode(src); }
    }
    public static class Decoder {
        public byte[] decode(byte[] src) { return new byte[0]; }
        public byte[] decode(String src) { return new byte[0]; }
    }
    private static final Encoder DEFAULT_ENCODER = new Encoder();
    private static final Decoder DEFAULT_DECODER = new Decoder();
    private static final Encoder MIME_ENCODER = new Encoder();
    private static final Decoder MIME_DECODER = new Decoder();
    private static final Encoder URL_ENCODER = new Encoder();
    private static final Decoder URL_DECODER = new Decoder();
    public static Encoder getEncoder() { return DEFAULT_ENCODER; }
    public static Encoder getMimeEncoder() { return MIME_ENCODER; }
    public static Encoder getMimeEncoder(int lineLength, byte[] lineSeparator) { return MIME_ENCODER; }
    public static Encoder getUrlEncoder() { return URL_ENCODER; }
    public static Encoder getEncoder(boolean urlSafe) { return urlSafe ? URL_ENCODER : DEFAULT_ENCODER; }
    public static Decoder getDecoder() { return DEFAULT_DECODER; }
    public static Decoder getMimeDecoder() { return MIME_DECODER; }
    public static Decoder getUrlDecoder() { return URL_DECODER; }
}
