package java.nio.channels.spi;

import java.io.IOException;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.util.Set;

public abstract class AbstractSelector extends Selector {
    protected AbstractSelector() {}

    public abstract Set<SelectionKey> keys();
    public abstract Set<SelectionKey> selectedKeys();
    public abstract int select() throws IOException;
    public abstract int select(long timeout) throws IOException;
    public abstract int selectNow() throws IOException;
    public abstract Selector wakeup();
    public abstract void close() throws IOException;
    public abstract java.nio.channels.spi.SelectorProvider provider();

    protected abstract void implCloseSelector() throws IOException;
    protected abstract void implSelect(int timeout) throws IOException;
}
