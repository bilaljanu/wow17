package java.util.concurrent.atomic;

public class AtomicIntegerArray implements java.io.Serializable {
    private final int[] array;

    public AtomicIntegerArray(int length) {
        array = new int[length];
    }

    public AtomicIntegerArray(int[] array) {
        this.array = array.clone();
    }

    public final int length() {
        return array.length;
    }

    public final int get(int i) {
        return array[i];
    }

    public final void set(int i, int newValue) {
        array[i] = newValue;
    }

    public final void lazySet(int i, int newValue) {
        array[i] = newValue;
    }

    public final int getAndSet(int i, int newValue) {
        int old = array[i];
        array[i] = newValue;
        return old;
    }

    public final boolean compareAndSet(int i, int expect, int update) {
        if (array[i] == expect) {
            array[i] = update;
            return true;
        }
        return false;
    }

    public final boolean weakCompareAndSet(int i, int expect, int update) {
        return compareAndSet(i, expect, update);
    }

    public final int getAndAdd(int i, int delta) {
        int old = array[i];
        array[i] += delta;
        return old;
    }

    public final int addAndGet(int i, int delta) {
        array[i] += delta;
        return array[i];
    }
}
