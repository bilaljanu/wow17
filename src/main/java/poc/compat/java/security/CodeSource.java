package poc.compat.java.security;
public class CodeSource implements java.io.Serializable {
    private static final long serialVersionUID = 8537018636802806232L;
    public CodeSource(java.net.URL location, java.security.CodeSigner[] signers) {}
    public CodeSource(java.net.URL location, java.security.cert.Certificate[] certs) {}
    public java.net.URL getLocation() { return null; }
    public java.security.cert.Certificate[] getCertificates() { return new java.security.cert.Certificate[0]; }
    public java.security.CodeSigner[] getCodeSigners() { return new java.security.CodeSigner[0]; }
}
