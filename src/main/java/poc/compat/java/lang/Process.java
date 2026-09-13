package poc.compat.java.lang;
public abstract class Process {
    public abstract java.io.InputStream getInputStream();
    public abstract java.io.OutputStream getOutputStream();
    public abstract java.io.InputStream getErrorStream();
    public abstract int waitFor() throws InterruptedException;
    public abstract boolean waitFor(long timeout, java.util.concurrent.TimeUnit unit) throws InterruptedException;
    public abstract int exitValue();
    public abstract void destroy();
    public abstract ProcessHandle toHandle();
}
