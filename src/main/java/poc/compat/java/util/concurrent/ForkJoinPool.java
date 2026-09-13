package poc.compat.java.util.concurrent;

import java.util.Collection;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class ForkJoinPool extends AbstractExecutorService {
    public static final int commonPoolParallelism = Runtime.getRuntime().availableProcessors();
    public ForkJoinPool() {}
    public ForkJoinPool(int parallelism) {}
    public ForkJoinPool(int parallelism, ThreadFactory factory, java.lang.Thread.UncaughtExceptionHandler handler, boolean asyncMode) {}
    public static ForkJoinPool commonPool() { return new ForkJoinPool(); }
    public <T> T invoke(ForkJoinTask<T> task) { return task.getRawResult(); }
    public <T> ForkJoinTask<T> submit(ForkJoinTask<T> task) { return task; }
    public <T> ForkJoinTask<T> submit(java.util.concurrent.Callable<T> task) { return null; }
    public <T> ForkJoinTask<T> submit(Runnable task, T result) { return null; }
    public java.util.concurrent.Future<?> submit(Runnable task) { return null; }
    public void execute(Runnable task) {}
    public void execute(ForkJoinTask<?> task) {}
    public void shutdown() {}
    public List<Runnable> shutdownNow() { return java.util.Collections.emptyList(); }
    public boolean isShutdown() { return false; }
    public boolean isTerminated() { return false; }
    public boolean awaitTermination(long timeout, TimeUnit unit) throws InterruptedException { return false; }
    public int getParallelism() { return 1; }
    public int getPoolSize() { return 0; }
    public int getRunningThreadCount() { return 0; }
    public int getRunningTaskCount() { return 0; }
    public boolean isQuiescent() { return true; }
    public long getStealCount() { return 0; }
    public long getQueuedTaskCount() { return 0; }
    public int getQueuedSubmissionCount() { return 0; }
    public boolean hasQueuedSubmissions() { return false; }
    public static void helpQuiesce() {}
    public static <T> ForkJoinTask<T> adapt(Runnable runnable, T result) { return null; }
    public static <T> ForkJoinTask<T> adapt(java.util.concurrent.Callable<T> callable) { return null; }
    public interface ManagedBlocker {
        boolean isReleasable();
        boolean block() throws InterruptedException;
        default void release() {}
    }
}
