package poc.compat.java.io;

import java.nio.file.Path;

public class File implements Comparable<File>, java.io.Serializable {
    private static final long serialVersionUID = 3193686272345049893L;
    private final String path;

    public File(String pathname) { this.path = pathname; }
    public File(String parent, String child) { this.path = parent + "/" + child; }
    public File(File parent, String child) { this.path = parent.path + "/" + child; }
    public File(java.net.URI uri) { this.path = uri.getPath(); }

    public String getName() { int i = path.lastIndexOf('/'); return i >= 0 ? path.substring(i + 1) : path; }
    public String getPath() { return path; }
    public String getAbsolutePath() { return path; }
    public String getCanonicalPath() { return path; }
    public File getParentFile() { int i = path.lastIndexOf('/'); return i >= 0 ? new File(path.substring(0, i)) : null; }
    public boolean exists() { return false; }
    public boolean isDirectory() { return false; }
    public boolean isFile() { return false; }
    public long length() { return 0; }
    public boolean mkdir() { return false; }
    public boolean mkdirs() { return false; }
    public boolean createNewFile() throws java.io.IOException { return false; }
    public boolean delete() { return false; }
    public String[] list() { return null; }
    public File[] listFiles() { return null; }
    public boolean renameTo(File dest) { return false; }
    public long lastModified() { return 0; }
    public boolean setLastModified(long time) { return false; }
    public boolean setReadOnly() { return false; }
    public boolean canRead() { return false; }
    public boolean canWrite() { return false; }
    public boolean canExecute() { return false; }
    public boolean isHidden() { return false; }
    public long getTotalSpace() { return 0; }
    public long getFreeSpace() { return 0; }
    public long getUsableSpace() { return 0; }
    public int compareTo(File pathname) { return path.compareTo(pathname.path); }
    public boolean equals(Object obj) { return obj instanceof File && path.equals(((File) obj).path); }
    public int hashCode() { return path.hashCode(); }
    public String toString() { return path; }

    public Path toPath() { return new PocPath(path); }

    private static class PocPath implements Path, java.io.Serializable {
        private final String path;
        PocPath(String path) { this.path = path; }
        public java.nio.file.FileSystem getFileSystem() { throw new UnsupportedOperationException(); }
        public boolean isAbsolute() { return path.startsWith("/"); }
        public Path getRoot() { return null; }
        public Path getFileName() { int i = path.lastIndexOf('/'); return i >= 0 ? new PocPath(path.substring(i + 1)) : this; }
        public Path getParent() { int i = path.lastIndexOf('/'); return i >= 0 ? new PocPath(path.substring(0, i)) : null; }
        public int getNameCount() { return path.split("/").length; }
        public Path getName(int index) { return new PocPath(path.split("/")[index]); }
        public Path subpath(int beginIndex, int endIndex) { String[] parts = path.split("/"); StringBuilder sb = new StringBuilder(); for (int i = beginIndex; i < endIndex; i++) { if (sb.length() > 0) sb.append("/"); sb.append(parts[i]); } return new PocPath(sb.toString()); }
        public boolean startsWith(Path other) { return path.startsWith(other.toString()); }
        public boolean startsWith(String other) { return path.startsWith(other); }
        public boolean endsWith(Path other) { return path.endsWith(other.toString()); }
        public boolean endsWith(String other) { return path.endsWith(other); }
        public Path normalize() { return this; }
        public Path resolve(Path other) { return new PocPath(path + "/" + other.toString()); }
        public Path resolve(String other) { return new PocPath(path + "/" + other); }
        public Path resolveSibling(Path other) { return getParent() != null ? getParent().resolve(other) : other; }
        public Path resolveSibling(String other) { return resolveSibling(new PocPath(other)); }
        public Path relativize(Path other) { return other; }
        public java.net.URI toUri() { return java.net.URI.create("file://" + path); }
        public Path toAbsolutePath() { return isAbsolute() ? this : new PocPath("/" + path); }
        public Path toRealPath(java.nio.file.LinkOption... options) { return toAbsolutePath(); }
        public java.io.File toFile() { return new java.io.File(path); }
        public java.nio.file.WatchKey register(java.nio.file.WatchService watcher, java.nio.file.WatchEvent.Kind<?>[] events, java.nio.file.WatchEvent.Modifier... modifiers) throws java.io.IOException { throw new UnsupportedOperationException(); }
        public java.nio.file.WatchKey register(java.nio.file.WatchService watcher, java.nio.file.WatchEvent.Kind<?>... events) throws java.io.IOException { throw new UnsupportedOperationException(); }
        public java.util.Iterator<Path> iterator() { java.util.List<Path> list = new java.util.ArrayList<>(); for (int i = 0; i < getNameCount(); i++) list.add(getName(i)); return list.iterator(); }
        public int compareTo(Path other) { return toString().compareTo(other.toString()); }
        public boolean equals(Object obj) { return obj instanceof PocPath && path.equals(((PocPath) obj).path); }
        public int hashCode() { return path.hashCode(); }
        public String toString() { return path; }
    }
}
