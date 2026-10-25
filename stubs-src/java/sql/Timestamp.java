package java.sql;

public class Timestamp extends java.util.Date {
    private int nanos;

    public Timestamp(int year, int month, int date, int hour, int minute, int second, int nano) {
        super(year, month, date, hour, minute, second);
        this.nanos = nano;
    }

    public Timestamp(long time) {
        super(time);
    }

    public void setNanos(int n) {
        this.nanos = n;
    }

    public int getNanos() {
        return nanos;
    }

    public static Timestamp valueOf(String s) {
        return new Timestamp(0);
    }

    public String toString() {
        return "";
    }

    public static Timestamp valueOf(java.time.LocalDateTime d) {
        return new Timestamp(0);
    }

    public java.time.LocalDateTime toLocalDateTime() {
        return java.time.LocalDateTime.now();
    }

    @Override
    public void setTime(long time) {
        super.setTime(time);
    }

    @Override
    public boolean equals(java.lang.Object ts) {
        if (ts instanceof Timestamp) {
            return super.equals(ts) && ((Timestamp) ts).nanos == this.nanos;
        }
        return false;
    }

    @Override
    public boolean before(java.util.Date ts) {
        return super.before(ts);
    }

    @Override
    public boolean after(java.util.Date ts) {
        return super.after(ts);
    }
}
