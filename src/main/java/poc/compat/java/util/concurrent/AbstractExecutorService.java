package poc.compat.java.util.concurrent;

import java.util.Collection;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;

public abstract class AbstractExecutorService implements ExecutorService {
    public java.util.concurrent.Future<?> submit(Runnable task) { return null; }
    public <T> java.util.concurrent.Future<T> submit(Runnable task, T result) { return null; }
    public <T> java.util.concurrent.Future<T> submit(Callable<T> task) { return null; }
    public <T> List<java.util.concurrent.Future<T>> invokeAll(Collection<? extends Callable<T>> tasks) throws InterruptedException { return java.util.Collections.emptyList(); }
    public <T> List<java.util.concurrent.Future<T>> invokeAll(Collection<? extends Callable<T>> tasks, long timeout, TimeUnit unit) throws InterruptedException { return java.util.Collections.emptyList(); }
    public <T> T invokeAny(Collection<? extends Callable<T>> tasks) throws InterruptedException { return null; }
    public <T> T invokeAny(Collection<? extends Callable<T>> tasks, long timeout, TimeUnit unit) throws InterruptedException, TimeoutException { return null; }
    protected <T> RunnableFuture<T> newTaskFor(Runnable runnable, T value) { return null; }
    protected <T> RunnableFuture<T> newTaskFor(Callable<T> callable) { return null; }
    public void execute(Runnable command) {}
    public void shutdown() {}
    public List<Runnable> shutdownNow() { return java.util.Collections.emptyList(); }
    public boolean isShutdown() { return false; }
    public boolean isTerminated() { return false; }
    public boolean awaitTermination(long timeout, TimeUnit unit) throws InterruptedException { return false; }
}
