package java.nio.file;

import java.io.IOException;
import java.nio.file.attribute.BasicFileAttributes;

public interface DirectoryStream<T> extends Iterable<T>, AutoCloseable {
    void close() throws IOException;

    interface Filter<T> {
        boolean accept(T entry) throws IOException;
    }
}
