package java.security;

public abstract class MessageDigest implements Cloneable {
    private final String algorithm;

    protected MessageDigest(String algorithm) {
        this.algorithm = algorithm;
    }

    public static MessageDigest getInstance(String algorithm) throws NoSuchAlgorithmException {
        return new StubMessageDigest(algorithm);
    }

    public static MessageDigest getInstance(String algorithm, String provider) throws NoSuchAlgorithmException {
        return new StubMessageDigest(algorithm);
    }

    public void update(byte[] input) {
    }

    public void update(byte input) {
    }

    public byte[] digest() {
        return new byte[32];
    }

    public byte[] digest(byte[] input) {
        return new byte[32];
    }

    public int digest(byte[] buf, int offset, int len) {
        return 0;
    }

    public void reset() {
    }

    public String getAlgorithm() {
        return algorithm;
    }

    public int getDigestLength() {
        return 32;
    }

    public Object clone() {
        try {
            return super.clone();
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException(e);
        }
    }

    private static class StubMessageDigest extends MessageDigest {
        StubMessageDigest(String algorithm) {
            super(algorithm);
        }

        protected void engineUpdate(byte input) {
        }

        protected void engineUpdate(byte[] input, int offset, int len) {
        }

        protected byte[] engineDigest() {
            return new byte[32];
        }

        protected void engineReset() {
        }
    }
}
