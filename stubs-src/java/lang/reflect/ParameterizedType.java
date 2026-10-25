package java.lang.reflect;

import java.lang.annotation.Annotation;

public interface ParameterizedType extends Type {
    Type[] getActualTypeArguments();
    Type getRawType();
    Type getOwnerType();
}