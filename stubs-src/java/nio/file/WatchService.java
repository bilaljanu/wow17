package java.nio.file;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

public interface WatchService extends AutoCloseable {
    WatchKey poll() throws InterruptedException;
    WatchKey poll(long timeout, TimeUnit unit) throws InterruptedException;
    WatchKey take() throws InterruptedException;
    void close() throws IOException;
}
