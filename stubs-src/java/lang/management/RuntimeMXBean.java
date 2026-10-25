package java.lang.management;

public interface RuntimeMXBean {
    long getUptime();
    long getStartTime();
    String getVmName();
    String getVmVersion();
    String getVmVendor();
    String getSpecName();
    String getSpecVersion();
    String getLibraryPath();
    java.util.List<String> getInputArguments();
}
