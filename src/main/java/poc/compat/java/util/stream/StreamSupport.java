package poc.compat.java.util.stream;

import java.util.stream.Collector;
import java.util.function.*;

public final class StreamSupport {
    private StreamSupport() {}

    @SuppressWarnings("unchecked")
    public static <T> Stream<T> stream(java.util.Spliterator<T> spliterator, boolean parallel) {
        return (Stream<T>) new NoopStream();
    }
    public static IntStream intStream(java.util.Spliterator.OfInt spliterator, boolean parallel) { return new NoopIntStream(); }
    public static LongStream longStream(java.util.Spliterator.OfLong spliterator, boolean parallel) { return new NoopLongStream(); }
    public static DoubleStream doubleStream(java.util.Spliterator.OfDouble spliterator, boolean parallel) { return new NoopDoubleStream(); }

    @SuppressWarnings({"unchecked", "rawtypes"})
    private static <T> Stream<T> noopStream() { return (Stream) new NoopStream(); }

    private static class NoopStream implements Stream<Object> {
        public java.util.Iterator<Object> iterator() { return java.util.Collections.emptyIterator(); }
        public java.util.Spliterator<Object> spliterator() { return null; }
        public boolean isParallel() { return false; }
        public Stream<Object> sequential() { return this; }
        public Stream<Object> parallel() { return this; }
        public Stream<Object> unordered() { return this; }
        public Stream<Object> onClose(Runnable closeHandler) { return this; }
        public void close() {}
        public Stream<Object> filter(Predicate<? super Object> p) { return this; }
        public <R> Stream<R> map(Function<? super Object, ? extends R> m) { return noopStream(); }
        public IntStream mapToInt(ToIntFunction<? super Object> m) { return new NoopIntStream(); }
        public LongStream mapToLong(ToLongFunction<? super Object> m) { return new NoopLongStream(); }
        public DoubleStream mapToDouble(ToDoubleFunction<? super Object> m) { return new NoopDoubleStream(); }
        public <R> Stream<R> flatMap(Function<? super Object, ? extends Stream<? extends R>> m) { return noopStream(); }
        public IntStream flatMapToInt(Function<? super Object, ? extends IntStream> m) { return new NoopIntStream(); }
        public LongStream flatMapToLong(Function<? super Object, ? extends LongStream> m) { return new NoopLongStream(); }
        public DoubleStream flatMapToDouble(Function<? super Object, ? extends DoubleStream> m) { return new NoopDoubleStream(); }
        public Stream<Object> distinct() { return this; }
        public Stream<Object> sorted() { return this; }
        public Stream<Object> sorted(java.util.Comparator<? super Object> c) { return this; }
        public Stream<Object> peek(Consumer<? super Object> a) { return this; }
        public Stream<Object> limit(long m) { return this; }
        public Stream<Object> skip(long n) { return this; }
        public void forEach(Consumer<? super Object> a) {}
        public void forEachOrdered(Consumer<? super Object> a) {}
        public Object[] toArray() { return new Object[0]; }
        public <A> A[] toArray(IntFunction<A[]> g) { return g.apply(0); }
        public Object reduce(Object id, BinaryOperator<Object> a) { return id; }
        public java.util.Optional<Object> reduce(BinaryOperator<Object> a) { return java.util.Optional.empty(); }
        public <U> U reduce(U id, BiFunction<U, ? super Object, U> a, BinaryOperator<U> c) { return id; }
        public <R, A> R collect(Collector<? super Object, A, R> c) { return null; }
        public <R> R collect(Supplier<R> s, BiConsumer<R, ? super Object> a, BiConsumer<R, R> c) { return s.get(); }
        public long count() { return 0; }
        public java.util.Optional<Object> min(java.util.Comparator<? super Object> c) { return java.util.Optional.empty(); }
        public java.util.Optional<Object> max(java.util.Comparator<? super Object> c) { return java.util.Optional.empty(); }
        public boolean anyMatch(Predicate<? super Object> p) { return false; }
        public boolean allMatch(Predicate<? super Object> p) { return true; }
        public boolean noneMatch(Predicate<? super Object> p) { return true; }
        public java.util.Optional<Object> findFirst() { return java.util.Optional.empty(); }
        public java.util.Optional<Object> findAny() { return java.util.Optional.empty(); }
    }

    private static class NoopIntStream implements IntStream {
        public java.util.Iterator<Integer> iterator() { return java.util.Collections.emptyIterator(); }
        public java.util.Spliterator<Integer> spliterator() { return null; }
        public boolean isParallel() { return false; }
        public IntStream sequential() { return this; }
        public IntStream parallel() { return this; }
        public IntStream unordered() { return this; }
        public IntStream onClose(Runnable h) { return this; }
        public void close() {}
        public IntStream filter(IntPredicate p) { return this; }
        public IntStream map(IntUnaryOperator m) { return this; }
        public <U> Stream<U> mapToObj(IntFunction<? extends U> m) { return noopStream(); }
        public LongStream mapToLong(IntToLongFunction m) { return new NoopLongStream(); }
        public DoubleStream mapToDouble(IntToDoubleFunction m) { return new NoopDoubleStream(); }
        public IntStream flatMap(IntFunction<? extends IntStream> m) { return this; }
        public IntStream distinct() { return this; }
        public IntStream sorted() { return this; }
        public IntStream peek(IntConsumer a) { return this; }
        public IntStream limit(long m) { return this; }
        public IntStream skip(long n) { return this; }
        public void forEach(IntConsumer a) {}
        public void forEachOrdered(IntConsumer a) {}
        public int[] toArray() { return new int[0]; }
        public int reduce(int id, IntBinaryOperator a) { return id; }
        public java.util.OptionalInt reduce(IntBinaryOperator a) { return java.util.OptionalInt.empty(); }
        public <R> R collect(Supplier<R> s, java.util.function.ObjIntConsumer<R> a, java.util.function.BiConsumer<R, R> c) { return s.get(); }
        public long count() { return 0; }
        public java.util.OptionalInt min() { return java.util.OptionalInt.empty(); }
        public java.util.OptionalInt max() { return java.util.OptionalInt.empty(); }
        public boolean anyMatch(IntPredicate p) { return false; }
        public boolean allMatch(IntPredicate p) { return true; }
        public boolean noneMatch(IntPredicate p) { return true; }
        public java.util.OptionalInt findFirst() { return java.util.OptionalInt.empty(); }
        public java.util.OptionalInt findAny() { return java.util.OptionalInt.empty(); }
        public LongStream asLongStream() { return new NoopLongStream(); }
        public DoubleStream asDoubleStream() { return new NoopDoubleStream(); }
        public Stream<Integer> boxed() { return noopStream(); }
    }

    private static class NoopLongStream implements LongStream {
        public java.util.Iterator<Long> iterator() { return java.util.Collections.emptyIterator(); }
        public java.util.Spliterator<Long> spliterator() { return null; }
        public boolean isParallel() { return false; }
        public LongStream sequential() { return this; }
        public LongStream parallel() { return this; }
        public LongStream unordered() { return this; }
        public LongStream onClose(Runnable h) { return this; }
        public void close() {}
        public LongStream filter(LongPredicate p) { return this; }
        public LongStream map(LongUnaryOperator m) { return this; }
        public <U> Stream<U> mapToObj(LongFunction<? extends U> m) { return noopStream(); }
        public IntStream mapToInt(LongToIntFunction m) { return new NoopIntStream(); }
        public DoubleStream mapToDouble(LongToDoubleFunction m) { return new NoopDoubleStream(); }
        public LongStream flatMap(LongFunction<? extends LongStream> m) { return this; }
        public LongStream distinct() { return this; }
        public LongStream sorted() { return this; }
        public LongStream peek(LongConsumer a) { return this; }
        public LongStream limit(long m) { return this; }
        public LongStream skip(long n) { return this; }
        public void forEach(LongConsumer a) {}
        public void forEachOrdered(LongConsumer a) {}
        public long[] toArray() { return new long[0]; }
        public long reduce(long id, LongBinaryOperator a) { return id; }
        public java.util.OptionalLong reduce(LongBinaryOperator a) { return java.util.OptionalLong.empty(); }
        public <R> R collect(Supplier<R> s, java.util.function.ObjLongConsumer<R> a, java.util.function.BiConsumer<R, R> c) { return s.get(); }
        public long count() { return 0; }
        public java.util.OptionalLong min() { return java.util.OptionalLong.empty(); }
        public java.util.OptionalLong max() { return java.util.OptionalLong.empty(); }
        public boolean anyMatch(LongPredicate p) { return false; }
        public boolean allMatch(LongPredicate p) { return true; }
        public boolean noneMatch(LongPredicate p) { return true; }
        public java.util.OptionalLong findFirst() { return java.util.OptionalLong.empty(); }
        public java.util.OptionalLong findAny() { return java.util.OptionalLong.empty(); }
        public DoubleStream asDoubleStream() { return new NoopDoubleStream(); }
        public Stream<Long> boxed() { return noopStream(); }
    }

    private static class NoopDoubleStream implements DoubleStream {
        public java.util.Iterator<Double> iterator() { return java.util.Collections.emptyIterator(); }
        public java.util.Spliterator<Double> spliterator() { return null; }
        public boolean isParallel() { return false; }
        public DoubleStream sequential() { return this; }
        public DoubleStream parallel() { return this; }
        public DoubleStream unordered() { return this; }
        public DoubleStream onClose(Runnable h) { return this; }
        public void close() {}
        public DoubleStream filter(DoublePredicate p) { return this; }
        public DoubleStream map(DoubleUnaryOperator m) { return this; }
        public <U> Stream<U> mapToObj(DoubleFunction<? extends U> m) { return noopStream(); }
        public IntStream mapToInt(DoubleToIntFunction m) { return new NoopIntStream(); }
        public LongStream mapToLong(DoubleToLongFunction m) { return new NoopLongStream(); }
        public DoubleStream flatMap(DoubleFunction<? extends DoubleStream> m) { return this; }
        public DoubleStream distinct() { return this; }
        public DoubleStream sorted() { return this; }
        public DoubleStream peek(DoubleConsumer a) { return this; }
        public DoubleStream limit(long m) { return this; }
        public DoubleStream skip(long n) { return this; }
        public void forEach(DoubleConsumer a) {}
        public void forEachOrdered(DoubleConsumer a) {}
        public double[] toArray() { return new double[0]; }
        public double reduce(double id, DoubleBinaryOperator a) { return id; }
        public java.util.OptionalDouble reduce(DoubleBinaryOperator a) { return java.util.OptionalDouble.empty(); }
        public <R> R collect(Supplier<R> s, java.util.function.ObjDoubleConsumer<R> a, java.util.function.BiConsumer<R, R> c) { return s.get(); }
        public long count() { return 0; }
        public java.util.OptionalDouble min() { return java.util.OptionalDouble.empty(); }
        public java.util.OptionalDouble max() { return java.util.OptionalDouble.empty(); }
        public boolean anyMatch(DoublePredicate p) { return false; }
        public boolean allMatch(DoublePredicate p) { return true; }
        public boolean noneMatch(DoublePredicate p) { return true; }
        public java.util.OptionalDouble findFirst() { return java.util.OptionalDouble.empty(); }
        public java.util.OptionalDouble findAny() { return java.util.OptionalDouble.empty(); }
        public Stream<Double> boxed() { return noopStream(); }
    }
}
