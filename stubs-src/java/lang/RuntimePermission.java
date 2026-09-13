package java.lang;

public class RuntimePermission extends java.security.Permission {
    public RuntimePermission(String name) {
        super(name);
    }

    public RuntimePermission(String name, String actions) {
        super(name);
    }

    public boolean implies(java.security.Permission p) {
        return p instanceof RuntimePermission && getName().equals(p.getName());
    }

    public java.security.PermissionCollection newPermissionCollection() {
        return new java.security.PermissionCollection();
    }
}
