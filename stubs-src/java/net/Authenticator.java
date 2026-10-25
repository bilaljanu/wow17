package java.net;

import java.io.IOException;

public abstract class Authenticator extends Object {
    public Authenticator() {}

    public static void setDefault(Authenticator a) {}
    public static Authenticator getDefault() { return null; }

    public PasswordAuthentication requestPasswordAuthentication(String hostname, InetAddress addr, int port, String protocol, String prompt, String scheme) {
        return null;
    }

    public PasswordAuthentication requestPasswordAuthentication(String hostname, InetAddress addr, int port, String protocol, String prompt, String scheme, URL url, Authenticator.RequestorType reqType) {
        return null;
    }

    public enum RequestorType { PROXY, SERVER }
}
