package com.google.common.base;

public class Stopwatch {
    public static Stopwatch createStarted(Ticker ticker) {
        return new Stopwatch();
    }

    public void reset() {}
    public boolean isRunning() { return false; }
    public Stopwatch start() { return this; }
    public Stopwatch stop() { return this; }
    public long elapsed(java.util.concurrent.TimeUnit unit) { return 0; }
}
