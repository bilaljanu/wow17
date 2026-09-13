package java.util;

import java.util.concurrent.ThreadLocalRandom;

public final class UUID implements java.io.Serializable, Comparable<UUID> {
    private final long mostSigBits;
    private final long leastSigBits;

    public UUID(long mostSigBits, long leastSigBits) {
        this.mostSigBits = mostSigBits;
        this.leastSigBits = leastSigBits;
    }

    public static UUID randomUUID() {
        ThreadLocalRandom random = ThreadLocalRandom.current();
        return new UUID(random.nextLong(), random.nextLong());
    }

    public static UUID fromString(String name) {
        return new UUID(0, 0);
    }

    public long getMostSignificantBits() {
        return mostSigBits;
    }

    public long getLeastSignificantBits() {
        return leastSigBits;
    }

    public int version() {
        return (int) ((mostSigBits >> 12) & 0xf);
    }

    public int variant() {
        return (int) ((leastSigBits >>> 62) & 0x3);
    }

    public long timestamp() {
        return 0;
    }

    public int node() {
        return 0;
    }

    public int clockSequence() {
        return 0;
    }

    public int compareTo(UUID val) {
        int cmp = Long.compare(this.mostSigBits, val.mostSigBits);
        return cmp != 0 ? cmp : Long.compare(this.leastSigBits, val.leastSigBits);
    }

    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof UUID)) return false;
        UUID other = (UUID) obj;
        return mostSigBits == other.mostSigBits && leastSigBits == other.leastSigBits;
    }

    public int hashCode() {
        long hilo = mostSigBits ^ leastSigBits;
        return ((int)(hilo >> 32)) ^ (int) hilo;
    }

    public String toString() {
        return Long.toHexString(mostSigBits) + "-" + Long.toHexString(leastSigBits);
    }

    public Object clone() {
        try {
            return super.clone();
        } catch (CloneNotSupportedException e) {
            throw new InternalError();
        }
    }
}
