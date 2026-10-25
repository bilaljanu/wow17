package java.security;

public class SecurityManager {
    public SecurityManager() {
    }

    public void checkPermission(Permission perm) {
    }

    public void checkRead(String file) {
    }

    public void checkWrite(String file) {
    }

    public void checkDelete(String file) {
    }

    public void checkExec(String cmd) {
    }

    public void checkConnect(String host, int port) {
    }

    public void checkListen(int port) {
    }

    public void checkAccept(String host, int port) {
    }

    public Class<?>[] getClassContext() {
        return new Class<?>[0];
    }

    public ClassLoader currentClassLoader() {
        return null;
    }

    public Class<?>[] getClassLoader() {
        return new Class<?>[0];
    }

    public void checkPackageAccess(String name) {
    }

    public void checkPackageDefinition(String name) {
    }

    public void checkPropertiesAccess() {
    }

    public void checkPropertyAccess(String key) {
    }

    public ThreadGroup getThreadGroup() {
        return null;
    }
}
