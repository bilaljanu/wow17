package poc.compat.java.util.concurrent;

import java.util.concurrent.Callable;

public class FutureTask<V> implements RunnableFuture<V> {
    public FutureTask(Callable<V> callable) {}
    public FutureTask(Runnable runnable, V result) {}
    public void run() {}
    public boolean cancel(boolean mayInterruptIfRunning) { return false; }
    public boolean isCancelled() { return false; }
    public boolean isDone() { return false; }
    public V get() throws InterruptedException, java.util.concurrent.ExecutionException { return null; }
    public V get(long timeout, java.util.concurrent.TimeUnit unit) throws InterruptedException, java.util.concurrent.ExecutionException, java.util.concurrent.TimeoutException { return null; }
    protected void set(V v) {}
    protected void setException(Throwable t) {}
    protected void done() {}
}
