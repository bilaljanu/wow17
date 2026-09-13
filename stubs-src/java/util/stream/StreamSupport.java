package java.util.stream;

import java.util.Spliterator;
import java.util.function.Supplier;

public final class StreamSupport {
    public static <T> Stream<T> stream(Spliterator<T> spliterator, boolean parallel) {
        return Stream.empty();
    }

    public static <T> Stream<T> stream(Supplier<Spliterator<T>> supplier, int characteristics, boolean parallel) {
        return Stream.empty();
    }

    public static IntStream intStream(Spliterator.OfInt spliterator, boolean parallel) {
        return IntStream.empty();
    }

    public static IntStream intStream(Supplier<Spliterator.OfInt> supplier, int characteristics, boolean parallel) {
        return IntStream.empty();
    }

    public static LongStream longStream(Spliterator.OfLong spliterator, boolean parallel) {
        return LongStream.empty();
    }

    public static LongStream longStream(Supplier<Spliterator.OfLong> supplier, int characteristics, boolean parallel) {
        return LongStream.empty();
    }

    public static DoubleStream doubleStream(Spliterator.OfDouble spliterator, boolean parallel) {
        return DoubleStream.empty();
    }

    public static DoubleStream doubleStream(Supplier<Spliterator.OfDouble> supplier, int characteristics, boolean parallel) {
        return DoubleStream.empty();
    }
}
