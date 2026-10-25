package java.nio.file;

public interface WatchEvent<T> {
    Kind<T> kind();
    T context();
    int count();
    <V> WatchEvent<V> withKind(Kind<V> kind);

    interface Kind<T> {
        String name();
        Type type();
    }

    interface Modifier {
        String name();
    }
}
