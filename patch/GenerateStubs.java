import org.objectweb.asm.ClassWriter;
import org.objectweb.asm.FieldVisitor;
import org.objectweb.asm.MethodVisitor;
import org.objectweb.asm.Opcodes;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.jar.JarOutputStream;

/**
 * Generates stub .class files (via ASM) for every JDK/library class that
 * TeaVM 0.13.0 classlib is missing, then injects them into mc-patched.jar.
 *
 * Usage: java GenerateStubs <jar-path>
 *   Reads and overwrites the jar at <jar-path>.
 */
public final class GenerateStubs {
    private static final Map<String, byte[]> STUBS = new LinkedHashMap<>();

    public static void main(String[] args) throws Exception {
        if (args.length != 1) {
            System.err.println("usage: GenerateStubs <jar-path>");
            System.exit(2);
        }
        Path jar = Paths.get(args[0]);
        generateAll();
        injectJar(jar);
    }

    // ── helpers ──────────────────────────────────────────────────────────

    private static ClassWriter cw(int access, String name, String sup, String[] ifaces) {
        ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_MAXS);
        cw.visit(Opcodes.V21, access, name, null, sup, ifaces);
        return cw;
    }

    private static ClassWriter cw(int access, String name, String sup) {
        return cw(access, name, sup, null);
    }

    private static void ctor(ClassWriter cw, String sup) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", "()V", null, null);
        mv.visitCode();
        mv.visitVarInsn(Opcodes.ALOAD, 0);
        mv.visitMethodInsn(Opcodes.INVOKESPECIAL, sup, "<init>", "()V", false);
        mv.visitInsn(Opcodes.RETURN);
        mv.visitMaxs(0, 0);
        mv.visitEnd();
    }

    private static void ctor(ClassWriter cw, String sup, String paramDesc) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", "(" + paramDesc + ")V", null, null);
        mv.visitCode();
        mv.visitVarInsn(Opcodes.ALOAD, 0);
        int slot = 1;
        String t = paramDesc;
        if (t.equals("J") || t.equals("D")) { mv.visitVarInsn(Opcodes.ILOAD, slot); slot += 2; }
        else { mv.visitVarInsn(Opcodes.ILOAD, slot); slot++; }
        mv.visitMethodInsn(Opcodes.INVOKESPECIAL, sup, "<init>", "(" + paramDesc + ")V", false);
        mv.visitInsn(Opcodes.RETURN);
        mv.visitMaxs(0, 0);
        mv.visitEnd();
    }

    private static void ctorTwo(ClassWriter cw, String sup, String d1, String d2) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", "(" + d1 + d2 + ")V", null, null);
        mv.visitCode();
        mv.visitVarInsn(Opcodes.ALOAD, 0);
        int slot = 1;
        mv.visitVarInsn(d1.equals("J") || d1.equals("D") ? Opcodes.LLOAD : Opcodes.ILOAD, slot);
        slot += d1.equals("J") || d1.equals("D") ? 2 : 1;
        mv.visitVarInsn(d2.equals("J") || d2.equals("D") ? Opcodes.LLOAD : Opcodes.ILOAD, slot);
        mv.visitMethodInsn(Opcodes.INVOKESPECIAL, sup, "<init>", "(" + d1 + d2 + ")V", false);
        mv.visitInsn(Opcodes.RETURN);
        mv.visitMaxs(0, 0);
        mv.visitEnd();
    }

    private static void noArgCtor(ClassWriter cw) { ctor(cw, "java/lang/Object"); }

    private static void ret(MethodVisitor mv, String type) {
        switch (type) {
            case "V" -> mv.visitInsn(Opcodes.RETURN);
            case "Z", "B", "S", "C", "I" -> { mv.visitInsn(Opcodes.ICONST_0); mv.visitInsn(Opcodes.IRETURN); }
            case "J" -> { mv.visitInsn(Opcodes.LCONST_0); mv.visitInsn(Opcodes.LRETURN); }
            case "F" -> { mv.visitInsn(Opcodes.FCONST_0); mv.visitInsn(Opcodes.FRETURN); }
            case "D" -> { mv.visitInsn(Opcodes.DCONST_0); mv.visitInsn(Opcodes.DRETURN); }
            default -> { mv.visitInsn(Opcodes.ACONST_NULL); mv.visitInsn(Opcodes.ARETURN); }
        }
    }

    private static void retNull(MethodVisitor mv) {
        mv.visitInsn(Opcodes.ACONST_NULL);
        mv.visitInsn(Opcodes.ARETURN);
    }

    private static void retZero(MethodVisitor mv) {
        mv.visitInsn(Opcodes.ICONST_0);
        mv.visitInsn(Opcodes.IRETURN);
    }

    private static void retFalse(MethodVisitor mv) {
        mv.visitInsn(Opcodes.ICONST_0);
        mv.visitInsn(Opcodes.IRETURN);
    }

    private static void retTrue(MethodVisitor mv) {
        mv.visitInsn(Opcodes.ICONST_1);
        mv.visitInsn(Opcodes.IRETURN);
    }

    private static void retVoid(MethodVisitor mv) {
        mv.visitInsn(Opcodes.RETURN);
    }

    /** Generate a non-static method that returns a default value. */
    private static void defMethod(ClassWriter cw, int access, String name, String desc) {
        String ret = desc.substring(desc.indexOf(')') + 1);
        MethodVisitor mv = cw.visitMethod(access, name, desc, null, null);
        mv.visitCode();
        ret(mv, ret);
        mv.visitMaxs(0, 0);
        mv.visitEnd();
    }

    /** Generate a static method that returns a default value. */
    private static void staticMethod(ClassWriter cw, String name, String desc) {
        defMethod(cw, Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC, name, desc);
    }

    /** Interface method declaration (no body). */
    private static void ifMethod(ClassWriter cw, String name, String desc) {
        MethodVisitor mv = cw.visitMethod(
                Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT, name, desc, null, null);
        mv.visitEnd();
    }

    private static void field(ClassWriter cw, int access, String name, String desc) {
        cw.visitField(access, name, desc, null, null).visitEnd();
    }

    private static void staticField(ClassWriter cw, String name, String desc, Object value) {
        FieldVisitor fv = cw.visitField(
                Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL,
                name, desc, null, value);
        fv.visitEnd();
    }

    private static void clinit(ClassWriter cw, Runnable body) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_STATIC, "<clinit>", "()V", null, null);
        mv.visitCode();
        body.run();
        mv.visitInsn(Opcodes.RETURN);
        mv.visitMaxs(0, 0);
        mv.visitEnd();
    }

    private static void put(String name, ClassWriter cw) { STUBS.put(name + ".class", cw.toByteArray()); }

    // ── all stubs ────────────────────────────────────────────────────────

    private static void generateAll() {
        genLock();
        genReadWriteLock();
        genReentrantLock();
        genReentrantReadWriteLock();
        genCompletableFuture();
        genCompletionException();
        genTimeoutException();
        genCountDownLatch();
        genConcurrentLinkedQueue();
        genLinkedBlockingQueue();
        genConcurrentSkipListSet();
        genAbstractExecutorService();
        genExecutors();
        genForkJoinPool();
        genThreadFactory();
        genAtomicReferenceArray();
        genAtomicIntegerArray();
        genAtomicLongArray();
        genLongAdder();
        genParameterizedType();
        genWildcardType();
        genGenericArrayType();
        genTypeVariable();
        genProxy();
        genSelector();
        genSelectorProvider();
        genFileChannel();
        genPathMatcher();
        genProxyNet();
        genInetAddress();
        genInet4Address();
        genAuthenticator();
        genMessageDigest();
        genPublicKey();
        genCertificate();
        genProcess();
        genUnsatisfiedLinkError();
        genRuntimePermission();
        genStackWalker();
        genPhantomReference();
        genManagementFactory();
        genDateSql();
        genLogger();
        genUnsafe();
        genCompletableFutureMethods();
        genForkJoinTask();
    }

    // ── Group 1: Concurrency ─────────────────────────────────────────────

    private static void genLock() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                "java/util/concurrent/locks/Lock", null, null);
        ifMethod(c, "lock", "()V");
        ifMethod(c, "lockInterruptibly", "()V");
        ifMethod(c, "tryLock", "()Z");
        ifMethod(c, "tryLock", "(JLjava/util/concurrent/TimeUnit;)Z");
        ifMethod(c, "unlock", "()V");
        ifMethod(c, "newCondition", "()Ljava/util/concurrent/locks/Condition;");
        c.visitEnd();
        put("java/util/concurrent/locks/Lock", c);
    }

    private static void genReadWriteLock() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                "java/util/concurrent/locks/ReadWriteLock", null, null);
        ifMethod(c, "readLock", "()Ljava/util/concurrent/locks/Lock;");
        ifMethod(c, "writeLock", "()Ljava/util/concurrent/locks/Lock;");
        c.visitEnd();
        put("java/util/concurrent/locks/ReadWriteLock", c);
    }

    private static void genReentrantLock() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC, "java/util/concurrent/locks/ReentrantLock",
                "java/lang/Object", new String[]{"java/util/concurrent/locks/Lock", "java/io/Serializable"});
        ctor(c, "java/lang/Object");
        defMethod(c, Opcodes.ACC_PUBLIC, "lock", "()V");
        defMethod(c, Opcodes.ACC_PUBLIC, "lockInterruptibly", "()V");
        defMethod(c, Opcodes.ACC_PUBLIC, "tryLock", "()Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "tryLock", "(JLjava/util/concurrent/TimeUnit;)Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "unlock", "()V");
        defMethod(c, Opcodes.ACC_PUBLIC, "newCondition", "()Ljava/util/concurrent/locks/Condition;");
        defMethod(c, Opcodes.ACC_PUBLIC, "isLocked", "()Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "isHeldByCurrentThread", "()Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "getHoldCount", "()I");
        c.visitEnd();
        put("java/util/concurrent/locks/ReentrantLock", c);
    }

    private static void genReentrantReadWriteLock() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC, "java/util/concurrent/locks/ReentrantReadWriteLock",
                "java/lang/Object",
                new String[]{"java/util/concurrent/locks/ReadWriteLock", "java/io/Serializable"});
        ctor(c, "java/lang/Object");
        defMethod(c, Opcodes.ACC_PUBLIC, "readLock", "()Ljava/util/concurrent/locks/Lock;");
        defMethod(c, Opcodes.ACC_PUBLIC, "writeLock", "()Ljava/util/concurrent/locks/Lock;");
        defMethod(c, Opcodes.ACC_PUBLIC, "getReadLockCount", "()I");
        defMethod(c, Opcodes.ACC_PUBLIC, "getWriteHoldCount", "()I");
        defMethod(c, Opcodes.ACC_PUBLIC, "isWriteLocked", "()Z");
        c.visitEnd();
        put("java/util/concurrent/locks/ReentrantReadWriteLock", c);

        // inner ReadLock
        ClassWriter rl = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC,
                "java/util/concurrent/locks/ReentrantReadWriteLock$ReadLock",
                "java/lang/Object", new String[]{"java/util/concurrent/locks/Lock", "java/io/Serializable"});
        defMethod(rl, Opcodes.ACC_PUBLIC, "lock", "()V");
        defMethod(rl, Opcodes.ACC_PUBLIC, "lockInterruptibly", "()V");
        defMethod(rl, Opcodes.ACC_PUBLIC, "tryLock", "()Z");
        defMethod(rl, Opcodes.ACC_PUBLIC, "tryLock", "(JLjava/util/concurrent/TimeUnit;)Z");
        defMethod(rl, Opcodes.ACC_PUBLIC, "unlock", "()V");
        defMethod(rl, Opcodes.ACC_PUBLIC, "newCondition", "()Ljava/util/concurrent/locks/Condition;");
        rl.visitEnd();
        put("java/util/concurrent/locks/ReentrantReadWriteLock$ReadLock", rl);

        // inner WriteLock
        ClassWriter wl = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC,
                "java/util/concurrent/locks/ReentrantReadWriteLock$WriteLock",
                "java/lang/Object", new String[]{"java/util/concurrent/locks/Lock", "java/io/Serializable"});
        defMethod(wl, Opcodes.ACC_PUBLIC, "lock", "()V");
        defMethod(wl, Opcodes.ACC_PUBLIC, "lockInterruptibly", "()V");
        defMethod(wl, Opcodes.ACC_PUBLIC, "tryLock", "()Z");
        defMethod(wl, Opcodes.ACC_PUBLIC, "tryLock", "(JLjava/util/concurrent/TimeUnit;)Z");
        defMethod(wl, Opcodes.ACC_PUBLIC, "unlock", "()V");
        defMethod(wl, Opcodes.ACC_PUBLIC, "newCondition", "()Ljava/util/concurrent/locks/Condition;");
        wl.visitEnd();
        put("java/util/concurrent/locks/ReentrantReadWriteLock$WriteLock", wl);
    }

    private static void genCompletableFuture() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC, "java/util/concurrent/CompletableFuture",
                "java/lang/Object",
                new String[]{"java/util/concurrent/Future", "java/util/concurrent/CompletionStage"});
        ctor(c, "java/lang/Object");
        staticMethod(c, "completedFuture", "(Ljava/lang/Object;)Ljava/util/concurrent/CompletableFuture;");
        staticMethod(c, "failedFuture", "(Ljava/lang/Throwable;)Ljava/util/concurrent/CompletableFuture;");
        staticMethod(c, "supplyAsync", "(Ljava/util/function/Supplier;)Ljava/util/concurrent/CompletableFuture;");
        staticMethod(c, "runAsync", "(Ljava/lang/Runnable;)Ljava/util/concurrent/CompletableFuture;");
        defMethod(c, Opcodes.ACC_PUBLIC, "get", "()Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "get", "(JLjava/util/concurrent/TimeUnit;)Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "getNow", "(Ljava/lang/Object;)Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "join", "()Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "isDone", "()Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "isCompletedExceptionally", "()Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "cancel", "(Z)Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "isCancelled", "()Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "complete", "(Ljava/lang/Object;)Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "completeExceptionally", "(Ljava/lang/Throwable;)Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "getNow", "(Ljava/lang/Object;)Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "exceptionally", "(Ljava/util/function/Function;)Ljava/util/concurrent/CompletableFuture;");
        defMethod(c, Opcodes.ACC_PUBLIC, "thenApply", "(Ljava/util/function/Function;)Ljava/util/concurrent/CompletableFuture;");
        defMethod(c, Opcodes.ACC_PUBLIC, "thenAccept", "(Ljava/util/function/Consumer;)Ljava/util/concurrent/CompletableFuture;");
        defMethod(c, Opcodes.ACC_PUBLIC, "thenRun", "(Ljava/lang/Runnable;)Ljava/util/concurrent/CompletableFuture;");
        defMethod(c, Opcodes.ACC_PUBLIC, "handle", "(Ljava/util/function/BiFunction;)Ljava/util/concurrent/CompletableFuture;");
        defMethod(c, Opcodes.ACC_PUBLIC, "whenComplete", "(Ljava/util/function/BiConsumer;)Ljava/util/concurrent/CompletableFuture;");
        defMethod(c, Opcodes.ACC_PUBLIC, "thenCompose", "(Ljava/util/function/Function;)Ljava/util/concurrent/CompletableFuture;");
        defMethod(c, Opcodes.ACC_PUBLIC, "allOf", "([Ljava/util/concurrent/CompletableFuture;)Ljava/util/concurrent/CompletableFuture;");
        staticMethod(c, "allOf", "([Ljava/util/concurrent/CompletableFuture;)Ljava/util/concurrent/CompletableFuture;");
        staticMethod(c, "anyOf", "([Ljava/util/concurrent/CompletableFuture;)Ljava/util/concurrent/CompletableFuture;");
        defMethod(c, Opcodes.ACC_PUBLIC, "copy", "()Ljava/util/concurrent/CompletableFuture;");
        defMethod(c, Opcodes.ACC_PUBLIC, "defaultExecutor", "()Ljava/util/concurrent/Executor;");
        c.visitEnd();
        put("java/util/concurrent/CompletableFuture", c);
    }

    private static void genCompletableFutureMethods() {
        // CompletableFuture$AsynchronousCompletionTask - inner marker interface
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                "java/util/concurrent/CompletableFuture$AsynchronousCompletionTask", null, null);
        c.visitEnd();
        put("java/util/concurrent/CompletableFuture$AsynchronousCompletionTask", c);
    }

    private static void genCompletionException() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC, "java/util/concurrent/CompletionException",
                "java/lang/RuntimeException", null);
        ctor(c, "java/lang/RuntimeException");
        ctorTwo(c, "java/lang/RuntimeException", "Ljava/lang/String;", "Ljava/lang/Throwable;");
        put("java/util/concurrent/CompletionException", c);
    }

    private static void genTimeoutException() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC, "java/util/concurrent/TimeoutException",
                "java/lang/Exception", null);
        ctor(c, "java/lang/Exception");
        ctorTwo(c, "java/lang/Exception", "Ljava/lang/String;", "Ljava/lang/Throwable;");
        put("java/util/concurrent/TimeoutException", c);
    }

    private static void genCountDownLatch() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC, "java/util/concurrent/CountDownLatch",
                "java/lang/Object", null);
        ctor(c, "java/lang/Object");
        defMethod(c, Opcodes.ACC_PUBLIC, "countDown", "()V");
        defMethod(c, Opcodes.ACC_PUBLIC, "await", "()Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "await", "(JLjava/util/concurrent/TimeUnit;)Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "getCount", "()J");
        c.visitEnd();
        put("java/util/concurrent/CountDownLatch", c);
    }

    private static void genConcurrentLinkedQueue() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC, "java/util/concurrent/ConcurrentLinkedQueue",
                "java/lang/Object",
                new String[]{"java/util/Queue", "java/io/Serializable"});
        ctor(c, "java/lang/Object");
        defMethod(c, Opcodes.ACC_PUBLIC, "offer", "(Ljava/lang/Object;)Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "poll", "()Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "peek", "()Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "size", "()I");
        defMethod(c, Opcodes.ACC_PUBLIC, "isEmpty", "()Z");
        c.visitEnd();
        put("java/util/concurrent/ConcurrentLinkedQueue", c);
    }

    private static void genLinkedBlockingQueue() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC, "java/util/concurrent/LinkedBlockingQueue",
                "java/lang/Object",
                new String[]{"java/util/concurrent/BlockingQueue", "java/io/Serializable"});
        ctor(c, "java/lang/Object");
        staticMethod(c, "newFixedBlockingQueue", "(I)Ljava/util/concurrent/LinkedBlockingQueue;");
        defMethod(c, Opcodes.ACC_PUBLIC, "offer", "(Ljava/lang/Object;)Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "offer", "(Ljava/lang/Object;JLjava/util/concurrent/TimeUnit;)Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "poll", "()Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "poll", "(JLjava/util/concurrent/TimeUnit;)Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "peek", "()Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "put", "(Ljava/lang/Object;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "take", "()Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "size", "()I");
        defMethod(c, Opcodes.ACC_PUBLIC, "isEmpty", "()Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "remainingCapacity", "()I");
        defMethod(c, Opcodes.ACC_PUBLIC, "drainTo", "(Ljava/util/Collection;)I");
        defMethod(c, Opcodes.ACC_PUBLIC, "drainTo", "(Ljava/util/Collection;I)I");
        c.visitEnd();
        put("java/util/concurrent/LinkedBlockingQueue", c);
    }

    private static void genConcurrentSkipListSet() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC, "java/util/concurrent/ConcurrentSkipListSet",
                "java/lang/Object",
                new String[]{"java/util/NavigableSet", "java/io/Serializable", "java/lang/Cloneable"});
        ctor(c, "java/lang/Object");
        defMethod(c, Opcodes.ACC_PUBLIC, "add", "(Ljava/lang/Object;)Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "contains", "(Ljava/lang/Object;)Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "remove", "(Ljava/lang/Object;)Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "size", "()I");
        defMethod(c, Opcodes.ACC_PUBLIC, "isEmpty", "()Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "first", "()Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "last", "()Ljava/lang/Object;");
        c.visitEnd();
        put("java/util/concurrent/ConcurrentSkipListSet", c);
    }

    private static void genAbstractExecutorService() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                "java/util/concurrent/AbstractExecutorService",
                "java/lang/Object",
                new String[]{"java/util/concurrent/ExecutorService"});
        ctor(c, "java/lang/Object");
        defMethod(c, Opcodes.ACC_PUBLIC, "execute", "(Ljava/lang/Runnable;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "shutdown", "()V");
        defMethod(c, Opcodes.ACC_PUBLIC, "shutdownNow", "()Ljava/util/List;");
        defMethod(c, Opcodes.ACC_PUBLIC, "isShutdown", "()Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "isTerminated", "()Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "awaitTermination", "(JLjava/util/concurrent/TimeUnit;)Z");
        c.visitEnd();
        put("java/util/concurrent/AbstractExecutorService", c);
    }

    private static void genExecutors() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                "java/util/concurrent/Executors", "java/lang/Object", null);
        clinit(c, () -> {});
        staticMethod(c, "newFixedThreadPool", "(I)Ljava/util/concurrent/ExecutorService;");
        staticMethod(c, "newSingleThreadExecutor", "()Ljava/util/concurrent/ExecutorService;");
        staticMethod(c, "newCachedThreadPool", "()Ljava/util/concurrent/ExecutorService;");
        staticMethod(c, "newScheduledThreadPool", "(I)Ljava/util/concurrent/ScheduledExecutorService;");
        staticMethod(c, "newSingleThreadScheduledExecutor", "()Ljava/util/concurrent/ScheduledExecutorService;");
        staticMethod(c, "newVirtualThreadPerTaskExecutor", "()Ljava/util/concurrent/ExecutorService;");
        staticMethod(c, "unconfigurableExecutorService", "(Ljava/util/concurrent/ExecutorService;)Ljava/util/concurrent/ExecutorService;");
        c.visitEnd();
        put("java/util/concurrent/Executors", c);
    }

    private static void genForkJoinPool() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC, "java/util/concurrent/ForkJoinPool",
                "java/util/concurrent/AbstractExecutorService",
                new String[]{"java/util/concurrent/ExecutorService"});
        ctor(c, "java/util/concurrent/AbstractExecutorService");
        staticMethod(c, "commonPool", "()Ljava/util/concurrent/ForkJoinPool;");
        staticMethod(c, "getCommonPoolParallelism", "()I");
        defMethod(c, Opcodes.ACC_PUBLIC, "execute", "(Ljava/lang/Runnable;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "submit", "(Ljava/util/concurrent/Callable;)Ljava/util/concurrent/Future;");
        defMethod(c, Opcodes.ACC_PUBLIC, "submit", "(Ljava/lang/Runnable;)Ljava/util/concurrent/Future;");
        defMethod(c, Opcodes.ACC_PUBLIC, "invokeAll", "(Ljava/util/Collection;)Ljava/util/List;");
        defMethod(c, Opcodes.ACC_PUBLIC, "getParallelism", "()I");
        c.visitEnd();
        put("java/util/concurrent/ForkJoinPool", c);
    }

    private static void genThreadFactory() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                "java/util/concurrent/ThreadFactory", null, null);
        ifMethod(c, "newThread", "(Ljava/lang/Runnable;)Ljava/lang/Thread;");
        c.visitEnd();
        put("java/util/concurrent/ThreadFactory", c);
    }

    // ── Group 2: Atomics ─────────────────────────────────────────────────

    private static void genAtomicReferenceArray() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC, "java/util/concurrent/atomic/AtomicReferenceArray",
                "java/lang/Object", new String[]{"java/io/Serializable"});
        ctor(c, "java/lang/Object");
        ctorTwo(c, "java/lang/Object", "[Ljava/lang/Object;", "I");
        defMethod(c, Opcodes.ACC_PUBLIC, "get", "(I)Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "set", "(ILjava/lang/Object;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "getAndSet", "(ILjava/lang/Object;)Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "compareAndSet", "(ILjava/lang/Object;Ljava/lang/Object;)Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "compareAndExchange", "(ILjava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "getOpaque", "(I)Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "setOpaque", "(ILjava/lang/Object;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "getAcquire", "(I)Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "setRelease", "(ILjava/lang/Object;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "length", "()I");
        c.visitEnd();
        put("java/util/concurrent/atomic/AtomicReferenceArray", c);
    }

    private static void genAtomicIntegerArray() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC, "java/util/concurrent/atomic/AtomicIntegerArray",
                "java/lang/Object", new String[]{"java/io/Serializable"});
        ctorTwo(c, "java/lang/Object", "[I", "I");
        defMethod(c, Opcodes.ACC_PUBLIC, "get", "(I)I");
        defMethod(c, Opcodes.ACC_PUBLIC, "set", "(II)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "getAndSet", "(II)I");
        defMethod(c, Opcodes.ACC_PUBLIC, "compareAndSet", "(III)Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "getAndIncrement", "(I)I");
        defMethod(c, Opcodes.ACC_PUBLIC, "getAndDecrement", "(I)I");
        defMethod(c, Opcodes.ACC_PUBLIC, "getAndAdd", "(II)I");
        defMethod(c, Opcodes.ACC_PUBLIC, "incrementAndGet", "(I)I");
        defMethod(c, Opcodes.ACC_PUBLIC, "decrementAndGet", "(I)I");
        defMethod(c, Opcodes.ACC_PUBLIC, "addAndGet", "(II)I");
        defMethod(c, Opcodes.ACC_PUBLIC, "length", "()I");
        c.visitEnd();
        put("java/util/concurrent/atomic/AtomicIntegerArray", c);
    }

    private static void genAtomicLongArray() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC, "java/util/concurrent/atomic/AtomicLongArray",
                "java/lang/Object", new String[]{"java/io/Serializable"});
        ctorTwo(c, "java/lang/Object", "[J", "I");
        defMethod(c, Opcodes.ACC_PUBLIC, "get", "(I)J");
        defMethod(c, Opcodes.ACC_PUBLIC, "set", "(IJ)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "getAndSet", "(IJ)J");
        defMethod(c, Opcodes.ACC_PUBLIC, "compareAndSet", "(IJJ)Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "getAndIncrement", "(I)J");
        defMethod(c, Opcodes.ACC_PUBLIC, "getAndDecrement", "(I)J");
        defMethod(c, Opcodes.ACC_PUBLIC, "getAndAdd", "(IJ)J");
        defMethod(c, Opcodes.ACC_PUBLIC, "incrementAndGet", "(I)J");
        defMethod(c, Opcodes.ACC_PUBLIC, "decrementAndGet", "(I)J");
        defMethod(c, Opcodes.ACC_PUBLIC, "addAndGet", "(IJ)J");
        defMethod(c, Opcodes.ACC_PUBLIC, "length", "()I");
        c.visitEnd();
        put("java/util/concurrent/atomic/AtomicLongArray", c);
    }

    private static void genLongAdder() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC, "java/util/concurrent/atomic/LongAdder",
                "java/util/concurrent/atomic/Striped64", new String[]{"java/io/Serializable"});
        ctor(c, "java/util/concurrent/atomic/Striped64");
        defMethod(c, Opcodes.ACC_PUBLIC, "add", "(J)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "increment", "()V");
        defMethod(c, Opcodes.ACC_PUBLIC, "decrement", "()V");
        defMethod(c, Opcodes.ACC_PUBLIC, "sum", "()J");
        defMethod(c, Opcodes.ACC_PUBLIC, "reset", "()V");
        defMethod(c, Opcodes.ACC_PUBLIC, "sumThenReset", "()J");
        defMethod(c, Opcodes.ACC_PUBLIC, "longValue", "()J");
        c.visitEnd();
        put("java/util/concurrent/atomic/LongAdder", c);

        // Striped64 base class (needed as superclass)
        ClassWriter s = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                "java/util/concurrent/atomic/Striped64",
                "java/lang/Number", null);
        ctor(s, "java/lang/Number");
        defMethod(s, Opcodes.ACC_PUBLIC, "sum", "()J");
        s.visitEnd();
        put("java/util/concurrent/atomic/Striped64", s);

        // DoubleAdder, DoubleUnaryOperator - needed if LongAdder is used
        ClassWriter da = cw(Opcodes.ACC_PUBLIC, "java/util/concurrent/atomic/DoubleAdder",
                "java/util/concurrent/atomic/Striped64", new String[]{"java/io/Serializable"});
        ctor(da, "java/util/concurrent/atomic/Striped64");
        defMethod(da, Opcodes.ACC_PUBLIC, "add", "(D)V");
        defMethod(da, Opcodes.ACC_PUBLIC, "sum", "()D");
        da.visitEnd();
        put("java/util/concurrent/atomic/DoubleAdder", da);
    }

    // ── Group 3: Reflection ──────────────────────────────────────────────

    private static void genParameterizedType() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                "java/lang/reflect/ParameterizedType",
                null, new String[]{"java/lang/reflect/Type"});
        ifMethod(c, "getActualTypeArguments", "()[Ljava/lang/reflect/Type;");
        ifMethod(c, "getRawType", "()Ljava/lang/Class;");
        ifMethod(c, "getOwnerType", "()Ljava/lang/reflect/Type;");
        c.visitEnd();
        put("java/lang/reflect/ParameterizedType", c);
    }

    private static void genWildcardType() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                "java/lang/reflect/WildcardType",
                null, new String[]{"java/lang/reflect/Type"});
        ifMethod(c, "getUpperBounds", "()[Ljava/lang/reflect/Type;");
        ifMethod(c, "getLowerBounds", "()[Ljava/lang/reflect/Type;");
        c.visitEnd();
        put("java/lang/reflect/WildcardType", c);
    }

    private static void genGenericArrayType() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                "java/lang/reflect/GenericArrayType",
                null, new String[]{"java/lang/reflect/Type"});
        ifMethod(c, "getGenericComponentType", "()Ljava/lang/reflect/Type;");
        c.visitEnd();
        put("java/lang/reflect/GenericArrayType", c);
    }

    private static void genTypeVariable() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                "java/lang/reflect/TypeVariable",
                null, new String[]{"java/lang/reflect/Type", "java/lang/reflect/AnnotatedElement"});
        ifMethod(c, "getName", "()Ljava/lang/String;");
        ifMethod(c, "getBounds", "()[Ljava/lang/reflect/Type;");
        ifMethod(c, "getGenericDeclaration", "()Ljava/lang/reflect/GenericDeclaration;");
        ifMethod(c, "getTypeName", "()Ljava/lang/String;");
        c.visitEnd();
        put("java/lang/reflect/TypeVariable", c);
    }

    private static void genProxy() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                "java/lang/reflect/Proxy", "java/lang/Object",
                new String[]{"java/io/Serializable"});
        ctor(c, "java/lang/Object");
        staticMethod(c, "newProxyInstance",
                "(Ljava/lang/ClassLoader;[Ljava/lang/Class;Ljava/lang/reflect/InvocationHandler;)Ljava/lang/Object;");
        staticMethod(c, "getProxyClass",
                "(Ljava/lang/ClassLoader;[Ljava/lang/Class;)Ljava/lang/Class;");
        staticMethod(c, "isProxyClass", "(Ljava/lang/Class;)Z");
        staticMethod(c, "getInvocationHandler", "(Ljava/lang/Object;)Ljava/lang/reflect/InvocationHandler;");
        c.visitEnd();
        put("java/lang/reflect/Proxy", c);
    }

    // ── Group 4: NIO ─────────────────────────────────────────────────────

    private static void genSelector() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                "java/nio/channels/Selector", "java/lang/Object",
                new String[]{"java/io/Closeable"});
        ctor(c, "java/lang/Object");
        staticMethod(c, "open", "()Ljava/nio/channels/Selector;");
        defMethod(c, Opcodes.ACC_PUBLIC, "isOpen", "()Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "provider", "()Ljava/nio/channels/spi/SelectorProvider;");
        defMethod(c, Opcodes.ACC_PUBLIC, "keys", "()Ljava/util/Set;");
        defMethod(c, Opcodes.ACC_PUBLIC, "selectedKeys", "()Ljava/util/Set;");
        defMethod(c, Opcodes.ACC_PUBLIC, "select", "()I");
        defMethod(c, Opcodes.ACC_PUBLIC, "select", "(J)I");
        defMethod(c, Opcodes.ACC_PUBLIC, "selectNow", "()I");
        defMethod(c, Opcodes.ACC_PUBLIC, "wakeup", "()Ljava/nio/channels/Selector;");
        defMethod(c, Opcodes.ACC_PUBLIC, "close", "()V");
        c.visitEnd();
        put("java/nio/channels/Selector", c);
    }

    private static void genSelectorProvider() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                "java/nio/channels/spi/SelectorProvider", "java/lang/Object", null);
        ctor(c, "java/lang/Object");
        staticMethod(c, "provider", "()Ljava/nio/channels/spi/SelectorProvider;");
        defMethod(c, Opcodes.ACC_PUBLIC, "openSelector", "()Ljava/nio/channels/Selector;");
        c.visitEnd();
        put("java/nio/channels/spi/SelectorProvider", c);
    }

    private static void genFileChannel() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                "java/nio/channels/FileChannel", null,
                new String[]{"java/nio/channels/SeekableByteChannel", "java/nio/channels/GatheringByteChannel",
                             "java/nio/channels/ScatteringByteChannel"});
        ifMethod(c, "read", "(Ljava/nio/ByteBuffer;)I");
        ifMethod(c, "write", "(Ljava/nio/ByteBuffer;)I");
        ifMethod(c, "position", "()J");
        ifMethod(c, "position", "(J)Ljava/nio/channels/FileChannel;");
        ifMethod(c, "size", "()J");
        ifMethod(c, "truncate", "(J)Ljava/nio/channels/FileChannel;");
        ifMethod(c, "force", "(Z)V");
        ifMethod(c, "map", "(Ljava/nio/channels/FileChannel$MapMode;JJ)Ljava/nio/MappedByteBuffer;");
        ifMethod(c, "lock", "()Ljava/nio/channels/FileLock;");
        ifMethod(c, "tryLock", "()Ljava/nio/channels/FileLock;");
        ifMethod(c, "close", "()V");
        c.visitEnd();
        put("java/nio/channels/FileChannel", c);

        // MapMode inner class
        ClassWriter mm = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL,
                "java/nio/channels/FileChannel$MapMode", "java/lang/Object", null);
        staticField(mm, "READ_ONLY", "Ljava/nio/channels/FileChannel$MapMode;", null);
        staticField(mm, "READ_WRITE", "Ljava/nio/channels/FileChannel$MapMode;", null);
        staticField(mm, "PRIVATE", "Ljava/nio/channels/FileChannel$MapMode;", null);
        clinit(mm, () -> {});
        mm.visitEnd();
        put("java/nio/channels/FileChannel$MapMode", mm);
    }

    private static void genPathMatcher() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                "java/nio/file/PathMatcher", null, null);
        ifMethod(c, "matches", "(Ljava/nio/file/Path;)Z");
        c.visitEnd();
        put("java/nio/file/PathMatcher", c);
    }

    // ── Group 5: Network ─────────────────────────────────────────────────

    private static void genProxyNet() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                "java/net/Proxy", "java/lang/Object",
                new String[]{"java/io/Serializable"});
        ctor(c, "java/lang/Object");
        // NO_PROXY static field
        staticField(c, "NO_PROXY", "Ljava/net/Proxy;", null);
        clinit(c, () -> {});
        // Type enum
        ClassWriter te = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL | Opcodes.ACC_ENUM,
                "java/net/Proxy$Type", "java/lang/Enum", null);
        clinit(te, () -> {});
        te.visitEnd();
        put("java/net/Proxy$Type", te);
        c.visitEnd();
        put("java/net/Proxy", c);
    }

    private static void genInetAddress() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                "java/net/InetAddress", "java/lang/Object",
                new String[]{"java/io/Serializable"});
        ctor(c, "java/lang/Object");
        staticMethod(c, "getByName", "(Ljava/lang/String;)Ljava/net/InetAddress;");
        staticMethod(c, "getAllByName", "(Ljava/lang/String;)[Ljava/net/InetAddress;");
        staticMethod(c, "getLocalHost", "()Ljava/net/InetAddress;");
        staticMethod(c, "getLoopbackAddress", "()Ljava/net/InetAddress;");
        defMethod(c, Opcodes.ACC_PUBLIC, "getHostName", "()Ljava/lang/String;");
        defMethod(c, Opcodes.ACC_PUBLIC, "getHostAddress", "()Ljava/lang/String;");
        defMethod(c, Opcodes.ACC_PUBLIC, "isLoopbackAddress", "()Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "isAnyLocalAddress", "()Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "isMulticastAddress", "()Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "isLinkLocalAddress", "()Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "isSiteLocalAddress", "()Z");
        c.visitEnd();
        put("java/net/InetAddress", c);
    }

    private static void genInet4Address() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                "java/net/Inet4Address", "java/net/InetAddress", null);
        ctor(c, "java/net/InetAddress");
        c.visitEnd();
        put("java/net/Inet4Address", c);
    }

    private static void genAuthenticator() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                "java/net/Authenticator", "java/lang/Object");
        ctor(c, "java/lang/Object");
        staticMethod(c, "getDefault", "()Ljava/net/Authenticator;");
        staticMethod(c, "requestPasswordAuthentication",
                "(Ljava/lang/String;Ljava/net/InetAddress;ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/net/PasswordAuthentication;");
        defMethod(c, Opcodes.ACC_PROTECTED, "getPasswordAuthentication",
                "()Ljava/net/PasswordAuthentication;");
        c.visitEnd();
        put("java/net/Authenticator", c);
    }

    // ── Group 6: Security ────────────────────────────────────────────────

    private static void genMessageDigest() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                "java/security/MessageDigest", "java/security/MessageDigestSpi");
        ctor(c, "java/security/MessageDigestSpi");
        staticMethod(c, "getInstance", "(Ljava/lang/String;)Ljava/security/MessageDigest;");
        staticMethod(c, "getInstance", "(Ljava/lang/String;Ljava/lang/String;)Ljava/security/MessageDigest;");
        staticMethod(c, "getInstance", "(Ljava/lang/String;Ljava/security/Provider;)Ljava/security/MessageDigest;");
        defMethod(c, Opcodes.ACC_PUBLIC, "update", "([B)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "update", "(B)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "digest", "()[B");
        defMethod(c, Opcodes.ACC_PUBLIC, "digest", "([B)[B");
        defMethod(c, Opcodes.ACC_PUBLIC, "reset", "()V");
        defMethod(c, Opcodes.ACC_PUBLIC, "getAlgorithm", "()Ljava/lang/String;");
        defMethod(c, Opcodes.ACC_PUBLIC, "getDigestLength", "()I");
        c.visitEnd();
        put("java/security/MessageDigest", c);

        // MessageDigestSpi (needed as parent)
        ClassWriter spi = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                "java/security/MessageDigestSpi", "java/lang/Object");
        ctor(spi, "java/lang/Object");
        spi.visitEnd();
        put("java/security/MessageDigestSpi", spi);
    }

    private static void genPublicKey() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                "java/security/PublicKey", null,
                new String[]{"java/security/Key"});
        c.visitEnd();
        put("java/security/PublicKey", c);

        // Key interface
        ClassWriter k = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                "java/security/Key", null,
                new String[]{"java/io/Serializable"});
        ifMethod(k, "getAlgorithm", "()Ljava/lang/String;");
        ifMethod(k, "getFormat", "()Ljava/lang/String;");
        ifMethod(k, "getEncoded", "()[B");
        k.visitEnd();
        put("java/security/Key", k);
    }

    private static void genCertificate() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                "java/security/cert/Certificate", null,
                new String[]{"java/io/Serializable"});
        ifMethod(c, "getEncoded", "()[B");
        ifMethod(c, "verify", "(Ljava/security/PublicKey;)V");
        ifMethod(c, "checkValidity", "()V");
        ifMethod(c, "getSubjectDN", "()Ljava/security/Principal;");
        ifMethod(c, "getIssuerDN", "()Ljava/security/Principal;");
        ifMethod(c, "getNotBefore", "()Ljava/util/Date;");
        ifMethod(c, "getNotAfter", "()Ljava/util/Date;");
        ifMethod(c, "getSerialNumber", "()Ljava/math/BigInteger;");
        ifMethod(c, "getType", "()Ljava/lang/String;");
        ifMethod(c, "getVersion", "()I");
        ifMethod(c, "getPublicKey", "()Ljava/security/PublicKey;");
        c.visitEnd();
        put("java/security/cert/Certificate", c);
    }

    // ── Group 7: Process / OS ────────────────────────────────────────────

    private static void genProcess() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                "java/lang/Process", "java/lang/Object");
        ctor(c, "java/lang/Object");
        defMethod(c, Opcodes.ACC_PUBLIC, "getOutputStream", "()Ljava/io/OutputStream;");
        defMethod(c, Opcodes.ACC_PUBLIC, "getInputStream", "()Ljava/io/InputStream;");
        defMethod(c, Opcodes.ACC_PUBLIC, "getErrorStream", "()Ljava/io/InputStream;");
        defMethod(c, Opcodes.ACC_PUBLIC, "waitFor", "()I");
        defMethod(c, Opcodes.ACC_PUBLIC, "exitValue", "()I");
        defMethod(c, Opcodes.ACC_PUBLIC, "destroy", "()V");
        defMethod(c, Opcodes.ACC_PUBLIC, "destroyForcibly", "()Ljava/lang/Process;");
        defMethod(c, Opcodes.ACC_PUBLIC, "isAlive", "()Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "onExit", "()Ljava/util/concurrent/CompletableFuture;");
        defMethod(c, Opcodes.ACC_PUBLIC, "pid", "()J");
        defMethod(c, Opcodes.ACC_PUBLIC, "info", "()Ljava/lang/ProcessHandle;");
        c.visitEnd();
        put("java/lang/Process", c);
    }

    private static void genUnsatisfiedLinkError() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC,
                "java/lang/UnsatisfiedLinkError", "java/lang/LinkageError", null);
        ctor(c, "java/lang/LinkageError");
        c.visitEnd();
        put("java/lang/UnsatisfiedLinkError", c);

        // LinkageError
        ClassWriter le = cw(Opcodes.ACC_PUBLIC, "java/lang/LinkageError", "java/lang/Error", null);
        ctor(le, "java/lang/Error");
        le.visitEnd();
        put("java/lang/LinkageError", le);
    }

    private static void genRuntimePermission() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                "java/lang/RuntimePermission", "java/security/BasicPermission", null);
        ctor(c, "java/security/BasicPermission");
        c.visitEnd();
        put("java/lang/RuntimePermission", c);

        // BasicPermission
        ClassWriter bp = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                "java/security/BasicPermission", "java/security/Permission", null);
        ctor(bp, "java/security/Permission");
        bp.visitEnd();
        put("java/security/BasicPermission", bp);

        // Permission
        ClassWriter p = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                "java/security/Permission", "java/lang.Object",
                new String[]{"java/io/Serializable", "java/security/Guard"});
        ctor(p, "java/lang/Object");
        defMethod(p, Opcodes.ACC_PUBLIC, "checkGuard", "(Ljava/lang/Object;)V");
        p.visitEnd();
        put("java/security/Permission", p);
    }

    // ── Group 8: Misc JDK ────────────────────────────────────────────────

    private static void genStackWalker() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                "java/lang/StackWalker", "java/lang/Object");
        ctor(c, "java/lang/Object");
        staticMethod(c, "getInstance", "()Ljava/lang/StackWalker;");
        staticMethod(c, "getInstance", "(Ljava/lang/StackWalker$Option;)Ljava/lang/StackWalker;");
        staticMethod(c, "getInstance", "(Ljava/util/Set;)Ljava/lang/StackWalker;");
        defMethod(c, Opcodes.ACC_PUBLIC, "walk", "(Ljava/util/function/Consumer;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "getCallerClass", "()Ljava/lang/Class;");
        c.visitEnd();
        put("java/lang/StackWalker", c);

        // StackWalker.Option enum
        ClassWriter opt = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL | Opcodes.ACC_ENUM,
                "java/lang/StackWalker$Option", "java/lang/Enum", null);
        staticField(opt, "RETAIN_CLASS_REFERENCE", "Ljava/lang/StackWalker$Option;", null);
        staticField(opt, "INCLUDE_REFLECTION_FRAMES", "Ljava/lang/StackWalker$Option;", null);
        staticField(opt, "SHOW_REFLECT_FRAMES", "Ljava/lang/StackWalker$Option;", null);
        staticField(opt, "SHOW_CLASS_LOADER", "Ljava/lang/StackWalker$Option;", null);
        clinit(opt, () -> {});
        defMethod(opt, Opcodes.ACC_PUBLIC, "describe", "()Ljava/lang/String;");
        defMethod(opt, Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC, "values", "()[Ljava/lang/StackWalker$Option;");
        defMethod(opt, Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC, "valueOf",
                "(Ljava/lang/String;)Ljava/lang/StackWalker$Option;");
        opt.visitEnd();
        put("java/lang/StackWalker$Option", opt);

        // StackWalker.StackFrame interface
        ClassWriter sf = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                "java/lang/StackWalker$StackFrame", null,
                new String[]{"java/lang/reflect/Executable"});
        ifMethod(sf, "getClassName", "()Ljava/lang/String;");
        ifMethod(sf, "getMethodName", "()Ljava/lang/String;");
        ifMethod(sf, "getDeclaringClass", "()Ljava/lang/Class;");
        sf.visitEnd();
        put("java/lang/StackWalker$StackFrame", sf);
    }

    private static void genPhantomReference() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC, "java/lang/ref/PhantomReference",
                "java/lang/ref/Reference", null);
        ctor(c, "java/lang/ref/Reference");
        defMethod(c, Opcodes.ACC_PUBLIC, "get", "()Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "clear", "()V");
        c.visitEnd();
        put("java/lang/ref/PhantomReference", c);

        // Reference base class
        ClassWriter ref = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                "java/lang/ref/Reference", "java/lang/Object", null);
        ctor(ref, "java/lang/Object");
        defMethod(ref, Opcodes.ACC_PUBLIC, "get", "()Ljava/lang/Object;");
        defMethod(ref, Opcodes.ACC_PUBLIC, "clear", "()V");
        defMethod(ref, Opcodes.ACC_PUBLIC, "isEnqueued", "()Z");
        defMethod(ref, Opcodes.ACC_PUBLIC, "enqueue", "()Z");
        ref.visitEnd();
        put("java/lang/ref/Reference", ref);

        // SoftReference
        ClassWriter sr = cw(Opcodes.ACC_PUBLIC, "java/lang/ref/SoftReference",
                "java/lang/ref/Reference", null);
        ctor(sr, "java/lang/ref/Reference");
        sr.visitEnd();
        put("java/lang/ref/SoftReference", sr);

        // WeakReference
        ClassWriter wr = cw(Opcodes.ACC_PUBLIC, "java/lang/ref/WeakReference",
                "java/lang/ref/Reference", null);
        ctor(wr, "java/lang/ref/Reference");
        wr.visitEnd();
        put("java/lang/ref/WeakReference", wr);
    }

    private static void genManagementFactory() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                "java/lang/management/ManagementFactory", "java/lang/Object");
        ctor(c, "java/lang/Object");
        staticField(c, "MEMORY_MXBEAN_NAME", "Ljava/lang/String;", "java.lang:type=Memory");
        staticField(c, "RUNTIME_MXBEAN_NAME", "Ljava/lang/String;", "java.lang:type=Runtime");
        staticField(c, "THREAD_MXBEAN_NAME", "Ljava/lang/String;", "java.lang:type=Threading");
        staticField(c, "OS_MXBEAN_NAME", "Ljava/lang/String;", "java.lang:type=OperatingSystem");
        clinit(c, () -> {});
        staticMethod(c, "getMemoryMXBean", "()Ljava/lang/management/MemoryMXBean;");
        staticMethod(c, "getRuntimeMXBean", "()Ljava/lang/management/RuntimeMXBean;");
        staticMethod(c, "getThreadMXBean", "()Ljava/lang/management/ThreadMXBean;");
        staticMethod(c, "getOperatingSystemMXBean", "()Ljava/lang/management/OperatingSystemMXBean;");
        c.visitEnd();
        put("java/lang/management/ManagementFactory", c);

        // Minimal MXBean interfaces
        String[] mxbeans = {
            "java/lang/management/MemoryMXBean",
            "java/lang/management/RuntimeMXBean",
            "java/lang/management/ThreadMXBean",
            "java/lang/management/OperatingSystemMXBean"
        };
        for (String mxb : mxbeans) {
            ClassWriter m = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                    mxb, null, null);
            m.visitEnd();
            put(mxb, m);
        }
    }

    private static void genDateSql() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                "java/sql/Date", "java/util/Date", null);
        ctorTwo(c, "java/util/Date", "J", "J");
        defMethod(c, Opcodes.ACC_PUBLIC, "getTime", "()J");
        defMethod(c, Opcodes.ACC_PUBLIC, "setTime", "(J)V");
        c.visitEnd();
        put("java/sql/Date", c);
    }

    private static void genLogger() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC, "org/apache/log4j/Logger", "org/apache/log4j/Category", null);
        ctor(c, "org/apache/log4j/Category");
        staticMethod(c, "getLogger", "(Ljava/lang/Class;)Lorg/apache/log4j/Logger;");
        staticMethod(c, "getLogger", "(Ljava/lang/String;)Lorg/apache/log4j/Logger;");
        defMethod(c, Opcodes.ACC_PUBLIC, "debug", "(Ljava/lang/Object;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "debug", "(Ljava/lang/Object;Ljava/lang/Throwable;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "info", "(Ljava/lang/Object;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "info", "(Ljava/lang/Object;Ljava/lang/Throwable;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "warn", "(Ljava/lang/Object;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "warn", "(Ljava/lang/Object;Ljava/lang/Throwable;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "error", "(Ljava/lang/Object;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "error", "(Ljava/lang/Object;Ljava/lang/Throwable;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "fatal", "(Ljava/lang/Object;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "fatal", "(Ljava/lang/Object;Ljava/lang/Throwable;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "isDebugEnabled", "()Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "isInfoEnabled", "()Z");
        c.visitEnd();
        put("org/apache/log4j/Logger", c);

        // Category base
        ClassWriter cat = cw(Opcodes.ACC_PUBLIC, "org/apache/log4j/Category", "java/lang/Object", null);
        ctor(cat, "java/lang/Object");
        staticMethod(cat, "getLogger", "(Ljava/lang/Class;)Lorg/apache/log4j/Category;");
        staticMethod(cat, "getLogger", "(Ljava/lang/String;)Lorg/apache/log4j/Category;");
        defMethod(cat, Opcodes.ACC_PUBLIC, "debug", "(Ljava/lang/Object;)V");
        defMethod(cat, Opcodes.ACC_PUBLIC, "info", "(Ljava/lang/Object;)V");
        defMethod(cat, Opcodes.ACC_PUBLIC, "warn", "(Ljava/lang/Object;)V");
        defMethod(cat, Opcodes.ACC_PUBLIC, "error", "(Ljava/lang/Object;)V");
        defMethod(cat, Opcodes.ACC_PUBLIC, "fatal", "(Ljava/lang/Object;)V");
        defMethod(cat, Opcodes.ACC_PUBLIC, "isDebugEnabled", "()Z");
        defMethod(cat, Opcodes.ACC_PUBLIC, "isInfoEnabled", "()Z");
        cat.visitEnd();
        put("org/apache/log4j/Category", cat);
    }

    // ── Group 9: sun.misc.Unsafe ─────────────────────────────────────────

    private static void genUnsafe() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                "sun/misc/Unsafe", "java/lang/Object", null);
        ctor(c, "java/lang/Object");

        // static field
        staticField(c, "theUnsafe", "Lsun/misc/Unsafe;", null);
        clinit(c, () -> {});

        // static factory
        staticMethod(c, "getUnsafe", "()Lsun/misc/Unsafe;");

        // CAS methods
        defMethod(c, Opcodes.ACC_PUBLIC, "compareAndSwapObject",
                "(Ljava/lang/Object;JLjava/lang/Object;Ljava/lang/Object;)Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "compareAndSwapInt",
                "(Ljava/lang/Object;JII)Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "compareAndSwapLong",
                "(Ljava/lang/Object;JJJ)Z");

        // volatile field accessors
        defMethod(c, Opcodes.ACC_PUBLIC, "getObject", "(Ljava/lang/Object;J)Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "putObject", "(Ljava/lang/Object;JLjava/lang/Object;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "getObjectVolatile", "(Ljava/lang/Object;J)Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "putObjectVolatile", "(Ljava/lang/Object;JLjava/lang/Object;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "putOrderedObject", "(Ljava/lang/Object;JLjava/lang/Object;)V");

        defMethod(c, Opcodes.ACC_PUBLIC, "getInt", "(Ljava/lang/Object;J)I");
        defMethod(c, Opcodes.ACC_PUBLIC, "putInt", "(Ljava/lang/Object;JI)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "getIntVolatile", "(Ljava/lang/Object;J)I");
        defMethod(c, Opcodes.ACC_PUBLIC, "putIntVolatile", "(Ljava/lang/Object;JI)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "putOrderedInt", "(Ljava/lang/Object;JI)V");

        defMethod(c, Opcodes.ACC_PUBLIC, "getLong", "(Ljava/lang/Object;J)J");
        defMethod(c, Opcodes.ACC_PUBLIC, "putLong", "(Ljava/lang/Object;JJ)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "getLongVolatile", "(Ljava/lang/Object;J)J");
        defMethod(c, Opcodes.ACC_PUBLIC, "putLongVolatile", "(Ljava/lang/Object;JJ)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "putOrderedLong", "(Ljava/lang/Object;JJ)V");

        defMethod(c, Opcodes.ACC_PUBLIC, "getBoolean", "(Ljava/lang/Object;J)Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "putBoolean", "(Ljava/lang/Object;JZ)V");

        defMethod(c, Opcodes.ACC_PUBLIC, "getByte", "(Ljava/lang/Object;J)B");
        defMethod(c, Opcodes.ACC_PUBLIC, "putByte", "(Ljava/lang/Object;JB)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "getShort", "(Ljava/lang/Object;J)S");
        defMethod(c, Opcodes.ACC_PUBLIC, "putShort", "(Ljava/lang/Object;JS)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "getChar", "(Ljava/lang/Object;J)C");
        defMethod(c, Opcodes.ACC_PUBLIC, "putChar", "(Ljava/lang/Object;JC)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "getFloat", "(Ljava/lang/Object;J)F");
        defMethod(c, Opcodes.ACC_PUBLIC, "putFloat", "(Ljava/lang/Object;JF)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "getDouble", "(Ljava/lang/Object;J)D");
        defMethod(c, Opcodes.ACC_PUBLIC, "putDouble", "(Ljava/lang/Object;JD)V");

        // getAndSet / getAndAdd
        defMethod(c, Opcodes.ACC_PUBLIC, "getAndSetObject",
                "(Ljava/lang/Object;JLjava/lang/Object;)Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "getAndSetInt", "(Ljava/lang/Object;JI)I");
        defMethod(c, Opcodes.ACC_PUBLIC, "getAndSetLong", "(Ljava/lang/Object;JJ)J");
        defMethod(c, Opcodes.ACC_PUBLIC, "getAndAddInt", "(Ljava/lang/Object;JI)I");
        defMethod(c, Opcodes.ACC_PUBLIC, "getAndAddLong", "(Ljava/lang/Object;JJ)J");

        // offset methods
        defMethod(c, Opcodes.ACC_PUBLIC, "objectFieldOffset", "(Ljava/lang/reflect/Field;)J");
        defMethod(c, Opcodes.ACC_PUBLIC, "staticFieldOffset", "(Ljava/lang/reflect/Field;)J");
        defMethod(c, Opcodes.ACC_PUBLIC, "staticFieldBase", "(Ljava/lang/reflect/Field;)Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "objectFieldOffset", "(Ljava/lang/String;)J");

        // array methods
        defMethod(c, Opcodes.ACC_PUBLIC, "arrayBaseOffset", "(Ljava/lang/Class;)I");
        defMethod(c, Opcodes.ACC_PUBLIC, "arrayIndexScale", "(Ljava/lang/Class;)I");

        // system info
        defMethod(c, Opcodes.ACC_PUBLIC, "addressSize", "()I");
        defMethod(c, Opcodes.ACC_PUBLIC, "pageSize", "()I");

        // memory
        defMethod(c, Opcodes.ACC_PUBLIC, "allocateMemory", "(J)J");
        defMethod(c, Opcodes.ACC_PUBLIC, "reallocateMemory", "(JJ)J");
        defMethod(c, Opcodes.ACC_PUBLIC, "freeMemory", "(J)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "setMemory", "(Ljava/lang/Object;JJJ)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "setMemory", "(JJJB)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "copyMemory",
                "(Ljava/lang/Object;JLjava/lang/Object;JJ)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "copyMemory", "(JJJ)V");

        // raw address access
        defMethod(c, Opcodes.ACC_PUBLIC, "getAddress", "(J)J");
        defMethod(c, Opcodes.ACC_PUBLIC, "putAddress", "(JJ)V");

        // park/unpark
        defMethod(c, Opcodes.ACC_PUBLIC, "park", "(ZJ)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "unpark", "(Ljava/lang/Thread;)V");

        // class operations
        defMethod(c, Opcodes.ACC_PUBLIC, "defineClass",
                "(Ljava/lang/String;[BIILjava/lang/ClassLoader;Ljava/security/ProtectionDomain;)Ljava/lang/Class;");
        defMethod(c, Opcodes.ACC_PUBLIC, "defineAnonymousClass",
                "(Ljava/lang/Class;[BLjava/lang/Object;)Ljava/lang/Class;");
        defMethod(c, Opcodes.ACC_PUBLIC, "ensureClassInitialized", "(Ljava/lang/Class;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "shouldBeInitialized", "(Ljava/lang/Class;)Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "classLoader", "(Ljava/lang/Object;)Ljava/lang/ClassLoader;");
        defMethod(c, Opcodes.ACC_PUBLIC, "defineClass",
                "(Ljava/lang/String;[BII)Ljava/lang/Class;");

        // monitor
        defMethod(c, Opcodes.ACC_PUBLIC, "monitorEnter", "(Ljava/lang/Object;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "monitorExit", "(Ljava/lang/Object;)V");
        defMethod(c, Opcodes.ACC_PUBLIC, "tryMonitorEnter", "(Ljava/lang/Object;)Z");

        // exception throwing
        defMethod(c, Opcodes.ACC_PUBLIC, "throwException", "(Ljava/lang/Throwable;)V");

        // fences
        defMethod(c, Opcodes.ACC_PUBLIC, "loadFence", "()V");
        defMethod(c, Opcodes.ACC_PUBLIC, "storeFence", "()V");
        defMethod(c, Opcodes.ACC_PUBLIC, "fullFence", "()V");

        // unaligned access
        defMethod(c, Opcodes.ACC_PUBLIC, "getUnalignedObject", "(Ljava/lang/Object;JZ)Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "putUnalignedObject", "(Ljava/lang/Object;JLjava/lang/Object;Z)V");

        c.visitEnd();
        put("sun/misc/Unsafe", c);
    }

    // ── Group 10: ForkJoinTask and other needed classes ───────────────────

    private static void genForkJoinTask() {
        ClassWriter c = cw(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                "java/util/concurrent/ForkJoinTask", "java/lang.Object",
                new String[]{"java/util/concurrent/Future"});
        ctor(c, "java/lang/Object");
        staticMethod(c, "adapt", "(Ljava/lang/Runnable;)Ljava/util/concurrent/ForkJoinTask;");
        staticMethod(c, "adapt", "(Ljava/util/concurrent/Callable;)Ljava/util/concurrent/ForkJoinTask;");
        defMethod(c, Opcodes.ACC_PUBLIC, "fork", "()Ljava/util/concurrent/ForkJoinTask;");
        defMethod(c, Opcodes.ACC_PUBLIC, "join", "()Ljava/lang/Object;");
        defMethod(c, Opcodes.ACC_PUBLIC, "invoke", "()Ljava/lang/Object;");
        staticMethod(c, "invokeAll", "([Ljava/util/concurrent/ForkJoinTask;)[Ljava/util/concurrent/ForkJoinTask;");
        defMethod(c, Opcodes.ACC_PUBLIC, "cancel", "(Z)Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "isDone", "()Z");
        defMethod(c, Opcodes.ACC_PUBLIC, "get", "()Ljava/lang/Object;");
        c.visitEnd();
        put("java/util/concurrent/ForkJoinTask", c);
    }

    // ── Jar injection ────────────────────────────────────────────────────

    private static void injectJar(Path jarPath) throws IOException {
        Map<String, byte[]> contents = new LinkedHashMap<>();
        int existing = 0;
        try (JarFile jar = new JarFile(jarPath.toFile())) {
            var entries = jar.entries();
            while (entries.hasMoreElements()) {
                JarEntry e = entries.nextElement();
                if (e.isDirectory()) continue;
                try (InputStream is = jar.getInputStream(e)) {
                    contents.put(e.getName(), is.readAllBytes());
                    existing++;
                }
            }
        }
        int injected = 0;
        for (var entry : STUBS.entrySet()) {
            if (!contents.containsKey(entry.getKey())) {
                contents.put(entry.getKey(), entry.getValue());
                injected++;
            }
        }
        Files.createDirectories(jarPath.getParent());
        try (JarOutputStream jos = new JarOutputStream(Files.newOutputStream(jarPath))) {
            for (var entry : contents.entrySet()) {
                jos.putNextEntry(new JarEntry(entry.getKey()));
                jos.write(entry.getValue());
                jos.closeEntry();
            }
        }
        System.out.println("GenerateStubs: " + existing + " existing + "
                + injected + " injected (of " + STUBS.size() + " generated) -> " + jarPath);
    }
}
