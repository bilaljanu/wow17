package java.security;

public interface Permission {
    String getName();
    String getActions();
    boolean implies(Permission p);
    boolean equals(Object obj);
    int hashCode();
}
