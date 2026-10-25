package java.lang.ref;

public class PhantomReference<T> extends Reference<T> {
    public PhantomReference(T referent) {
        super(referent);
    }

    public T get() {
        return null;
    }
}
