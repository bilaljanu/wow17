package poc.compat.java.util.concurrent;

public class ThreadPoolExecutor extends AbstractExecutorService {
    public ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, java.util.concurrent.TimeUnit unit, java.util.concurrent.BlockingQueue<Runnable> workQueue) {}
    public ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, java.util.concurrent.TimeUnit unit, java.util.concurrent.BlockingQueue<Runnable> workQueue, ThreadFactory threadFactory) {}
    public ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, java.util.concurrent.TimeUnit unit, java.util.concurrent.BlockingQueue<Runnable> workQueue, RejectedExecutionHandler handler) {}
    public ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, java.util.concurrent.TimeUnit unit, java.util.concurrent.BlockingQueue<Runnable> workQueue, ThreadFactory threadFactory, RejectedExecutionHandler handler) {}

    public void execute(Runnable command) { command.run(); }

    public void shutdown() {}
    public java.util.List<Runnable> shutdownNow() { return java.util.Collections.emptyList(); }
    public boolean isShutdown() { return false; }
    public boolean isTerminating() { return false; }
    public boolean isTerminated() { return false; }
    public boolean awaitTermination(long timeout, java.util.concurrent.TimeUnit unit) { return true; }
    public void setThreadFactory(ThreadFactory threadFactory) {}
    public ThreadFactory getThreadFactory() { return null; }
    public void setRejectedExecutionHandler(RejectedExecutionHandler handler) {}
    public RejectedExecutionHandler getRejectedExecutionHandler() { return null; }
    public void setCorePoolSize(int corePoolSize) {}
    public int getCorePoolSize() { return 0; }
    public int getMaximumPoolSize() { return 0; }
    public void setMaximumPoolSize(int maximumPoolSize) {}
    public long getKeepAliveTime(java.util.concurrent.TimeUnit unit) { return 0; }
    public void setKeepAliveTime(long time, java.util.concurrent.TimeUnit unit) {}
    public java.util.concurrent.BlockingQueue<Runnable> getQueue() { return null; }
    public int getPoolSize() { return 0; }
    public int getActiveCount() { return 0; }
    public int getCompletedTaskCount() { return 0; }
    public int getLargestPoolSize() { return 0; }

    public interface RejectedExecutionHandler {
        void rejectedExecution(Runnable r, ThreadPoolExecutor executor);
    }
}
