package java.nio.channels.spi;

import java.nio.channels.*;
import java.io.IOException;

public abstract class SelectorProvider {
    private static SelectorProvider provider;

    protected SelectorProvider() {}

    public static synchronized SelectorProvider provider() {
        return provider;
    }

    public abstract DatagramChannel openDatagramChannel() throws IOException;
    public abstract Pipe.OpenPipe openPipe() throws IOException;
    public abstract AbstractSelector openSelector() throws IOException;
    public abstract ServerSocketChannel openServerSocketChannel() throws IOException;
    public abstract SocketChannel openSocketChannel() throws IOException;

    public Channel inheritedChannel() throws IOException {
        return null;
    }
}
