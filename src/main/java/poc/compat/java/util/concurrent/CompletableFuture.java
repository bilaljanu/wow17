package poc.compat.java.util.concurrent;

import java.util.function.*;

public class CompletableFuture<T> implements java.util.concurrent.Future<T>, CompletionStage<T> {
    public CompletableFuture() {}
    public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier) { return new CompletableFuture<>(); }
    public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier, java.util.concurrent.Executor executor) { return new CompletableFuture<>(); }
    public static CompletableFuture<Void> runAsync(Runnable runnable) { return new CompletableFuture<>(); }
    public static CompletableFuture<Void> runAsync(Runnable runnable, java.util.concurrent.Executor executor) { return new CompletableFuture<>(); }
    public static <U> CompletableFuture<U> completedFuture(U value) { return new CompletableFuture<>(); }
    public static <U> CompletableFuture<U> failedFuture(Throwable ex) { return new CompletableFuture<>(); }
    public static CompletableFuture<Void> allOf(CompletableFuture<?>... cfs) { return new CompletableFuture<>(); }
    public static CompletableFuture<Object> anyOf(CompletableFuture<?>... cfs) { return new CompletableFuture<>(); }
    public CompletableFuture<T> orTimeout(long timeout, java.util.concurrent.TimeUnit unit) { return this; }
    public CompletableFuture<T> completeOnTimeout(T value, long timeout, java.util.concurrent.TimeUnit unit) { return this; }
    public <U> CompletableFuture<U> thenApply(Function<? super T, ? extends U> fn) { return new CompletableFuture<>(); }
    public <U> CompletableFuture<U> thenApplyAsync(Function<? super T, ? extends U> fn) { return new CompletableFuture<>(); }
    public <U> CompletableFuture<U> thenApplyAsync(Function<? super T, ? extends U> fn, java.util.concurrent.Executor executor) { return new CompletableFuture<>(); }
    public CompletableFuture<Void> thenAccept(Consumer<? super T> action) { return new CompletableFuture<>(); }
    public CompletableFuture<Void> thenAcceptAsync(Consumer<? super T> action) { return new CompletableFuture<>(); }
    public CompletableFuture<Void> thenAcceptAsync(Consumer<? super T> action, java.util.concurrent.Executor executor) { return new CompletableFuture<>(); }
    public CompletableFuture<Void> thenRun(Runnable action) { return new CompletableFuture<>(); }
    public CompletableFuture<Void> thenRunAsync(Runnable action) { return new CompletableFuture<>(); }
    public CompletableFuture<Void> thenRunAsync(Runnable action, java.util.concurrent.Executor executor) { return new CompletableFuture<>(); }
    public <U,V2> CompletableFuture<V2> thenCombine(CompletionStage<? extends U> other, BiFunction<? super T, ? super U, ? extends V2> fn) { return new CompletableFuture<>(); }
    public <U,V2> CompletableFuture<V2> thenCombineAsync(CompletionStage<? extends U> other, BiFunction<? super T, ? super U, ? extends V2> fn) { return new CompletableFuture<>(); }
    public <U> CompletableFuture<Void> thenAcceptBoth(CompletionStage<? extends U> other, BiConsumer<? super T, ? super U> action) { return new CompletableFuture<>(); }
    public CompletableFuture<Void> runAfterBoth(CompletionStage<?> other, Runnable action) { return new CompletableFuture<>(); }
    public <U> CompletableFuture<U> applyToEither(CompletionStage<? extends T> other, Function<? super T, U> fn) { return new CompletableFuture<>(); }
    public CompletableFuture<Void> acceptEither(CompletionStage<? extends T> other, Consumer<? super T> action) { return new CompletableFuture<>(); }
    public CompletableFuture<Void> runAfterEither(CompletionStage<?> other, Runnable action) { return new CompletableFuture<>(); }
    public <U> CompletionStage<U> thenCompose(Function<? super T, ? extends CompletionStage<U>> fn) { return null; }
    public <U> CompletionStage<U> thenComposeAsync(Function<? super T, ? extends CompletionStage<U>> fn) { return null; }
    public <U> CompletionStage<U> thenComposeAsync(Function<? super T, ? extends CompletionStage<U>> fn, java.util.concurrent.Executor executor) { return null; }
    public <U> CompletableFuture<U> handle(BiFunction<? super T, Throwable, ? extends U> fn) { return new CompletableFuture<>(); }
    public <U> CompletableFuture<U> handleAsync(BiFunction<? super T, Throwable, ? extends U> fn) { return new CompletableFuture<>(); }
    public CompletableFuture<T> whenComplete(BiConsumer<? super T, ? super Throwable> action) { return this; }
    public CompletableFuture<T> whenCompleteAsync(BiConsumer<? super T, ? super Throwable> action) { return this; }
    public CompletableFuture<T> exceptionally(Function<Throwable, ? extends T> fn) { return this; }
    public <U> CompletionStage<U> exceptionallyCompose(Function<Throwable, ? extends CompletionStage<U>> fn) { return null; }
    public <U> CompletionStage<U> exceptionallyComposeAsync(Function<Throwable, ? extends CompletionStage<U>> fn) { return null; }
    public CompletableFuture<T> toCompletableFuture() { return this; }
    public static <U> CompletionStage<U> completedStage(U value) { return null; }
    public static <U> CompletionStage<U> pendingStage() { return null; }
    public boolean cancel(boolean mayInterruptIfRunning) { return false; }
    public boolean isCancelled() { return false; }
    public boolean isDone() { return false; }
    public T get() throws InterruptedException, java.util.concurrent.ExecutionException { return null; }
    public T get(long timeout, java.util.concurrent.TimeUnit unit) throws InterruptedException, java.util.concurrent.ExecutionException, java.util.concurrent.TimeoutException { return null; }
    public T join() { return null; }
    public T getNow(T valueIfAbsent) { return valueIfAbsent; }
    public boolean complete(T value) { return false; }
    public boolean completeExceptionally(Throwable ex) { return false; }
    public <U> CompletableFuture<U> newIncompleteFuture() { return new CompletableFuture<>(); }
    public java.util.concurrent.Executor defaultExecutor() { return null; }
    public CompletableFuture<T> copy() { return this; }
    public CompletionStage<T> minimalCompletionStage() { return null; }
}
