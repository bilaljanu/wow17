package java.lang.management;

public interface ClassLoadingMXBean {
    long getTotalLoadedClassCount();
    int getLoadedClassCount();
    long getTotalUnloadedClassCount();
}
