package poc.compat.java.util.concurrent.locks;

import java.util.Collection;
import java.util.concurrent.locks.Condition;

public class ReentrantReadWriteLock implements poc.compat.java.util.concurrent.locks.ReadWriteLock, java.io.Serializable {
    private final poc.compat.java.util.concurrent.locks.ReentrantReadWriteLock.ReadLock readerLock = new poc.compat.java.util.concurrent.locks.ReentrantReadWriteLock.ReadLock(this);
    private final poc.compat.java.util.concurrent.locks.ReentrantReadWriteLock.WriteLock writerLock = new poc.compat.java.util.concurrent.locks.ReentrantReadWriteLock.WriteLock(this);
    public ReentrantReadWriteLock() {}
    public ReentrantReadWriteLock(boolean fair) {}
    public poc.compat.java.util.concurrent.locks.Lock readLock() { return readerLock; }
    public poc.compat.java.util.concurrent.locks.Lock writeLock() { return writerLock; }
    public boolean isFair() { return false; }
    public int getReadLockCount() { return 0; }
    public boolean isWriteLocked() { return false; }
    public boolean isWriteLockedByCurrentThread() { return false; }
    public int getWriteHoldCount() { return 0; }
    public int getReadHoldCount() { return 0; }
    protected Thread getOwner() { return null; }
    protected Collection<Thread> getQueuedThreads() { return java.util.Collections.emptyList(); }
    protected Collection<Thread> getWaitingThreads(Condition condition) { return java.util.Collections.emptyList(); }
    public boolean hasQueuedThreads() { return false; }
    public boolean hasWaiters(Condition condition) { return false; }

    public static class ReadLock implements poc.compat.java.util.concurrent.locks.Lock, java.io.Serializable {
        protected ReadLock(poc.compat.java.util.concurrent.locks.ReentrantReadWriteLock lock) {}
        public void lock() {}
        public void lockInterruptibly() throws InterruptedException {}
        public boolean tryLock() { return false; }
        public boolean tryLock(long timeout, java.util.concurrent.TimeUnit unit) throws InterruptedException { return false; }
        public void unlock() {}
        public Condition newCondition() { return null; }
    }

    public static class WriteLock implements poc.compat.java.util.concurrent.locks.Lock, java.io.Serializable {
        protected WriteLock(poc.compat.java.util.concurrent.locks.ReentrantReadWriteLock lock) {}
        public void lock() {}
        public void lockInterruptibly() throws InterruptedException {}
        public boolean tryLock() { return false; }
        public boolean tryLock(long timeout, java.util.concurrent.TimeUnit unit) throws InterruptedException { return false; }
        public void unlock() {}
        public Condition newCondition() { return null; }
    }
}
