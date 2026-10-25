package poc.compat;

import java.util.concurrent.locks.Condition;
import java.util.Date;

public class StubCondition implements Condition {
    public void await() throws InterruptedException {}
    public void awaitUninterruptibly() {}
    public boolean await(long time, java.util.concurrent.TimeUnit unit) throws InterruptedException { return true; }
    public long awaitNanos(long nanosTimeout) throws InterruptedException { return nanosTimeout; }
    public boolean awaitUntil(Date deadline) throws InterruptedException { return true; }
    public void signal() {}
    public void signalAll() {}
}
