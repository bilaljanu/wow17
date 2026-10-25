package poc.compat.java.util.concurrent;

public interface RunnableFuture<V> extends Runnable, java.util.concurrent.Future<V> {
    void run();
}
