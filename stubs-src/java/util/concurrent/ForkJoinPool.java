package java.util.concurrent;

public class ForkJoinPool extends AbstractExecutorService {
    public ForkJoinPool() {
    }

    public ForkJoinPool(int parallelism) {
    }

    public void execute(Runnable task) {
        task.run();
    }

    public <T> ForkJoinTask<T> submit(java.util.concurrent.Callable<T> task) {
        try {
            return new ForkJoinTask.CompletedForkJoinTask<>(task.call());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public <T> ForkJoinTask<T> submit(Runnable task, T result) {
        task.run();
        return new ForkJoinTask.CompletedForkJoinTask<>(result);
    }

    public ForkJoinTask<?> submit(Runnable task) {
        task.run();
        return new ForkJoinTask.CompletedForkJoinTask<>(null);
    }

    public <T> java.util.List<Future<T>> invokeAll(java.util.Collection<? extends java.util.concurrent.Callable<T>> tasks) {
        return super.invokeAll(tasks);
    }

    public static ForkJoinPool commonPool() {
        return new ForkJoinPool();
    }
}
