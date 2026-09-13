package poc.compat.java.lang;
public final class RuntimePermission extends java.security.Permission {
    private static final long serialVersionUID = 7390374806847697101L;
    public RuntimePermission(String name) { super(name); }
    public RuntimePermission(String name, String actions) { super(name); }
    public boolean implies(java.security.Permission p) { return false; }
    public boolean equals(Object obj) { return obj instanceof RuntimePermission && getName().equals(((RuntimePermission) obj).getName()); }
    public int hashCode() { return getName().hashCode(); }
    public String getActions() { return ""; }
}
