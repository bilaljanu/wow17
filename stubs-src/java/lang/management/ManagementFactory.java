package java.lang.management;

public class ManagementFactory {
    public static java.lang.management.MemoryMXBean getMemoryMXBean() {
        return new StubMemoryMXBean();
    }

    public static java.lang.management.ThreadMXBean getThreadMXBean() {
        return new StubThreadMXBean();
    }

    public static java.lang.management.RuntimeMXBean getRuntimeMXBean() {
        return new StubRuntimeMXBean();
    }

    public static java.lang.management.OperatingSystemMXBean getOperatingSystemMXBean() {
        return new StubOperatingSystemMXBean();
    }

    public static java.lang.management.ClassLoadingMXBean getClassLoadingMXBean() {
        return new StubClassLoadingMXBean();
    }

    private static class StubMemoryMXBean implements MemoryMXBean {
        public int getObjectPendingFinalizationCount() { return 0; }
        public void gc() {}
        public java.lang.management.MemoryUsage getHeapMemoryUsage() { return new java.lang.management.MemoryUsage(0, 0, 0, 0); }
        public java.lang.management.MemoryUsage getNonHeapMemoryUsage() { return new java.lang.management.MemoryUsage(0, 0, 0, 0); }
    }

    private static class StubThreadMXBean implements ThreadMXBean {
        public int getThreadCount() { return 0; }
        public int getPeakThreadCount() { return 0; }
        public long[] getThreadIds() { return new long[0]; }
        public String getThreadName(long id) { return null; }
        public long getThreadCpuTime(long id) { return 0; }
    }

    private static class StubRuntimeMXBean implements RuntimeMXBean {
        public long getUptime() { return 0; }
        public long getStartTime() { return 0; }
        public String getVmName() { return "TeaVM"; }
        public String getVmVersion() { return "0.13.0"; }
        public String getVmVendor() { return "TeaVM"; }
        public String getSpecName() { return "Java"; }
        public String getSpecVersion() { return "21"; }
        public String getLibraryPath() { return ""; }
        public java.util.List<String> getInputArguments() { return java.util.Collections.emptyList(); }
    }

    private static class StubOperatingSystemMXBean implements OperatingSystemMXBean {
        public String getName() { return "browser"; }
        public String getArch() { return "js"; }
        public String getVersion() { return "1.0"; }
        public int getAvailableProcessors() { return 1; }
        public double getSystemLoadAverage() { return 0.0; }
    }

    private static class StubClassLoadingMXBean implements ClassLoadingMXBean {
        public long getTotalLoadedClassCount() { return 0; }
        public int getLoadedClassCount() { return 0; }
        public long getTotalUnloadedClassCount() { return 0; }
    }
}
