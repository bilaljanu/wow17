package poc.compat.java.security;

public class MessageDigest extends MessageDigestSpi {
    private final String algorithm;
    protected MessageDigest(String algorithm) { super(); this.algorithm = algorithm; }
    public static MessageDigest getInstance(String algorithm) throws NoSuchAlgorithmException {
        return new MessageDigest(algorithm) {};
    }
    public static boolean isEqual(byte[] digesta, byte[] digestb) { return java.util.Arrays.equals(digesta, digestb); }
    public void update(byte input) { engineUpdate(input); }
    public void update(byte[] input) { engineUpdate(input, 0, input.length); }
    public void update(byte[] input, int offset, int len) { engineUpdate(input, offset, len); }
    public void update(java.nio.ByteBuffer input) { engineUpdate(input); }
    public byte[] digest() { return engineDigest(); }
    public int digest(byte[] buf, int offset, int len) { return engineDigest(buf, offset, len); }
    public byte[] digest(byte[] input) { update(input); return digest(); }
    public void reset() { engineReset(); }
    public final String getAlgorithm() { return algorithm; }
    public final int getDigestLength() { return engineGetDigestLength(); }
}
