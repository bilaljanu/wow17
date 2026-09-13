package java.time;

public final class LocalTime implements Comparable<LocalTime>, java.io.Serializable {
    private static final LocalTime MIDNIGHT = new LocalTime(0, 0, 0, 0);

    private final int hour;
    private final int minute;
    private final int second;
    private final int nano;

    private LocalTime(int hour, int minute, int second, int nano) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.nano = nano;
    }

    public static LocalTime now() {
        return MIDNIGHT;
    }

    public static LocalTime of(int hour, int minute) {
        return new LocalTime(hour, minute, 0, 0);
    }

    public static LocalTime of(int hour, int minute, int second) {
        return new LocalTime(hour, minute, second, 0);
    }

    public int compareTo(LocalTime other) {
        if (hour != other.hour) return hour - other.hour;
        if (minute != other.minute) return minute - other.minute;
        if (second != other.second) return second - other.second;
        return nano - other.nano;
    }

    public boolean equals(Object other) {
        if (!(other instanceof LocalTime)) return false;
        LocalTime o = (LocalTime) other;
        return hour == o.hour && minute == o.minute && second == o.second && nano == o.nano;
    }

    public int hashCode() {
        return (int) ((long) hour * 3600000000L + (long) minute * 60000000L + (long) second * 1000000L + nano);
    }

    public String toString() {
        return hour + ":" + minute + ":" + second + "." + nano;
    }
}
