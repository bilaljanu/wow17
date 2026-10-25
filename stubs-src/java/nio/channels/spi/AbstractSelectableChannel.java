package java.nio.channels.spi;

import java.io.IOException;
import java.nio.channels.SelectableChannel;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;

public abstract class AbstractSelectableChannel extends SelectableChannel {
    private final SelectorProvider provider;
    private volatile boolean blocking = true;

    protected AbstractSelectableChannel(SelectorProvider provider) {
        this.provider = provider;
    }

    public SelectorProvider provider() {
        return provider;
    }

    public SelectableChannel configureBlocking(boolean block) throws IOException {
        this.blocking = block;
        return this;
    }

    public boolean isBlocking() {
        return blocking;
    }

    public Object blockingLock() {
        return this;
    }

    public SelectionKey register(Selector sel, int ops) throws java.nio.channels.ClosedChannelException {
        return null;
    }

    public SelectionKey register(Selector sel, int ops, Object att) throws java.nio.channels.ClosedChannelException {
        return null;
    }

    public SelectionKey keyFor(Selector sel) {
        return null;
    }

    protected abstract void implCloseChannel() throws IOException;
}
