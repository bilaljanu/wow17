package java.nio.file;

import java.io.IOException;
import java.io.Serializable;

public interface Path extends Comparable<Path>, Iterable<Path>, Serializable {
    FileSystem getFileSystem();
    boolean isAbsolute();
    Path getRoot();
    Path getFileName();
    Path getParent();
    int getNameCount();
    Path getName(int index);
    Path subpath(int beginIndex, int endIndex);
    boolean startsWith(Path other);
    boolean startsWith(String other);
    boolean endsWith(Path other);
    boolean endsWith(String other);
    Path normalize();
    Path resolve(Path other);
    Path resolve(String other);
    Path resolveSibling(Path other);
    Path resolveSibling(String other);
    Path relativize(Path other);
    URI toUri();
    Path toAbsolutePath();
    Path toRealPath(LinkOption... options) throws IOException;
    java.io.File toFile();
    WatchKey register(WatchService watcher, WatchEvent.Kind<?>[] events, WatchEvent.Modifier... modifiers) throws IOException;
    WatchKey register(WatchService watcher, WatchEvent.Kind<?>... events) throws IOException;
    Iterator<Path> iterator();
    int compareTo(Path other);
}
