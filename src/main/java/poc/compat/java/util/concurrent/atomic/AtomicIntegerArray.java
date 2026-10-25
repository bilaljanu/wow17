package poc.compat.java.util.concurrent.atomic;

public class AtomicIntegerArray implements java.io.Serializable {
    private final int[] array;
    private static final long serialVersionUID = -2302025317659568447L;

    public AtomicIntegerArray(int length) { array = new int[length]; }
    public AtomicIntegerArray(int[] array) { this.array = array.clone(); }

    public final int get(int i) { return array[i]; }
    public final void set(int i, int newValue) { array[i] = newValue; }
    public final void lazySet(int i, int newValue) { array[i] = newValue; }
    public final int getAndSet(int i, int newValue) { int old = array[i]; array[i] = newValue; return old; }
    public final boolean compareAndSet(int i, int expect, int update) { if (array[i] == expect) { array[i] = update; return true; } return false; }
    public final boolean weakCompareAndSet(int i, int expect, int update) { return compareAndSet(i, expect, update); }
    public final int getAndIncrement(int i) { return array[i]++; }
    public final int getAndDecrement(int i) { return array[i]--; }
    public final int getAndAdd(int i, int delta) { int v = array[i]; array[i] += delta; return v; }
    public final int incrementAndGet(int i) { return ++array[i]; }
    public final int decrementAndGet(int i) { return --array[i]; }
    public final int addAndGet(int i, int delta) { return array[i] += delta; }
    public final int getAndUpdate(int i, java.util.function.IntUnaryOperator updateFunction) { int old = array[i]; array[i] = updateFunction.applyAsInt(old); return old; }
    public final int updateAndGet(int i, java.util.function.IntUnaryOperator updateFunction) { return array[i] = updateFunction.applyAsInt(array[i]); }
    public final int getAndAccumulate(int i, int x, java.util.function.IntBinaryOperator accumulatorFunction) { int old = array[i]; array[i] = accumulatorFunction.applyAsInt(old, x); return old; }
    public final int accumulateAndGet(int i, int x, java.util.function.IntBinaryOperator accumulatorFunction) { return array[i] = accumulatorFunction.applyAsInt(array[i], x); }
    public final int length() { return array.length; }
    public final int[] get() { return array.clone(); }
}
