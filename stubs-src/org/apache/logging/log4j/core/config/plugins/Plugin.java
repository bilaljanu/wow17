package org.apache.logging.log4j.core.config.plugins;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Plugin {
    String name();
    String category() default "";
    String elementType() default "";
    boolean printObject() default false;
    boolean deferChildren() default false;
}