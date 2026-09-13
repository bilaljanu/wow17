package poc.compat.java.nio.channels;
import java.io.IOException;
import java.util.Set;
public abstract class SelectableChannel implements java.lang.AutoCloseable {
    protected SelectableChannel() {}
    public abstract java.nio.channels.spi.SelectorProvider provider();
    public abstract int validOps();
    public abstract boolean isBlocking();
    public abstract Object blockingLock();
    public abstract SelectableChannel configureBlocking(boolean block) throws IOException;
    public abstract Set<SelectionKey> keys();
    public abstract SelectionKey keyFor(Selector sel);
    public abstract SelectionKey register(Selector sel, int ops) throws ClosedChannelException;
    public abstract SelectionKey register(Selector sel, int ops, Object att) throws ClosedChannelException;
}
