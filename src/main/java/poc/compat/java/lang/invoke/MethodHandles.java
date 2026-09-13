package poc.compat.java.lang.invoke;
public final class MethodHandles {
    private MethodHandles() {}
    public static Lookup lookup() { return new Lookup(); }
    public static class Lookup { public Lookup() {} }
}
