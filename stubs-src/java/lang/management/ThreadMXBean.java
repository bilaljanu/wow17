package java.lang.management;

public interface ThreadMXBean {
    int getThreadCount();
    int getPeakThreadCount();
    long[] getThreadIds();
    String getThreadName(long id);
    long getThreadCpuTime(long id);
}
