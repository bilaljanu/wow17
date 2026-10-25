package poc.compat.java.nio.file;
public interface FileStore {
    String name() throws java.io.IOException;
    String type() throws java.io.IOException;
    boolean isReadOnly();
    long getTotalSpace() throws java.io.IOException;
    long getUsableSpace() throws java.io.IOException;
    long getUnallocatedSpace() throws java.io.IOException;
    boolean supportsFileAttributeView(Class<? extends FileAttributeView> type);
    boolean supportsFileAttributeView(String name);
    <V extends FileAttributeView> V getFileAttributeView(Class<V> type, java.nio.file.LinkOption... options);
    <A extends java.nio.file.attribute.BasicFileAttributes> A readAttributes(Class<A> type, java.nio.file.LinkOption... options) throws java.io.IOException;
    java.util.Map<String, Object> readAttributes(String attributes, java.nio.file.LinkOption... options) throws java.io.IOException;
    void setAttribute(String attribute, Object value, java.nio.file.LinkOption... options) throws java.io.IOException;
    Object getAttribute(String attribute, java.nio.file.LinkOption... options) throws java.io.IOException;
}
