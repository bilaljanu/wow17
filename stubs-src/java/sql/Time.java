package java.sql;

public class Time extends java.util.Date {
    public Time(int hour, int minute, int second) {
        super(0, 0, 0);
    }

    public Time(long time) {
        super(time);
    }

    public static Time valueOf(String s) {
        return new Time(0);
    }

    public String toString() {
        return "";
    }

    public static Time valueOf(java.time.LocalTime t) {
        return new Time(0);
    }

    public java.time.LocalTime toLocalTime() {
        return java.time.LocalTime.now();
    }

    @Override
    public void setTime(long time) {
        super.setTime(time);
    }
}
