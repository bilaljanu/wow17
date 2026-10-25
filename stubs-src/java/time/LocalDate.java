package java.time;

public final class LocalDate implements Comparable<LocalDate>, java.io.Serializable {
    private static final LocalDate NOW = new LocalDate(1970, 1, 1);

    private final int year;
    private final int month;
    private final int day;

    private LocalDate(int year, int month, int day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    public static LocalDate now() {
        return NOW;
    }

    public static LocalDate of(int year, int month, int dayOfMonth) {
        return new LocalDate(year, month, dayOfMonth);
    }

    public int compareTo(LocalDate other) {
        if (year != other.year) return year - other.year;
        if (month != other.month) return month - other.month;
        return day - other.day;
    }

    public boolean equals(Object other) {
        if (!(other instanceof LocalDate)) return false;
        LocalDate o = (LocalDate) other;
        return year == o.year && month == o.month && day == o.day;
    }

    public int hashCode() {
        return year * 10000 + month * 100 + day;
    }

    public String toString() {
        return year + "-" + month + "-" + day;
    }
}
