package poc.compat.java.util.concurrent;

import java.util.*;

public class ConcurrentSkipListSet<E> extends java.util.AbstractSet<E> implements NavigableSet<E>, Cloneable, java.io.Serializable {
    public ConcurrentSkipListSet() {}
    public ConcurrentSkipListSet(Comparator<? super E> comparator) {}
    public ConcurrentSkipListSet(Collection<? extends E> c) {}
    public ConcurrentSkipListSet(SortedSet<E> s) {}
    public boolean add(E e) { return false; }
    public boolean remove(Object o) { return false; }
    public boolean contains(Object o) { return false; }
    public int size() { return 0; }
    public boolean isEmpty() { return true; }
    public void clear() {}
    public Iterator<E> iterator() { return java.util.Collections.<E>emptyList().iterator(); }
    public Iterator<E> descendingIterator() { return java.util.Collections.<E>emptyList().iterator(); }
    public E lower(E e) { return null; }
    public E floor(E e) { return null; }
    public E ceiling(E e) { return null; }
    public E higher(E e) { return null; }
    public E pollFirst() { return null; }
    public E pollLast() { return null; }
    public E first() { return null; }
    public E last() { return null; }
    public ConcurrentSkipListSet<E> headSet(E toElement) { return this; }
    public NavigableSet<E> headSet(E toElement, boolean inclusive) { return this; }
    public ConcurrentSkipListSet<E> tailSet(E fromElement) { return this; }
    public NavigableSet<E> tailSet(E fromElement, boolean inclusive) { return this; }
    public ConcurrentSkipListSet<E> subSet(E fromElement, E toElement) { return this; }
    public NavigableSet<E> subSet(E fromElement, boolean fromInclusive, E toElement, boolean toInclusive) { return this; }
    public NavigableSet<E> descendingSet() { return this; }
    public Comparator<? super E> comparator() { return null; }
    public Object clone() { return new ConcurrentSkipListSet<>(); }
    public boolean equals(Object o) { return o == this; }
    public int hashCode() { return 0; }
}
