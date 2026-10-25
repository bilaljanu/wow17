package poc.compat.java.nio.channels;
public interface SeekableByteChannel extends java.lang.AutoCloseable {
    long position() throws java.io.IOException;
    SeekableByteChannel position(long newPosition) throws java.io.IOException;
    long size() throws java.io.IOException;
    SeekableByteChannel truncate(long size) throws java.io.IOException;
    int read(java.nio.ByteBuffer dst) throws java.io.IOException;
    int write(java.nio.ByteBuffer src) throws java.io.IOException;
}
