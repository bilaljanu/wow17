package java.lang;

public abstract class ProcessHandle implements Comparable<ProcessHandle> {
    public long pid() {
        return 0;
    }

    public ProcessHandle.Info info() {
        return new StubInfo();
    }

    public boolean isAlive() {
        return false;
    }

    public long getPid() {
        return 0;
    }

    public ProcessHandle parent() {
        return null;
    }

    public java.util.Optional<ProcessHandle> toHandle() {
        return java.util.Optional.empty();
    }

    public boolean supportsNormalTermination() {
        return false;
    }

    public boolean destroy() {
        return false;
    }

    public boolean destroyForcibly() {
        return false;
    }

    public static ProcessHandle current() {
        return new StubProcessHandle();
    }

    public static java.util.Optional<ProcessHandle> of(long pid) {
        return java.util.Optional.empty();
    }

    public static java.util.stream.Stream<ProcessHandle> allProcesses() {
        return java.util.stream.Stream.empty();
    }

    public int compareTo(ProcessHandle other) {
        return Long.compare(pid(), other.pid());
    }

    public static class Info {
        public java.util.Optional<String> command() { return java.util.Optional.empty(); }
        public java.util.Optional<String> commandLine() { return java.util.Optional.empty(); }
        public java.util.Optional<String[]> arguments() { return java.util.Optional.empty(); }
        public java.util.Optional<String> startInstant() { return java.util.Optional.empty(); }
        public java.util.Optional<Long> totalCpuDuration() { return java.util.Optional.empty(); }
        public java.util.Optional<String> user() { return java.util.Optional.empty(); }
    }

    private static class StubInfo extends Info {}

    private static class StubProcessHandle extends ProcessHandle {
        public long pid() { return 0; }
        public boolean isAlive() { return false; }
        public long getPid() { return 0; }
        public ProcessHandle parent() { return null; }
        public boolean destroy() { return false; }
        public boolean destroyForcibly() { return false; }
    }
}
