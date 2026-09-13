package java.util;

import java.io.File;

public class Date implements java.io.Serializable, Cloneable, Comparable<Date> {
    private long time;

    public Date() {
        this(System.currentTimeMillis());
    }

    public Date(long date) {
        this.time = date;
    }

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }

    public Instant toInstant() {
        return Instant.ofEpochMilli(time);
    }

    public static Date from(Instant instant) {
        return new Date(instant.toEpochMilli());
    }

    public String toString() {
        return Long.toString(time);
    }

    public int compareTo(Date anotherDate) {
        long thisTime = this.getTime();
        long anotherTime = anotherDate.getTime();
        return (thisTime < anotherTime ? -1 : (thisTime == anotherTime ? 0 : 1));
    }

    public boolean equals(Object obj) {
        return obj instanceof Date && ((Date) obj).time == this.time;
    }

    public int hashCode() {
        return Long.hashCode(time);
    }

    public String toLocaleString() {
        return toString();
    }

    public String toGMTString() {
        return toString();
    }

    public boolean before(Date when) {
        return getTime() < when.getTime();
    }

    public boolean after(Date when) {
        return getTime() > when.getTime();
    }

    public Object clone() {
        try {
            return super.clone();
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException(e);
        }
    }

    public int getYear() { return 0; }
    public int getMonth() { return 0; }
    public int getDate() { return 0; }
    public int getHours() { return 0; }
    public int getMinutes() { return 0; }
    public int getSeconds() { return 0; }
    public int getDay() { return 0; }
}
