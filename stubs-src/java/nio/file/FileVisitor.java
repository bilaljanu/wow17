package java.nio.file;

import java.io.IOException;

public interface FileVisitor<T> {
    FileVisitResult preVisitDirectory(T dir, java.nio.file.attribute.BasicFileAttributes attrs) throws IOException;
    FileVisitResult visitFile(T file, java.nio.file.attribute.BasicFileAttributes attrs) throws IOException;
    FileVisitResult visitFileFailed(T file, IOException exc) throws IOException;
    FileVisitResult postVisitDirectory(T dir, IOException exc) throws IOException;
}
