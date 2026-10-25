package java.lang.ref;

public class Reference<T> {
    private volatile T referent;

    public Reference(T referent) {
        this.referent = referent;
    }

    public T get() {
        return referent;
    }

    public void clear() {
        referent = null;
    }

    public boolean isEnqueued() {
        return false;
    }

    public boolean enqueue() {
        return false;
    }
}
