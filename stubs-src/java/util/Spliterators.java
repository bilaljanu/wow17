package java.util;

import java.util.function.Consumer;
import java.util.function.IntConsumer;
import java.util.function.LongConsumer;
import java.util.function.DoubleConsumer;

public final class Spliterators {
    public static <T> Spliterator<T> emptySpliterator() {
        return new StubSpliterator<>();
    }

    public static <T> Spliterator<T> spliterator(Collection<? extends T> c, int characteristics) {
        return new StubSpliterator<>(characteristics);
    }

    public static <T> Spliterator<T> spliterator(Object[] a, int characteristics) {
        return new StubSpliterator<>(characteristics);
    }

    public static <T> Spliterator<T> spliterator(Object[] a, int additionalCharacteristics, int fromIndex, int toIndex) {
        return new StubSpliterator<>(additionalCharacteristics);
    }

    public static Spliterator.OfInt spliterator(int[] a, int characteristics) {
        return new StubIntSpliterator(characteristics);
    }

    public static Spliterator.OfLong spliterator(long[] a, int characteristics) {
        return new StubLongSpliterator(characteristics);
    }

    public static Spliterator.OfDouble spliterator(double[] a, int characteristics) {
        return new StubDoubleSpliterator(characteristics);
    }

    public static Spliterator.OfDouble spliterator(double[] a, int additionalCharacteristics, int fromIndex, int toIndex) {
        return new StubDoubleSpliterator(additionalCharacteristics);
    }

    // Added for missing methods from error log:
    // 1. spliterator(Iterator, long, int)
    public static <T> Spliterator<T> spliterator(Iterator<T> iterator, long characteristic, int additionalCharacteristics) {
        return new StubSpliterator<>(additionalCharacteristics);
    }

    // 2. spliterator(Collection, int) - already exists (line 13)

    // 3. spliterator(T[], int) - already covered by line 17 (Object[])

    // 4. spliterator(double[], int, int, int) for OfDouble - already exists (line 37)

    private static class StubSpliterator<T> implements Spliterator<T> {
        private final int characteristics;
        StubSpliterator() { this(Spliterator.ORDERED | Spliterator.SIZED | Spliterator.IMMUTABLE); }
        StubSpliterator(int characteristics) { this.characteristics = characteristics; }
        public Spliterator<T> trySplit() { return null; }
        public long estimateSize() { return 0; }
        public long getExactSizeIfKnown() { return 0; }
        public int characteristics() { return characteristics; }
        public boolean hasCharacteristics(int characteristics) { return (this.characteristics & characteristics) == characteristics; }
        public boolean tryAdvance(Consumer<? super T> action) { return false; }
        public void forEachRemaining(Consumer<? super T> action) {}
        public java.util.Comparator<? super T> getComparator() { return null; }
    }

    private static class StubIntSpliterator implements Spliterator.OfInt {
        private final int characteristics;
        StubIntSpliterator(int characteristics) { this.characteristics = characteristics; }
        public OfInt trySplit() { return null; }
        public long estimateSize() { return 0; }
        public long getExactSizeIfKnown() { return 0; }
        public int characteristics() { return characteristics; }
        public boolean hasCharacteristics(int c) { return (this.characteristics & c) == c; }
        public boolean tryAdvance(IntConsumer action) { return false; }
        public void forEachRemaining(IntConsumer action) {}
        public boolean tryAdvance(Consumer<? super Integer> action) { return false; }
        public void forEachRemaining(Consumer<? super Integer> action) {}
        public java.util.Comparator<? super Integer> getComparator() { return null; }
    }

    private static class StubLongSpliterator implements Spliterator.OfLong {
        private final int characteristics;
        StubLongSpliterator(int characteristics) { this.characteristics = characteristics; }
        public OfLong trySplit() { return null; }
        public long estimateSize() { return 0; }
        public long getExactSizeIfKnown() { return 0; }
        public int characteristics() { return characteristics; }
        public boolean hasCharacteristics(int c) { return (this.characteristics & c) == c; }
        public boolean tryAdvance(LongConsumer action) { return false; }
        public void forEachRemaining(LongConsumer action) {}
        public boolean tryAdvance(Consumer<? super Long> action) { return false; }
        public void forEachRemaining(Consumer<? super Long> action) {}
        public java.util.Comparator<? super Long> getComparator() { return null; }
    }

    private static class StubDoubleSpliterator implements Spliterator.OfDouble {
        private final int characteristics;
        StubDoubleSpliterator(int characteristics) { this.characteristics = characteristics; }
        public OfDouble trySplit() { return null; }
        public long estimateSize() { return 0; }
        public long getExactSizeIfKnown() { return 0; }
        public int characteristics() { return characteristics; }
        public boolean hasCharacteristics(int c) { return (this.characteristics & c) == c; }
        public boolean tryAdvance(DoubleConsumer action) { return false; }
        public void forEachRemaining(DoubleConsumer action) {}
        public boolean tryAdvance(Consumer<? super Double> action) { return false; }
        public void forEachRemaining(Consumer<? super Double> action) {}
        public java.util.Comparator<? super Double> getComparator() { return null; }
    }
}