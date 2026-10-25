package poc.compat.java.security;
public interface PublicKey extends java.security.Key {
    byte[] getEncoded();
    String getAlgorithm();
    String getFormat();
}
