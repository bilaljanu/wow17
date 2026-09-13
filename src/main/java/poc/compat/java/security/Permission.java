package poc.compat.java.security;
public interface Permission extends java.io.Serializable {
    String getName();
    String getActions();
    boolean implies(Permission p);
}
