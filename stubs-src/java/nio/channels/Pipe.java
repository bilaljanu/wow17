package java.nio.channels;

import java.io.IOException;

public abstract class Pipe {
    protected Pipe() {}

    public static Pipe open() throws IOException {
        return new StubPipe();
    }

    public abstract SourceChannel source();
    public abstract SinkChannel sink();

    public static abstract class SourceChannel extends java.nio.channels.spi.AbstractSelectableChannel {
        protected SourceChannel() {}
        public int validOps() { return SelectionKey.OP_READ; }
    }

    public static abstract class SinkChannel extends java.nio.channels.spi.AbstractSelectableChannel {
        protected SinkChannel() {}
        public int validOps() { return SelectionKey.OP_WRITE; }
    }

    private static class StubPipe extends Pipe {
        private final SourceChannel source = new StubSourceChannel();
        private final SinkChannel sink = new StubSinkChannel();

        public SourceChannel source() { return source; }
        public SinkChannel sink() { return sink; }
    }

    private static class StubSourceChannel extends SourceChannel {
    }

    private static class StubSinkChannel extends SinkChannel {
    }
}
