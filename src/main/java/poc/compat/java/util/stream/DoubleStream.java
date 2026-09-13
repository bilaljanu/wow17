package poc.compat.java.util.stream;

import java.util.OptionalDouble;
import java.util.function.*;

public interface DoubleStream extends BaseStream<Double, DoubleStream> {
    DoubleStream filter(DoublePredicate predicate);
    DoubleStream map(DoubleUnaryOperator mapper);
    <U> Stream<U> mapToObj(DoubleFunction<? extends U> mapper);
    IntStream mapToInt(DoubleToIntFunction mapper);
    LongStream mapToLong(DoubleToLongFunction mapper);
    DoubleStream flatMap(DoubleFunction<? extends DoubleStream> mapper);
    DoubleStream distinct();
    DoubleStream sorted();
    DoubleStream peek(DoubleConsumer action);
    DoubleStream limit(long maxSize);
    DoubleStream skip(long n);
    void forEach(DoubleConsumer action);
    void forEachOrdered(DoubleConsumer action);
    double[] toArray();
    double reduce(double identity, DoubleBinaryOperator accumulator);
    OptionalDouble reduce(DoubleBinaryOperator accumulator);
    <R> R collect(Supplier<R> supplier, ObjDoubleConsumer<R> accumulator, java.util.function.BiConsumer<R, R> combiner);
    long count();
    OptionalDouble min();
    OptionalDouble max();
    boolean anyMatch(DoublePredicate predicate);
    boolean allMatch(DoublePredicate predicate);
    boolean noneMatch(DoublePredicate predicate);
    OptionalDouble findFirst();
    OptionalDouble findAny();
    Stream<Double> boxed();
    static DoubleStream empty() { return null; }
    static DoubleStream of(double value) { return null; }
    static DoubleStream of(double... values) { return null; }
    static Builder builder() { return null; }
    interface Builder {
        void accept(double value);
        default Builder add(double t) { accept(t); return this; }
        DoubleStream build();
    }
}
