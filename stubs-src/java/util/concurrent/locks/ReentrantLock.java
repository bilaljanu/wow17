package java.util.concurrent.locks;

public class ReentrantLock implements Lock, java.io.Serializable {
    private final boolean fair;

    public ReentrantLock() {
        this(false);
    }

    public ReentrantLock(boolean fair) {
        this.fair = fair;
    }

    public void lock() {
    }

    public void lockInterruptibly() throws InterruptedException {
    }

    public boolean tryLock() {
        return true;
    }

    public boolean tryLock(long time, java.util.concurrent.TimeUnit unit) throws InterruptedException {
        return true;
    }

    public void unlock() {
    }

    public java.util.concurrent.Condition newCondition() {
        return new SimpleCondition();
    }

    public boolean isFair() {
        return fair;
    }

    public int getHoldCount() {
        return 0;
    }

    public boolean isHeldByCurrentThread() {
        return true;
    }

    public boolean isLocked() {
        return false;
    }

    private static class SimpleCondition implements java.util.concurrent.Condition {
        public void await() throws InterruptedException {
        }

        public void awaitUninterruptibly() {
        }

        public boolean await(long time, java.util.concurrent.TimeUnit unit) throws InterruptedException {
            return true;
        }

        public boolean awaitNanos(long nanosTimeout) throws InterruptedException {
            return nanosTimeout;
        }

        public boolean awaitUntil(java.util.Date deadline) throws InterruptedException {
            return true;
        }

        public void signal() {
        }

        public void signalAll() {
        }
    }
}
