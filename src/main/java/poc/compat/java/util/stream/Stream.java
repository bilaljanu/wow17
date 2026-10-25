package poc.compat.java.util.stream;

import java.util.Comparator;
import java.util.Optional;
import java.util.function.*;
import java.util.stream.Collector;

public interface Stream<T> extends BaseStream<T, Stream<T>> {
    Stream<T> filter(Predicate<? super T> predicate);
    <R> Stream<R> map(Function<? super T, ? extends R> mapper);
    IntStream mapToInt(ToIntFunction<? super T> mapper);
    LongStream mapToLong(ToLongFunction<? super T> mapper);
    DoubleStream mapToDouble(ToDoubleFunction<? super T> mapper);
    <R> Stream<R> flatMap(Function<? super T, ? extends Stream<? extends R>> mapper);
    IntStream flatMapToInt(Function<? super T, ? extends IntStream> mapper);
    LongStream flatMapToLong(Function<? super T, ? extends LongStream> mapper);
    DoubleStream flatMapToDouble(Function<? super T, ? extends DoubleStream> mapper);
    Stream<T> distinct();
    Stream<T> sorted();
    Stream<T> sorted(Comparator<? super T> comparator);
    Stream<T> peek(Consumer<? super T> action);
    Stream<T> limit(long maxSize);
    Stream<T> skip(long n);
    void forEach(Consumer<? super T> action);
    void forEachOrdered(Consumer<? super T> action);
    Object[] toArray();
    <A> A[] toArray(IntFunction<A[]> generator);
    T reduce(T identity, BinaryOperator<T> accumulator);
    Optional<T> reduce(BinaryOperator<T> accumulator);
    <U> U reduce(U identity, BiFunction<U, ? super T, U> accumulator, BinaryOperator<U> combiner);
    <R, A> R collect(Collector<? super T, A, R> collector);
    <R> R collect(Supplier<R> supplier, BiConsumer<R, ? super T> accumulator, BiConsumer<R, R> combiner);
    long count();
    Optional<T> min(Comparator<? super T> comparator);
    Optional<T> max(Comparator<? super T> comparator);
    boolean anyMatch(Predicate<? super T> predicate);
    boolean allMatch(Predicate<? super T> predicate);
    boolean noneMatch(Predicate<? super T> predicate);
    Optional<T> findFirst();
    Optional<T> findAny();
    static <T> Builder<T> builder() { return null; }
    static <T> Stream<T> empty() { return null; }
    static <T> Stream<T> of(T t) { return null; }
    @SafeVarargs
    static <T> Stream<T> of(T... values) { return null; }
    static <T> Stream<T> iterate(T seed, UnaryOperator<T> f) { return null; }
    static <T> Stream<T> generate(Supplier<? extends T> s) { return null; }
    static <T> Stream<T> concat(Stream<? extends T> a, Stream<? extends T> b) { return null; }
    interface Builder<T> {
        void accept(T t);
        default Builder<T> add(T t) { accept(t); return this; }
        Stream<T> build();
    }
}
