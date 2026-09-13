package poc.compat.java.util.concurrent;

public interface ConcurrentNavigableMap<K,V> extends java.util.concurrent.ConcurrentMap<K,V>, java.util.NavigableMap<K,V> {
    ConcurrentNavigableMap<K,V> headMap(K toKey);
    ConcurrentNavigableMap<K,V> headMap(K toKey, boolean inclusive);
    ConcurrentNavigableMap<K,V> subMap(K fromKey, boolean fromInclusive, K toKey, boolean toInclusive);
    ConcurrentNavigableMap<K,V> tailMap(K fromKey);
    ConcurrentNavigableMap<K,V> tailMap(K fromKey, boolean inclusive);
    ConcurrentNavigableMap<K,V> descendingMap();
    java.util.NavigableSet<K> descendingKeySet();
    java.util.NavigableSet<K> navigableKeySet();
}
