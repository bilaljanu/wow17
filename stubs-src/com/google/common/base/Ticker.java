package com.google.common.base;

public abstract class Ticker {
    public static Ticker systemTicker() { return new Ticker() { public long read() { return 0; } }; }
    protected Ticker() {}
    public abstract long read();
}
