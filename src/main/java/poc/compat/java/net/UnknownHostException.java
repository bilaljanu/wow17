package poc.compat.java.net;
public class UnknownHostException extends java.io.IOException {
    public UnknownHostException() { super(); }
    public UnknownHostException(String host) { super(host); }
}
