package java.nio.channels;

public class FileLock implements java.io.Serializable {
    private final FileChannel channel;
    private final long position;
    private final long size;
    private final boolean shared;

    protected FileLock(FileChannel channel, long position, long size, boolean shared) {
        this.channel = channel;
        this.position = position;
        this.size = size;
        this.shared = shared;
    }

    public FileChannel channel() {
        return channel;
    }

    public long position() {
        return position;
    }

    public long size() {
        return size;
    }

    public boolean isShared() {
        return shared;
    }

    public boolean overlaps(long position, long size) {
        return this.position < position + size && position < this.position + this.size;
    }

    public boolean isValid() {
        return true;
    }

    public void release() throws java.io.IOException {
    }
}
