package java.nio.file.attribute;

import java.io.IOException;
import java.util.Set;

public interface BasicFileAttributes {
    java.nio.file.FileTime lastModifiedTime();
    java.nio.file.FileTime lastAccessTime();
    java.nio.file.FileTime creationTime();
    boolean isRegularFile();
    boolean isDirectory();
    boolean isSymbolicLink();
    boolean isOther();
    long size();
    Object fileKey();
}
