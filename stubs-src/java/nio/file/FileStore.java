package java.nio.file;

import java.io.IOException;

public abstract class FileStore {
    protected FileStore() {}

    public abstract String name();
    public abstract String type();
    public abstract boolean isReadOnly();
    public abstract long getTotalSpace() throws IOException;
    public abstract long getUsableSpace() throws IOException;
    public abstract long getUnallocatedSpace() throws IOException;
    public abstract boolean supportsFileAttributeView(Class<? extends FileAttributeView> type);
    public abstract boolean supportsFileAttributeView(String name);
    public abstract <V extends FileAttributeView> V getFileAttributeView(Class<V> type, LinkOption... options);
    public abstract <A extends FileAttributes> A readAttributes(Class<A> type, LinkOption... options) throws IOException;
}
