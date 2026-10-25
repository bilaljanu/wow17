package poc.compat.java.lang;
public final class Class<T> implements java.io.Serializable {
    private static final long serialVersionUID = 3206093459760846163L;
    public static Class<?> forName(String className) throws ClassNotFoundException { throw new ClassNotFoundException(className); }
    public static Class<?> forName(String name, boolean initialize, ClassLoader loader) throws ClassNotFoundException { throw new ClassNotFoundException(name); }
    public String getName() { return ""; }
    public String getSimpleName() { return ""; }
    public String getCanonicalName() { return ""; }
    public Package getPackage() { return null; }
    public Module getModule() { return new Module(); }
    public ClassLoader getClassLoader() { return null; }
    public ClassLoader getSuperclass() { return null; }
    public java.lang.reflect.Type getGenericSuperclass() { return null; }
    public Class<?>[] getInterfaces() { return new Class[0]; }
    public java.lang.reflect.Type[] getGenericInterfaces() { return new java.lang.reflect.Type[0]; }
    public int getModifiers() { return 0; }
    public boolean isInterface() { return false; }
    public boolean isEnum() { return false; }
    public boolean isAnnotation() { return false; }
    public boolean isPrimitive() { return false; }
    public boolean isArray() { return false; }
    public boolean isSynthetic() { return false; }
    public boolean isMemberClass() { return false; }
    public boolean isLocalClass() { return false; }
    public boolean isAnonymousClass() { return false; }
    public boolean isInstance(Object obj) { return false; }
    public boolean isAssignableFrom(Class<?> cls) { return false; }
    public Class<?> getComponentType() { return null; }
    public int getArrayLength() { return 0; }
    public T newInstance() throws InstantiationException, IllegalAccessException { throw new InstantiationException(); }
    public java.lang.reflect.Field[] getFields() throws SecurityException { return new java.lang.reflect.Field[0]; }
    public java.lang.reflect.Field[] getDeclaredFields() throws SecurityException { return new java.lang.reflect.Field[0]; }
    public java.lang.reflect.Field getField(String name) throws NoSuchFieldException, SecurityException { throw new NoSuchFieldException(name); }
    public java.lang.reflect.Field getDeclaredField(String name) throws NoSuchFieldException, SecurityException { throw new NoSuchFieldException(name); }
    public java.lang.reflect.Method[] getMethods() throws SecurityException { return new java.lang.reflect.Method[0]; }
    public java.lang.reflect.Method[] getDeclaredMethods() throws SecurityException { return new java.lang.reflect.Method[0]; }
    public java.lang.reflect.Method getMethod(String name, Class<?>... parameterTypes) throws NoSuchMethodException, SecurityException { throw new NoSuchMethodException(name); }
    public java.lang.reflect.Method getDeclaredMethod(String name, Class<?>... parameterTypes) throws NoSuchMethodException, SecurityException { throw new NoSuchMethodException(name); }
    public java.lang.reflect.Constructor<?>[] getConstructors() throws SecurityException { return new java.lang.reflect.Constructor[0]; }
    public java.lang.reflect.Constructor<?>[] getDeclaredConstructors() throws SecurityException { return new java.lang.reflect.Constructor[0]; }
    public java.lang.reflect.Constructor<T> getConstructor(Class<?>... parameterTypes) throws NoSuchMethodException, SecurityException { throw new NoSuchMethodException(); }
    public java.lang.reflect.Constructor<T> getDeclaredConstructor(Class<?>... parameterTypes) throws NoSuchMethodException, SecurityException { throw new NoSuchMethodException(); }
    public Class<?> getEnclosingClass() { return null; }
    public Class<?> getDeclaringClass() { return null; }
    public Class<?> getEnclosingMethod() { return null; }
    public Class<?> getEnclosingConstructor() { return null; }
    public Object[] getEnumConstants() { return null; }
    public T cast(Object obj) { return (T) obj; }
    public <U> Class<? extends U> asSubclass(Class<U> clazz) { return (Class<? extends U>) this; }
    public T[] getEnumConstantsShared() { return null; }
    public java.lang.reflect.Field[] getEnumConstantsSharedImpl() { return null; }
    public String toString() { return "class " + getName(); }
    public boolean equals(Object obj) { return this == obj; }
    public int hashCode() { return java.lang.System.identityHashCode(this); }
}
