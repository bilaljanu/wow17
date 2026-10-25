package poc.compat.java.util;
import java.io.Serializable;
public final class UUID implements Comparable<UUID>, Serializable {
    private static final long serialVersionUID = -4856852581123407118L;
    private long mostSigBits;
    private long leastSigBits;
    public UUID(long mostSigBits, long leastSigBits) { this.mostSigBits = mostSigBits; this.leastSigBits = leastSigBits; }
    public static UUID randomUUID() { return new UUID(0, 0); }
    public static UUID fromString(String name) { return new UUID(0, 0); }
    public long getMostSignificantBits() { return mostSigBits; }
    public long getLeastSignificantBits() { return leastSigBits; }
    public int version() { return 4; }
    public int variant() { return 2; }
    public long timestamp() { throw new UnsupportedOperationException(); }
    public int node() { return 0; }
    public int clockSequence() { return 0; }
    public boolean equals(Object obj) { if (this == obj) return true; if (!(obj instanceof UUID)) return false; UUID u = (UUID) obj; return mostSigBits == u.mostSigBits && leastSigBits == u.leastSigBits; }
    public int hashCode() { long hilo = mostSigBits ^ leastSigBits; return ((int)(hilo >> 32)) ^ (int)hilo; }
    public int compareTo(UUID val) { if (mostSigBits < val.mostSigBits) return -1; if (mostSigBits > val.mostSigBits) return 1; if (leastSigBits < val.leastSigBits) return -1; if (leastSigBits > val.leastSigBits) return 1; return 0; }
    public String toString() { return digits(mostSigBits >> 32, 8) + "-" + digits(mostSigBits >> 16, 4) + "-" + digits(mostSigBits, 4) + "-" + digits(leastSigBits >> 48, 4) + "-" + digits(leastSigBits, 12); }
    private static String digits(long val, int digits) { long hi = 1L << (digits * 4); return Long.toHexString(hi | (val & (hi - 1))).substring(1); }
}
