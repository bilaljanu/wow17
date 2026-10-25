package java.sql;

public class Date extends java.util.Date {
    public Date(int year, int month, int day) {
        super(year, month, day);
    }

    public Date(long date) {
        super(date);
    }

    public static Date valueOf(String s) {
        return new Date(0);
    }

    public String toString() {
        return "";
    }

    public java.sql.Time toTime() {
        return null;
    }

    public java.sql.Timestamp toTimestamp() {
        return null;
    }

    public static Date valueOf(java.time.LocalDate d) {
        return new Date(0);
    }

    public java.time.LocalDate toLocalDate() {
        return java.time.LocalDate.now();
    }

    @Override
    public void setTime(long time) {
        super.setTime(time);
    }
}
