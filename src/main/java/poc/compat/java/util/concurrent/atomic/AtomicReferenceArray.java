package poc.compat.java.util.concurrent.atomic;

public class AtomicReferenceArray<E> implements java.io.Serializable {
    private final Object[] array;
    private static final long serialVersionUID = -6209656149925076749L;

    public AtomicReferenceArray(int length) { array = new Object[length]; }
    public AtomicReferenceArray(E[] array) { this.array = array.clone(); }

    public final int length() { return array.length; }
    public final E get(int i) { return (E) array[i]; }
    public final void set(int i, E newValue) { array[i] = newValue; }
    public final void lazySet(int i, E newValue) { array[i] = newValue; }
    public final E getAndSet(int i, E newValue) { E old = (E) array[i]; array[i] = newValue; return old; }
    public final boolean compareAndSet(int i, E expect, E update) { if (array[i] == expect) { array[i] = update; return true; } return false; }
    public final boolean weakCompareAndSet(int i, E expect, E update) { return compareAndSet(i, expect, update); }
    public final E getAndUpdate(int i, java.util.function.UnaryOperator<E> updateFunction) { E old = (E) array[i]; array[i] = updateFunction.apply(old); return old; }
    public final E updateAndGet(int i, java.util.function.UnaryOperator<E> updateFunction) { return (E) (array[i] = updateFunction.apply((E) array[i])); }
    public final E getAndAccumulate(int i, E x, java.util.function.BinaryOperator<E> accumulatorFunction) { E old = (E) array[i]; array[i] = accumulatorFunction.apply(old, x); return old; }
    public final E accumulateAndGet(int i, E x, java.util.function.BinaryOperator<E> accumulatorFunction) { return (E) (array[i] = accumulatorFunction.apply((E) array[i], x)); }
}
