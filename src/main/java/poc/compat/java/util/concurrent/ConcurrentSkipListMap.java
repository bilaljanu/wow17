package poc.compat.java.util.concurrent;

import java.util.*;
import java.util.concurrent.ConcurrentNavigableMap;

public class ConcurrentSkipListMap<K,V> extends java.util.AbstractMap<K,V> implements ConcurrentNavigableMap<K,V>, Cloneable, java.io.Serializable {
    public ConcurrentSkipListMap() {}
    public ConcurrentSkipListMap(Comparator<? super K> comparator) {}
    public ConcurrentSkipListMap(Map<? extends K, ? extends V> m) {}
    public Set<Map.Entry<K,V>> entrySet() { return java.util.Collections.emptySet(); }
    public NavigableSet<K> keySet() { return new TreeSet<>(); }
    public Collection<V> values() { return java.util.Collections.emptyList(); }
    public V get(Object key) { return null; }
    public V put(K key, V value) { return null; }
    public V remove(Object key) { return null; }
    public V getOrDefault(Object key, V defaultValue) { return defaultValue; }
    public V putIfAbsent(K key, V value) { return null; }
    public boolean remove(Object key, Object value) { return false; }
    public V replace(K key, V value) { return null; }
    public boolean replace(K key, V oldValue, V newValue) { return false; }
    public int size() { return 0; }
    public boolean isEmpty() { return true; }
    public boolean containsKey(Object key) { return false; }
    public boolean containsValue(Object value) { return false; }
    public void clear() {}
    public K firstKey() { return null; }
    public K lastKey() { return null; }
    public Comparator<? super K> comparator() { return null; }
    public ConcurrentSkipListMap<K,V> headMap(K toKey) { return this; }
    public ConcurrentNavigableMap<K,V> headMap(K toKey, boolean inclusive) { return this; }
    public ConcurrentSkipListMap<K,V> tailMap(K fromKey) { return this; }
    public ConcurrentNavigableMap<K,V> tailMap(K fromKey, boolean inclusive) { return this; }
    public ConcurrentSkipListMap<K,V> subMap(K fromKey, K toKey) { return this; }
    public ConcurrentNavigableMap<K,V> subMap(K fromKey, boolean fromInclusive, K toKey, boolean toInclusive) { return this; }
    public ConcurrentSkipListMap<K,V> descendingMap() { return this; }
    public NavigableSet<K> navigableKeySet() { return new TreeSet<>(); }
    public NavigableSet<K> descendingKeySet() { return new TreeSet<>(); }
    public K lowerKey(K key) { return null; }
    public K floorKey(K key) { return null; }
    public K ceilingKey(K key) { return null; }
    public K higherKey(K key) { return null; }
    public Map.Entry<K,V> lowerEntry(K key) { return null; }
    public Map.Entry<K,V> floorEntry(K key) { return null; }
    public Map.Entry<K,V> ceilingEntry(K key) { return null; }
    public Map.Entry<K,V> higherEntry(K key) { return null; }
    public Map.Entry<K,V> firstEntry() { return null; }
    public Map.Entry<K,V> lastEntry() { return null; }
    public Map.Entry<K,V> pollFirstEntry() { return null; }
    public Map.Entry<K,V> pollLastEntry() { return null; }
}
