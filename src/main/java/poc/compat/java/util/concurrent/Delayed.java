package poc.compat.java.util.concurrent;

public interface Delayed extends Comparable<Delayed> {
    long getDelay(java.util.concurrent.TimeUnit unit);
    default int compareTo(Delayed other) {
        long diff = getDelay(java.util.concurrent.TimeUnit.NANOSECONDS) - other.getDelay(java.util.concurrent.TimeUnit.NANOSECONDS);
        return (diff < 0) ? -1 : ((diff > 0) ? 1 : 0);
    }
}
