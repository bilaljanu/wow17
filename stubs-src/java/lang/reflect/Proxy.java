package java.lang.reflect;

import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class Proxy implements java.io.Serializable {
    private InvocationHandler h;
    private Class<?>[] interfaces;

    protected Proxy(InvocationHandler h) {
        this.h = h;
    }

    public static Class<?> getProxyClass(ClassLoader loader, Class<?>... interfaces) {
        return Proxy.class;
    }

    public static Object newProxyInstance(ClassLoader loader, Class<?>[] interfaces, InvocationHandler h) {
        try {
            Class<?> proxyClass = getProxyClass(loader, interfaces);
            return proxyClass.getConstructor(InvocationHandler.class).newInstance(h);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static InvocationHandler getInvocationHandler(Object proxy) {
        if (proxy instanceof Proxy) {
            return ((Proxy) proxy).h;
        }
        throw new IllegalArgumentException();
    }

    public static boolean isProxyClass(Class<?> cl) {
        return Proxy.class.isAssignableFrom(cl);
    }

    public InvocationHandler getInvocationHandler() {
        return h;
    }

    protected Proxy() {
        this.h = null;
    }

    public Class<?>[] getInterfaces() {
        return interfaces != null ? interfaces.clone() : new Class<?>[0];
    }
}
