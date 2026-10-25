package poc.compat.java.nio.channels;
import java.io.IOException;
import java.util.Set;
public abstract class Selector implements java.io.Closeable {
    protected Selector() {}
    public static Selector open() throws IOException { throw new IOException("NIO not supported"); }
    public abstract Set<SelectionKey> keys();
    public abstract Set<SelectionKey> selectedKeys();
    public abstract int select() throws IOException;
    public abstract int select(long timeout) throws IOException;
    public abstract int selectNow() throws IOException;
    public abstract Selector wakeup();
    public abstract void close() throws IOException;
    public abstract java.nio.channels.spi.SelectorProvider provider();
    public int select(java.util.function.Consumer<SelectionKey> action) throws IOException { return select(); }
}
