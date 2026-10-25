package java.util.concurrent;

import java.util.Collection;
import java.util.Iterator;
import java.util.Queue;

public class ConcurrentLinkedQueue<E> implements Queue<E>, java.io.Serializable {
    public ConcurrentLinkedQueue() {}
    public ConcurrentLinkedQueue(Collection<? extends E> c) {}

    public boolean add(E e) { return true; }
    public boolean offer(E e) { return true; }
    public E poll() { return null; }
    public E peek() { return null; }
    public E remove() { return null; }
    public boolean remove(Object o) { return false; }
    public boolean contains(Object o) { return false; }
    public boolean isEmpty() { return true; }
    public int size() { return 0; }
    public void clear() {}
    public Iterator<E> iterator() { return java.util.Collections.emptyIterator(); }
    public Object[] toArray() { return new Object[0]; }
    public <T> T[] toArray(T[] a) { return a; }
    public boolean containsAll(Collection<?> c) { return true; }
    public boolean addAll(Collection<? extends E> c) { return true; }
    public boolean removeAll(Collection<?> c) { return false; }
    public boolean retainAll(Collection<?> c) { return false; }
}
