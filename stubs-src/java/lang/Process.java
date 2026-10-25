package java.lang;

import java.io.InputStream;
import java.io.OutputStream;

public abstract class Process {
    protected Process() {}

    public abstract OutputStream getOutputStream();

    public abstract InputStream getInputStream();

    public abstract InputStream getErrorStream();

    public abstract int waitFor() throws InterruptedException;

    public abstract boolean waitFor(long timeout, java.util.concurrent.TimeUnit unit) throws InterruptedException;

    public abstract int exitValue();

    public abstract void destroy();

    public abstract ProcessHandle onExit();

    public abstract ProcessHandle pid();

    public static ProcessHandle start(String... command) throws java.io.IOException {
        throw new java.io.IOException("Process not supported in browser");
    }
}
