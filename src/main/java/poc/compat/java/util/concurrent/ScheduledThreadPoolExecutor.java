package poc.compat.java.util.concurrent;

public class ScheduledThreadPoolExecutor extends ThreadPoolExecutor implements ScheduledExecutorService {
    public ScheduledThreadPoolExecutor(int corePoolSize) { super(corePoolSize, 0, 0, java.util.concurrent.TimeUnit.MILLISECONDS, null); }
    public ScheduledThreadPoolExecutor(int corePoolSize, ThreadFactory threadFactory) { super(corePoolSize, 0, 0, java.util.concurrent.TimeUnit.MILLISECONDS, null); }
    public ScheduledThreadPoolExecutor(int corePoolSize, RejectedExecutionHandler handler) { super(corePoolSize, 0, 0, java.util.concurrent.TimeUnit.MILLISECONDS, null); }
    public ScheduledThreadPoolExecutor(int corePoolSize, ThreadFactory threadFactory, RejectedExecutionHandler handler) { super(corePoolSize, 0, 0, java.util.concurrent.TimeUnit.MILLISECONDS, null); }
    public ScheduledFuture<?> schedule(Runnable command, long delay, java.util.concurrent.TimeUnit unit) { return null; }
    public <V> ScheduledFuture<V> schedule(java.util.concurrent.Callable<V> callable, long delay, java.util.concurrent.TimeUnit unit) { return null; }
    public ScheduledFuture<?> scheduleAtFixedRate(Runnable command, long initialDelay, long period, java.util.concurrent.TimeUnit unit) { return null; }
    public ScheduledFuture<?> scheduleWithFixedDelay(Runnable command, long initialDelay, long delay, java.util.concurrent.TimeUnit unit) { return null; }
}
