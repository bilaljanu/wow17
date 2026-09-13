package java.util.concurrent;

import java.util.Collection;
import java.util.concurrent.atomic.AtomicReference;

public class CompletableFuture<T> implements Future<T>, CompletionStage<T> {
    private volatile T result;
    private volatile Throwable ex;

    public CompletableFuture() {
    }

    public static <U> CompletableFuture<U> completedFuture(U value) {
        CompletableFuture<U> f = new CompletableFuture<>();
        f.result = value;
        return f;
    }

    public static <U> CompletableFuture<U> failedFuture(Throwable ex) {
        CompletableFuture<U> f = new CompletableFuture<>();
        f.ex = ex;
        return f;
    }

    public static <U> CompletableFuture<U> supplyAsync(java.util.function.Supplier<U> supplier) {
        return completedFuture(supplier.get());
    }

    public static <U> CompletableFuture<U> supplyAsync(java.util.function.Supplier<U> supplier, Executor executor) {
        return completedFuture(supplier.get());
    }

    public static CompletableFuture<Void> runAsync(Runnable runnable) {
        runnable.run();
        return completedFuture(null);
    }

    public static CompletableFuture<Void> runAsync(Runnable runnable, Executor executor) {
        runnable.run();
        return completedFuture(null);
    }

    public static CompletableFuture<Void> allOf(CompletableFuture<?>... cfs) {
        return completedFuture(null);
    }

    public static <T> CompletableFuture<T> anyOf(CompletableFuture<?>... cfs) {
        for (CompletableFuture<?> cf : cfs) {
            if (cf.isDone()) {
                try {
                    @SuppressWarnings("unchecked")
                    T val = (T) cf.get();
                    return completedFuture(val);
                } catch (Exception e) {
                    // skip
                }
            }
        }
        return completedFuture(null);
    }

    public boolean isDone() {
        return result != null || ex != null;
    }

    public boolean isCompletedExceptionally() {
        return ex != null;
    }

    public boolean isCancelled() {
        return false;
    }

    public boolean cancel(boolean mayInterruptIfRunning) {
        return false;
    }

    public T get() {
        if (ex != null) throw new RuntimeException(ex);
        return result;
    }

    public T get(long timeout, TimeUnit unit) {
        return get();
    }

    public T join() {
        if (ex != null) throw new CompletionException(ex);
        return result;
    }

    public T getNow(T valueIfAbsent) {
        if (result != null) return result;
        return valueIfAbsent;
    }

    public T complete(T value) {
        this.result = value;
        return value;
    }

    public boolean completeExceptionally(Throwable ex) {
        this.ex = ex;
        return true;
    }

    public <U> CompletableFuture<U> thenApply(java.util.function.Function<? super T, ? extends U> fn) {
        try {
            return completedFuture(fn.apply(result));
        } catch (Throwable e) {
            return failedFuture(e);
        }
    }

    public <U> CompletableFuture<U> thenApplyAsync(java.util.function.Function<? super T, ? extends U> fn) {
        return thenApply(fn);
    }

    public <U> CompletableFuture<U> thenApplyAsync(java.util.function.Function<? super T, ? extends U> fn, Executor e) {
        return thenApply(fn);
    }

    public <U> CompletableFuture<U> thenCompose(java.util.function.Function<? super T, ? extends CompletableFuture<U>> fn) {
        try {
            return fn.apply(result);
        } catch (Throwable e) {
            return failedFuture(e);
        }
    }

    public <U> CompletableFuture<U> thenComposeAsync(java.util.function.Function<? super T, ? extends CompletableFuture<U>> fn) {
        return thenCompose(fn);
    }

    public <U> CompletableFuture<U> thenComposeAsync(java.util.function.Function<? super T, ? extends CompletableFuture<U>> fn, Executor e) {
        return thenCompose(fn);
    }

    public <U> CompletableFuture<U> handle(java.util.function.BiFunction<? super T, Throwable, ? extends U> fn) {
        try {
            return completedFuture(fn.apply(result, null));
        } catch (Throwable e) {
            return failedFuture(e);
        }
    }

    public <U> CompletableFuture<U> handleAsync(java.util.function.BiFunction<? super T, Throwable, ? extends U> fn) {
        return handle(fn);
    }

    public <U> CompletableFuture<U> handleAsync(java.util.function.BiFunction<? super T, Throwable, ? extends U> fn, Executor e) {
        return handle(fn);
    }

    public CompletableFuture<Void> thenAccept(java.util.function.Consumer<? super T> action) {
        if (result != null) action.accept(result);
        return completedFuture(null);
    }

    public CompletableFuture<Void> thenAcceptAsync(java.util.function.Consumer<? super T> action) {
        return thenAccept(action);
    }

    public CompletableFuture<Void> thenAcceptAsync(java.util.function.Consumer<? super T> action, Executor e) {
        return thenAccept(action);
    }

    public CompletableFuture<T> whenComplete(java.util.function.BiConsumer<? super T, Throwable> action) {
        action.accept(result, ex);
        return this;
    }

    public CompletableFuture<T> whenCompleteAsync(java.util.function.BiConsumer<? super T, Throwable> action) {
        return whenComplete(action);
    }

    public CompletableFuture<T> whenCompleteAsync(java.util.function.BiConsumer<? super T, Throwable> action, Executor e) {
        return whenComplete(action);
    }

    public CompletableFuture<T> exceptionally(java.util.function.Function<Throwable, ? extends T> fn) {
        if (ex != null) {
            try {
                return completedFuture(fn.apply(ex));
            } catch (Throwable e) {
                return failedFuture(e);
            }
        }
        return this;
    }

    public <U> CompletableFuture<U> thenCombine(CompletableFuture<? extends U> other, java.util.function.BiFunction<? super T, ? super U, ? extends U> fn) {
        try {
            U u = other.get();
            return completedFuture(fn.apply(result, u));
        } catch (Throwable e) {
            return failedFuture(e);
        }
    }

    public <U> CompletableFuture<U> thenCombineAsync(CompletableFuture<? extends U> other, java.util.function.BiFunction<? super T, ? super U, ? extends U> fn) {
        return thenCombine(other, fn);
    }

    public <U> CompletableFuture<U> thenCombineAsync(CompletableFuture<? extends U> other, java.util.function.BiFunction<? super T, ? super U, ? extends U> fn, Executor e) {
        return thenCombine(other, fn);
    }
}
