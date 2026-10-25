package poc.compat.java.util.concurrent;

public class CompletionException extends RuntimeException {
    public CompletionException() { super(); }
    public CompletionException(String message) { super(message); }
    public CompletionException(Throwable cause) { super(cause); }
}
