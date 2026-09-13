package poc.compat.java.security;

public final class PrivilegedActionException extends Exception {
    private static final long serialVersionUID = 3010906895993303516L;
    public PrivilegedActionException(Exception exception) { super(exception); }
    public Exception getException() { return (Exception) getCause(); }
}
