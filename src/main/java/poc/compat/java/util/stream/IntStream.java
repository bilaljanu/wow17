package poc.compat.java.util.stream;

import java.util.OptionalDouble;
import java.util.OptionalInt;
import java.util.function.*;

public interface IntStream extends BaseStream<Integer, IntStream> {
    IntStream filter(IntPredicate predicate);
    IntStream map(IntUnaryOperator mapper);
    <U> Stream<U> mapToObj(IntFunction<? extends U> mapper);
    LongStream mapToLong(IntToLongFunction mapper);
    DoubleStream mapToDouble(IntToDoubleFunction mapper);
    IntStream flatMap(IntFunction<? extends IntStream> mapper);
    IntStream distinct();
    IntStream sorted();
    IntStream peek(IntConsumer action);
    IntStream limit(long maxSize);
    IntStream skip(long n);
    void forEach(IntConsumer action);
    void forEachOrdered(IntConsumer action);
    int[] toArray();
    int reduce(int identity, IntBinaryOperator accumulator);
    OptionalInt reduce(IntBinaryOperator accumulator);
    <R> R collect(Supplier<R> supplier, ObjIntConsumer<R> accumulator, java.util.function.BiConsumer<R, R> combiner);
    long count();
    OptionalInt min();
    OptionalInt max();
    boolean anyMatch(IntPredicate predicate);
    boolean allMatch(IntPredicate predicate);
    boolean noneMatch(IntPredicate predicate);
    OptionalInt findFirst();
    OptionalInt findAny();
    LongStream asLongStream();
    DoubleStream asDoubleStream();
    Stream<Integer> boxed();
    static IntStream empty() { return null; }
    static IntStream of(int value) { return null; }
    static IntStream of(int... values) { return null; }
    static IntStream range(int startInclusive, int endExclusive) { return null; }
    static IntStream rangeClosed(int startInclusive, int endInclusive) { return null; }
    static Builder builder() { return null; }
    interface Builder {
        void accept(int value);
        default Builder add(int t) { accept(t); return this; }
        IntStream build();
    }
}
