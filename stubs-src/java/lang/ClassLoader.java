package java.lang;

import java.io.InputStream;
import java.io.IOException;
import java.net.URL;
import java.util.Enumeration;

public abstract class ClassLoader {
    protected ClassLoader() { }

    public static ClassLoader getSystemClassLoader() {
        return null;
    }

    public URL getResource(String name) {
        return null;
    }

    public Enumeration<URL> getResources(String name) {
        return java.util.Collections.emptyEnumeration();
    }

    public InputStream getResourceAsStream(String name) {
        return null;
    }

    public Class<?> loadClass(String name) throws ClassNotFoundException {
        throw new ClassNotFoundException(name);
    }

    public Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException {
        throw new ClassNotFoundException(name);
    }

    protected Class<?> findClass(String name) throws ClassNotFoundException {
        throw new ClassNotFoundException(name);
    }

    protected String findLibrary(String libname) {
        return null;
    }

    protected void resolveClass(Class<?> c) { }

    protected Package definePackage(String name, String specTitle, String specVersion, String specVendor, String implTitle, String implVersion, String implVendor, URL sealBase) throws IllegalArgumentException {
        return null;
    }

    protected Package getPackage(String name) {
        return null;
    }

    public Package[] getPackages() {
        return new Package[0];
    }

    public URL findResource(String name) {
        return null;
    }

    public Enumeration<URL> findResources(String name) {
        return java.util.Collections.emptyEnumeration();
    }

    public URL getParent() {
        return null;
    }

    protected void verifyPackage(String name) throws IllegalArgumentException { }

    protected void definePackage(String name, Manifest man, URL url) throws IllegalArgumentException { }

    // Additional methods that might be needed
    public String toString() {
        return getClass().getName() + "@" + Integer.toHexString(hashCode());
    }
}