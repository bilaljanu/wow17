package poc.compat.java.lang.management;
public class ObjectName implements Comparable<ObjectName>, java.io.Serializable {
    private final String name;
    public ObjectName(String name) throws java.lang.IllegalArgumentException { this.name = name; }
    public String getCanonicalName() { return name; }
    public int compareTo(ObjectName other) { return name.compareTo(other.name); }
    public boolean equals(Object obj) { return obj instanceof ObjectName && name.equals(((ObjectName) obj).name); }
    public int hashCode() { return name.hashCode(); }
    public String toString() { return name; }
}
