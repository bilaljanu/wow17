package poc.compat.java.util.concurrent;

import java.util.Collection;

public abstract class ForkJoinTask<V> implements java.util.concurrent.Future<V>, java.io.Serializable {
    protected ForkJoinTask() {}
    public abstract V getRawResult();
    protected abstract void setRawResult(V value);
    protected boolean exec() { return false; }
    public final ForkJoinTask<V> fork() { return this; }
    public final V join() { return getRawResult(); }
    public final V invoke() { return getRawResult(); }
    public static <T> ForkJoinTask<T> invokeAll(ForkJoinTask<T> a, ForkJoinTask<T> b) { return a; }
    public boolean cancel(boolean mayInterruptIfRunning) { return false; }
    public boolean isDone() { return false; }
    public boolean isCompletedNormally() { return false; }
    public boolean isCompletedAbnormally() { return false; }
    public boolean isCancelled() { return false; }
    public V get() throws java.util.concurrent.ExecutionException, InterruptedException { return getRawResult(); }
    public V get(long timeout, java.util.concurrent.TimeUnit unit) throws java.util.concurrent.ExecutionException, InterruptedException, java.util.concurrent.TimeoutException { return getRawResult(); }
    public V getNow(V valueIfAbsent) { return getRawResult(); }
    public static ForkJoinTask<?> adapt(Runnable runnable) { return null; }
    public static <T> ForkJoinTask<T> adapt(java.util.concurrent.Callable<T> callable) { return null; }
    public void reinitialize() {}
    public int getPoolIndex() { return -1; }
    public static void helpQuiesce() {}
    public static ForkJoinPool commonPool() { return null; }
}
