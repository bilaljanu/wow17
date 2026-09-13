package java.lang.invoke;

public class MethodType implements java.io.Serializable {
    private final Class<?> rtype;
    private final Class<?>[] ptypes;

    private MethodType(Class<?> rtype, Class<?>[] ptypes) {
        this.rtype = rtype;
        this.ptypes = ptypes;
    }

    public static MethodType methodType(Class<?> rtype) {
        return new MethodType(rtype, new Class<?>[0]);
    }

    public static MethodType methodType(Class<?> rtype, Class<?> ptype0) {
        return new MethodType(rtype, new Class<?>[]{ptype0});
    }

    public static MethodType methodType(Class<?> rtype, Class<?>[] ptypes) {
        return new MethodType(rtype, ptypes.clone());
    }

    public static MethodType methodType(Class<?> rtype, java.util.List<Class<?>> ptypes) {
        return new MethodType(rtype, ptypes.toArray(new Class<?>[0]));
    }

    public static MethodType methodType(Class<?> rtype, Class<?> ptype0, Class<?>... ptypes) {
        Class<?>[] all = new Class<?>[ptypes.length + 1];
        all[0] = ptype0;
        System.arraycopy(ptypes, 0, all, 1, ptypes.length);
        return new MethodType(rtype, all);
    }

    public static MethodType genericMethodType(int objectArgCount) {
        Class<?>[] params = new Class<?>[objectArgCount];
        java.util.Arrays.fill(params, Object.class);
        return new MethodType(Object.class, params);
    }

    public Class<?> returnType() { return rtype; }
    public java.util.List<Class<?>> parameterList() { return java.util.Arrays.asList(ptypes); }
    public Class<?>[] parameterArray() { return ptypes.clone(); }
    public int parameterCount() { return ptypes.length; }
    public Class<?> parameterType(int index) { return ptypes[index]; }
    public int parameterSlotCount() { return ptypes.length; }

    public MethodType changeReturnType(Class<?> nrtype) {
        return new MethodType(nrtype, ptypes);
    }

    public MethodType changeParameterType(int pos, Class<?> nptype) {
        Class<?>[] newPtypes = ptypes.clone();
        newPtypes[pos] = nptype;
        return new MethodType(rtype, newPtypes);
    }

    public MethodType appendParameterTypes(Class<?>... ptypesToAppend) {
        Class<?>[] newPtypes = new Class<?>[this.ptypes.length + ptypesToAppend.length];
        System.arraycopy(this.ptypes, 0, newPtypes, 0, this.ptypes.length);
        System.arraycopy(ptypesToAppend, 0, newPtypes, this.ptypes.length, ptypesToAppend.length);
        return new MethodType(rtype, newPtypes);
    }

    public MethodType insertParameterTypes(int pos, Class<?>... ptypesToInsert) {
        Class<?>[] newPtypes = new Class<?>[this.ptypes.length + ptypesToInsert.length];
        System.arraycopy(this.ptypes, 0, newPtypes, 0, pos);
        System.arraycopy(ptypesToInsert, 0, newPtypes, pos, ptypesToInsert.length);
        System.arraycopy(this.ptypes, pos, newPtypes, pos + ptypesToInsert.length, this.ptypes.length - pos);
        return new MethodType(rtype, newPtypes);
    }

    public MethodType dropParameterTypes(int start, int end) {
        int newLen = ptypes.length - (end - start);
        Class<?>[] newPtypes = new Class<?>[newLen];
        System.arraycopy(ptypes, 0, newPtypes, 0, start);
        System.arraycopy(ptypes, end, newPtypes, start, ptypes.length - end);
        return new MethodType(rtype, newPtypes);
    }

    public boolean hasPrimitives() {
        for (Class<?> p : ptypes) {
            if (p.isPrimitive()) return true;
        }
        return rtype.isPrimitive();
    }

    public boolean hasPrimitiveParameters() {
        for (Class<?> p : ptypes) {
            if (p.isPrimitive()) return true;
        }
        return false;
    }

    public MethodType wrap() { return this; }
    public MethodType unwrap() { return this; }

    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append('(');
        for (int i = 0; i < ptypes.length; i++) {
            if (i > 0) sb.append(',');
            sb.append(ptypes[i].getName());
        }
        sb.append(')');
        sb.append(rtype.getName());
        return sb.toString();
    }

    public boolean equals(Object o) {
        if (!(o instanceof MethodType)) return false;
        MethodType other = (MethodType) o;
        return rtype.equals(other.rtype) && java.util.Arrays.equals(ptypes, other.ptypes);
    }

    public int hashCode() {
        return rtype.hashCode() ^ java.util.Arrays.hashCode(ptypes);
    }
}
