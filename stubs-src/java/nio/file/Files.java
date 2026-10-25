package java.nio.file;

import java.io.IOException;
import java.nio.file.attribute.FileAttribute;
import java.nio.file.attribute.FileAttributeView;
import java.nio.file.attribute.FileTime;
import java.nio.file.attribute.UserPrincipal;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

public abstract class Files {
    protected Files() {}

    public static boolean exists(Path path, LinkOption... options) {
        return false;
    }

    public static boolean isRegularFile(Path path, LinkOption... options) {
        return false;
    }

    public static boolean isDirectory(Path path, LinkOption... options) {
        return false;
    }

    public static boolean isSymbolicLink(Path path) {
        return false;
    }

    public static boolean isHidden(Path path) throws IOException {
        return false;
    }

    public static Path createDirectories(Path dir, FileAttribute<?>... attrs) throws IOException {
        return dir;
    }

    public static Path createDirectory(Path dir, FileAttribute<?>... attrs) throws IOException {
        return dir;
    }

    public static Path createFile(Path path, FileAttribute<?>... attrs) throws IOException {
        return path;
    }

    public static Path createTempDirectory(Path dir, String prefix, FileAttribute<?>... attrs) throws IOException {
        return dir;
    }

    public static Path createTempDirectory(String prefix, FileAttribute<?>... attrs) throws IOException {
        return null;
    }

    public static Path createTempFile(Path dir, String prefix, String suffix, FileAttribute<?>... attrs) throws IOException {
        return null;
    }

    public static Path createTempFile(String prefix, String suffix, FileAttribute<?>... attrs) throws IOException {
        return null;
    }

    public static void delete(Path path) throws IOException {
    }

    public static boolean deleteIfExists(Path path) throws IOException {
        return false;
    }

    public static Path copy(Path source, Path target, LinkOption... options) throws IOException {
        return target;
    }

    public static Path move(Path source, Path target, LinkOption... options) throws IOException {
        return target;
    }

    public static byte[] readAllBytes(Path path) throws IOException {
        return new byte[0];
    }

    public static List<String> readAllLines(Path path) throws IOException {
        return java.util.Collections.emptyList();
    }

    public static String readString(Path path) throws IOException {
        return "";
    }

    public static Path write(Path path, byte[] bytes, FileAttribute<?>... attrs) throws IOException {
        return path;
    }

    public static Path writeString(Path path, CharSequence csq, java.nio.file.OpenOption... options) throws IOException {
        return path;
    }

    public static <V extends FileAttributeView> V getFileAttributeView(Path path, Class<V> type, LinkOption... options) {
        return null;
    }

    public static <A extends FileAttributes> A readAttributes(Path path, Class<A> type, LinkOption... options) throws IOException {
        return null;
    }

    public static long size(Path path) throws IOException {
        return 0;
    }

    public static long lines(Path path) throws java.io.IOException {
        return 0;
    }

    public static FileTime getLastModifiedTime(Path path, LinkOption... options) throws IOException {
        return null;
    }

    public static Path setLastModifiedTime(Path path, FileTime time) throws IOException {
        return path;
    }

    public static UserPrincipal getOwner(Path path, LinkOption... options) throws IOException {
        return null;
    }

    public static FileStore getFileStore(Path path) throws IOException {
        return null;
    }

    public static boolean isSameFile(Path path, Path path2) throws IOException {
        return path.equals(path2);
    }

    public static String probeContentType(Path path) throws IOException {
        return null;
    }

    public static boolean isReadable(Path path) {
        return false;
    }

    public static boolean isWritable(Path path) {
        return false;
    }

    public static boolean isExecutable(Path path) {
        return false;
    }

    public static Path walk(Path start, int maxDepth, FileVisitor<? super Path> visitor) throws IOException {
        return start;
    }

    public static Path walk(Path start, FileVisitor<? super Path> visitor) throws IOException {
        return start;
    }

    public static java.util.stream.Stream<Path> walk(Path start, int maxDepth, LinkOption... options) throws IOException {
        return java.util.stream.Stream.empty();
    }

    public static java.util.stream.Stream<Path> walk(Path start, LinkOption... options) throws IOException {
        return java.util.stream.Stream.empty();
    }

    public static java.util.stream.Stream<Path> list(Path dir) throws IOException {
        return java.util.stream.Stream.empty();
    }

    public static java.util.stream.Stream<Path> find(Path start, int maxDepth, java.util.function.BiPredicate<Path, java.nio.file.attribute.BasicFileAttributes> matcher, LinkOption... options) throws IOException {
        return java.util.stream.Stream.empty();
    }

    public static <A extends FileAttributes> A readAttributes(Path path, String attributes, LinkOption... options) throws IOException {
        return null;
    }

    public static Path setAttribute(Path path, String attribute, Object value, LinkOption... options) throws IOException {
        return path;
    }

    public static Object getAttribute(Path path, String attribute, LinkOption... options) throws IOException {
        return null;
    }

    public static Set<String> readAttributes(Path path, String attributes, LinkOption... options) throws IOException {
        return java.util.Collections.emptySet();
    }

    public static Path writeAttributes(Path path, String attributes, Object value, LinkOption... options) throws IOException {
        return path;
    }

    public static <S extends java.nio.file.SeekableByteChannel> S newByteChannel(Path path, java.nio.file.OpenOption... options) throws IOException {
        return null;
    }

    public static <S extends java.nio.file.SeekableByteChannel> S newByteChannel(Path path, Set<? extends java.nio.file.OpenOption> options, FileAttribute<?>... attrs) throws IOException {
        return null;
    }

    public static java.nio.channels.DirectoryStream<Path> newDirectoryStream(Path dir) throws IOException {
        return null;
    }

    public static java.nio.channels.DirectoryStream<Path> newDirectoryStream(Path dir, String glob) throws IOException {
        return null;
    }

    public static java.nio.channels.DirectoryStream<Path> newDirectoryStream(Path dir, java.nio.file.DirectoryStream.Filter<? super Path> filter) throws IOException {
        return null;
    }

    public static String readSymbolicLink(Path link) throws IOException {
        return "";
    }

    public static Path createSymbolicLink(Path link, Path target, FileAttribute<?>... attrs) throws IOException {
        return link;
    }

    public static Path createLink(Path link, Path existing) throws IOException {
        return link;
    }

    public static Path readString(Path path) throws IOException {
        return "";
    }

    public static Path walkFileTree(Path start, FileVisitor<? super Path> visitor) throws IOException {
        return start;
    }

    public static Path walkFileTree(Path start, Set<FileVisitOption> options, int maxDepth, FileVisitor<? super Path> visitor) throws IOException {
        return start;
    }
}
