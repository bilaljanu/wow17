package org.apache.log4j;

public class Logger {
    private final String name;

    public Logger(String name) {
        this.name = name;
    }

    public static Logger getLogger(Class<?> clazz) {
        return new Logger(clazz.getName());
    }

    public static Logger getLogger(String name) {
        return new Logger(name);
    }

    public boolean isTraceEnabled() { return false; }
    public boolean isDebugEnabled() { return false; }
    public boolean isInfoEnabled() { return false; }
    public boolean isWarnEnabled() { return true; }
    public boolean isErrorEnabled() { return true; }
    public boolean isFatalEnabled() { return true; }

    public void trace(Object message) {}
    public void trace(Object message, Throwable t) {}
    public void debug(Object message) {}
    public void debug(Object message, Throwable t) {}
    public void info(Object message) {}
    public void info(Object message, Throwable t) {}
    public void warn(Object message) {}
    public void warn(Object message, Throwable t) {}
    public void error(Object message) {}
    public void error(Object message, Throwable t) {}
    public void fatal(Object message) {}
    public void fatal(Object message, Throwable t) {}

    public String getName() { return name; }
}
