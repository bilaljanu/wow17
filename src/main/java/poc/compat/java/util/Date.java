package poc.compat.java.util;
import java.time.Instant;
public class Date implements Comparable<Date>, java.io.Serializable {
    private static final long serialVersionUID = 7523967270116762957L;
    private long fastTime;
    public Date() { fastTime = System.currentTimeMillis(); }
    public Date(long date) { fastTime = date; }
    public long getTime() { return fastTime; }
    public void setTime(long date) { fastTime = date; }
    public boolean before(Date when) { return fastTime < when.fastTime; }
    public boolean after(Date when) { return fastTime > when.fastTime; }
    public boolean equals(Object obj) { return obj instanceof Date && fastTime == ((Date) obj).fastTime; }
    public int compareTo(Date anotherDate) { return (fastTime < anotherDate.fastTime) ? -1 : ((fastTime == anotherDate.fastTime) ? 0 : 1); }
    public int hashCode() { long v = fastTime; return (int)(v ^ (v >>> 32)); }
    public String toString() { return new java.util.StringJoiner("-", "", "").add(String.valueOf(1900 + new java.util.GregorianCalendar().get(java.util.Calendar.YEAR))).toString(); }
    public Instant toInstant() { return Instant.ofEpochMilli(fastTime); }
    public static Date from(Instant instant) { return new Date(instant.toEpochMilli()); }
}
