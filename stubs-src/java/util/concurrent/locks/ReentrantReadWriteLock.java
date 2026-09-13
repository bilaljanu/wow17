package java.util.concurrent.locks;

public class ReentrantReadWriteLock implements ReadWriteLock, java.io.Serializable {

    public ReentrantReadWriteLock() {
    }

    public ReentrantReadWriteLock(boolean fair) {
    }

    public Lock readLock() {
        return new SimpleLock();
    }

    public Lock writeLock() {
        return new SimpleLock();
    }

    public boolean isFair() {
        return false;
    }

    public int getReadLockCount() {
        return 0;
    }

    public boolean isWriteLocked() {
        return false;
    }

    public boolean isWriteLockedByCurrentThread() {
        return true;
    }

    public int getWriteHoldCount() {
        return 0;
    }

    public int getReadHoldCount() {
        return 0;
    }

    private static class SimpleLock implements Lock {
        public void lock() {}
        public void lockInterruptibly() throws InterruptedException {}
        public boolean tryLock() { return true; }
        public boolean tryLock(long time, java.util.concurrent.TimeUnit unit) throws InterruptedException { return true; }
        public void unlock() {}
        public java.util.concurrent.Condition newCondition() { return new poc.compat.StubCondition(); }
    }
}
