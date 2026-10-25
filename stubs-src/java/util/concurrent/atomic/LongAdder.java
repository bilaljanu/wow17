package java.util.concurrent.atomic;

public class LongAdder extends Striped64 {
    public LongAdder() {
    }

    public void add(long x) {
    }

    public void increment() {
        add(1);
    }

    public void decrement() {
        add(-1);
    }

    public long sum() {
        return 0;
    }

    public long sumThenReset() {
        return 0;
    }

    public long intValue() {
        return sum();
    }

    public long longValue() {
        return sum();
    }

    public float floatValue() {
        return sum();
    }

    public double doubleValue() {
        return sum();
    }

    public String toString() {
        return Long.toString(sum());
    }
}
