package poc.compat.java.nio.channels;
public abstract class AbstractInterruptibleChannel implements InterruptibleChannel {
    private volatile boolean open = true;
    protected AbstractInterruptibleChannel() {}
    public final void close() throws java.io.IOException { open = false; implCloseChannel(); }
    protected abstract void implCloseChannel() throws java.io.IOException;
    public final boolean isOpen() { return open; }
    protected final void begin() {}
    protected final void end(boolean completed) {}
}
