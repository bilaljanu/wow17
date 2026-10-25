package java.lang.management;

public interface MemoryMXBean {
    int getObjectPendingFinalizationCount();
    void gc();
    MemoryUsage getHeapMemoryUsage();
    MemoryUsage getNonHeapMemoryUsage();
}
