package java.util.concurrent;

public class ThreadPoolExecutor extends AbstractExecutorService {
    private final int corePoolSize;
    private final int maximumPoolSize;

    public ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue) {
        this.corePoolSize = corePoolSize;
        this.maximumPoolSize = maximumPoolSize;
    }

    public void execute(Runnable command) {
        command.run();
    }

    public <T> Future<T> submit(java.util.concurrent.Callable<T> task) {
        try {
            return CompletableFuture.completedFuture(task.call());
        } catch (Exception e) {
            CompletableFuture<T> f = new CompletableFuture<>();
            f.completeExceptionally(e);
            return f;
        }
    }

    public <T> Future<T> submit(Runnable task, T result) {
        task.run();
        return CompletableFuture.completedFuture(result);
    }

    public Future<?> submit(Runnable task) {
        task.run();
        return CompletableFuture.completedFuture(null);
    }

    public void shutdown() {
    }

    public boolean isShutdown() {
        return true;
    }

    public boolean isTerminated() {
        return true;
    }

    public boolean awaitTermination(long timeout, TimeUnit unit) {
        return true;
    }
}
