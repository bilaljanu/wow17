package poc.compat.java.net;

public abstract class Authenticator {
    public Authenticator() {}

    protected abstract PasswordAuthentication getPasswordAuthentication();

    protected String getRequestingHost() { return null; }
    protected int getRequestingPort() { return -1; }
    protected String getRequestingPrompt() { return null; }
    protected String getRequestingProtocol() { return null; }
    protected String getRequestingScheme() { return null; }
    protected String getRequestingSite() { return null; }

    public static class Requestor {
        private Requestor() {}
    }
}