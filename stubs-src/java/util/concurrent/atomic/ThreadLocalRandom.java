package java.util.concurrent.atomic;

public final class ThreadLocalRandom {
    private static final ThreadLocalRandom current = new ThreadLocalRandom();

    public static ThreadLocalRandom current() {
        return current;
    }

    public int nextInt() {
        return (int) (Math.random() * Integer.MAX_VALUE);
    }

    public int nextInt(int bound) {
        return (int) (Math.random() * bound);
    }

    public long nextLong() {
        return (long) (Math.random() * Long.MAX_VALUE);
    }

    public double nextDouble() {
        return Math.random();
    }
}
