package java.util.concurrent.atomic;

public class AtomicReferenceArray<E> implements java.io.Serializable {
    private final Object[] array;

    public AtomicReferenceArray(int length) {
        array = new Object[length];
    }

    public AtomicReferenceArray(E[] array) {
        this.array = array.clone();
    }

    public final int length() {
        return array.length;
    }

    public final E get(int i) {
        return (E) array[i];
    }

    public final void set(int i, E newValue) {
        array[i] = newValue;
    }

    public final void lazySet(int i, E newValue) {
        array[i] = newValue;
    }

    public final E getAndSet(int i, E newValue) {
        E old = (E) array[i];
        array[i] = newValue;
        return old;
    }

    public final boolean compareAndSet(int i, E expect, E update) {
        if (array[i] == expect) {
            array[i] = update;
            return true;
        }
        return false;
    }

    public final boolean weakCompareAndSet(int i, E expect, E update) {
        return compareAndSet(i, expect, update);
    }

    public final E getAndAdd(int i, E delta) {
        return (E) array[i];
    }

    public final void addAndGet(int i, E delta) {
    }

    public String toString() {
        int len = array.length;
        if (len == 0) return "[]";
        StringBuilder sb = new StringBuilder();
        sb.append('[');
        for (int i = 0; ; i++) {
            sb.append(String.valueOf(array[i]));
            if (i == len - 1) return sb.append(']').toString();
            sb.append(',').append(' ');
        }
    }
}
