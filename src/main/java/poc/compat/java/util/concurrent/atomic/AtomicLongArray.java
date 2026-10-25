package poc.compat.java.util.concurrent.atomic;

public class AtomicLongArray implements java.io.Serializable {
    private final long[] array;
    private static final long serialVersionUID = -2302025317659568448L;

    public AtomicLongArray(int length) { array = new long[length]; }
    public AtomicLongArray(long[] array) { this.array = array.clone(); }

    public final long get(int i) { return array[i]; }
    public final void set(int i, long newValue) { array[i] = newValue; }
    public final void lazySet(int i, long newValue) { array[i] = newValue; }
    public final long getAndSet(int i, long newValue) { long old = array[i]; array[i] = newValue; return old; }
    public final boolean compareAndSet(int i, long expect, long update) { if (array[i] == expect) { array[i] = update; return true; } return false; }
    public final boolean weakCompareAndSet(int i, long expect, long update) { return compareAndSet(i, expect, update); }
    public final long getAndIncrement(int i) { return array[i]++; }
    public final long getAndDecrement(int i) { return array[i]--; }
    public final long getAndAdd(int i, long delta) { long v = array[i]; array[i] += delta; return v; }
    public final long incrementAndGet(int i) { return ++array[i]; }
    public final long decrementAndGet(int i) { return --array[i]; }
    public final long addAndGet(int i, long delta) { return array[i] += delta; }
    public final long getAndUpdate(int i, java.util.function.LongUnaryOperator updateFunction) { long old = array[i]; array[i] = updateFunction.applyAsLong(old); return old; }
    public final long updateAndGet(int i, java.util.function.LongUnaryOperator updateFunction) { return array[i] = updateFunction.applyAsLong(array[i]); }
    public final long getAndAccumulate(int i, long x, java.util.function.LongBinaryOperator accumulatorFunction) { long old = array[i]; array[i] = accumulatorFunction.applyAsLong(old, x); return old; }
    public final long accumulateAndGet(int i, long x, java.util.function.LongBinaryOperator accumulatorFunction) { return array[i] = accumulatorFunction.applyAsLong(array[i], x); }
    public final int length() { return array.length; }
}
