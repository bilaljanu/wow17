package java.util.concurrent;

import java.util.*;
import java.util.concurrent.atomic.AtomicReference;

public class ConcurrentSkipListMap<K, V> extends AbstractMap<K, V> implements ConcurrentNavigableMap<K, V>, Cloneable, java.io.Serializable {
    private final TreeMap<K, V> delegate = new TreeMap<>();

    public ConcurrentSkipListMap() {}
    public ConcurrentSkipListMap(Comparator<? super K> comparator) {}
    public ConcurrentSkipListMap(Map<? extends K, ? extends V> m) { putAll(m); }
    public ConcurrentSkipListMap(SortedMap<K, ? extends V> m) { putAll(m); }

    public V put(K key, V value) { return delegate.put(key, value); }
    public V get(Object key) { return delegate.get(key); }
    public V remove(Object key) { return delegate.remove(key); }
    public boolean containsKey(Object key) { return delegate.containsKey(key); }
    public int size() { return delegate.size(); }
    public boolean isEmpty() { return delegate.isEmpty(); }
    public void clear() { delegate.clear(); }
    public K lowerKey(K key) { return delegate.lowerKey(key); }
    public K floorKey(K key) { return delegate.floorKey(key); }
    public K ceilingKey(K key) { return delegate.ceilingKey(key); }
    public K higherKey(K key) { return delegate.higherKey(key); }
    public Map.Entry<K, V> pollFirstEntry() { return delegate.pollFirstEntry(); }
    public Map.Entry<K, V> pollLastEntry() { return delegate.pollLastEntry(); }
    public K firstKey() { return delegate.firstKey(); }
    public K lastKey() { return delegate.lastKey(); }
    public Comparator<? super K> comparator() { return delegate.comparator(); }
    public NavigableSet<K> navigableKeySet() { return delegate.navigableKeySet(); }
    public NavigableSet<K> descendingKeySet() { return delegate.descendingKeySet(); }
    public ConcurrentNavigableMap<K, V> descendingMap() { return (ConcurrentNavigableMap<K, V>) delegate.descendingMap(); }
    public NavigableMap<K, V> subMap(K fromKey, boolean fromInclusive, K toKey, boolean toInclusive) { return delegate.subMap(fromKey, fromInclusive, toKey, toInclusive); }
    public NavigableMap<K, V> headMap(K toKey, boolean inclusive) { return delegate.headMap(toKey, inclusive); }
    public NavigableMap<K, V> tailMap(K fromKey, boolean inclusive) { return delegate.tailMap(fromKey, inclusive); }
    public SortedMap<K, V> subMap(K fromKey, K toKey) { return delegate.subMap(fromKey, toKey); }
    public SortedMap<K, V> headMap(K toKey) { return delegate.headMap(toKey); }
    public SortedMap<K, V> tailMap(K fromKey) { return delegate.tailMap(fromKey); }
    public Map.Entry<K, V> lowerEntry(K key) { return delegate.lowerEntry(key); }
    public Map.Entry<K, V> floorEntry(K key) { return delegate.floorEntry(key); }
    public Map.Entry<K, V> ceilingEntry(K key) { return delegate.ceilingEntry(key); }
    public Map.Entry<K, V> higherEntry(K key) { return delegate.higherEntry(key); }
}
