package poc.compat.java.util;

public final class Spliterators {
    private Spliterators() {}
    public static <T> java.util.Spliterator<T> emptySpliterator() { return null; }
    public static java.util.Spliterator.OfInt emptyIntSpliterator() { return null; }
    public static java.util.Spliterator.OfLong emptyLongSpliterator() { return null; }
    public static java.util.Spliterator.OfDouble emptyDoubleSpliterator() { return null; }
    public static java.util.Spliterator.OfInt spliterator(int[] array, int characteristics) { return null; }
    public static java.util.Spliterator.OfLong spliterator(long[] array, int characteristics) { return null; }
    public static java.util.Spliterator.OfDouble spliterator(double[] array, int characteristics) { return null; }
    public static <T> java.util.Spliterator<T> iteratorSpliterator(java.util.Iterator<? extends T> iterator, int characteristics) { return null; }
}
