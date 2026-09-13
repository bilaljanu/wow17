package poc.compat.java.nio.channels;
import java.io.IOException;
public abstract class FileLock implements java.lang.AutoCloseable {
    private final FileChannel channel;
    private final long position;
    private final long size;
    protected FileLock(FileChannel channel, long position, long size) { this.channel = channel; this.position = position; this.size = size; }
    public abstract boolean isValid();
    public abstract void release() throws IOException;
    public FileChannel channel() { return channel; }
    public long position() { return position; }
    public long size() { return size; }
    public boolean overlaps(long position, long size) { return this.position < position + size && position < this.position + this.size; }
    public void close() throws IOException { if (isValid()) release(); }
}
