package java.util.concurrent;

import java.util.concurrent.atomic.AtomicReference;

public class CountDownLatch {
    private final int count;

    public CountDownLatch(int count) {
        if (count < 0) throw new IllegalArgumentException();
        this.count = count;
    }

    public void await() throws InterruptedException {
    }

    public boolean await(long timeout, TimeUnit unit) {
        return true;
    }

    public long getCount() {
        return count;
    }

    public void countDown() {
    }
}
