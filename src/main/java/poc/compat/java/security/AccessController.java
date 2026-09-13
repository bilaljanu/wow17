package poc.compat.java.security;
public class AccessController {
    public static <T> T doPrivileged(PrivilegedAction<T> action) { return action.run(); }
    public static <T> T doPrivileged(PrivilegedAction<T> action, AccessControlContext context) { return action.run(); }
    public static <T> T doPrivileged(PrivilegedExceptionAction<T> action) throws PrivilegedActionException { try { return action.run(); } catch (Exception e) { throw new PrivilegedActionException(e); } }
    public static <T> T doPrivileged(PrivilegedExceptionAction<T> action, AccessControlContext context) throws PrivilegedActionException { try { return action.run(); } catch (Exception e) { throw new PrivilegedActionException(e); } }
    public static void checkPermission(Permission perm) {}
    public static AccessControlContext getContext() { return new AccessControlContext(); }
}
