package java.nio.channels;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.SocketAddress;
import java.nio.ByteBuffer;

public abstract class DatagramChannel extends java.nio.channels.spi.AbstractSelectableChannel {
    protected DatagramChannel() {}

    public static DatagramChannel open() throws IOException {
        return null;
    }

    public abstract DatagramChannel bind(SocketAddress local) throws IOException;
    public abstract boolean isConnected();
    public abstract DatagramChannel connect(SocketAddress remote) throws IOException;
    public abstract DatagramChannel disconnect() throws IOException;
    public abstract SocketAddress getRemoteAddress() throws IOException;
    public abstract SocketAddress getLocalAddress() throws IOException;
    public abstract int read(ByteBuffer dst) throws IOException;
    public abstract long read(ByteBuffer[] dsts, int offset, int length) throws IOException;
    public abstract int write(ByteBuffer src) throws IOException;
    public abstract long write(ByteBuffer[] srcs, int offset, int length) throws IOException;
    public abstract SocketAddress receive(ByteBuffer target) throws IOException;
    public abstract int send(ByteBuffer src, SocketAddress target) throws IOException;
    public abstract int validOps();
}
