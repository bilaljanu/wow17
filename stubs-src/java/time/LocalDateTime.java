package java.time;

public final class LocalDateTime implements Comparable<LocalDateTime>, java.io.Serializable {
    private static final LocalDateTime NOW = LocalDateTime.of(LocalDate.now(), LocalTime.now());

    private final LocalDate date;
    private final LocalTime time;

    private LocalDateTime(LocalDate date, LocalTime time) {
        this.date = date;
        this.time = time;
    }

    public static LocalDateTime now() {
        return NOW;
    }

    public static LocalDateTime of(int year, int month, int dayOfMonth, int hour, int minute) {
        return new LocalDateTime(LocalDate.of(year, month, dayOfMonth), LocalTime.of(hour, minute));
    }

    public static LocalDateTime of(int year, int month, int dayOfMonth, int hour, int minute, int second) {
        return new LocalDateTime(LocalDate.of(year, month, dayOfMonth), LocalTime.of(hour, minute, second));
    }

    public static LocalDateTime of(LocalDate date, LocalTime time) {
        return new LocalDateTime(date, time);
    }

    public static LocalDateTime ofInstant(Instant instant, java.time.ZoneId zone) {
        return NOW;
    }

    public int compareTo(LocalDateTime other) {
        int cmp = date.compareTo(other.date);
        return cmp != 0 ? cmp : time.compareTo(other.time);
    }

    public boolean equals(Object other) {
        if (!(other instanceof LocalDateTime)) return false;
        LocalDateTime o = (LocalDateTime) other;
        return date.equals(o.date) && time.equals(o.time);
    }

    public int hashCode() {
        return date.hashCode() ^ time.hashCode();
    }

    public String toString() {
        return date + "T" + time;
    }
}
