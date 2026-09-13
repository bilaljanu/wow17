package java.security;

import java.security.Permission;

public interface Principal {
    String getName();
    boolean equals(Object another);
    int hashCode();
}
