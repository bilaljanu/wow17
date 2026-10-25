package poc.compat.java.util.concurrent.atomic;

public class ThreadLocalRandom extends java.util.Random {
    private static final ThreadLocalRandom instance = new ThreadLocalRandom();
    private static long seed = System.nanoTime();

    public static ThreadLocalRandom current() { return instance; }

    private ThreadLocalRandom() { super(0); }

    public int nextInt() { return super.nextInt(); }
    public int nextInt(int bound) { return super.nextInt(bound); }
    public int nextInt(int origin, int bound) { return origin + nextInt(bound - origin); }
    public long nextLong() { return super.nextLong(); }
    public long nextLong(long bound) { return Math.abs(super.nextLong()) % bound; }
    public long nextLong(long origin, long bound) { return origin + nextLong(bound - origin); }
    public double nextDouble() { return super.nextDouble(); }
    public double nextDouble(double bound) { return super.nextDouble() * bound; }
    public double nextDouble(double origin, double bound) { return origin + nextDouble() * (bound - origin); }
    public float nextFloat() { return super.nextFloat(); }
    public boolean nextBoolean() { return super.nextBoolean(); }
    public void nextBytes(byte[] bytes) { super.nextBytes(bytes); }
    public void setSeed(long seed) { ThreadLocalRandom.seed = seed; }
}
