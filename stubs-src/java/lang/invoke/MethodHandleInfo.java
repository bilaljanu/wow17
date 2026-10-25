package java.lang.invoke;

public class MethodHandleInfo {
    public static final int REF_getField = 1;
    public static final int REF_getStatic = 2;
    public static final int REF_putField = 3;
    public static final int REF_putStatic = 4;
    public static final int REF_invokeVirtual = 5;
    public static final int REF_invokeStatic = 6;
    public static final int REF_invokeSpecial = 7;
    public static final int REF_newInvokeSpecial = 8;
    public static final int REF_invokeInterface = 9;

    public Class<?> getDeclaringClass() { return Object.class; }
    public String getName() { return ""; }
    public MethodType getMethodType() { return MethodType.methodType(void.class); }
    public int getReferenceKind() { return REF_invokeStatic; }
    public boolean isVarArgs() { return false; }
    public int getModifiers() { return 0; }

    public static String referenceKindToString(int referenceKind) { return ""; }
    public static Class<?> referenceKindToDeclaringClass(int referenceKind) { return Object.class; }
}
