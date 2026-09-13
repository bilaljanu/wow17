package poc.compat.java.lang;

public class Runtime {
    private static final Runtime currentRuntime = new Runtime();

    public static Runtime getRuntime() {
        return currentRuntime;
    }

    private Runtime() {}

    public void exit(int status) {
        throw new UnsupportedOperationException("exit not supported in browser");
    }

    public void addShutdownHook(Thread hook) {
        // no-op in browser
    }

    public boolean removeShutdownHook(Thread hook) {
        return false;
    }

    public int availableProcessors() {
        return 1;
    }

    public long totalMemory() {
        return 16777216L;
    }

    public long freeMemory() {
        return 8388608L;
    }

    public long maxMemory() {
        return 268435456L;
    }

    public void gc() {}

    public void runFinalization() {}

    public Process exec(String command) throws java.io.IOException {
        throw new UnsupportedOperationException("exec not supported in browser");
    }

    public Process exec(String[] cmdarray) throws java.io.IOException {
        throw new UnsupportedOperationException("exec not supported in browser");
    }

    public Process exec(String[] cmdarray, String[] envp) throws java.io.IOException {
        throw new UnsupportedOperationException("exec not supported in browser");
    }

    public Process exec(String command, String[] envp) throws java.io.IOException {
        throw new UnsupportedOperationException("exec not supported in browser");
    }

    public Process exec(String[] cmdarray, String[] envp, java.io.File dir) throws java.io.IOException {
        throw new UnsupportedOperationException("exec not supported in browser");
    }

    public Process exec(String command, String[] envp, java.io.File dir) throws java.io.IOException {
        throw new UnsupportedOperationException("exec not supported in browser");
    }

    public void traceInstructions(boolean on) {}

    public void traceMethodCalls(boolean on) {}

    public void load(String filename) {
        throw new UnsupportedOperationException("load not supported in browser");
    }

    public void loadLibrary(String libname) {
        throw new UnsupportedOperationException("loadLibrary not supported in browser");
    }
}