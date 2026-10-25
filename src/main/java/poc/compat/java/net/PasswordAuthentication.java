package poc.compat.java.net;
public class PasswordAuthentication {
    private final String userName;
    private final char[] password;
    public PasswordAuthentication(String userName, char[] password) { this.userName = userName; this.password = password != null ? password.clone() : new char[0]; }
    public String getUserName() { return userName; }
    public char[] getPassword() { return password.clone(); }
}
