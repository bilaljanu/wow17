package org.apache.log4j;

/**
 * Minimal stub for org.apache.log4j.Priority to support the Logger shim.
 * This provides the minimum implementation needed to satisfy method signatures
 * without triggering TeaVM JSO/lambda NPE issues.
 */
public class Priority {

    // Priority level constants
    public static final int ALL_INT = 0;
    public static final int DEBUG_INT = 1;
    public static final int INFO_INT = 2;
    public static final int WARN_INT = 4;
    public static final int ERROR_INT = 5;
    public static final int FATAL_INT = 6;
    public static final int OFF_INT = 7;

    public static final Priority ALL = new Priority(ALL_INT, "ALL");
    public static final Priority DEBUG = new Priority(DEBUG_INT, "DEBUG");
    public static final Priority INFO = new Priority(INFO_INT, "INFO");
    public static final Priority WARN = new Priority(WARN_INT, "WARN");
    public static final Priority ERROR = new Priority(ERROR_INT, "ERROR");
    public static final Priority FATAL = new Priority(FATAL_INT, "FATAL");
    public static final Priority OFF = new Priority(OFF_INT, "OFF");

    private final int level;
    private final String name;

    public Priority(int level, String name) {
        this.level = level;
        this.name = name;
    }

    public int toInt() {
        return level;
    }

    public String toString() {
        return name;
    }

    public boolean isGreaterOrEqual(Priority other) {
        return this.level >= other.level;
    }
}
