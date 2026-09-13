package poc.compat.java.util.concurrent.atomic;

abstract class Striped64 extends Number {
    Striped64() {}
    public abstract void set(long val);
    public abstract void lazySet(long val);
    public abstract long get();
    public abstract long getAndSet(long val);
    public abstract boolean compareAndSet(long expect, long update);
    public abstract long getAndAdd(long delta);
    public abstract long addAndGet(long delta);
    public abstract void update(long x);
    public abstract long reset();
    public abstract long sum();
}
