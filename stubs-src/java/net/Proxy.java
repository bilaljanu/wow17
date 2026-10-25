package java.net;

import java.io.Serializable;

public class Proxy implements Serializable {
    public static final Proxy NO_PROXY = new Proxy(Type.DIRECT, null);
    public enum Type { DIRECT, HTTP, SOCKS }
    private final Type type;
    private final SocketAddress address;

    protected Proxy(Type type, SocketAddress address) {
        this.type = type;
        this.address = address;
    }

    public Type type() { return type; }
    public SocketAddress address() { return address; }
}
