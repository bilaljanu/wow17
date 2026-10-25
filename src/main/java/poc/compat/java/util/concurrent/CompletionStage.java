package poc.compat.java.util.concurrent;

import java.util.function.*;

public interface CompletionStage<T> {
    <U> CompletionStage<U> thenApply(Function<? super T, ? extends U> fn);
    <U> CompletionStage<U> thenApplyAsync(Function<? super T, ? extends U> fn);
    <U> CompletionStage<U> thenApplyAsync(Function<? super T, ? extends U> fn, java.util.concurrent.Executor executor);
    CompletionStage<Void> thenAccept(Consumer<? super T> action);
    CompletionStage<Void> thenAcceptAsync(Consumer<? super T> action);
    CompletionStage<Void> thenAcceptAsync(Consumer<? super T> action, java.util.concurrent.Executor executor);
    CompletionStage<Void> thenRun(Runnable action);
    CompletionStage<Void> thenRunAsync(Runnable action);
    CompletionStage<Void> thenRunAsync(Runnable action, java.util.concurrent.Executor executor);
    <U,V> CompletionStage<V> thenCombine(CompletionStage<? extends U> other, BiFunction<? super T, ? super U, ? extends V> fn);
    <U> CompletionStage<Void> thenAcceptBoth(CompletionStage<? extends U> other, BiConsumer<? super T, ? super U> action);
    CompletionStage<Void> runAfterBoth(CompletionStage<?> other, Runnable action);
    <U> CompletionStage<U> applyToEither(CompletionStage<? extends T> other, Function<? super T, U> fn);
    CompletionStage<Void> acceptEither(CompletionStage<? extends T> other, Consumer<? super T> action);
    CompletionStage<Void> runAfterEither(CompletionStage<?> other, Runnable action);
    <U> CompletionStage<U> thenCompose(Function<? super T, ? extends CompletionStage<U>> fn);
    <U> CompletionStage<U> thenComposeAsync(Function<? super T, ? extends CompletionStage<U>> fn);
    <U> CompletionStage<U> thenComposeAsync(Function<? super T, ? extends CompletionStage<U>> fn, java.util.concurrent.Executor executor);
    <U> CompletionStage<U> handle(BiFunction<? super T, Throwable, ? extends U> fn);
    <U> CompletionStage<U> handleAsync(BiFunction<? super T, Throwable, ? extends U> fn);
    CompletionStage<T> whenComplete(BiConsumer<? super T, ? super Throwable> action);
    CompletionStage<T> whenCompleteAsync(BiConsumer<? super T, ? super Throwable> action);
    CompletionStage<T> exceptionally(Function<Throwable, ? extends T> fn);
    <U> CompletionStage<U> exceptionallyCompose(Function<Throwable, ? extends CompletionStage<U>> fn);
    <U> CompletionStage<U> exceptionallyComposeAsync(Function<Throwable, ? extends CompletionStage<U>> fn);
    CompletionStage<T> toCompletableFuture();
}
