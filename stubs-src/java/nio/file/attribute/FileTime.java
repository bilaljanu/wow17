package java.nio.file.attribute;

import java.util.concurrent.TimeUnit;

public final class FileTime implements Comparable<FileTime> {
    private final long value;
    private final TimeUnit unit;

    public static FileTime fromMillis(long value) {
        return new FileTime(value, TimeUnit.MILLISECONDS);
    }

    private FileTime(long value, TimeUnit unit) {
        this.value = value;
        this.unit = unit;
    }

    public long toMillis() {
        return value;
    }

    public long to(TimeUnit unit) {
        return unit.convert(value, this.unit);
    }

    public int compareTo(FileTime other) {
        return Long.compare(this.value, other.value);
    }

    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof FileTime)) return false;
        FileTime other = (FileTime) obj;
        return this.value == other.value && this.unit == other.unit;
    }

    public int hashCode() {
        return Long.hashCode(value);
    }

    public String toString() {
        return value + " " + unit.name();
    }
}
