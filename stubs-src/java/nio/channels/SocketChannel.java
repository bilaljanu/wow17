package java.nio.channels;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.net.SocketAddress;

public abstract class SocketChannel extends java.nio.channels.spi.AbstractSelectableChannel {
    protected SocketChannel() {}

    public static SocketChannel open() throws IOException {
        return null;
    }

    public static SocketChannel open(SocketAddress remote) throws IOException {
        return null;
    }

    public abstract SocketChannel bind(SocketAddress local) throws IOException;
    public abstract SocketChannel shutdownInput() throws IOException;
    public abstract SocketChannel shutdownOutput() throws IOException;
    public abstract boolean isConnected();
    public abstract boolean isConnectionPending();
    public abstract boolean connect(SocketAddress remote) throws IOException;
    public abstract boolean finishConnect() throws IOException;
    public abstract SocketAddress getRemoteAddress() throws IOException;
    public abstract SocketAddress getLocalAddress() throws IOException;
    public abstract int read(ByteBuffer dst) throws IOException;
    public abstract long read(ByteBuffer[] dsts, int offset, int length) throws IOException;
    public abstract int write(ByteBuffer src) throws IOException;
    public abstract long write(ByteBuffer[] srcs, int offset, int length) throws IOException;
    public abstract java.net.Socket socket();
    public abstract int validOps();
}
