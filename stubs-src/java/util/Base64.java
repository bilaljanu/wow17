package java.util;

import java.io.InputStream;
import java.io.OutputStream;

public final class Base64 {
    private Base64() {}

    public static Encoder getEncoder() {
        return new Encoder();
    }

    public static Encoder getUrlEncoder() {
        return new Encoder();
    }

    public static Encoder getMimeEncoder() {
        return new Encoder();
    }

    public static Encoder getMimeEncoder(int lineLength, byte[] lineSeparator) {
        return new Encoder();
    }

    public static Encoder getDecoder() {
        return new Encoder();
    }

    public static Encoder getUrlDecoder() {
        return new Encoder();
    }

    public static Encoder getMimeDecoder() {
        return new Encoder();
    }

    public static class Encoder {
        public byte[] encode(byte[] src) {
            return new byte[0];
        }

        public String encodeToString(byte[] src) {
            return "";
        }

        public Encoder withoutPadding() {
            return this;
        }

        public Encoder wrap(byte[] src) {
            return this;
        }

        public Encoder wrap(InputStream is) {
            return this;
        }

        public byte[] decode(byte[] src) {
            return new byte[0];
        }

        public byte[] decode(String src) {
            return new byte[0];
        }

        public void decode(byte[] src, OutputStream os) {
        }
    }
}
