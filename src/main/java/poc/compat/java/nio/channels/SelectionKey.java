package poc.compat.java.nio.channels;
public abstract class SelectionKey {
    public static final int OP_ACCEPT = 1 << 4;
    public static final int OP_CONNECT = 1 << 3;
    public static final int OP_READ = 1 << 0;
    public static final int OP_WRITE = 1 << 2;
    protected SelectionKey() {}
    public abstract SelectableChannel channel();
    public abstract Selector selector();
    public abstract int interestOps();
    public abstract SelectionKey interestOps(int ops);
    public abstract int readyOps();
    public final boolean isAcceptable() { return (readyOps() & OP_ACCEPT) != 0; }
    public final boolean isConnectable() { return (readyOps() & OP_CONNECT) != 0; }
    public final boolean isReadable() { return (readyOps() & OP_READ) != 0; }
    public final boolean isWritable() { return (readyOps() & OP_WRITE) != 0; }
    public abstract SelectionKey cancel();
    public abstract boolean isValid();
    public abstract Object attach(Object ob);
    public abstract Object attachment();
}
