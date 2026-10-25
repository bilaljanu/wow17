package java.util.concurrent;

public interface ScheduledFuture<V> extends Future<V>, Delayed {
    long getDelay(TimeUnit unit);
}
