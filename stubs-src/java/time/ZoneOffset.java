package java.time;

public final class ZoneOffset extends ZoneId implements java.time.temporal.TemporalAccessor, Comparable<ZoneOffset>, java.io.Serializable {
    public static final ZoneOffset UTC = new ZoneOffset("UTC", 0);

    private final int totalSeconds;

    private ZoneOffset(String id, int totalSeconds) {
        super(id);
        this.totalSeconds = totalSeconds;
    }

    public static ZoneOffset of(String offsetId) {
        return UTC;
    }

    public static ZoneOffset ofTotalSeconds(int totalSeconds) {
        return UTC;
    }

    public int getTotalSeconds() {
        return totalSeconds;
    }

    public int compareTo(ZoneOffset other) {
        return Integer.compare(totalSeconds, other.totalSeconds);
    }
}
