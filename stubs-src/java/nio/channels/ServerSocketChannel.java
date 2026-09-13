package java.nio.channels;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.net.SocketAddress;

public abstract class ServerSocketChannel extends java.nio.channels.spi.AbstractSelectableChannel {
    protected ServerSocketChannel() {}

    public static ServerSocketChannel open() throws IOException {
        return null;
    }

    public abstract ServerSocketChannel bind(SocketAddress local) throws IOException;
    public abstract ServerSocketChannel bind(SocketAddress local, int backlog) throws IOException;
    public abstract <T> ServerSocketChannel setOption(java.net.SocketOption<T> name, T value) throws IOException;
    public abstract SocketAddress getLocalAddress() throws IOException;
    public abstract SelectionKey register(Selector sel, int ops) throws IOException;
    public abstract SelectionKey register(Selector sel, int ops, Object att) throws IOException;
    public abstract SocketChannel accept() throws IOException;
    public abstract java.net.ServerSocket socket();
    public abstract int validOps();
}
