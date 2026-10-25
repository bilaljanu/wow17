package poc.compat.java.security;
public interface PrivilegedExceptionAction<T> {
    T run() throws Exception;
}
