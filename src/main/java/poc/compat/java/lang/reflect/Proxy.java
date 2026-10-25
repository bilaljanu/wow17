package poc.compat.java.lang.reflect;
import java.lang.reflect.InvocationHandler;
public class Proxy implements java.io.Serializable {
    private static final long serialVersionUID = -2222569243894897095L;
    protected InvocationHandler h;
    protected Proxy(InvocationHandler h) { this.h = h; }
    public static Object newProxyInstance(ClassLoader loader, Class<?>[] interfaces, InvocationHandler h) {
        if (interfaces.length == 0) throw new IllegalArgumentException("no interfaces");
        return java.lang.reflect.Proxy.newProxyInstance((java.lang.ClassLoader) loader, interfaces, h);
    }
    public static InvocationHandler getInvocationHandler(Object proxy) { return null; }
    public static Class<?> getProxyClass(ClassLoader loader, Class<?>... interfaces) { return Proxy.class; }
    public static boolean isProxyClass(Class<?> cl) { return cl == Proxy.class; }
    public InvocationHandler getInvocationHandler() { return h; }
}
