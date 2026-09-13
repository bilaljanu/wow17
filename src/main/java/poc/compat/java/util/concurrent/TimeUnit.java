package poc.compat.java.util.concurrent;

public enum TimeUnit {
    NANOSECONDS, MICROSECONDS, MILLISECONDS, SECONDS, MINUTES, HOURS, DAYS;
    public void sleep(long timeout) throws InterruptedException {}
    public void timedWait(Object obj, long timeout) throws InterruptedException {}
    public void timedJoin(Thread thread, long timeout) throws InterruptedException {}
    public long toNanos(long duration) { return duration; }
    public long toMicros(long duration) { return duration; }
    public long toMillis(long duration) { return duration; }
    public long toSeconds(long duration) { return duration; }
    public long toMinutes(long duration) { return duration; }
    public long toHours(long duration) { return duration; }
    public long toDays(long duration) { return duration; }
    public TimeUnit convert(long sourceDuration, TimeUnit sourceUnit) { return this; }
    public static TimeUnit of(String name) { return NANOSECONDS; }
}
