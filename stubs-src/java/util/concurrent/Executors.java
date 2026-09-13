package java.util.concurrent;

import java.util.Collection;
import java.util.List;
import java.util.concurrent.Callable;

public class Executors {
    public static ExecutorService newFixedThreadPool(int nThreads) {
        return new ThreadPoolExecutor(nThreads, nThreads, 0L, TimeUnit.MILLISECONDS, new java.util.concurrent.LinkedBlockingQueue<>());
    }

    public static ExecutorService newFixedThreadPool(int nThreads, ThreadFactory threadFactory) {
        return newFixedThreadPool(nThreads);
    }

    public static ExecutorService newCachedThreadPool() {
        return newFixedThreadPool(1);
    }

    public static ExecutorService newCachedThreadPool(ThreadFactory threadFactory) {
        return newFixedThreadPool(1);
    }

    public static ExecutorService newSingleThreadExecutor() {
        return newFixedThreadPool(1);
    }

    public static ExecutorService newSingleThreadExecutor(ThreadFactory threadFactory) {
        return newFixedThreadPool(1);
    }

    public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize) {
        return new ScheduledThreadPoolExecutor(corePoolSize);
    }

    public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize, ThreadFactory threadFactory) {
        return newScheduledThreadPool(corePoolSize);
    }

    public static ExecutorService newVirtualThreadPerTaskExecutor() {
        return newFixedThreadPool(1);
    }

    public static ExecutorService newWorkStealingPool() {
        return new ForkJoinPool();
    }

    public static ExecutorService newWorkStealingPool(int parallelism) {
        return new ForkJoinPool(parallelism);
    }

    public static Runnable wrap(Runnable task) {
        return task;
    }

    public static <T> Callable<T> callable(Runnable task, T result) {
        return new Callable<T>() {
            public T call() {
                task.run();
                return result;
            }
        };
    }

    public static Callable<Object> callable(Runnable task) {
        return new Callable<Object>() {
            public Object call() {
                task.run();
                return null;
            }
        };
    }

    public static <T> Callable<T> callable(java.security.PrivilegedAction<T> action) {
        return new Callable<T>() {
            public T call() {
                return action.run();
            }
        };
    }
}
