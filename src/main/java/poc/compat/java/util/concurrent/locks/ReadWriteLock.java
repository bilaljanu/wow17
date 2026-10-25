package poc.compat.java.util.concurrent.locks;

public interface ReadWriteLock {
    Lock readLock();
    Lock writeLock();
}
