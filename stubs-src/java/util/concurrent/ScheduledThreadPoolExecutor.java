package java.util.concurrent;

public class ScheduledThreadPoolExecutor extends ThreadPoolExecutor implements ScheduledExecutorService {
    public ScheduledThreadPoolExecutor(int corePoolSize) {
        super(corePoolSize, corePoolSize, 0L, TimeUnit.MILLISECONDS, new java.util.concurrent.LinkedBlockingQueue<>());
    }

    public ScheduledFuture<?> schedule(Runnable command, long delay, TimeUnit unit) {
        command.run();
        return (ScheduledFuture<?>) CompletableFuture.completedFuture(null);
    }

    public <V> ScheduledFuture<V> schedule(Callable<V> callable, long delay, TimeUnit unit) {
        try {
            return (ScheduledFuture<V>) CompletableFuture.completedFuture(callable.call());
        } catch (Exception e) {
            CompletableFuture<V> f = new CompletableFuture<>();
            f.completeExceptionally(e);
            return (ScheduledFuture<V>) f;
        }
    }

    public ScheduledFuture<?> scheduleAtFixedRate(Runnable command, long initialDelay, long period, TimeUnit unit) {
        command.run();
        return (ScheduledFuture<?>) CompletableFuture.completedFuture(null);
    }

    public ScheduledFuture<?> scheduleWithFixedDelay(Runnable command, long initialDelay, long delay, TimeUnit unit) {
        command.run();
        return (ScheduledFuture<?>) CompletableFuture.completedFuture(null);
    }
}
