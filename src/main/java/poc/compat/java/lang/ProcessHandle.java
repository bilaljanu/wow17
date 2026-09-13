package poc.compat.java.lang;
public interface ProcessHandle {
    long pid();
    boolean isAlive();
    boolean onDestroy();
    java.util.Optional<ProcessHandle> parent();
    java.util.stream.Stream<ProcessHandle> children();
}
