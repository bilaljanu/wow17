package java.util.concurrent;

public abstract class ForkJoinTask<V> implements Future<V>, java.io.Serializable {
    protected ForkJoinTask() {
    }

    protected abstract boolean exec();

    public boolean cancel(boolean mayInterruptIfRunning) {
        return false;
    }

    public boolean isDone() {
        return true;
    }

    public boolean isCancelled() {
        return false;
    }

    public V get() {
        return null;
    }

    public V get(long timeout, TimeUnit unit) {
        return null;
    }

    public static class CompletedForkJoinTask<V> extends ForkJoinTask<V> {
        private final V result;
        public CompletedForkJoinTask(V result) { this.result = result; }
        protected boolean exec() { return true; }
        public V get() { return result; }
        public V get(long timeout, TimeUnit unit) { return result; }
    }
}
