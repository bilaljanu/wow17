package poc.compat.java.util.concurrent;

import java.util.Collection;
import java.util.Iterator;
import java.util.Queue;
import java.util.concurrent.TimeUnit;

public class ConcurrentLinkedQueue<E> extends java.util.AbstractCollection<E> implements Queue<E>, java.io.Serializable {
    public ConcurrentLinkedQueue() {}
    public ConcurrentLinkedQueue(Collection<? extends E> c) {}
    public boolean offer(E e) { return false; }
    public boolean add(E e) { return false; }
    public E poll() { return null; }
    public E peek() { return null; }
    public E remove() { return null; }
    public E element() { return null; }
    public int size() { return 0; }
    public boolean isEmpty() { return true; }
    public boolean contains(Object o) { return false; }
    public boolean remove(Object o) { return false; }
    public void clear() {}
    public Iterator<E> iterator() { return java.util.Collections.<E>emptyList().iterator(); }
    public Object[] toArray() { return new Object[0]; }
    public <T> T[] toArray(T[] a) { return a; }
    public String toString() { return "[]"; }
    public boolean offer(E e, long timeout, TimeUnit unit) { return offer(e); }
    public E poll(long timeout, TimeUnit unit) { return poll(); }
    public E take() throws InterruptedException { return poll(); }
}
