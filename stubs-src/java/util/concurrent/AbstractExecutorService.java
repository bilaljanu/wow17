package java.util.concurrent;

public abstract class AbstractExecutorService implements ExecutorService {
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

    public <T> Future<T> submit(java.util.concurrent.Callable<T> task) {
        try {
            return new java.util.concurrent.CompletableFuture.completedFuture(task.call());
        } catch (Exception e) {
            java.util.concurrent.CompletableFuture<T> f = new java.util.concurrent.CompletableFuture<>();
            f.completeExceptionally(e);
            return f;
        }
    }

    public <T> Future<T> submit(Runnable task, T result) {
        task.run();
        return java.util.concurrent.CompletableFuture.completedFuture(result);
    }

    public Future<?> submit(Runnable task) {
        task.run();
        return java.util.concurrent.CompletableFuture.completedFuture(null);
    }

    public <T> java.util.List<Future<T>> invokeAll(java.util.Collection<? extends java.util.concurrent.Callable<T>> tasks) throws InterruptedException {
        java.util.ArrayList<Future<T>> results = new java.util.ArrayList<>();
        for (java.util.concurrent.Callable<T> t : tasks) {
            try {
                results.add(java.util.concurrent.CompletableFuture.completedFuture(t.call()));
            } catch (Exception e) {
                java.util.concurrent.CompletableFuture<T> f = new java.util.concurrent.CompletableFuture<>();
                f.completeExceptionally(e);
                results.add(f);
            }
        }
        return results;
    }

    public <T> java.util.List<Future<T>> invokeAll(java.util.Collection<? extends java.util.concurrent.Callable<T>> tasks, long timeout, TimeUnit unit) throws InterruptedException {
        return invokeAll(tasks);
    }

    public <T> T invokeAny(java.util.Collection<? extends java.util.concurrent.Callable<T>> tasks) throws InterruptedException {
        for (java.util.concurrent.Callable<T> t : tasks) {
            try {
                return t.call();
            } catch (Exception e) {
                // continue
            }
        }
        throw new java.util.concurrent.ExecutionException("No tasks completed", null);
    }

    public <T> T invokeAny(java.util.Collection<? extends java.util.concurrent.Callable<T>> tasks, long timeout, TimeUnit unit) throws InterruptedException {
        return invokeAny(tasks);
    }
}
