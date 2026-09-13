package poc.compat.java.net;
public class InetAddress implements java.io.Serializable {
    private static final long serialVersionUID = 3286366865745842471L;
    private byte[] addr;
    private String hostName;
    protected InetAddress() {}
    public static InetAddress getByName(String host) throws UnknownHostException { return new Inet4Address(new byte[]{0,0,0,0}, host); }
    public static InetAddress[] getAllByName(String host) throws UnknownHostException { return new InetAddress[]{getByName(host)}; }
    public static InetAddress getLocalHost() throws UnknownHostException { return getByName("localhost"); }
    public static InetAddress getLoopbackAddress() { try { return getByName("127.0.0.1"); } catch (Exception e) { return null; } }
    public byte[] getAddress() { return addr != null ? addr.clone() : new byte[4]; }
    public String getCanonicalHostName() { return hostName != null ? hostName : ""; }
    public String getHostAddress() { return ""; }
    public String getHostName() { return hostName != null ? hostName : ""; }
    public boolean isLoopbackAddress() { return false; }
    public boolean isAnyLocalAddress() { return false; }
    public boolean isMulticastAddress() { return false; }
    public boolean isLinkLocalAddress() { return false; }
    public boolean isSiteLocalAddress() { return false; }
    public boolean isReachable(int timeout) { return false; }
    public String toString() { return hostName != null ? hostName : ""; }
    public boolean equals(Object obj) { return obj instanceof InetAddress; }
    public int hashCode() { return 0; }
}
