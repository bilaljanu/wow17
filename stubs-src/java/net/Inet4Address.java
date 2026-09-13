package java.net;

public class Inet4Address extends InetAddress {
    Inet4Address() {
    }

    Inet4Address(byte[] addr) {
    }

    public boolean isAnyLocalAddress() {
        return false;
    }

    public boolean isLoopbackAddress() {
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

    public String getHostAddress() {
        return "0.0.0.0";
    }

    public boolean isReachable(int timeout) {
        return false;
    }
}
