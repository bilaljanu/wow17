package poc.compat.java.util.concurrent.atomic;

public class LongAdder extends Striped64 implements java.io.Serializable {
    public LongAdder() {}
    public void add(long x) {}
    public void increment() {}
    public void decrement() {}
    public long sum() { return 0; }
    public long reset() { return 0; }
    public void set(long x) {}
    public void lazySet(long x) {}
    public long get() { return 0; }
    public long getAndSet(long val) { return 0; }
    public boolean compareAndSet(long expect, long update) { return false; }
    public long getAndAdd(long delta) { return 0; }
    public long addAndGet(long delta) { return 0; }
    public void update(long x) {}
    public long sumThenReset() { return 0; }
    public String toString() { return "0"; }
    public long longValue() { return 0; }
    public int intValue() { return 0; }
    public float floatValue() { return 0; }
    public double doubleValue() { return 0; }
}
