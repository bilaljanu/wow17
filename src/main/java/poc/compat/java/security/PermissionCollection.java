package poc.compat.java.security;
public abstract class PermissionCollection implements java.io.Serializable {
    public abstract void add(Permission permission);
    public abstract boolean implies(Permission permission);
    public abstract java.util.Enumeration<Permission> elements();
}
