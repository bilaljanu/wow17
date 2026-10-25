package poc.compat.java.lang;

import java.util.function.Consumer;
import java.util.stream.Stream;

public final class StackWalker {
    public enum Option { RETAIN_CLASS_REFERENCE, SHOW_REFLECT_FRAMES, SHOW_CLASS_LOADER, SHOW_MODULE_BEHAVIOR }
    public static StackWalker getInstance() { return null; }
    public static StackWalker getInstance(Option option) { return null; }
    public static StackWalker getInstance(java.util.Set<Option> options) { return null; }
    public void forEach(Consumer<? super StackFrame> action) {}
    public <T> T walk(java.util.function.Function<? super Stream<? extends StackFrame>, ? extends T> function) { return null; }
    public StackFrame getCallerFrame() { return null; }
    public interface StackFrame {
        String getClassName();
        Class<?> getDeclaringClass();
        String getMethodName();
        int getLineNumber();
        boolean isNativeMethod();
        String getFileName();
    }
}
