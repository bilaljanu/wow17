package java.lang;

public final class System {
    private System() {}

    public static void exit(int status) { }
    public static void load(String filename) { }
    public static void loadLibrary(String libname) { }
    public static String mapLibraryName(String libname) { return libname; }
    public static long currentTimeMillis() { return 0L; }
    public static long nanoTime() { return 0L; }
    public static void arraycopy(Object src, int srcPos, Object dest, int destPos, int length) { }
    public static int identityHashCode(Object x) { return 0; }
    public static Properties getProperties() { return new Properties(); }
    public static String getenv(String name) { return null; }
    public static java.util.Map<String, String> getenv() { return java.util.Collections.emptyMap(); }
    public static String getProperty(String key) { return null; }
    public static String getProperty(String key, String def) { return def; }
    public static String setProperty(String key, String value) { return null; }
    public static String clearProperty(String key) { return null; }
    public static String lineSeparator() { return "\n"; }
    public static String userDir() { return ""; }
    public static String userHome() { return ""; }
    public static String userDir(String def) { return def; }
    public static String userHome(String def) { return def; }
    public static void gc() { }
    public static void runFinalization() { }
    public static int getStackTraceDepth() { return 0; }
    public static StackTraceElement getStackTraceElement(int index) { return new StackTraceElement("", "", "", 0); }
    public static Console console() { return null; }
    public static Channel inheritedChannel() throws java.io.IOException { return null; }
    public static String format(String format, Object... args) { return String.format(format, args); }
    public static String getenv(String name, String def) { String v = getenv(name); return v != null ? v : def; }
    public static class Properties extends java.util.Hashtable<Object, Object> {
        public String getProperty(String key) { return (String) get(key); }
        public String getProperty(String key, String defaultValue) { String v = getProperty(key); return v != null ? v : defaultValue; }
    }
    public interface Console { }
    public interface Channel extends java.io.Closeable { void close() throws java.io.IOException; }
}