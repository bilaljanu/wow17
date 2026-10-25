package java.lang.invoke;

public final class MethodHandles {
    public static Lookup lookup() {
        return new Lookup();
    }

    public static Lookup publicLookup() {
        return new Lookup();
    }

    public static MethodHandle findStatic(Class<?> refc, String name, MethodType type) throws NoSuchMethodException, IllegalAccessException {
        return new StubMethodHandle(name, type);
    }

    public static MethodHandle findVirtual(Class<?> refc, String name, MethodType type) throws NoSuchMethodException, IllegalAccessException {
        return new StubMethodHandle(name, type);
    }

    public static MethodHandle findConstructor(Class<?> refc, MethodType type) throws NoSuchMethodException, IllegalAccessException {
        return new StubMethodHandle("<init>", type);
    }

    public static MethodHandle insertArguments(MethodHandle target, int pos, Object... values) {
        return target;
    }

    public static MethodHandle dropArguments(MethodHandle target, int pos, java.util.List<?> valueTypes) {
        return target;
    }

    public static class Lookup {
        public Class<?> lookupClass() {
            return Object.class;
        }

        public MethodHandle findStatic(Class<?> refc, String name, MethodType type) throws NoSuchMethodException, IllegalAccessException {
            return MethodHandles.findStatic(refc, name, type);
        }

        public MethodHandle findVirtual(Class<?> refc, String name, MethodType type) throws NoSuchMethodException, IllegalAccessException {
            return MethodHandles.findVirtual(refc, name, type);
        }

        public MethodHandle findConstructor(Class<?> refc, MethodType type) throws NoSuchMethodException, IllegalAccessException {
            return MethodHandles.findConstructor(refc, type);
        }

        public MethodHandle findStaticGetter(Class<?> refc, String name, Class<?> type) throws NoSuchMethodException, IllegalAccessException {
            return new StubMethodHandle(name, MethodType.methodType(type));
        }

        public MethodHandle findGetter(Class<?> refc, String name, Class<?> type) throws NoSuchMethodException, IllegalAccessException {
            return new StubMethodHandle(name, MethodType.methodType(type));
        }

        public MethodHandle findStaticSetter(Class<?> refc, String name, Class<?> type) throws NoSuchMethodException, IllegalAccessException {
            return new StubMethodHandle(name, MethodType.methodType(void.class, type));
        }

        public MethodHandle findSetter(Class<?> refc, String name, Class<?> type) throws NoSuchMethodException, IllegalAccessException {
            return new StubMethodHandle(name, MethodType.methodType(void.class, type));
        }

        public MethodHandle findSpecial(Class<?> refc, String name, MethodType type, Class<?> specialCaller) throws NoSuchMethodException, IllegalAccessException {
            return MethodHandles.findVirtual(refc, name, type);
        }

        public MethodHandle unreflect(java.lang.reflect.Method m) throws IllegalAccessException {
            return new StubMethodHandle(m.getName(), MethodType.methodType(m.getReturnType(), m.getParameterTypes()));
        }

        public MethodHandle unreflectConstructor(java.lang.reflect.Constructor<?> c) throws IllegalAccessException {
            return new StubMethodHandle("<init>", MethodType.methodType(void.class, c.getParameterTypes()));
        }

        public MethodHandle unreflectGetter(java.lang.reflect.Field f) throws IllegalAccessException {
            return new StubMethodHandle(f.getName(), MethodType.methodType(f.getType()));
        }

        public MethodHandle unreflectSetter(java.lang.reflect.Field f) throws IllegalAccessException {
            return new StubMethodHandle(f.getName(), MethodType.methodType(void.class, f.getType()));
        }

        public MethodHandles.Lookup in(Class<?> lookupClass) {
            return this;
        }

        public MethodHandles.Lookup dropLookupMode(int modes) {
            return this;
        }

        public boolean hasAccessTo(MethodHandle mh) {
            return true;
        }

        public MethodHandleInfo reflectDirectlyAsMethod(java.lang.reflect.Member m) {
            return null;
        }

        public MethodHandleInfo revealDirect(MethodHandle target) {
            return null;
        }

        public static final int ORIGINAL = 0;
        public static final int PUBLIC = 1;
        public static final int PRIVATE = 2;
        public static final int PROTECTED = 4;
        public static final int PACKAGE = 8;
        public static final int MODULE = 16;
        public static final int UNCONDITIONAL = 32;
        public static final int MODULE_PUBLIC = MODULE | PUBLIC;
        public static final int MODULE_PRIVATE = MODULE | PRIVATE;
    }
}
