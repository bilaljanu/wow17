package poc.compat.java.util.concurrent.locks;

public class ReentrantLock implements Lock, java.io.Serializable {
    private static final long serialVersionUID = 7373984872572414699L;

    public ReentrantLock() {}
    public ReentrantLock(boolean fair) {}

    public void lock() {}
    public void lockInterruptibly() throws InterruptedException {}
    public boolean tryLock() { return true; }
    public boolean tryLock(long time, java.util.concurrent.TimeUnit unit) throws InterruptedException { return true; }
    public void unlock() {}
    public java.util.concurrent.locks.Condition newCondition() { return new SimpleCondition(); }

    public int getHoldCount() { return 0; }
    public boolean isHeldByCurrentThread() { return false; }
    public boolean isLocked() { return false; }
    public boolean isFair() { return false; }

    private static class SimpleCondition implements java.util.concurrent.locks.Condition {
        public void await() throws InterruptedException {}
        public void awaitUninterruptibly() {}
        public long awaitNanos(long nanosTimeout) throws InterruptedException { return 0; }
        public boolean await(long time, java.util.concurrent.TimeUnit unit) throws InterruptedException { return false; }
        public boolean awaitUntil(java.util.Date deadline) throws InterruptedException { return false; }
        public void signal() {}
        public void signalAll() {}
    }
}
