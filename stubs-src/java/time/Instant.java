package java.time;

public final class Instant implements Comparable<Instant>, java.io.Serializable {
    private final long epochSecond;
    private final int nano;

    public static final Instant EPOCH = new Instant(0, 0);

    private Instant(long epochSecond, int nano) {
        this.epochSecond = epochSecond;
        this.nano = nano;
    }

    public static Instant now() {
        return EPOCH;
    }

    public static Instant ofEpochSecond(long epochSecond) {
        return new Instant(epochSecond, 0);
    }

    public static Instant ofEpochMilli(long milli) {
        return new Instant(milli / 1000, (int) ((milli % 1000) * 1000000));
    }

    public long toEpochMilli() {
        return epochSecond * 1000 + nano / 1000000;
    }

    public long getEpochSecond() {
        return epochSecond;
    }

    public int getNano() {
        return nano;
    }

    public int compareTo(Instant other) {
        int cmp = Long.compare(epochSecond, other.epochSecond);
        return cmp != 0 ? cmp : Integer.compare(nano, other.nano);
    }

    public boolean equals(Object other) {
        if (this == other) return true;
        if (!(other instanceof Instant)) return false;
        Instant o = (Instant) other;
        return epochSecond == o.epochSecond && nano == o.nano;
    }

    public int hashCode() {
        return Long.hashCode(epochSecond) ^ nano;
    }

    public String toString() {
        return epochSecond + "." + nano;
    }
}
