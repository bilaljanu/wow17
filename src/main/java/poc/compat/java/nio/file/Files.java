package poc.compat.java.nio.file;
import java.io.IOException;
public final class Files {
    private Files() {}
    public static FileStore getFileStore(java.nio.file.Path path) throws IOException {
        return new FileStore() {
            public String name() { return "default"; }
            public String type() { return "default"; }
            public boolean isReadOnly() { return false; }
            public long getTotalSpace() { return 0; }
            public long getUsableSpace() { return 0; }
            public long getUnallocatedSpace() { return 0; }
            public boolean supportsFileAttributeView(Class<? extends FileAttributeView> type) { return false; }
            public boolean supportsFileAttributeView(String name) { return false; }
            public <V extends FileAttributeView> V getFileAttributeView(Class<V> type, java.nio.file.LinkOption... options) { return null; }
            public <A extends java.nio.file.attribute.BasicFileAttributes> A readAttributes(Class<A> type, java.nio.file.LinkOption... options) throws IOException { return null; }
            public java.util.Map<String, Object> readAttributes(String attributes, java.nio.file.LinkOption... options) throws IOException { return java.util.Collections.emptyMap(); }
            public void setAttribute(String attribute, Object value, java.nio.file.LinkOption... options) throws IOException {}
            public Object getAttribute(String attribute, java.nio.file.LinkOption... options) throws IOException { return null; }
        };
    }
}
