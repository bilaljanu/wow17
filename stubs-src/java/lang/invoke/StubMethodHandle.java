package java.lang.invoke;

public class StubMethodHandle extends MethodHandle {
    private final String name;
    private final MethodType type;

    public StubMethodHandle(String name, MethodType type) {
        this.name = name;
        this.type = type;
    }

    @Override
    public MethodType type() {
        return type;
    }

    @Override
    public MethodHandle asType(MethodType newType) {
        return this;
    }

    @Override
    public MethodHandle bindTo(Object x) {
        return this;
    }

    @Override
    public Object invoke(Object... args) throws Throwable {
        if (type.returnType() == void.class) return null;
        return defaultValue(type.returnType());
    }

    @Override
    public Object invokeExact(Object... args) throws Throwable {
        return invoke(args);
    }

    @Override
    public Object invokeWithArguments(java.util.List<?> args) throws Throwable {
        return invoke(args.toArray());
    }

    @Override
    public Object invokeWithArguments(Object... args) throws Throwable {
        return invoke(args);
    }

    @Override
    public MethodHandle copy() {
        return new StubMethodHandle(name, type);
    }

    @Override
    public MethodHandle copyWith(MethodType newType) {
        return new StubMethodHandle(name, newType);
    }

    @Override
    public String toString() {
        return "MethodHandle{" + name + " " + type + "}";
    }

    static Object defaultValue(Class<?> type) {
        if (type == boolean.class) return false;
        if (type == byte.class) return (byte) 0;
        if (type == short.class) return (short) 0;
        if (type == char.class) return (char) 0;
        if (type == int.class) return 0;
        if (type == long.class) return 0L;
        if (type == float.class) return 0.0f;
        if (type == double.class) return 0.0d;
        return null;
    }
}
