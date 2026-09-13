package poc.compat.java.lang;
public abstract class ClassLoader {
    private static final ClassLoader SYSTEM_LOADER = new ClassLoader() {};
    protected ClassLoader() {}
    protected ClassLoader(ClassLoader parent) {}
    public static ClassLoader getSystemClassLoader() { return SYSTEM_LOADER; }
    public static java.io.InputStream getSystemResource(String name) { return null; }
    public static java.util.Enumeration<java.net.URL> getSystemResources(String name) { return java.util.Collections.emptyEnumeration(); }
    public String getName() { return "bootstrap"; }
    public Class<?> loadClass(String name) throws ClassNotFoundException { throw new ClassNotFoundException(name); }
    public Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException { throw new ClassNotFoundException(name); }
    public Class<?> findClass(String name) throws ClassNotFoundException { throw new ClassNotFoundException(name); }
    public Class<?> defineClass(String name, byte[] b, int off, int len) { return null; }
    public Class<?> findLoadedClass(String name) { return null; }
    public Class<?> findSystemClass(String name) throws ClassNotFoundException { throw new ClassNotFoundException(name); }
    public void resolveClass(Class<?> c) {}
    public java.net.URL getResource(String name) { return null; }
    public java.util.Enumeration<java.net.URL> getResources(String name) { return java.util.Collections.emptyEnumeration(); }
    public java.io.InputStream getResourceAsStream(String name) { return null; }
    public ClassLoader getParent() { return null; }
}
