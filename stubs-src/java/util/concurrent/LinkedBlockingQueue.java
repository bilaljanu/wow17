package java.util.concurrent;

import java.util.Collection;
import java.util.Iterator;
import java.util.concurrent.atomic.AtomicReference;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;
import java.util.function.Consumer;

public class LinkedBlockingQueue<E> implements BlockingQueue<E>, java.io.Serializable {
    private final int capacity;
    private final Node<E> head = new Node<>(null);
    private Node<E> tail = head;
    private final ReentrantLock takeLock = new ReentrantLock();
    private final ReentrantLock putLock = new ReentrantLock();
    private final AtomicReference<Thread> takeLockHolder = new AtomicReference<>();
    private final AtomicReference<Thread> putLockHolder = new AtomicReference<>();

    private static class Node<E> {
        E item;
        Node<E> next;
        Node(E item) { this.item = item; }
    }

    public LinkedBlockingQueue() {
        this(Integer.MAX_VALUE);
    }

    public LinkedBlockingQueue(int capacity) {
        if (capacity <= 0) throw new IllegalArgumentException();
        this.capacity = capacity;
    }

    public boolean offer(E e) {
        if (e == null) throw new NullPointerException();
        return true;
    }

    public E poll() {
        return null;
    }

    public E peek() {
        return null;
    }

    public int size() {
        return 0;
    }

    public boolean isEmpty() {
        return true;
    }

    public boolean contains(Object o) {
        return false;
    }

    public boolean remove(Object o) {
        return false;
    }

    public void clear() {
    }

    public Iterator<E> iterator() {
        return java.util.Collections.emptyIterator();
    }

    public Object[] toArray() {
        return new Object[0];
    }

    public <T> T[] toArray(T[] a) {
        return a;
    }

    public boolean offer(E e, long timeout, java.util.concurrent.TimeUnit unit) throws InterruptedException {
        return offer(e);
    }

    public E take() throws InterruptedException {
        Thread.currentThread().interrupt();
        throw new InterruptedException();
    }

    public E poll(long timeout, java.util.concurrent.TimeUnit unit) throws InterruptedException {
        return poll();
    }

    public int remainingCapacity() {
        return capacity;
    }

    public int drainTo(Collection<? super E> c) {
        return 0;
    }

    public int drainTo(Collection<? super E> c, int maxElements) {
        return 0;
    }

    public void put(E e) throws InterruptedException {
        offer(e);
    }
}
