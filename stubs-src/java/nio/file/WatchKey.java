package java.nio.file;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

public interface WatchKey {
    Path watchable();
    WatchService watcher();
    java.util.List<WatchEvent<?>> pollEvents();
    WatchEvent<?> pollEvents(int kind);
    boolean reset();
    boolean cancel();
}
