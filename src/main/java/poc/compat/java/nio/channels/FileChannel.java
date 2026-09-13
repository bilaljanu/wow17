package poc.compat.java.nio.channels;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.MappedByteBuffer;
public abstract class FileChannel extends AbstractInterruptibleChannel implements SeekableByteChannel, java.nio.channels.ReadableByteChannel, java.nio.channels.WritableByteChannel {
    protected FileChannel() {}
    public abstract long position() throws IOException;
    public abstract FileChannel position(long newPosition) throws IOException;
    public abstract long size() throws IOException;
    public abstract FileChannel truncate(long size) throws IOException;
    public abstract void force(boolean metaData) throws IOException;
    public abstract long transferTo(long position, long count, java.nio.channels.WritableByteChannel target) throws IOException;
    public abstract long transferFrom(java.nio.channels.ReadableByteChannel src, long position, long count) throws IOException;
    public abstract int read(ByteBuffer dst, long position) throws IOException;
    public abstract int write(ByteBuffer src, long position) throws IOException;
    public abstract MappedByteBuffer map(MapMode mode, long position, long size) throws IOException;
    public abstract long lock(long position, long size, boolean shared) throws IOException;
    public abstract java.nio.channels.FileLock tryLock(long position, long size, boolean shared) throws IOException;
    public enum MapMode { READ_ONLY, READ_WRITE, PRIVATE }
    protected void implCloseChannel() throws IOException {}
}
