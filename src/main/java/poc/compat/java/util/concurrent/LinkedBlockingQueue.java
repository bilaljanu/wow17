package poc.compat.java.util.concurrent;

public class LinkedBlockingQueue<E> extends java.util.AbstractQueue<E> implements java.util.concurrent.BlockingQueue<E>, java.io.Serializable {
    public LinkedBlockingQueue() {}
    public LinkedBlockingQueue(int capacity) {}
    public LinkedBlockingQueue(java.util.Collection<? extends E> c) {}
    public boolean add(E e) { return false; }
    public boolean offer(E e) { return false; }
    public void put(E e) throws InterruptedException {}
    public boolean offer(E e, long timeout, java.util.concurrent.TimeUnit unit) throws InterruptedException { return false; }
    public E poll() { return null; }
    public E poll(long timeout, java.util.concurrent.TimeUnit unit) throws InterruptedException { return null; }
    public E take() throws InterruptedException { return null; }
    public E peek() { return null; }
    public int size() { return 0; }
    public int remainingCapacity() { return 0; }
    public boolean remove(Object o) { return false; }
    public boolean contains(Object o) { return false; }
    public int drainTo(java.util.Collection<? super E> c) { return 0; }
    public int drainTo(java.util.Collection<? super E> c, int maxElements) { return 0; }
    public java.util.Iterator<E> iterator() { return java.util.Collections.<E>emptyList().iterator(); }
    public void clear() {}
}
