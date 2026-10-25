package poc.compat.java.net;
public class Proxy {
    public enum Type { DIRECT, HTTP, SOCKS }
    public static final Proxy NO_PROXY = new Proxy();
    private Type type;
    private SocketAddress address;
    public Proxy() { this.type = Type.DIRECT; }
    public Proxy(Type type, SocketAddress addr) { this.type = type; this.address = addr; }
    public Type type() { return type; }
    public SocketAddress address() { return address; }
}
