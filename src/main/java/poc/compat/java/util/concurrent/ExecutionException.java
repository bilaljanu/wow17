package poc.compat.java.util.concurrent;

public class ExecutionException extends Exception {
    public ExecutionException() { super(); }
    public ExecutionException(String message) { super(message); }
    public ExecutionException(String message, Throwable cause) { super(message, cause); }
    public ExecutionException(Throwable cause) { super(cause); }
}
