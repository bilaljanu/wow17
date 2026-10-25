package poc.compat.java.lang.ref;
public abstract class Reference<T> {
    private T referent;
    protected Reference(T referent) { this.referent = referent; }
    protected Reference(T referent, ReferenceQueue<? super T> queue) { this.referent = referent; }
    public T get() { return referent; }
    public void clear() { referent = null; }
    public boolean isEnqueued() { return false; }
    public boolean enqueue() { return false; }
}
