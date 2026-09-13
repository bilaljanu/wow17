package org.apache.log4j;

import org.apache.log4j.Priority;

/**
 * Shim for org.apache.log4j.Logger that resolves the TeaVM JSO/lambda NPE
 * caused by Netty's Log4JLogger runtime logging attempting to resolve
 * log() and isEnabledFor() methods.
 *
 * This shim provides the minimum implementation needed to satisfy
 * the method signatures without triggering the underlying Netty logging
 * plumbing that causes the TeaVM error.
 */
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

    // These methods are called by Netty's Log4JLogger and must exist
    // to prevent ClassNotFoundError, but we provide minimal implementations
    // that avoid triggering the TeaVM JSO/lambda NPE in the Netty internals

    public void log(String msg, Priority priority, Object param1, Throwable throwable) {
        // Minimal implementation - just avoid doing anything that would
        // trigger the Netty logging plumbing that causes the TeaVM error
        // In a real implementation, this might route to a proper logging system
    }

    public boolean isEnabledFor(Priority priority) {
        // Return sensible defaults to avoid breaking logic that depends on this
        // Most logging frameworks enable WARN, ERROR, FATAL by default
        if (priority == null) {
            return false;
        }
        int priorityLevel = priority.toInt();
        // Enable WARN (4), ERROR (5), FATAL (6) by default
        // Disable DEBUG (1) and INFO (2) to reduce noise
        return priorityLevel >= Priority.WARN_INT;
    }

    // Additional methods that might be called - keep them minimal
    public String getName() {
        return name;
    }
}