package java.nio.channels;

public interface Channel {
    boolean isOpen();
    void close() throws java.io.IOException;
}
