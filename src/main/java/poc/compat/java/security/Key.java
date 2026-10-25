package poc.compat.java.security;
public interface Key extends java.io.Serializable {
    byte[] getEncoded();
    String getAlgorithm();
    String getFormat();
}
