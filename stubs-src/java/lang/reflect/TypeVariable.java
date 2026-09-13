package java.lang.reflect;

import java.lang.annotation.Annotation;

public interface TypeVariable<D extends GenericDeclaration> extends Type {
    Annotation[] getAnnotations();
    <T extends Annotation> T getAnnotation(Class<T> annotationClass);
    Annotation[] getDeclaredAnnotations();
    D getGenericDeclaration();
    String getName();
    Type[] getBounds();
}
