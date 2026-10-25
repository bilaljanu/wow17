package java.lang;

import java.util.Set;
import java.util.function.Function;
import java.util.stream.Stream;

public class StackWalker {
    public enum Option {
        RETAIN_CLASS_REFERENCE,
        SHOW_CLASS_LOADER,
        SHOW_REFLECTION_FRAMES
    }

    public interface StackFrame {
        String getClassName();
        String getMethodName();
        String getFileName();
        int getLineNumber();
        Class<?> getDeclaringClass();
        boolean isNativeMethod();
    }

    private static final StackWalker INSTANCE = new StackWalker();

    private StackWalker() {}

    public static StackWalker getInstance() {
        return INSTANCE;
    }

    public static StackWalker getInstance(Option option) {
        return INSTANCE;
    }

    public static StackWalker getInstance(Set<Option> options) {
        return INSTANCE;
    }

    public <T> T walk(Function<? extends Stream<StackFrame>, ? extends T> function) {
        return function.apply(Stream.empty());
    }
}
