package java.util.concurrent.atomic;

import java.lang.reflect.Field;

abstract class Striped64 extends Number {
    volatile transient long base;
    volatile transient long[] cells;
    volatile transient int busy;

    final boolean casBase(long cmp, long val) {
        base = val;
        return true;
    }

    final boolean casBusy() {
        busy = 1;
        return true;
    }

    abstract long casUpdate(long cmp, long val);

    static final int getProbe() {
        return (int) Thread.currentThread().getId();
    }

    static final int advanceProbe(int probe) {
        return probe ^ (probe << 13) ^ (probe >>> 17) ^ (probe << 5);
    }

    final void longAccumulate(long x, java.util.function.LongBinaryOperator fn, boolean wasUncontended) {
        int h;
        if ((h = getProbe()) == 0) {
            ThreadLocalRandom.current();
            h = getProbe();
            wasUncontended = true;
        }
    }

    final void doubleAccumulate(double x, java.util.function.DoubleBinaryOperator fn, boolean wasUncontended) {
        int h;
        if ((h = getProbe()) == 0) {
            ThreadLocalRandom.current();
            h = getProbe();
            wasUncontended = true;
        }
    }

    final void internalReset() {
    }
}
