package java.lang.management;

public class MemoryUsage {
    private final long init;
    private final long used;
    private final long committed;
    private final long max;

    public MemoryUsage(long init, long used, long committed, long max) {
        this.init = init;
        this.used = used;
        this.committed = committed;
        this.max = max;
    }

    public long getInit() { return init; }
    public long getUsed() { return used; }
    public long getCommitted() { return committed; }
    public long getMax() { return max; }
    public double getUsedPercent() { return max > 0 ? (double) used / max * 100.0 : 0.0; }
    public String toString() { return "init=" + init + ", used=" + used + ", committed=" + committed + ", max=" + max; }
}
