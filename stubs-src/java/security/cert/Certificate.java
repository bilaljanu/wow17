package java.security.cert;

import java.security.Principal;

public interface Certificate {
    String getVersion();
    java.math.BigInteger getSerialNumber();
    Principal getIssuerDN();
    Principal getSubjectDN();
    java.util.Date getNotBefore();
    java.util.Date getNotAfter();
    byte[] getTBSCertificate() throws java.security.cert.CertificateEncodingException;
    byte[] getEncoded() throws java.security.cert.CertificateEncodingException;
    void verify(java.security.PublicKey key) throws java.security.cert.CertificateException, java.security.NoSuchAlgorithmException, java.security.InvalidKeyException, java.security.NoSuchProviderException, java.security.cert.CertificateException;
    void verify(java.security.PublicKey key, String sigProvider) throws java.security.cert.CertificateException, java.security.NoSuchAlgorithmException, java.security.InvalidKeyException, java.security.NoSuchProviderException, java.security.cert.CertificateException;
    String toString();
    java.security.PublicKey getPublicKey();
}
