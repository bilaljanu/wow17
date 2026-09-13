package poc.compat.java.util.stream;

import java.util.OptionalDouble;
import java.util.OptionalLong;
import java.util.function.*;

public interface LongStream extends BaseStream<Long, LongStream> {
    LongStream filter(LongPredicate predicate);
    LongStream map(LongUnaryOperator mapper);
    <U> Stream<U> mapToObj(LongFunction<? extends U> mapper);
    IntStream mapToInt(LongToIntFunction mapper);
    DoubleStream mapToDouble(LongToDoubleFunction mapper);
    LongStream flatMap(LongFunction<? extends LongStream> mapper);
    LongStream distinct();
    LongStream sorted();
    LongStream peek(LongConsumer action);
    LongStream limit(long maxSize);
    LongStream skip(long n);
    void forEach(LongConsumer action);
    void forEachOrdered(LongConsumer action);
    long[] toArray();
    long reduce(long identity, LongBinaryOperator accumulator);
    OptionalLong reduce(LongBinaryOperator accumulator);
    <R> R collect(Supplier<R> supplier, ObjLongConsumer<R> accumulator, java.util.function.BiConsumer<R, R> combiner);
    long count();
    OptionalLong min();
    OptionalLong max();
    boolean anyMatch(LongPredicate predicate);
    boolean allMatch(LongPredicate predicate);
    boolean noneMatch(LongPredicate predicate);
    OptionalLong findFirst();
    OptionalLong findAny();
    DoubleStream asDoubleStream();
    Stream<Long> boxed();
    static LongStream empty() { return null; }
    static LongStream of(long value) { return null; }
    static LongStream of(long... values) { return null; }
    static LongStream range(long startInclusive, long endExclusive) { return null; }
    static LongStream rangeClosed(long startInclusive, long endInclusive) { return null; }
    static Builder builder() { return null; }
    interface Builder {
        void accept(long value);
        default Builder add(long t) { accept(t); return this; }
        LongStream build();
    }
}
