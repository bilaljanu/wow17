package poc.compat.java.security;

public class MessageDigestSpi {
    public MessageDigestSpi() {}
    protected void engineUpdate(byte input) {}
    protected void engineUpdate(byte[] input, int offset, int len) {}
    protected byte[] engineDigest() { return new byte[0]; }
    protected int engineDigest(byte[] buf, int offset, int len) { return 0; }
    protected void engineReset() {}
    protected void engineUpdate(java.nio.ByteBuffer input) {}
    protected int engineGetDigestLength() { return 0; }
}
