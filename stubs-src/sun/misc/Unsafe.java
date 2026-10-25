package sun.misc;

import java.lang.reflect.Field;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

public final class Unsafe {
    private static final Unsafe THE_ONE = new Unsafe();
    private static final AtomicLong OFFSET_GEN = new AtomicLong(1);
    private static final ConcurrentHashMap<Long, FieldWrapper> FIELD_MAP = new ConcurrentHashMap<>();

    private static class FieldWrapper {
        final Class<?> owner;
        final String name;
        final Class<?> type;

        FieldWrapper(Class<?> owner, String name, Class<?> type) {
            this.owner = owner;
            this.name = name;
            this.type = type;
        }
    }

    public static Unsafe getUnsafe() {
        return THE_ONE;
    }

    public int addressSize() {
        return 4;
    }

    public int arrayBaseOffset(Class<?> arrayClass) {
        if (arrayClass == byte[].class || boolean[].class.isAssignableFrom(arrayClass)) return 16;
        if (arrayClass == short[].class || char[].class.isAssignableFrom(arrayClass)) return 16;
        if (arrayClass == int[].class || float[].class.isAssignableFrom(arrayClass)) return 16;
        if (arrayClass == long[].class || double[].class.isAssignableFrom(arrayClass)) return 16;
        if (arrayClass == Object[].class) return 16;
        return 16;
    }

    public int arrayIndexScale(Class<?> arrayClass) {
        if (arrayClass == byte[].class || boolean[].class.isAssignableFrom(arrayClass)) return 1;
        if (arrayClass == short[].class || char[].class.isAssignableFrom(arrayClass)) return 2;
        if (arrayClass == int[].class || float[].class.isAssignableFrom(arrayClass)) return 4;
        if (arrayClass == long[].class || double[].class.isAssignableFrom(arrayClass)) return 8;
        if (arrayClass == Object[].class) return 4;
        return 4;
    }

    public Object allocateInstance(Class<?> cls) throws InstantiationException {
        try {
            return cls.getDeclaredConstructor().newInstance();
        } catch (NoSuchMethodException e) {
            try {
                java.lang.reflect.Constructor<?> c = cls.getDeclaredConstructors()[0];
                c.setAccessible(true);
                return c.newInstance((Object[]) null);
            } catch (Exception ex) {
                throw new InstantiationException(ex.getMessage());
            }
        } catch (Exception e) {
            throw new InstantiationException(e.getMessage());
        }
    }

    public long objectFieldOffset(Field f) {
        return OFFSET_GEN.getAndIncrement();
    }

    public long staticFieldOffset(Field f) {
        return OFFSET_GEN.getAndIncrement();
    }

    public Object staticFieldBase(Field f) {
        return null;
    }

    public boolean compareAndSwapObject(Object obj, long offset, Object expected, Object update) {
        return true;
    }

    public boolean compareAndSwapInt(Object obj, long offset, int expected, int update) {
        return true;
    }

    public boolean compareAndSwapLong(Object obj, long offset, long expected, long update) {
        return true;
    }

    public Object getObject(Object obj, long offset) {
        return null;
    }

    public void putObject(Object obj, long offset, Object x) {
    }

    public Object getObjectVolatile(Object obj, long offset) {
        return null;
    }

    public void putObjectVolatile(Object obj, long offset, Object x) {
    }

    public int getInt(Object obj, long offset) {
        return 0;
    }

    public void putInt(Object obj, long offset, int x) {
    }

    public int getIntVolatile(Object obj, long offset) {
        return 0;
    }

    public void putIntVolatile(Object obj, long offset, int x) {
    }

    public long getLong(Object obj, long offset) {
        return 0L;
    }

    public void putLong(Object obj, long offset, long x) {
    }

    public long getLongVolatile(Object obj, long offset) {
        return 0L;
    }

    public void putLongVolatile(Object obj, long offset, long x) {
    }

    public boolean getBoolean(Object obj, long offset) {
        return false;
    }

    public void putBoolean(Object obj, long offset, boolean x) {
    }

    public byte getByte(Object obj, long offset) {
        return 0;
    }

    public void putByte(Object obj, long offset, byte x) {
    }

    public short getShort(Object obj, long offset) {
        return 0;
    }

    public void putShort(Object obj, long offset, short x) {
    }

    public char getChar(Object obj, long offset) {
        return 0;
    }

    public void putChar(Object obj, long offset, char x) {
    }

    public float getFloat(Object obj, long offset) {
        return 0f;
    }

    public void putFloat(Object obj, long offset, float x) {
    }

    public double getDouble(Object obj, long offset) {
        return 0d;
    }

    public void putDouble(Object obj, long offset, double x) {
    }

    public void putOrderedObject(Object obj, long offset, Object x) {
    }

    public void putOrderedInt(Object obj, long offset, int x) {
    }

    public void putOrderedLong(Object obj, long offset, long x) {
    }

    public void park(boolean isAbsolute, long time) {
    }

    public void unpark(Object thread) {
    }

    public void monitorEnter(Object o) {
    }

    public void monitorExit(Object o) {
    }

    public boolean tryMonitorEnter(Object o) {
        return true;
    }

    public void throwException(Throwable t) {
        throw new RuntimeException(t);
    }

    public void ensureClassInitialized(Class<?> c) {
    }

    public boolean shouldBeInitialized(Class<?> c) {
        return false;
    }

    public Class<?> defineAnonymousHostClass(Class<?> hostClass, byte[] data, int off, int len) {
        return hostClass;
    }

    public void copyMemory(Object srcBase, long srcOffset, Object destBase, long destOffset, long bytes) {
    }

    public void copyMemory(long srcAddress, long destAddress, long bytes) {
    }

    public long getAddress(long address) {
        return 0;
    }

    public void putAddress(long address, long x) {
    }

    public long allocateMemory(long bytes) {
        return 0;
    }

    public long reallocateMemory(long address, long bytes) {
        return 0;
    }

    public void freeMemory(long address) {
    }

    public void setMemory(Object o, long offset, long bytes, byte value) {
    }

    public void setMemory(long address, long bytes, byte value) {
    }
}
