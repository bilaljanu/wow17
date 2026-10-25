package java.time;

public final class ZoneId implements java.io.Serializable {
    private final String id;

    private ZoneId(String id) {
        this.id = id;
    }

    public static ZoneId systemDefault() {
        return UTC;
    }

    public static final ZoneId UTC = new ZoneId("UTC");

    public static ZoneId of(String zoneId) {
        return new ZoneId(zoneId);
    }

    public String getId() {
        return id;
    }

    public String toString() {
        return id;
    }

    public boolean equals(Object obj) {
        if (!(obj instanceof ZoneId)) return false;
        return id.equals(((ZoneId) obj).id);
    }

    public int hashCode() {
        return id.hashCode();
    }
}
