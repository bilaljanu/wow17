package poc.compat.java.lang.reflect;
public interface TypeVariable<D extends GenericDeclaration> extends java.lang.reflect.Type, java.lang.reflect.AnnotatedElement {
    D getGenericDeclaration();
    String getName();
    java.lang.reflect.Type[] getBounds();
}
