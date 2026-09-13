package java.nio.channels;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.spi.SelectorProvider;
import java.util.Set;

public abstract class Selector implements AutoCloseable {
    protected Selector() {}

    public static Selector open() throws IOException {
        return new StubSelector();
    }

    public abstract Set<SelectionKey> keys();
    public abstract Set<SelectionKey> selectedKeys();
    public abstract int select() throws IOException;
    public abstract int select(long timeout) throws IOException;
    public abstract int selectNow() throws IOException;
    public abstract Selector wakeup();
    public abstract void close() throws IOException;
    public abstract SelectorProvider provider();

    private static class StubSelector extends Selector {
        private final java.util.Set<SelectionKey> keys = new java.util.HashSet<>();
        private final java.util.Set<SelectionKey> selectedKeys = new java.util.HashSet<>();

        public Set<SelectionKey> keys() { return keys; }
        public Set<SelectionKey> selectedKeys() { return selectedKeys; }
        public int select() { return 0; }
        public int select(long timeout) { return 0; }
        public int selectNow() { return 0; }
        public Selector wakeup() { return this; }
        public void close() {}
        public SelectorProvider provider() { return null; }
    }
}
