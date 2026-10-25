package poc.compat.java.security;
public interface Principal {
    String getName();
    boolean equals(Object another);
    int hashCode();
}
