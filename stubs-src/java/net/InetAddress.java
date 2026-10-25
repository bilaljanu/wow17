package java.net;

public abstract class InetAddress implements java.io.Serializable {
    protected InetAddress() {}

    public static InetAddress getByName(String host) throws UnknownHostException {
        return new Inet4AddressImpl();
    }

    public static InetAddress[] getAllByName(String host) throws UnknownHostException {
        return new InetAddress[] { getByName(host) };
    }

    public static InetAddress getLoopbackAddress() {
        try {
            return getByName("127.0.0.1");
        } catch (Exception e) {
            return new Inet4AddressImpl();
        }
    }

    public static InetAddress getLocalHost() throws UnknownHostException {
        try {
            return getByName("127.0.0.1");
        } catch (Exception e) {
            throw new UnknownHostException(e.getMessage());
        }
    }

    public boolean isLoopbackAddress() {
        return false;
    }

    public boolean isAnyLocalAddress() {
        return false;
    }

    public boolean isLinkLocalAddress() {
        return false;
    }

    public boolean isSiteLocalAddress() {
        return false;
    }

    public boolean isMulticastAddress() {
        return false;
    }

    public boolean isReachable(int timeout) {
        return false;
    }

    public boolean isReachable(java.net.NetworkInterface netif, int ttl, int timeout) {
        return false;
    }

    public String getHostAddress() {
        return "0.0.0.0";
    }

    public String getHostName() {
        return "localhost";
    }

    public String getCanonicalHostName() {
        return "localhost";
    }

    public byte[] getAddress() {
        return new byte[4];
    }

    public String toString() {
        return "0.0.0.0";
    }

    public int hashCode() {
        int h = 0;
        byte[] addr = getAddress();
        for (int i = 0; i < addr.length; i++) {
            h += addr[i] * (i + 1);
        }
        return h;
    }

    public boolean equals(Object obj) {
        if (obj instanceof InetAddress) {
            byte[] addr1 = getAddress();
            byte[] addr2 = ((InetAddress) obj).getAddress();
            if (addr1.length != addr2.length) return false;
            for (int i = 0; i < addr1.length; i++) {
                if (addr1[i] != addr2[i]) return false;
            }
            return true;
        }
        return false;
    }

    private static class Inet4AddressImpl extends InetAddress {
    }
}
