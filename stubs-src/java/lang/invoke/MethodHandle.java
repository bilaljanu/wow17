package java.lang.invoke;

import java.util.Arrays;

public class MethodHandle implements java.lang.reflect.Cloneable {
    protected MethodHandle() {}

    public MethodType type() {
        return MethodType.methodType(void.class);
    }

    public MethodHandle asType(MethodType newType) {
        return this;
    }

    public MethodHandle asSpreader(Class<?> arrayType, int arrayLength) {
        return this;
    }

    public MethodHandle asCollector(Class<?> arrayType, int arrayLength) {
        return this;
    }

    public MethodHandle asVarargsCollector(Class<?> arrayType) {
        return this;
    }

    public boolean isVarargsCollector() {
        return false;
    }

    public MethodHandle asFixedArity() {
        return this;
    }

    public MethodHandle bindTo(Object x) {
        return this;
    }

    public MethodHandle invoke(Object... args) throws Throwable {
        return null;
    }

    public MethodHandle invokeWithArguments(Object... args) throws Throwable {
        return null;
    }

    public MethodHandle invokeWithArguments(java.util.List<?> args) throws Throwable {
        return null;
    }

    public Object invokeExact(Object... args) throws Throwable {
        return null;
    }

    public Object invokeWithArguments(java.util.List<?> arguments) throws Throwable {
        return null;
    }

    public MethodHandle copy() {
        return this;
    }

    public MethodHandle copyWith(MethodType newType) {
        return this;
    }

    public MethodHandle asTypeUncached(MethodType newType) {
        return this;
    }

    public int invokeBasic(Object... args) throws Throwable {
        return 0;
    }

    public Object internalMemberName() {
        return null;
    }

    public void invokeBasic(Object a0) throws Throwable {}
    public Object invokeBasic(Object a0, Object a1) throws Throwable { return null; }
    public Object invokeBasic(Object a0, Object a1, Object a2) throws Throwable { return null; }
    public Object invokeBasic(Object a0, Object a1, Object a2, Object a3) throws Throwable { return null; }

    static MethodHandle findStatic(Class<?> declClass, String name, MethodType type) throws NoSuchMethodException, IllegalAccessException {
        return new StubMethodHandle(name, type);
    }

    static MethodHandle findVirtual(Class<?> declClass, String name, MethodType type) throws NoSuchMethodException, IllegalAccessException {
        return new StubMethodHandle(name, type);
    }

    static MethodHandle findSpecial(Class<?> declClass, String name, MethodType type, Class<?> currentClass) throws NoSuchMethodException, IllegalAccessException {
        return new StubMethodHandle(name, type);
    }

    static MethodHandle findConstructor(Class<?> declClass, MethodType type) throws NoSuchMethodException, IllegalAccessException {
        return new StubMethodHandle("<init>", type);
    }

    static MethodHandle findSpecial(Class<?> declClass, String name, MethodType type) throws NoSuchMethodException, IllegalAccessException {
        return new StubMethodHandle(name, type);
    }
}
