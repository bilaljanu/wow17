package java.nio.channels;

import java.nio.ByteBuffer;

public interface InterruptibleChannel extends Channel {
    void close() throws java.io.IOException;
    boolean isOpen();
}
