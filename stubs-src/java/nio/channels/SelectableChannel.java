package java.nio.channels;

import java.io.IOException;

public abstract class SelectableChannel extends java.nio.channels.spi.AbstractInterruptibleChannel {
    protected SelectableChannel() {}

    public abstract SelectorProvider provider();
    public abstract int validOps();
    public abstract SelectableChannel configureBlocking(boolean block) throws IOException;
    public abstract boolean isBlocking();
    public abstract Object blockingLock();
    public abstract SelectionKey register(Selector sel, int ops) throws java.nio.channels.ClosedChannelException;
    public abstract SelectionKey register(Selector sel, int ops, Object att) throws java.nio.channels.ClosedChannelException;
    public abstract SelectionKey keyFor(Selector sel);
    public abstract boolean isOpen();
}
