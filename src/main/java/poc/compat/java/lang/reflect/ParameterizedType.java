package poc.compat.java.lang.reflect;
public interface ParameterizedType extends java.lang.reflect.Type {
    java.lang.reflect.Type[] getActualTypeArguments();
    java.lang.reflect.Type getRawType();
    java.lang.reflect.Type getOwnerType();
}
