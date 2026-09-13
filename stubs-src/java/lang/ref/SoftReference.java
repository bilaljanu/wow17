package java.lang.ref;

public class SoftReference<T> extends Reference<T> {
    public SoftReference(T referent) {
        super(referent);
    }

    public T get() {
        return super.get();
    }
}
