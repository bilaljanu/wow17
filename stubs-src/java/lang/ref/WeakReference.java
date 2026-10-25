package java.lang.ref;

public class WeakReference<T> extends Reference<T> {
    public WeakReference(T referent) {
        super(referent);
    }

    public T get() {
        return super.get();
    }
}
