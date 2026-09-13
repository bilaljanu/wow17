package java.nio.channels;

import java.io.IOException;

public abstract class AbstractInterruptibleChannel implements InterruptibleChannel {
    private volatile boolean open = true;

    protected AbstractInterruptibleChannel() {}

    public final void close() throws IOException {
        open = false;
    }

    public final boolean isOpen() {
        return open;
    }

    protected final void begin() {
    }

    protected final void end(boolean completed) {
    }

    protected abstract void implCloseChannel() throws IOException;
}
