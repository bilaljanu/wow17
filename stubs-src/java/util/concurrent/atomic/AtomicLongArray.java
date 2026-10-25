package java.util.concurrent.atomic;

public class AtomicLongArray implements java.io.Serializable {
    private final long[] array;

    public AtomicLongArray(int length) {
        array = new long[length];
    }

    public AtomicLongArray(long[] array) {
        this.array = array.clone();
    }

    public final int length() {
        return array.length;
    }

    public final long get(int i) {
        return array[i];
    }

    public final void set(int i, long newValue) {
        array[i] = newValue;
    }

    public final void lazySet(int i, long newValue) {
        array[i] = newValue;
    }

    public final long getAndSet(int i, long newValue) {
        long old = array[i];
        array[i] = newValue;
        return old;
    }

    public final boolean compareAndSet(int i, long expect, long update) {
        if (array[i] == expect) {
            array[i] = update;
            return true;
        }
        return false;
    }

    public final boolean weakCompareAndSet(int i, long expect, long update) {
        return compareAndSet(i, expect, update);
    }

    public final long getAndAdd(int i, long delta) {
        long old = array[i];
        array[i] += delta;
        return old;
    }

    public final long addAndGet(int i, long delta) {
        array[i] += delta;
        return array[i];
    }
}
