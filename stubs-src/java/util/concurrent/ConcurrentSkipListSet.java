package java.util.concurrent;

import java.util.*;
import java.util.concurrent.atomic.AtomicReference;

public class ConcurrentSkipListSet<E> extends AbstractSet<E> implements java.io.Serializable, NavigableSet<E>, Cloneable {
    private final NavigableMap<E, Object> map;
    private static final Object PRESENT = new Object();

    public ConcurrentSkipListSet() {
        map = new java.util.concurrent.ConcurrentSkipListMap<>();
    }

    public ConcurrentSkipListSet(Comparator<? super E> comparator) {
        map = new java.util.concurrent.ConcurrentSkipListMap<>(comparator);
    }

    public ConcurrentSkipListSet(Collection<? extends E> c) {
        map = new java.util.concurrent.ConcurrentSkipListMap<>();
        addAll(c);
    }

    public ConcurrentSkipListSet(SortedSet<E> s) {
        map = new java.util.concurrent.ConcurrentSkipListMap<>(s.comparator());
        addAll(s);
    }

    public boolean add(E e) {
        return map.put(e, PRESENT) == null;
    }

    public boolean remove(Object o) {
        return map.remove(o) == PRESENT;
    }

    public boolean contains(Object o) {
        return map.containsKey(o);
    }

    public boolean isEmpty() {
        return map.isEmpty();
    }

    public int size() {
        return map.size();
    }

    public void clear() {
        map.clear();
    }

    public Iterator<E> iterator() {
        return map.keySet().iterator();
    }

    public E lower(E e) {
        return map.lowerKey(e);
    }

    public E floor(E e) {
        return map.floorKey(e);
    }

    public E ceiling(E e) {
        return map.ceilingKey(e);
    }

    public E higher(E e) {
        return map.higherKey(e);
    }

    public E pollFirst() {
        Map.Entry<E, Object> e = map.pollFirstEntry();
        return e == null ? null : e.getKey();
    }

    public E pollLast() {
        Map.Entry<E, Object> e = map.pollLastEntry();
        return e == null ? null : e.getKey();
    }

    public Iterator<E> descendingIterator() {
        return descendingSet().iterator();
    }

    public NavigableSet<E> descendingSet() {
        return new ConcurrentSkipListSet<>(map.descendingKeySet());
    }

    public E first() {
        return map.firstKey();
    }

    public E last() {
        return map.lastKey();
    }

    public Comparator<? super E> comparator() {
        return map.comparator();
    }

    public NavigableSet<E> subSet(E fromElement, boolean fromInclusive, E toElement, boolean toInclusive) {
        return new ConcurrentSkipListSet<>(map.subMap(fromElement, fromInclusive, toElement, toInclusive).navigableKeySet());
    }

    public NavigableSet<E> headSet(E toElement, boolean inclusive) {
        return new ConcurrentSkipListSet<>(map.headMap(toElement, inclusive).navigableKeySet());
    }

    public NavigableSet<E> tailSet(E fromElement, boolean inclusive) {
        return new ConcurrentSkipListSet<>(map.tailMap(fromElement, inclusive).navigableKeySet());
    }

    public SortedSet<E> subSet(E fromElement, E toElement) {
        return subSet(fromElement, true, toElement, false);
    }

    public SortedSet<E> headSet(E toElement) {
        return headSet(toElement, false);
    }

    public SortedSet<E> tailSet(E fromElement) {
        return tailSet(fromElement, true);
    }
}
