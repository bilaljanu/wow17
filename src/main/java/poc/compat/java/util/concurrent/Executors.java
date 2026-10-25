package poc.compat.java.util.concurrent;

import java.util.List;
import java.util.concurrent.Callable;

public final class Executors {
    private Executors() {}
    public static ExecutorService newFixedThreadPool(int nThreads) { return null; }
    public static ExecutorService newFixedThreadPool(int nThreads, ThreadFactory threadFactory) { return null; }
    public static ExecutorService newSingleThreadExecutor() { return null; }
    public static ExecutorService newSingleThreadExecutor(ThreadFactory threadFactory) { return null; }
    public static ExecutorService newCachedThreadPool() { return null; }
    public static ExecutorService newCachedThreadPool(ThreadFactory threadFactory) { return null; }
    public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize) { return null; }
    public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize, ThreadFactory threadFactory) { return null; }
    public static ScheduledExecutorService newSingleThreadScheduledExecutor() { return null; }
    public static ScheduledExecutorService newSingleThreadScheduledExecutor(ThreadFactory threadFactory) { return null; }
    public static <T> Callable<T> callable(Runnable task, T result) { return null; }
    public static Callable<Object> callable(Runnable task) { return null; }
}
