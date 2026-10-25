package poc.compat.java.lang.reflect;
public interface WildcardType extends java.lang.reflect.Type {
    java.lang.reflect.Type[] getUpperBounds();
    java.lang.reflect.Type[] getLowerBounds();
}
