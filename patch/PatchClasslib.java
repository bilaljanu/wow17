import org.objectweb.asm.*;

import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.jar.*;

/**
 * Patches teavm-classlib-0.13.0.jar to add missing JDK class stubs.
 * Creates minimal T-prefixed classes that TeaVM can resolve.
 * Also adds missing methods/fields to existing classlib classes.
 */
public class PatchClasslib {

    private static final String TEAVM_CL = "org/teavm/classlib/";

    public static void main(String[] args) throws Exception {
        if (args.length < 2) {
            System.err.println("Usage: PatchClasslib <classlib.jar> <output.jar>");
            System.exit(1);
        }

        String classlibPath = args[0];
        String outputPath = args[1];

        // Load existing classlib
        Map<String, byte[]> entries = new LinkedHashMap<>();
        Set<String> existingClasses = new HashSet<>();
        try (JarFile jf = new JarFile(classlibPath)) {
            jf.stream().forEach(e -> {
                try {
                    if (!e.isDirectory()) {
                        entries.put(e.getName(), jf.getInputStream(e).readAllBytes());
                        if (e.getName().endsWith(".class")) {
                            existingClasses.add(e.getName().replace(".class", "").replace('/', '.'));
                        }
                    }
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }
            });
        }
        System.out.println("Loaded " + existingClasses.size() + " existing classes");

        int injected = 0;

        // --- Phase 1: Add missing classes as T-prefixed stubs ---
        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/CompletableFuture", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                    "org/teavm/classlib/java/util/concurrent/TCompletableFuture", null,
                    "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/util/concurrent/Future", "java/util/concurrent/CompletionStage"});
                MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", "()V", null, null);
                mv.visitCode();
                mv.visitVarInsn(Opcodes.ALOAD, 0);
                mv.visitMethodInsn(Opcodes.INVOKESPECIAL, "org/teavm/classlib/java/lang/TObject", "<init>", "()V", false);
                mv.visitInsn(Opcodes.RETURN);
                mv.visitMaxs(1, 1);
                mv.visitEnd();

                // Static methods
                addStaticReturnObj(cw, "completedFuture", "(Ljava/lang/Object;)Ljava/util/concurrent/CompletableFuture;");
                addStaticReturnObj(cw, "failedFuture", "(Ljava/lang/Throwable;)Ljava/util/concurrent/CompletableFuture;");
                addStaticReturnObj(cw, "supplyAsync", "(Ljava/util/function/Supplier;)Ljava/util/concurrent/CompletableFuture;");
                addStaticReturnVoid(cw, "runAsync", "(Ljava/lang/Runnable;)Ljava/util/concurrent/CompletableFuture;");
                addStaticReturnObj(cw, "allOf", "([Ljava/util/concurrent/CompletableFuture;)Ljava/util/concurrent/CompletableFuture;");
                addStaticReturnObj(cw, "anyOf", "([Ljava/util/concurrent/CompletableFuture;)Ljava/util/concurrent/CompletableFuture;");
                // Instance methods
                addReturnObj(cw, "get", "()Ljava/lang/Object;");
                addReturnObj(cw, "get", "(JLjava/util/concurrent/TimeUnit;)Ljava/lang/Object;");
                addReturnObj(cw, "getNow", "(Ljava/lang/Object;)Ljava/lang/Object;");
                addReturnObj(cw, "join", "()Ljava/lang/Object;");
                addReturnBool(cw, "isDone", "()Z");
                addReturnBool(cw, "isCompletedExceptionally", "()Z");
                addReturnBool(cw, "cancel", "(Z)Z");
                addReturnBool(cw, "isCancelled", "()Z");
                addReturnBool(cw, "complete", "(Ljava/lang/Object;)Z");
                addReturnBool(cw, "completeExceptionally", "(Ljava/lang/Throwable;)Z");
                addReturnObj(cw, "exceptionally", "(Ljava/util/function/Function;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "thenApply", "(Ljava/util/function/Function;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "thenAccept", "(Ljava/util/function/Consumer;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "thenRun", "(Ljava/lang/Runnable;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "thenCompose", "(Ljava/util/function/Function;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "thenCombine", "(Ljava/util/concurrent/CompletableFuture;Ljava/util/function/BiFunction;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "thenAcceptBoth", "(Ljava/util/concurrent/CompletableFuture;Ljava/util/function/BiConsumer;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "runAfterBoth", "(Ljava/util/concurrent/CompletableFuture;Ljava/lang/Runnable;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "applyToEither", "(Ljava/util/concurrent/CompletableFuture;Ljava/util/function/Function;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "acceptEither", "(Ljava/util/concurrent/CompletableFuture;Ljava/util/function/Consumer;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "runAfterEither", "(Ljava/util/concurrent/CompletableFuture;Ljava/lang/Runnable;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "whenComplete", "(Ljava/util/function/BiConsumer;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "handle", "(Ljava/util/function/BiFunction;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "toCompletableFuture", "()Ljava/util/concurrent/CompletableFuture;");
                // Async variants
                addReturnObj(cw, "thenApplyAsync", "(Ljava/util/function/Function;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "thenApplyAsync", "(Ljava/util/function/Function;Ljava/util/concurrent/Executor;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "thenAcceptAsync", "(Ljava/util/function/Consumer;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "thenAcceptAsync", "(Ljava/util/function/Consumer;Ljava/util/concurrent/Executor;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "thenRunAsync", "(Ljava/lang/Runnable;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "thenRunAsync", "(Ljava/lang/Runnable;Ljava/util/concurrent/Executor;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "thenComposeAsync", "(Ljava/util/function/Function;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "thenComposeAsync", "(Ljava/util/function/Function;Ljava/util/concurrent/Executor;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "whenCompleteAsync", "(Ljava/util/function/BiConsumer;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "whenCompleteAsync", "(Ljava/util/function/BiConsumer;Ljava/util/concurrent/Executor;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "handleAsync", "(Ljava/util/function/BiFunction;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "handleAsync", "(Ljava/util/function/BiFunction;Ljava/util/concurrent/Executor;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "exceptionallyAsync", "(Ljava/util/function/Function;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "exceptionallyCompose", "(Ljava/util/function/Function;)Ljava/util/concurrent/CompletableFuture;");
                addReturnObj(cw, "exceptionallyComposeAsync", "(Ljava/util/function/Function;)Ljava/util/concurrent/CompletableFuture;");
                // inner interface
                ClassVisitor innerCw = new ClassWriter(0);
                innerCw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                    "org/teavm/classlib/java/util/concurrent/TCompletableFuture$AsynchronousCompletionTask",
                    null, "java/lang/Object", null);
                innerCw.visitEnd();
                // We can't add inner classes through the same ClassWriter, skip for now
            });

        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/CompletionException", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/util/concurrent/TCompletionException", null,
                    "java/lang/RuntimeException", null);
                addConstructor(cw, "org/teavm/classlib/java/util/concurrent/TCompletionException", "java/lang/RuntimeException",
                    "(Ljava/lang/String;)V");
                addConstructor(cw, "org/teavm/classlib/java/util/concurrent/TCompletionException", "java/lang/RuntimeException",
                    "(Ljava/lang/String;Ljava/lang/Throwable;)V");
                addConstructor(cw, "org/teavm/classlib/java/util/concurrent/TCompletionException", "java/lang/RuntimeException",
                    "(Ljava/lang/Throwable;)V");
            });

        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/TimeoutException", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/util/concurrent/TTimeoutException", null,
                    "java/lang/Exception", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/util/concurrent/TTimeoutException");
                addConstructor(cw, "org/teavm/classlib/java/util/concurrent/TTimeoutException", "java/lang/Exception",
                    "(Ljava/lang/String;)V");
            });

        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/CountDownLatch", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/util/concurrent/TCountDownLatch", null,
                    "org/teavm/classlib/java/lang/TObject", null);
                addConstructorWithInt(cw, "org/teavm/classlib/java/util/concurrent/TCountDownLatch", "(I)V");
                addReturnVoid(cw, "await", "()V");
                addReturnBool(cw, "await", "(JLjava/util/concurrent/TimeUnit;)Z");
                addReturnVoid(cw, "countDown", "()V");
                addReturnLong(cw, "getCount", "()J");
            });

        // locks
        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/locks/Lock", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                    "org/teavm/classlib/java/util/concurrent/locks/TLock", null,
                    "java/lang/Object", null);
                addAbstractMethod(cw, "lock", "()V");
                addAbstractMethod(cw, "lockInterruptibly", "()V");
                addAbstractMethod(cw, "tryLock", "()Z");
                addAbstractMethod(cw, "tryLock", "(JLjava/util/concurrent/TimeUnit;)Z");
                addAbstractMethod(cw, "unlock", "()V");
                addAbstractMethod(cw, "newCondition", "()Ljava/util/concurrent/locks/Condition;");
            });

        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/locks/ReadWriteLock", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                    "org/teavm/classlib/java/util/concurrent/locks/TReadWriteLock", null,
                    "java/lang/Object", null);
                addAbstractMethod(cw, "writeLock", "()Ljava/util/concurrent/locks/ReadWriteLock$WriteLock;");
                addAbstractMethod(cw, "readLock", "()Ljava/util/concurrent/locks/ReadWriteLock$ReadLock;");
            });

        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/locks/ReentrantLock", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/util/concurrent/locks/TReentrantLock", null,
                    "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/util/concurrent/locks/Lock", "java/io/Serializable"});
                addConstructorDefault(cw, "org/teavm/classlib/java/util/concurrent/locks/TReentrantLock");
                addReturnVoid(cw, "lock", "()V");
                addReturnVoid(cw, "lockInterruptibly", "()V");
                addReturnBool(cw, "tryLock", "()Z");
                addReturnBool(cw, "tryLock", "(JLjava/util/concurrent/TimeUnit;)Z");
                addReturnVoid(cw, "unlock", "()V");
                addReturnObj(cw, "newCondition", "()Ljava/util/concurrent/locks/Condition;");
                addReturnBool(cw, "isLocked", "()Z");
                addReturnBool(cw, "isHeldByCurrentThread", "()Z");
                addReturnInt(cw, "getHoldCount", "()I");
            });

        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/locks/ReentrantReadWriteLock", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/util/concurrent/locks/TReentrantReadWriteLock", null,
                    "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/util/concurrent/locks/ReadWriteLock", "java/io/Serializable"});
                addConstructorDefault(cw, "org/teavm/classlib/java/util/concurrent/locks/TReentrantReadWriteLock");
                addReturnObj(cw, "writeLock", "()Ljava/util/concurrent/locks/ReadWriteLock$WriteLock;");
                addReturnObj(cw, "readLock", "()Ljava/util/concurrent/locks/ReadWriteLock$ReadLock;");
                addReturnBool(cw, "isWriteLocked", "()Z");
                addReturnBool(cw, "isWriteLockedByCurrentThread", "()Z");
                addReturnInt(cw, "getReadHoldCount", "()I");
                addReturnInt(cw, "getWriteHoldCount", "()I");
            });

        // ConcurrentLinkedQueue
        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/ConcurrentLinkedQueue", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/util/concurrent/TConcurrentLinkedQueue", null,
                    "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/util/Queue", "java/io/Serializable"});
                addConstructorDefault(cw, "org/teavm/classlib/java/util/concurrent/TConcurrentLinkedQueue");
                addReturnObj(cw, "peek", "()Ljava/lang/Object;");
                addReturnObj(cw, "poll", "()Ljava/lang/Object;");
                addReturnBool(cw, "offer", "(Ljava/lang/Object;)Z");
                addReturnBool(cw, "add", "(Ljava/lang/Object;)Z");
                addReturnBool(cw, "remove", "(Ljava/lang/Object;)Z");
                addReturnBool(cw, "contains", "(Ljava/lang/Object;)Z");
                addReturnInt(cw, "size", "()I");
                addReturnBool(cw, "isEmpty", "()Z");
            });

        // LinkedBlockingQueue
        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/LinkedBlockingQueue", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/util/concurrent/TLinkedBlockingQueue", null,
                    "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/util/concurrent/BlockingQueue", "java/io/Serializable"});
                addConstructorDefault(cw, "org/teavm/classlib/java/util/concurrent/TLinkedBlockingQueue");
                addConstructorWithInt(cw, "org/teavm/classlib/java/util/concurrent/TLinkedBlockingQueue", "(I)V");
                addReturnBool(cw, "offer", "(Ljava/lang/Object;)Z");
                addReturnBool(cw, "offer", "(Ljava/lang/Object;JLjava/util/concurrent/TimeUnit;)Z");
                addReturnObj(cw, "poll", "()Ljava/lang/Object;");
                addReturnObj(cw, "poll", "(JLjava/util/concurrent/TimeUnit;)Ljava/lang/Object;");
                addReturnVoid(cw, "put", "(Ljava/lang/Object;)V");
                addReturnObj(cw, "take", "()Ljava/lang/Object;");
                addReturnInt(cw, "size", "()I");
                addReturnInt(cw, "remainingCapacity", "()I");
                addReturnInt(cw, "drainTo", "(Ljava/util/Collection;)I");
                addReturnInt(cw, "drainTo", "(Ljava/util/Collection;I)I");
            });

        // ConcurrentSkipListSet
        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/ConcurrentSkipListSet", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/util/concurrent/TConcurrentSkipListSet", null,
                    "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/util/NavigableSet", "java/io/Serializable", "java/lang/Cloneable"});
                addConstructorDefault(cw, "org/teavm/classlib/java/util/concurrent/TConcurrentSkipListSet");
            });

        // ConcurrentSkipListMap
        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/ConcurrentSkipListMap", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/util/concurrent/TConcurrentSkipListMap", null,
                    "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/util/concurrent/ConcurrentNavigableMap", "java/io/Serializable", "java/lang/Cloneable"});
                addConstructorDefault(cw, "org/teavm/classlib/java/util/concurrent/TConcurrentSkipListMap");
            });

        // ConcurrentHashMap
        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/ConcurrentHashMap", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/util/concurrent/TConcurrentHashMap", null,
                    "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/util/concurrent/ConcurrentMap", "java/io/Serializable"});
                addConstructorDefault(cw, "org/teavm/classlib/java/util/concurrent/TConcurrentHashMap");
                addStaticReturnObj(cw, "newKeySet", "()Ljava/util/concurrent/ConcurrentHashMap$KeySetView;");
            });

        // AbstractExecutorService
        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/AbstractExecutorService", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                    "org/teavm/classlib/java/util/concurrent/TAbstractExecutorService", null,
                    "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/util/concurrent/ExecutorService"});
                addConstructorDefault(cw, "org/teavm/classlib/java/util/concurrent/TAbstractExecutorService");
                addReturnVoid(cw, "execute", "(Ljava/lang/Runnable;)V");
                addReturnObj(cw, "submit", "(Ljava/lang/Runnable;)Ljava/util/concurrent/Future;");
                addReturnObj(cw, "submit", "(Ljava/util/concurrent/Callable;)Ljava/util/concurrent/Future;");
            });

        // Executors
        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/Executors", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                    "org/teavm/classlib/java/util/concurrent/TExecutors", null,
                    "org/teavm/classlib/java/lang/TObject", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/util/concurrent/TExecutors");
                addStaticReturnObj(cw, "newSingleThreadExecutor", "()Ljava/util/concurrent/ExecutorService;");
                addStaticReturnObj(cw, "newFixedThreadPool", "(I)Ljava/util/concurrent/ExecutorService;");
                addStaticReturnObj(cw, "newCachedThreadPool", "()Ljava/util/concurrent/ExecutorService;");
                addStaticReturnObj(cw, "newScheduledThreadPool", "(I)Ljava/util/concurrent/ScheduledExecutorService;");
                addStaticReturnObj(cw, "newSingleThreadScheduledExecutor", "()Ljava/util/concurrent/ScheduledExecutorService;");
                addStaticReturnObj(cw, "unconfigurableExecutorService", "(Ljava/util/concurrent/ExecutorService;)Ljava/util/concurrent/ExecutorService;");
                addStaticReturnObj(cw, "newSingleThreadExecutor", "(Ljava/util/concurrent/ThreadFactory;)Ljava/util/concurrent/ExecutorService;");
                addStaticReturnObj(cw, "newFixedThreadPool", "(ILjava/util/concurrent/ThreadFactory;)Ljava/util/concurrent/ExecutorService;");
                addStaticReturnObj(cw, "newCachedThreadPool", "(Ljava/util/concurrent/ThreadFactory;)Ljava/util/concurrent/ExecutorService;");
                addStaticReturnObj(cw, "newScheduledThreadPool", "(ILjava/util/concurrent/ThreadFactory;)Ljava/util/concurrent/ScheduledExecutorService;");
                addStaticReturnObj(cw, "defaultThreadFactory", "()Ljava/util/concurrent/ThreadFactory;");
                addStaticReturnObj(cw, "callable", "(Ljava/lang/Runnable;)Ljava/util/concurrent/Callable;");
                addStaticReturnObj(cw, "callable", "(Ljava/lang/Runnable;Ljava/lang/Object;)Ljava/util/concurrent/Callable;");
            });

        // ForkJoinPool
        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/ForkJoinPool", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/util/concurrent/TForkJoinPool", null,
                    "org/teavm/classlib/java/util/concurrent/TAbstractExecutorService",
                    new String[]{"java/util/concurrent/ExecutorService"});
                addConstructorDefault(cw, "org/teavm/classlib/java/util/concurrent/TForkJoinPool");
                addConstructorWithInt(cw, "org/teavm/classlib/java/util/concurrent/TForkJoinPool", "(I)V");
                addReturnVoid(cw, "execute", "(Ljava/lang/Runnable;)V");
                addReturnObj(cw, "submit", "(Ljava/lang/Runnable;)Ljava/util/concurrent/Future;");
                addReturnObj(cw, "submit", "(Ljava/util/concurrent/Callable;)Ljava/util/concurrent/Future;");
                addReturnObj(cw, "invoke", "(Ljava/util/concurrent/ForkJoinTask;)Ljava/lang/Object;");
                addReturnVoid(cw, "shutdown", "()V");
                addReturnObj(cw, "shutdownNow", "()Ljava/util/List;");
                addReturnBool(cw, "isShutdown", "()Z");
                addReturnBool(cw, "isTerminated", "()Z");
                addReturnBool(cw, "awaitTermination", "(JLjava/util/concurrent/TimeUnit;)Z");
                addReturnInt(cw, "getParallelism", "()I");
                addReturnInt(cw, "getPoolSize", "()I");
                addReturnInt(cw, "getRunningThreadCount", "()I");
            });

        // ForkJoinTask
        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/ForkJoinTask", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                    "org/teavm/classlib/java/util/concurrent/TForkJoinTask", null,
                    "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/util/concurrent/Future"});
                addReturnObj(cw, "invoke", "()Ljava/lang/Object;");
                addReturnObj(cw, "join", "()Ljava/lang/Object;");
                addReturnBool(cw, "cancel", "(Z)Z");
            });

        // ThreadFactory
        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/ThreadFactory", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                    "org/teavm/classlib/java/util/concurrent/TThreadFactory", null,
                    "java/lang/Object", null);
                addAbstractMethod(cw, "newThread", "(Ljava/lang/Runnable;)Ljava/lang/Thread;");
            });

        // ThreadPoolExecutor
        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/ThreadPoolExecutor", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/util/concurrent/TThreadPoolExecutor", null,
                    "org/teavm/classlib/java/util/concurrent/TAbstractExecutorService",
                    new String[]{"java/util/concurrent/ExecutorService"});
                addConstructorDefault(cw, "org/teavm/classlib/java/util/concurrent/TThreadPoolExecutor");
                addReturnObj(cw, "shutdownNow", "()Ljava/util/List;");
            });

        // ScheduledThreadPoolExecutor
        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/ScheduledThreadPoolExecutor", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/util/concurrent/TScheduledThreadPoolExecutor", null,
                    "org/teavm/classlib/java/util/concurrent/TAbstractExecutorService",
                    new String[]{"java/util/concurrent/ScheduledExecutorService"});
                addConstructorDefault(cw, "org/teavm/classlib/java/util/concurrent/TScheduledThreadPoolExecutor");
                addReturnObj(cw, "shutdownNow", "()Ljava/util/List;");
            });

        // atomic classes
        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/atomic/AtomicReferenceArray", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/util/concurrent/atomic/TAtomicReferenceArray", null,
                    "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/io/Serializable"});
                addConstructorWithInt(cw, "org/teavm/classlib/java/util/concurrent/atomic/TAtomicReferenceArray", "(I)V");
                addReturnObj(cw, "get", "(I)Ljava/lang/Object;");
                addReturnObj(cw, "getAndSet", "(ILjava/lang/Object;)Ljava/lang/Object;");
                addReturnObj(cw, "getAndSet", "(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;");
                addReturnBool(cw, "compareAndSet", "(ILjava/lang/Object;Ljava/lang/Object;)Z");
                addReturnBool(cw, "weakCompareAndSet", "(ILjava/lang/Object;Ljava/lang/Object;)Z");
                addReturnVoid(cw, "set", "(ILjava/lang/Object;)V");
                addReturnVoid(cw, "lazySet", "(ILjava/lang/Object;)V");
                addReturnInt(cw, "length", "()I");
            });

        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/atomic/AtomicIntegerArray", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/util/concurrent/atomic/TAtomicIntegerArray", null,
                    "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/io/Serializable"});
                addConstructorWithInt(cw, "org/teavm/classlib/java/util/concurrent/atomic/TAtomicIntegerArray", "(I)V");
                addReturnInt(cw, "get", "(I)I");
                addReturnInt(cw, "getAndSet", "(II)I");
                addReturnBool(cw, "compareAndSet", "(III)Z");
                addReturnBool(cw, "weakCompareAndSet", "(III)Z");
                addReturnVoid(cw, "set", "(II)V");
                addReturnInt(cw, "length", "()I");
            });

        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/atomic/AtomicLongArray", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/util/concurrent/atomic/TAtomicLongArray", null,
                    "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/io/Serializable"});
                addConstructorWithInt(cw, "org/teavm/classlib/java/util/concurrent/atomic/TAtomicLongArray", "(I)V");
                addReturnLong(cw, "get", "(I)J");
                addReturnLong(cw, "getAndSet", "(IJ)J");
                addReturnBool(cw, "compareAndSet", "(IJJ)Z");
                addReturnBool(cw, "weakCompareAndSet", "(IJJ)Z");
                addReturnVoid(cw, "set", "(IJ)V");
                addReturnInt(cw, "length", "()I");
            });

        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/atomic/LongAdder", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/util/concurrent/atomic/TLongAdder", null,
                    "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/io/Serializable"});
                addConstructorDefault(cw, "org/teavm/classlib/java/util/concurrent/atomic/TLongAdder");
                addReturnVoid(cw, "add", "(J)V");
                addReturnVoid(cw, "increment", "()V");
                addReturnVoid(cw, "decrement", "()V");
                addReturnLong(cw, "sum", "()J");
                addReturnLong(cw, "sumThenReset", "()J");
                addReturnVoid(cw, "reset", "()V");
            });

        // reflect classes
        injected += injectMissingClass(entries, existingClasses,
            "java/lang/reflect/ParameterizedType", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                    "org/teavm/classlib/java/lang/reflect/TParameterizedType", null,
                    "java/lang/reflect/Type", null);
                addAbstractMethod(cw, "getActualTypeArguments", "()[Ljava/lang/reflect/Type;");
                addAbstractMethod(cw, "getRawType", "()Ljava/lang/Class;");
                addAbstractMethod(cw, "getOwnerType", "()Ljava/lang/reflect/Type;");
            });

        injected += injectMissingClass(entries, existingClasses,
            "java/lang/reflect/WildcardType", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                    "org/teavm/classlib/java/lang/reflect/TWildcardType", null,
                    "java/lang/reflect/Type", null);
                addAbstractMethod(cw, "getUpperBounds", "()[Ljava/lang/reflect/Type;");
                addAbstractMethod(cw, "getLowerBounds", "()[Ljava/lang/reflect/Type;");
            });

        injected += injectMissingClass(entries, existingClasses,
            "java/lang/reflect/GenericArrayType", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                    "org/teavm/classlib/java/lang/reflect/TGenericArrayType", null,
                    "java/lang/reflect/Type", null);
                addAbstractMethod(cw, "getGenericComponentType", "()Ljava/lang/reflect/Type;");
            });

        injected += injectMissingClass(entries, existingClasses,
            "java/lang/reflect/TypeVariable", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                    "org/teavm/classlib/java/lang/reflect/TTypeVariable", null,
                    "java/lang/Object",
                    new String[]{"java/lang/reflect/Type", "java/lang/reflect/GenericDeclaration"});
                addAbstractMethod(cw, "getName", "()Ljava/lang/String;");
                addAbstractMethod(cw, "getBounds", "()[Ljava/lang/reflect/Type;");
                addAbstractMethod(cw, "getGenericDeclaration", "()Ljava/lang/reflect/GenericDeclaration;");
                addAbstractMethod(cw, "getTypeName", "()Ljava/lang/String;");
            });

        // Process
        injected += injectMissingClass(entries, existingClasses,
            "java/lang/Process", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                    "org/teavm/classlib/java/lang/TProcess", null,
                    "org/teavm/classlib/java/lang/TObject", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/lang/TProcess");
                addReturnObj(cw, "getOutputStream", "()Ljava/io/OutputStream;");
                addReturnObj(cw, "getInputStream", "()Ljava/io/InputStream;");
                addReturnObj(cw, "getErrorStream", "()Ljava/io/InputStream;");
                addReturnInt(cw, "waitFor", "()I");
                addReturnBool(cw, "waitFor", "(JLjava/util/concurrent/TimeUnit;)Z");
                addReturnInt(cw, "exitValue", "()I");
                addReturnBool(cw, "isAlive", "()Z");
                addReturnObj(cw, "pid", "()Ljava/lang/ProcessHandle;");
                addReturnObj(cw, "onExit", "()Ljava/util/concurrent/CompletableFuture;");
                addReturnBool(cw, "destroyForcibly", "()Z");
                addReturnBool(cw, "supportsNormalTermination", "()Z");
            });

        // UnsatisfiedLinkError
        injected += injectMissingClass(entries, existingClasses,
            "java/lang/UnsatisfiedLinkError", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/lang/TUnsatisfiedLinkError", null,
                    "java/lang/LinkageError", null);
                addConstructor(cw, "org/teavm/classlib/java/lang/TUnsatisfiedLinkError", "java/lang/LinkageError",
                    "(Ljava/lang/String;)V");
                addConstructor(cw, "org/teavm/classlib/java/lang/TUnsatisfiedLinkError", "java/lang/LinkageError",
                    "(Ljava/lang/String;Ljava/lang/Throwable;)V");
            });

        // RuntimePermission
        injected += injectMissingClass(entries, existingClasses,
            "java/lang/RuntimePermission", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                    "org/teavm/classlib/java/lang/TRuntimePermission", null,
                    "java/security/Permission", new String[]{"java/io/Serializable"});
                addConstructor(cw, "org/teavm/classlib/java/lang/TRuntimePermission", "java/security/Permission",
                    "(Ljava/lang/String;)V");
                addConstructor(cw, "org/teavm/classlib/java/lang/TRuntimePermission", "java/security/Permission",
                    "(Ljava/lang/String;Ljava/lang/String;)V");
                addReturnBool(cw, "implies", "(Ljava/security/Permission;)Z");
                addReturnObj(cw, "getActions", "()Ljava/lang/String;");
            });

        // StackWalker
        injected += injectMissingClass(entries, existingClasses,
            "java/lang/StackWalker", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                    "org/teavm/classlib/java/lang/TStackWalker", null,
                    "org/teavm/classlib/java/lang/TObject", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/lang/TStackWalker");
                addStaticReturnObj(cw, "getInstance", "()Ljava/lang/StackWalker;");
                addStaticReturnObj(cw, "getInstance", "(Ljava/lang/StackWalker\\$Option;)Ljava/lang/StackWalker;");
                addStaticReturnObj(cw, "getInstance", "(Ljava/util/Set;)Ljava/lang/StackWalker;");
                addReturnVoid(cw, "walk", "(Ljava/util/function/Consumer;)V");
                addReturnObj(cw, "getCallerClass", "()Ljava/lang/Class;");
            });

        // StackWalker\\$Option
        injected += injectMissingClass(entries, existingClasses,
            "java/lang/StackWalker\\$Option", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL | Opcodes.ACC_ENUM,
                    "org/teavm/classlib/java/lang/TStackWalker\\$Option", null,
                    "java/lang/Enum", null);
                // Add RETAIN_CLASS_REFERENCE static field
                cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL | Opcodes.ACC_ENUM,
                    "RETAIN_CLASS_REFERENCE",
                    "Lorg/teavm/classlib/java/lang/TStackWalker\\$Option;",
                    null, null).visitEnd();
            });

        // PhantomReference
        injected += injectMissingClass(entries, existingClasses,
            "java/lang/ref/PhantomReference", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/lang/ref/TPhantomReference", null,
                    "java/lang/ref/Reference", null);
                addConstructor(cw, "org/teavm/classlib/java/lang/ref/TPhantomReference", "java/lang/ref/Reference",
                    "(Ljava/lang/Object;)V");
                addReturnObj(cw, "get", "()Ljava/lang/Object;");
                addReturnBoolean(cw, "isEnqueued", "()Z");
            });

        // ManagementFactory
        injected += injectMissingClass(entries, existingClasses,
            "java/lang/management/ManagementFactory", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                    "org/teavm/classlib/java/lang/management/TManagementFactory", null,
                    "org/teavm/classlib/java/lang/TObject", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/lang/management/TManagementFactory");
                addStaticReturnObj(cw, "getPlatformMXBeans", "(Ljava/lang/Class;)Ljava/util/List;");
                addStaticReturnObj(cw, "getPlatformMXBean", "(Ljava/lang/Class;)Ljava/lang/Object;");
            });

        // Proxy (java.net)
        injected += injectMissingClass(entries, existingClasses,
            "java/net/Proxy", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                    "org/teavm/classlib/java/net/TProxy", null,
                    "org/teavm/classlib/java/lang/TObject", new String[]{"java/io/Serializable"});
                // NO_PROXY field
                cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL,
                    "NO_PROXY", "Ljava/net/Proxy;", null, null).visitEnd();
                // TYPE enum
                cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL | Opcodes.ACC_ENUM,
                    "DIRECT", "Lorg/teavm/classlib/java/net/TProxy;", null, null).visitEnd();
                cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL | Opcodes.ACC_ENUM,
                    "HTTP", "Lorg/teavm/classlib/java/net/TProxy;", null, null).visitEnd();
                cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL | Opcodes.ACC_ENUM,
                    "SOCKS", "Lorg/teavm/classlib/java/net/TProxy;", null, null).visitEnd();
                addConstructorDefault(cw, "org/teavm/classlib/java/net/TProxy");
                addReturnObj(cw, "type", "()Ljava/net/Proxy\\$Type;");
                addReturnObj(cw, "address", "()Ljava/net/InetSocketAddress;");
            });

        // InetAddress
        injected += injectMissingClass(entries, existingClasses,
            "java/net/InetAddress", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/net/TInetAddress", null,
                    "org/teavm/classlib/java/lang/TObject", new String[]{"java/io/Serializable"});
                addConstructorDefault(cw, "org/teavm/classlib/java/net/TInetAddress");
                addStaticReturnObj(cw, "getLocalHost", "()Ljava/net/InetAddress;");
                addStaticReturnObj(cw, "getByName", "(Ljava/lang/String;)Ljava/net/InetAddress;");
                addStaticReturnObj(cw, "getAllByName", "(Ljava/lang/String;)[Ljava/net/InetAddress;");
                addStaticReturnObj(cw, "getByAddress", "([B)Ljava/net/InetAddress;");
                addStaticReturnObj(cw, "getLoopbackAddress", "()Ljava/net/InetAddress;");
                addReturnObj(cw, "getHostName", "()Ljava/lang/String;");
                addReturnObj(cw, "getHostAddress", "()Ljava/lang/String;");
                addReturnBool(cw, "isLoopbackAddress", "()Z");
            });

        // Inet4Address
        injected += injectMissingClass(entries, existingClasses,
            "java/net/Inet4Address", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                    "org/teavm/classlib/java/net/TInet4Address", null,
                    "org/teavm/classlib/java/net/TInetAddress", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/net/TInet4Address");
            });

        // Authenticator
        injected += injectMissingClass(entries, existingClasses,
            "java/net/Authenticator", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                    "org/teavm/classlib/java/net/TAuthenticator", null,
                    "org/teavm/classlib/java/lang/TObject", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/net/TAuthenticator");
                addStaticReturnObj(cw, "getDefault", "()Ljava/net/Authenticator;");
                addStaticReturnVoid(cw, "setDefault", "(Ljava/net/Authenticator;)V");
                addReturnObj(cw, "requestPasswordAuthentication", "(Ljava/lang/String;Ljava/net/InetAddress;ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/net/PasswordAuthentication;");
                addReturnObj(cw, "requestPasswordAuthentication", "(Ljava/lang/String;Ljava/net/InetAddress;ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/net/URL;Ljava/net/Authenticator$RequestorType;)Ljava/net/PasswordAuthentication;");
            });

        // MessageDigest
        injected += injectMissingClass(entries, existingClasses,
            "java/security/MessageDigest", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                    "org/teavm/classlib/java/security/TMessageDigest", null,
                    "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/security/MessageDigestSpi"});
                addConstructorDefault(cw, "org/teavm/classlib/java/security/TMessageDigest");
                addStaticReturnObj(cw, "getInstance", "(Ljava/lang/String;)Ljava/security/MessageDigest;");
                addReturnObj(cw, "digest", "()[B");
                addReturnObj(cw, "digest", "([B)[B");
                addReturnObj(cw, "digest", "([BII)I");
                addReturnVoid(cw, "update", "(B)V");
                addReturnVoid(cw, "update", "([B)V");
                addReturnVoid(cw, "update", "([BII)V");
                addReturnVoid(cw, "reset", "()V");
                addReturnObj(cw, "getAlgorithm", "()Ljava/lang/String;");
                addReturnObj(cw, "getProvider", "()Ljava/security/Provider;");
            });

        // PublicKey
        injected += injectMissingClass(entries, existingClasses,
            "java/security/PublicKey", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                    "org/teavm/classlib/java/security/TPublicKey", null,
                    "java/security/Key", null);
            });

        // Certificate
        injected += injectMissingClass(entries, existingClasses,
            "java/security/cert/Certificate", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                    "org/teavm/classlib/java/security/cert/TCertificate", null,
                    "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/io/Serializable"});
                addConstructorDefault(cw, "org/teavm/classlib/java/security/cert/TCertificate");
                addAbstractMethod(cw, "getPublicKey", "()Ljava/security/PublicKey;");
                addAbstractMethod(cw, "getType", "()Ljava/lang/String;");
                addAbstractMethod(cw, "getEncoded", "()[B");
            });

        // sql.Date
        injected += injectMissingClass(entries, existingClasses,
            "java/sql/Date", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                    "org/teavm/classlib/java/sql/TDate", null,
                    "java/util/Date", null);
                addConstructor(cw, "org/teavm/classlib/java/sql/TDate", "java/util/Date", "(III)V");
            });

        // PathMatcher
        injected += injectMissingClass(entries, existingClasses,
            "java/nio/file/PathMatcher", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                    "org/teavm/classlib/java/nio/file/TPathMatcher", null,
                    "java/lang/Object", null);
                addAbstractMethod(cw, "matches", "(Ljava/nio/file/Path;)Z");
            });

        // Selector
        injected += injectMissingClass(entries, existingClasses,
            "java/nio/channels/Selector", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                    "org/teavm/classlib/java/nio/channels/TSelector", null,
                    "org/teavm/classlib/java/lang/TObject", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/nio/channels/TSelector");
                addStaticReturnObj(cw, "open", "()Ljava/nio/channels/Selector;");
                addReturnVoid(cw, "close", "()V");
                addReturnBool(cw, "isOpen", "()Z");
                addReturnObj(cw, "selectedKeys", "()Ljava/util/Set;");
                addReturnInt(cw, "select", "()I");
                addReturnInt(cw, "select", "(J)I");
                addReturnVoid(cw, "wakeup", "()V");
            });

        // SelectorProvider
        injected += injectMissingClass(entries, existingClasses,
            "java/nio/channels/spi/SelectorProvider", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                    "org/teavm/classlib/java/nio/channels/spi/TSelectorProvider", null,
                    "org/teavm/classlib/java/lang/TObject", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/nio/channels/spi/TSelectorProvider");
                addStaticReturnObj(cw, "provider", "()Ljava/nio/channels/spi/SelectorProvider;");
                addAbstractMethod(cw, "openSelector", "()Ljava/nio/channels/Selector;");
            });

        // FileChannel
        injected += injectMissingClass(entries, existingClasses,
            "java/nio/channels/FileChannel", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                    "org/teavm/classlib/java/nio/channels/TFileChannel", null,
                    "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/nio/channels/SeekableByteChannel", "java/nio/channels/ReadableByteChannel",
                        "java/nio/channels/WritableByteChannel"});
                addConstructorDefault(cw, "org/teavm/classlib/java/nio/channels/TFileChannel");
                addReturnObj(cw, "position", "()Ljava/nio/file/Path;");
                addReturnLong(cw, "size", "()J");
            });

        // Date
        injected += injectMissingClass(entries, existingClasses,
            "java/util/Date", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                    "org/teavm/classlib/java/util/TDate", null,
                    "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/io/Serializable", "java/lang/Cloneable", "java/lang/Comparable"});
                addConstructorDefault(cw, "org/teavm/classlib/java/util/TDate");
                addReturnLong(cw, "getTime", "()J");
                addReturnVoid(cw, "setTime", "(J)V");
                addReturnObj(cw, "toInstant", "()Ljava/time/Instant;");
                addStaticReturnObj(cw, "from", "(Ljava/time/Instant;)Ljava/util/Date;");
                addReturnInt(cw, "compareTo", "(Ljava/lang/Object;)I");
            });

        // Base64 and Base64\\$Encoder
        injected += injectMissingClass(entries, existingClasses,
            "java/util/Base64", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                    "org/teavm/classlib/java/util/TBase64", null,
                    "org/teavm/classlib/java/lang/TObject", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/util/TBase64");
                addStaticReturnObj(cw, "getEncoder", "()Ljava/util/Base64\\$Encoder;");
                addStaticReturnObj(cw, "getMimeEncoder", "()Ljava/util/Base64\\$Encoder;");
                addStaticReturnObj(cw, "getMimeEncoder", "(I[B)Ljava/util/Base64\\$Encoder;");
                addStaticReturnObj(cw, "getDecoder", "()Ljava/util/Base64\\$Decoder;");
                addStaticReturnObj(cw, "getMimeDecoder", "()Ljava/util/Base64\\$Decoder;");
                addStaticReturnObj(cw, "getUrlEncoder", "()Ljava/util/Base64\\$Encoder;");
                addStaticReturnObj(cw, "getUrlDecoder", "()Ljava/util/Base64\\$Decoder;");
            });

        injected += injectMissingClass(entries, existingClasses,
            "java/util/Base64\\$Encoder", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                    "org/teavm/classlib/java/util/TBase64\\$Encoder", null,
                    "org/teavm/classlib/java/lang/TObject", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/util/TBase64\\$Encoder");
                addReturnObj(cw, "encode", "([B)[B");
                addReturnObj(cw, "encodeToString", "([B)Ljava/lang/String;");
                addReturnObj(cw, "wrap", "(Ljava/io/OutputStream;)Ljava/io/OutputStream;");
            });

        injected += injectMissingClass(entries, existingClasses,
            "java/util/Base64\\$Decoder", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                    "org/teavm/classlib/java/util/TBase64\\$Decoder", null,
                    "org/teavm/classlib/java/lang/TObject", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/util/TBase64\\$Decoder");
                addReturnObj(cw, "decode", "([B)[B");
                addReturnObj(cw, "decode", "(Ljava/lang/String;)[B");
                addReturnObj(cw, "decode", "(Ljava/nio/ByteBuffer;)Ljava/nio/ByteBuffer;");
                addReturnObj(cw, "wrap", "(Ljava/io/InputStream;)Ljava/io/InputStream;");
            });

        // StreamSupport
        injected += injectMissingClass(entries, existingClasses,
            "java/util/stream/StreamSupport", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                    "org/teavm/classlib/java/util/stream/TStreamSupport", null,
                    "org/teavm/classlib/java/lang/TObject", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/util/stream/TStreamSupport");
                addStaticReturnObj(cw, "stream", "(Ljava/util/Spliterator;Z)Ljava/util/stream/Stream;");
                addStaticReturnObj(cw, "intStream", "(Ljava/util/Spliterator\\$OfInt;Z)Ljava/util/stream/IntStream;");
                addStaticReturnObj(cw, "longStream", "(Ljava/util/Spliterator\\$OfLong;Z)Ljava/util/stream/LongStream;");
                addStaticReturnObj(cw, "doubleStream", "(Ljava/util/Spliterator\\$OfDouble;Z)Ljava/util/stream/DoubleStream;");
            });

        // Spliterators
        injected += injectMissingClass(entries, existingClasses,
            "java/util/Spliterators", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                    "org/teavm/classlib/java/util/TSpliterators", null,
                    "org/teavm/classlib/java/lang/TObject", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/util/TSpliterators");
                addStaticReturnObj(cw, "emptySpliterator", "()Ljava/util/Spliterator;");
                addStaticReturnObj(cw, "emptyIntSpliterator", "()Ljava/util/Spliterator\\$OfInt;");
                addStaticReturnObj(cw, "emptyLongSpliterator", "()Ljava/util/Spliterator\\$OfLong;");
                addStaticReturnObj(cw, "emptyDoubleSpliterator", "()Ljava/util/Spliterator\\$OfDouble;");
                addStaticReturnObj(cw, "spliterator", "([Ljava/lang/Object;III)Ljava/util/Spliterator;");
                addStaticReturnObj(cw, "spliterator", "([III)Ljava/util/Spliterator\\$OfInt;");
                addStaticReturnObj(cw, "spliterator", "([JIII)Ljava/util/Spliterator\\$OfLong;");
                addStaticReturnObj(cw, "spliterator", "([DIII)Ljava/util/Spliterator\\$OfDouble;");
                // Add missing overloads from errors
                addStaticReturnObj(cw, "spliterator", "(Ljava/util/Iterator;JI)Ljava/util/Spliterator;");
                addStaticReturnObj(cw, "spliterator", "(Ljava/util/Collection;I)Ljava/util/Spliterator;");
                addStaticReturnObj(cw, "spliterator", "([Ljava/lang/Object;I)Ljava/util/Spliterator;");
            });

        // Unsafe
        injected += injectMissingClass(entries, existingClasses,
            "sun/misc/Unsafe", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                    "org/teavm/classlib/sun/misc/TUnsafe", null,
                    "org/teavm/classlib/java/lang/TObject", null);
                cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL,
                    "theUnsafe", "Lsun/misc/Unsafe;", null, null).visitEnd();
                addConstructorDefault(cw, "org/teavm/classlib/sun/misc/TUnsafe");
                addStaticReturnObj(cw, "getUnsafe", "()Lsun/misc/Unsafe;");
                addReturnBool(cw, "compareAndSwapObject", "(Ljava/lang/Object;JLjava/lang/Object;Ljava/lang/Object;)Z");
                addReturnBool(cw, "compareAndSwapInt", "(Ljava/lang/Object;JII)Z");
                addReturnBool(cw, "compareAndSwapLong", "(Ljava/lang/Object;JJJ)Z");
                addReturnObj(cw, "getObject", "(Ljava/lang/Object;J)Ljava/lang/Object;");
                addReturnVoid(cw, "putObject", "(Ljava/lang/Object;JLjava/lang/Object;)V");
                addReturnObj(cw, "getObjectVolatile", "(Ljava/lang/Object;J)Ljava/lang/Object;");
                addReturnVoid(cw, "putObjectVolatile", "(Ljava/lang/Object;JLjava/lang/Object;)V");
                addReturnVoid(cw, "putOrderedObject", "(Ljava/lang/Object;JLjava/lang/Object;)V");
                addReturnInt(cw, "getInt", "(Ljava/lang/Object;J)I");
                addReturnVoid(cw, "putInt", "(Ljava/lang/Object;JI)V");
                addReturnInt(cw, "getIntVolatile", "(Ljava/lang/Object;J)I");
                addReturnVoid(cw, "putIntVolatile", "(Ljava/lang/Object;JI)V");
                addReturnVoid(cw, "putOrderedInt", "(Ljava/lang/Object;JI)V");
                addReturnLong(cw, "getLong", "(Ljava/lang/Object;J)J");
                addReturnVoid(cw, "putLong", "(Ljava/lang/Object;JJ)V");
                addReturnLong(cw, "getLongVolatile", "(Ljava/lang/Object;J)J");
                addReturnVoid(cw, "putLongVolatile", "(Ljava/lang/Object;JJ)V");
                addReturnVoid(cw, "putOrderedLong", "(Ljava/lang/Object;JJ)V");
                addReturnByte(cw, "getByte", "(Ljava/lang/Object;J)B");
                addReturnVoid(cw, "putByte", "(Ljava/lang/Object;JB)V");
                addReturnByte(cw, "getByteVolatile", "(Ljava/lang/Object;J)B");
                addReturnVoid(cw, "putByteVolatile", "(Ljava/lang/Object;JB)V");
                addReturnShort(cw, "getShort", "(Ljava/lang/Object;J)S");
                addReturnVoid(cw, "putShort", "(Ljava/lang/Object;JS)V");
                addReturnChar(cw, "getChar", "(Ljava/lang/Object;J)C");
                addReturnVoid(cw, "putChar", "(Ljava/lang/Object;JC)V");
                addReturnFloat(cw, "getFloat", "(Ljava/lang/Object;J)F");
                addReturnVoid(cw, "putFloat", "(Ljava/lang/Object;JF)V");
                addReturnDouble(cw, "getDouble", "(Ljava/lang/Object;J)D");
                addReturnVoid(cw, "putDouble", "(Ljava/lang/Object;JD)V");
                addReturnBoolean(cw, "getBoolean", "(Ljava/lang/Object;J)Z");
                addReturnVoid(cw, "putBoolean", "(Ljava/lang/Object;JZ)V");
                // Address versions
                addReturnInt(cw, "getInt", "(J)I");
                addReturnVoid(cw, "putInt", "(JI)V");
                addReturnLong(cw, "getLong", "(J)J");
                addReturnVoid(cw, "putLong", "(JJ)V");
                addReturnByte(cw, "getByte", "(J)B");
                addReturnVoid(cw, "putByte", "(JB)V");
                addReturnShort(cw, "getShort", "(J)S");
                addReturnVoid(cw, "putShort", "(JS)V");
                addReturnChar(cw, "getChar", "(J)C");
                addReturnVoid(cw, "putChar", "(JC)V");
                addReturnFloat(cw, "getFloat", "(J)F");
                addReturnVoid(cw, "putFloat", "(JF)V");
                addReturnDouble(cw, "getDouble", "(J)D");
                addReturnVoid(cw, "putDouble", "(JD)V");
                addReturnObj(cw, "allocateInstance", "(Ljava/lang/Class;)Ljava/lang/Object;");
                addReturnLong(cw, "objectFieldOffset", "(Ljava/lang/reflect/Field;)J");
                addReturnLong(cw, "staticFieldOffset", "(Ljava/lang/reflect/Field;)J");
                addReturnObj(cw, "staticFieldBase", "(Ljava/lang/reflect/Field;)Ljava/lang/Object;");
                addReturnInt(cw, "arrayBaseOffset", "(Ljava/lang/Class;)I");
                addReturnInt(cw, "arrayIndexScale", "(Ljava/lang/Class;)I");
                addReturnVoid(cw, "park", "(ZJ)V");
                addReturnVoid(cw, "unpark", "(Ljava/lang/Object;)V");
                addReturnInt(cw, "getLoadAverage", "([DI)I");
            });

        // log4j Logger (just needs to exist, mostly empty)
        injected += injectMissingClass(entries, existingClasses,
            "org/apache/log4j/Logger", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                    "org/teavm/classlib/org/apache/log4j/TLogger", null,
                    "org/teavm/classlib/java/lang/TObject", null);
                addConstructorDefault(cw, "org/teavm/classlib/org/apache/log4j/TLogger");
                addStaticReturnObj(cw, "getLogger", "(Ljava/lang/Class;)Lorg/apache/log4j/Logger;");
                addStaticReturnObj(cw, "getLogger", "(Ljava/lang/String;)Lorg/apache/log4j/Logger;");
                addStaticReturnObj(cw, "getRootLogger", "()Lorg/apache/log4j/Logger;");
                addReturnVoid(cw, "debug", "(Ljava/lang/Object;)V");
                addReturnVoid(cw, "debug", "(Ljava/lang/Object;Ljava/lang/Throwable;)V");
                addReturnVoid(cw, "info", "(Ljava/lang/Object;)V");
                addReturnVoid(cw, "info", "(Ljava/lang/Object;Ljava/lang/Throwable;)V");
                addReturnVoid(cw, "warn", "(Ljava/lang/Object;)V");
                addReturnVoid(cw, "warn", "(Ljava/lang/Object;Ljava/lang/Throwable;)V");
                addReturnVoid(cw, "error", "(Ljava/lang/Object;)V");
                addReturnVoid(cw, "error", "(Ljava/lang/Object;Ljava/lang/Throwable;)V");
                addReturnVoid(cw, "fatal", "(Ljava/lang/Object;)V");
                addReturnVoid(cw, "fatal", "(Ljava/lang/Object;Ljava/lang/Throwable;)V");
                addReturnBool(cw, "isDebugEnabled", "()Z");
                addReturnBool(cw, "isInfoEnabled", "()Z");
                addReturnBool(cw, "isWarnEnabled", "()Z");
                addReturnBool(cw, "isErrorEnabled", "()Z");
                addReturnBool(cw, "isFatalEnabled", "()Z");
            });

        // ProcessHandle
        injected += injectMissingClass(entries, existingClasses,
            "java/lang/ProcessHandle", cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                    "org/teavm/classlib/java/lang/TProcessHandle", null,
                    "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/lang/Comparable"});
                addConstructorDefault(cw, "org/teavm/classlib/java/lang/TProcessHandle");
                addStaticReturnObj(cw, "current", "()Ljava/lang/ProcessHandle;");
                addReturnLong(cw, "pid", "()J");
                addReturnBool(cw, "isAlive", "()Z");
                addReturnBool(cw, "destroy", "()Z");
                addReturnBool(cw, "destroyForcibly", "()Z");
                addReturnObj(cw, "info", "()Ljava/lang/ProcessHandle\\$Info;");
            });

        // --- Phase 2: Force-add methods/fields to existing (already injected) classes ---
        // (NOTE 2026-08-27: adding log/isEnabledFor to the log4j TLogger, or removing the
        //  log4j T-classes to fall back to plain stubs, both re-introduce a TeaVM
        //  JSO/lambda NPE `Cannot invoke Variable.getIndex() because variable is null`.
        //  The log4j.Level fields are already satisfied by plain build/stubs/ classes via
        //  target/classes. The remaining org.apache.log4j.Logger.log/isEnabledFor gap is a
        //  structural netty-runtime-logging issue — do NOT force it here.)

        // --- Phase 3: Add missing methods/constructors to existing T-classes ---
        String TINT = "org/teavm/classlib/java/lang/TInteger";
        addManyMethods(entries, TINT, "org/teavm/classlib/java/lang/TObject", new String[][]{
            {"s", "toUnsignedLong", "(I)J"},
        });

        String TSYS = "org/teavm/classlib/java/lang/TSystem";
        addManyMethods(entries, TSYS, "org/teavm/classlib/java/lang/TObject", new String[][]{
            {"s", "mapLibraryName", "(Ljava/lang/String;)Ljava/lang/String;"},
            {"s", "load", "(Ljava/lang/String;)V"},
            {"s", "loadLibrary", "(Ljava/lang/String;)V"},
            {"s", "exit", "(I)V"},
        });

        String TCL = "org/teavm/classlib/java/lang/TClassLoader";
        addManyMethods(entries, TCL, "org/teavm/classlib/java/lang/TObject", new String[][]{
            {"i", "getResource", "(Ljava/lang/String;)Ljava/net/URL;"},
            {"i", "getResources", "(Ljava/lang/String;)Ljava/util/Enumeration;"},
            {"s", "getSystemResources", "(Ljava/lang/String;)Ljava/util/Enumeration;"},
            {"i", "loadClass", "(Ljava/lang/String;)Ljava/lang/Class;"},
        });

        String TCLS = "org/teavm/classlib/java/lang/TClass";
        addManyMethods(entries, TCLS, "org/teavm/classlib/java/lang/TObject", new String[][]{
            {"i", "getGenericSuperclass", "()Ljava/lang/reflect/Type;"},
            {"i", "getGenericInterfaces", "()[Ljava/lang/reflect/Type;"},
            {"i", "isAnonymousClass", "()Z"},
            {"i", "getTypeParameters", "()[Ljava/lang/reflect/TypeVariable;"},
            {"i", "getSigners", "()[Ljava/lang/Object;"},
            {"i", "getModule", "()Ljava/lang/Module;"},
        });

        String TRUN = "org/teavm/classlib/java/lang/TRuntime";
        addManyMethods(entries, TRUN, "org/teavm/classlib/java/lang/TObject", new String[][]{
            {"i", "maxMemory", "()J"},
            {"i", "addShutdownHook", "(Ljava/lang/Thread;)V"},
            {"i", "exec", "(Ljava/lang/String;)Ljava/lang/Process;"},
            {"i", "exec", "([Ljava/lang/String;[Ljava/lang/String;)Ljava/lang/Process;"},
        });

        String TCHAR = "org/teavm/classlib/java/lang/TCharacter";
        addManyMethods(entries, TCHAR, "org/teavm/classlib/java/lang/TObject", new String[][]{
            {"s", "toString", "(I)Ljava/lang/String;"},
        });

        String TMATH = "org/teavm/classlib/java/lang/TMath";
        addManyMethods(entries, TMATH, "org/teavm/classlib/java/lang/TObject", new String[][]{
            {"s", "fma", "(FFF)F"},
        });

        // java.util.UUID
        String TUUID = "org/teavm/classlib/java/util/TUUID";
        addManyMethods(entries, TUUID, "org/teavm/classlib/java/lang/TObject", new String[][]{
            {"i", "<init>", "(JJ)V"},
        });

        String TDATE = "org/teavm/classlib/java/util/TDate";
        addManyMethods(entries, TDATE, "org/teavm/classlib/java/lang/TObject", new String[][]{
            {"i", "<init>", "(J)V"},
            {"i", "<init>", "(IIIIII)V"},
        });

        // java.util.Date (additional constructors)
        addManyMethods(entries, TDATE, "org/teavm/classlib/java/lang/TObject", new String[][]{
            {"i", "<init>", "(Ljava/lang/String;)V"},
        });

        // atomic arrays / queue / latch / rwlock : add the missing (int) / (boolean) constructors
        addMethodToExisting(entries, "org/teavm/classlib/java/util/concurrent/atomic/TAtomicReferenceArray",
            false, "<init>", "(I)V", "org/teavm/classlib/java/lang/TObject");
        addMethodToExisting(entries, "org/teavm/classlib/java/util/concurrent/atomic/TAtomicIntegerArray",
            false, "<init>", "(I)V", "org/teavm/classlib/java/lang/TObject");
        addMethodToExisting(entries, "org/teavm/classlib/java/util/concurrent/atomic/TAtomicLongArray",
            false, "<init>", "(I)V", "org/teavm/classlib/java/lang/TObject");
        addMethodToExisting(entries, "org/teavm/classlib/java/util/concurrent/TCountDownLatch",
            false, "<init>", "(I)V", "org/teavm/classlib/java/lang/TObject");
        addMethodToExisting(entries, "org/teavm/classlib/java/util/concurrent/TLinkedBlockingQueue",
            false, "<init>", "(I)V", "org/teavm/classlib/java/lang/TObject");
        addMethodToExisting(entries, "org/teavm/classlib/java/util/concurrent/locks/TReentrantReadWriteLock",
            false, "<init>", "(Z)V", "org/teavm/classlib/java/lang/TObject");

        // ForkJoinPool 4-arg ctor (needs ForkJoinWorkerThreadFactory + UncaughtExceptionHandler types)
        addMethodToExisting(entries, "org/teavm/classlib/java/util/concurrent/TForkJoinPool",
            false, "<init>",
            "(ILjava/util/concurrent/ForkJoinPool$ForkJoinWorkerThreadFactory;Ljava/lang/Thread$UncaughtExceptionHandler;Z)V",
            "org/teavm/classlib/java/util/concurrent/TAbstractExecutorService");

        String TPKG = "org/teavm/classlib/java/lang/TPackage";
        addManyMethods(entries, TPKG, "org/teavm/classlib/java/lang/TObject", new String[][]{
            {"i", "getSpecificationVersion", "()Ljava/lang/String;"},
        });

        String TFLD = "org/teavm/classlib/java/lang/reflect/TField";
        addManyMethods(entries, TFLD, "org/teavm/classlib/java/lang/TObject", new String[][]{
            {"i", "getInt", "(Ljava/lang/Object;)I"},
            {"i", "getGenericType", "()Ljava/lang/reflect/Type;"},
        });

        String TSW = "org/teavm/classlib/java/lang/TStackWalker";
        addManyMethods(entries, TSW, "org/teavm/classlib/java/lang/TObject", new String[][]{
            {"i", "getCallerClass", "()Ljava/lang/Class;"},
        });

        // ParameterizedType.getRawType() must return Type (was Class)
        replaceMethodDescriptor(entries, "org/teavm/classlib/java/lang/reflect/TParameterizedType",
            "getRawType", "()Ljava/lang/Class;", "()Ljava/lang/reflect/Type;");

        String TSPLIT = "org/teavm/classlib/java/util/TSpliterators";
        addManyMethods(entries, TSPLIT, "org/teavm/classlib/java/lang/TObject", new String[][]{
            {"s", "spliterator", "(Ljava/util/Iterator;JI)Ljava/util/Spliterator;"},
            {"s", "spliterator", "(Ljava/util/Collection;I)Ljava/util/Spliterator;"},
            {"s", "spliterator", "([Ljava/lang/Object;I)Ljava/util/Spliterator;"},
        });

        String TRAF = "org/teavm/classlib/java/io/TRandomAccessFile";
        addManyMethods(entries, TRAF, "org/teavm/classlib/java/lang/TObject", new String[][]{
            {"i", "getChannel", "()Ljava/nio/channels/FileChannel;"},
        });

        String TFILE = "org/teavm/classlib/java/io/TFile";
        addManyMethods(entries, TFILE, "org/teavm/classlib/java/lang/TObject", new String[][]{
            {"i", "toPath", "()Ljava/nio/file/Path;"},
        });

        String TFILES = "org/teavm/classlib/java/nio/file/TFiles";
        addManyMethods(entries, TFILES, "org/teavm/classlib/java/lang/TObject", new String[][]{
            {"s", "getFileStore", "(Ljava/nio/file/Path;)Ljava/nio/file/FileStore;"},
        });

        // --- Phase 4: new classes (both plain non-T and T-prefixed) ---
        // com.jcraft.jzlib.CRC32 referenced by TCRC32 internally
        if (!entries.containsKey("com/jcraft/jzlib/CRC32.class")) {
            ClassWriter cw = new ClassWriter(0);
            cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC, "com/jcraft/jzlib/CRC32",
                null, "java/lang/Object", null);
            addConstructorDefaultPlain(cw);
            addStaticReturnVoid(cw, "update", "([BII)V");
            addStaticReturnVoid(cw, "reset", "()V");
            MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, "getValue", "()J", null, null);
            mv.visitCode();
            mv.visitInsn(Opcodes.LCONST_0);
            mv.visitInsn(Opcodes.LRETURN);
            mv.visitMaxs(2, 0);
            mv.visitEnd();
            entries.put("com/jcraft/jzlib/CRC32.class", cw.toByteArray());
            System.out.println("  INJECT(plain): com/jcraft/jzlib/CRC32");
        }

        // TForkJoinWorkerThreadFactory (interface) -> java.util.concurrent.ForkJoinPool$ForkJoinWorkerThreadFactory
        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/ForkJoinPool$ForkJoinWorkerThreadFactory",
            cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                    "org/teavm/classlib/java/util/concurrent/TForkJoinPool$ForkJoinWorkerThreadFactory",
                    null, "java/lang/Object", null);
                addAbstractMethod(cw, "newThread", "(Ljava/util/concurrent/ForkJoinPool;)Ljava/util/concurrent/ForkJoinPool$ForkJoinWorkerThread;");
            });

        // TConcurrentNavigableMap (interface) -> java.util.concurrent.ConcurrentNavigableMap
        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/ConcurrentNavigableMap",
            cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
                    "org/teavm/classlib/java/util/concurrent/TConcurrentNavigableMap",
                    null, "java/lang/Object", null);
            });

        // TLockSupport
        injected += injectMissingClass(entries, existingClasses,
            "java/util/concurrent/locks/LockSupport",
            cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                    "org/teavm/classlib/java/util/concurrent/locks/TLockSupport",
                    null, "org/teavm/classlib/java/lang/TObject", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/util/concurrent/locks/TLockSupport");
                addStaticReturnVoid(cw, "park", "()V");
                addStaticReturnVoid(cw, "parkNanos", "(J)V");
                addStaticReturnVoid(cw, "parkUntil", "(J)V");
                addStaticReturnVoid(cw, "unpark", "(Ljava/lang/Thread;)V");
                addStaticReturnObj(cw, "getBlocker", "(Ljava/lang/Thread;)Ljava/lang/Object;");
            });

        // TObjectStreamClass
        injected += injectMissingClass(entries, existingClasses,
            "java/io/ObjectStreamClass",
            cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/io/TObjectStreamClass",
                    null, "org/teavm/classlib/java/lang/TObject", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/io/TObjectStreamClass");
                addStaticReturnObj(cw, "lookup", "(Ljava/lang/Class;)Ljava/io/ObjectStreamClass;");
                addStaticReturnObj(cw, "lookupAny", "(Ljava/lang/Class;)Ljava/io/ObjectStreamClass;");
                addReturnObj(cw, "getName", "()Ljava/lang/String;");
                addReturnLong(cw, "getSerialVersionUID", "()J");
            });

        // TObjectInputStream
        injected += injectMissingClass(entries, existingClasses,
            "java/io/ObjectInputStream",
            cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/io/TObjectInputStream",
                    null, "org/teavm/classlib/java/lang/TObject", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/io/TObjectInputStream");
                addReturnObj(cw, "readObject", "()Ljava/lang/Object;");
                addReturnVoid(cw, "close", "()V");
            });

        // TTimestamp (java.sql.Timestamp)
        injected += injectMissingClass(entries, existingClasses,
            "java/sql/Timestamp",
            cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/sql/TTimestamp",
                    null, "java/util/Date", null);
                addConstructor(cw, "org/teavm/classlib/java/sql/TTimestamp", "java/util/Date", "(J)V");
                addReturnObj(cw, "toInstant", "()Ljava/time/Instant;");
            });

        // TInet6Address
        injected += injectMissingClass(entries, existingClasses,
            "java/net/Inet6Address",
            cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                    "org/teavm/classlib/java/net/TInet6Address",
                    null, "org/teavm/classlib/java/net/TInetAddress", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/net/TInet6Address");
            });

        // TX509Certificate
        injected += injectMissingClass(entries, existingClasses,
            "java/security/cert/X509Certificate",
            cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                    "org/teavm/classlib/java/security/cert/TX509Certificate",
                    null, "org/teavm/classlib/java/security/cert/TCertificate",
                    new String[]{"java/security/cert/X509Extension"});
                addConstructorDefault(cw, "org/teavm/classlib/java/security/cert/TX509Certificate");
                addAbstractMethod(cw, "getSubjectX500Principal", "()Ljavax/security/auth/x500/X500Principal;");
                addAbstractMethod(cw, "getNotAfter", "()Ljava/util/Date;");
                addAbstractMethod(cw, "getNotBefore", "()Ljava/util/Date;");
                addAbstractMethod(cw, "getSigAlgName", "()Ljava/lang/String;");
            });

        // TFileDescriptor
        injected += injectMissingClass(entries, existingClasses,
            "java/io/FileDescriptor",
            cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                    "org/teavm/classlib/java/io/TFileDescriptor",
                    null, "org/teavm/classlib/java/lang/TObject", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/io/TFileDescriptor");
                cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL,
                    "in", "Ljava/io/FileDescriptor;", null, null).visitEnd();
                cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL,
                    "out", "Ljava/io/FileDescriptor;", null, null).visitEnd();
                cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL,
                    "err", "Ljava/io/FileDescriptor;", null, null).visitEnd();
                addReturnVoid(cw, "sync", "()V");
                addReturnBool(cw, "valid", "()Z");
            });

        // TURLClassLoader
        injected += injectMissingClass(entries, existingClasses,
            "java/net/URLClassLoader",
            cw -> {
                cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC,
                    "org/teavm/classlib/java/net/TURLClassLoader",
                    null, "org/teavm/classlib/java/lang/TClassLoader", null);
                addConstructorDefault(cw, "org/teavm/classlib/java/net/TURLClassLoader");
                addReturnObj(cw, "getURLs", "()[Ljava/net/URL;");
                addReturnObj(cw, "findResource", "(Ljava/lang/String;)Ljava/net/URL;");
            });

        System.out.println("\nTotal injected: " + injected);

        // Step 3: Write patched jar
        try (JarOutputStream jos = new JarOutputStream(new FileOutputStream(outputPath))) {
            for (Map.Entry<String, byte[]> entry : entries.entrySet()) {
                jos.putNextEntry(new JarEntry(entry.getKey()));
                jos.write(entry.getValue());
                jos.closeEntry();
            }
        }
        System.out.println("Written " + outputPath);
    }

    // === ASM Helper Methods ===

    // Adds methods (or a constructor) to an ALREADY-EXISTING class in the jar.
    // The teavmInternalName is the full internal path, e.g. org/teavm/classlib/java/lang/TInteger.
    // addStatic controls whether the method is static; constructor via recur=true & name="<init>".
    private static int addMethodToExisting(Map<String, byte[]> entries, String teavmInternalName,
            boolean isStatic, String name, String descriptor, String superOwnerForInit) {
        String entry = teavmInternalName + ".class";
        byte[] bytes = entries.get(entry);
        if (bytes == null) {
            System.out.println("  PATCHEXISTS-MISSING-SRC: " + teavmInternalName);
            return 0;
        }
        try {
            ClassReader cr = new ClassReader(bytes);
            ClassWriter cw = new ClassWriter(0);
            ClassVisitor cv = new ClassVisitor(Opcodes.ASM9, cw) {
                @Override
                public void visitEnd() {
                    super.visitEnd();
                    MethodVisitor mv = cw.visitMethod(
                        (isStatic ? Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC : Opcodes.ACC_PUBLIC),
                        name, descriptor, null, null);
                    mv.visitCode();
                    if ("<init>".equals(name)) {
                        mv.visitVarInsn(Opcodes.ALOAD, 0);
                        mv.visitMethodInsn(Opcodes.INVOKESPECIAL,
                            superOwnerForInit != null ? superOwnerForInit : "org/teavm/classlib/java/lang/TObject",
                            "<init>", "()V", false);
                        mv.visitInsn(Opcodes.RETURN);
                        mv.visitMaxs(1, 1);
                    } else {
                        Type ret = Type.getReturnType(descriptor);
                        int sort = ret.getSort();
                        if (sort == Type.VOID) {
                            mv.visitInsn(Opcodes.RETURN);
                            mv.visitMaxs(0, 1);
                        } else if (sort == Type.LONG) {
                            mv.visitInsn(Opcodes.LCONST_0);
                            mv.visitInsn(Opcodes.LRETURN);
                            mv.visitMaxs(2, 1);
                        } else if (sort == Type.FLOAT) {
                            mv.visitInsn(Opcodes.FCONST_0);
                            mv.visitInsn(Opcodes.FRETURN);
                            mv.visitMaxs(1, 1);
                        } else if (sort == Type.DOUBLE) {
                            mv.visitInsn(Opcodes.DCONST_0);
                            mv.visitInsn(Opcodes.DRETURN);
                            mv.visitMaxs(2, 1);
                        } else if (sort == Type.OBJECT || sort == Type.ARRAY) {
                            mv.visitInsn(Opcodes.ACONST_NULL);
                            mv.visitInsn(Opcodes.ARETURN);
                            mv.visitMaxs(1, 1);
                        } else { // int/short/byte/char/boolean
                            mv.visitInsn(Opcodes.ICONST_0);
                            mv.visitInsn(Opcodes.IRETURN);
                            mv.visitMaxs(1, 1);
                        }
                    }
                    mv.visitEnd();
                }
            };
            cr.accept(cv, 0);
            entries.put(entry, cw.toByteArray());
            System.out.println("  PATCHMETH: " + teavmInternalName + " + " + name + descriptor
                + (isStatic ? " (static)" : ""));
            return 1;
        } catch (Exception e) {
            System.out.println("  PATCHEXISTS-ERR: " + teavmInternalName + " " + name + descriptor + " : " + e);
            return 0;
        }
    }

    // Replaces the descriptor of an existing method that has a wrong return type
    // (e.g. ParameterizedType.getRawType() was Class but must be Type).
    private static void replaceMethodDescriptor(Map<String, byte[]> entries, String teavmInternalName,
            String name, String oldDescriptor, String newDescriptor) {
        String entry = teavmInternalName + ".class";
        byte[] bytes = entries.get(entry);
        if (bytes == null) return;
        try {
            ClassReader cr = new ClassReader(bytes);
            ClassWriter cw = new ClassWriter(0);
            ClassVisitor cv = new ClassVisitor(Opcodes.ASM9, cw) {
                @Override
                public MethodVisitor visitMethod(int access, String mName, String mDesc, String sig, String[] exc) {
                    if (mName.equals(name) && mDesc.equals(oldDescriptor)) {
                        System.out.println("  PATCHREPLACE: " + teavmInternalName + " " + name
                            + oldDescriptor + " -> " + newDescriptor);
                        return super.visitMethod(access, mName, newDescriptor, sig, exc);
                    }
                    return super.visitMethod(access, mName, mDesc, sig, exc);
                }
            };
            cr.accept(cv, 0);
            entries.put(entry, cw.toByteArray());
        } catch (Exception e) {
            System.out.println("  PATCHREPLACE-ERR: " + teavmInternalName + " " + name + " : " + e);
        }
    }

    private static void addManyMethods(Map<String, byte[]> entries, String teavmInternalName,
            String superOwnerForInit, String[][] methods) {
        for (String[] m : methods) {
            boolean isStatic = m[0].equals("s");
            addMethodToExisting(entries, teavmInternalName, isStatic, m[1], m[2], superOwnerForInit);
        }
    }

    private static int injectMissingClass(Map<String, byte[]> entries, Set<String> existingClasses,
            String jdkClassName, ClassWriterCallback callback) {
        // Convert java/... -> org/teavm/classlib/java/T...
        String teavmName = toTeavmName(jdkClassName);
        String teavmEntry = teavmName + ".class";

        if (existingClasses.contains(teavmName)) {
            System.out.println("  EXISTS: " + jdkClassName + " -> " + teavmName);
            return 0;
        }

        ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_FRAMES | ClassWriter.COMPUTE_MAXS);
        try {
            callback.visit(cw);
        } catch (Exception e) {
            System.out.println("  ERROR: " + jdkClassName + ": " + e.getMessage());
            return 0;
        }

        entries.put(teavmEntry, cw.toByteArray());
        existingClasses.add(teavmName);
        System.out.println("  INJECT: " + jdkClassName + " -> " + teavmName);
        return 1;
    }

    private static String toTeavmName(String jdkClassName) {
        if (jdkClassName.startsWith("sun/")) {
            return "org/teavm/classlib/" + jdkClassName.substring(0, jdkClassName.lastIndexOf('/') + 1)
                + "T" + jdkClassName.substring(jdkClassName.lastIndexOf('/') + 1);
        }
        // For java/... -> org/teavm/classlib/java/.../TClassName
        int lastSlash = jdkClassName.lastIndexOf('/');
        if (lastSlash >= 0) {
            String pkg = jdkClassName.substring(0, lastSlash + 1);
            String cls = jdkClassName.substring(lastSlash + 1);
            return "org/teavm/classlib/" + pkg + "T" + cls;
        }
        return "org/teavm/classlib/java/T" + jdkClassName;
    }

    @FunctionalInterface
    interface ClassWriterCallback {
        void visit(ClassWriter cw) throws Exception;
    }

    static void addConstructorDefault(ClassWriter cw, String owner) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", "()V", null, null);
        mv.visitCode();
        mv.visitVarInsn(Opcodes.ALOAD, 0);
        mv.visitMethodInsn(Opcodes.INVOKESPECIAL, "org/teavm/classlib/java/lang/TObject", "<init>", "()V", false);
        mv.visitInsn(Opcodes.RETURN);
        mv.visitMaxs(1, 1);
        mv.visitEnd();
    }

    static void addConstructorDefaultPlain(ClassWriter cw) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", "()V", null, null);
        mv.visitCode();
        mv.visitVarInsn(Opcodes.ALOAD, 0);
        mv.visitMethodInsn(Opcodes.INVOKESPECIAL, "java/lang/Object", "<init>", "()V", false);
        mv.visitInsn(Opcodes.RETURN);
        mv.visitMaxs(1, 1);
        mv.visitEnd();
    }

    static void addConstructor(ClassWriter cw, String owner, String superOwner, String descriptor) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", descriptor, null, null);
        mv.visitCode();
        mv.visitVarInsn(Opcodes.ALOAD, 0);
        // Load args
        Type argType = Type.getMethodType(descriptor);
        Type[] args = argType.getArgumentTypes();
        for (int i = 0; i < args.length; i++) {
            mv.visitVarInsn(args[i].getOpcode(Opcodes.ILOAD), i + 1);
        }
        mv.visitMethodInsn(Opcodes.INVOKESPECIAL, superOwner, "<init>", descriptor, false);
        mv.visitInsn(Opcodes.RETURN);
        mv.visitMaxs(args.length + 1, args.length + 1);
        mv.visitEnd();
    }

    static void addConstructorWithInt(ClassWriter cw, String owner, String descriptor) {
        addConstructor(cw, owner, "org/teavm/classlib/java/lang/TObject", descriptor);
    }

    static void addReturnVoid(ClassWriter cw, String name, String desc) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, name, desc, null, null);
        mv.visitCode();
        Type ret = Type.getReturnType(desc);
        if (ret.getSort() != Type.VOID) {
            mv.visitInsn(ret.getOpcode(Opcodes.ICONST_0));
        }
        mv.visitInsn(ret.getOpcode(Opcodes.IRETURN));
        mv.visitMaxs(1, 1);
        mv.visitEnd();
    }

    static void addReturnObj(ClassWriter cw, String name, String desc) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, name, desc, null, null);
        mv.visitCode();
        mv.visitInsn(Opcodes.ACONST_NULL);
        mv.visitInsn(Opcodes.ARETURN);
        mv.visitMaxs(1, 1);
        mv.visitEnd();
    }

    static void addStaticReturnObj(ClassWriter cw, String name, String desc) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC, name, desc, null, null);
        mv.visitCode();
        mv.visitInsn(Opcodes.ACONST_NULL);
        mv.visitInsn(Opcodes.ARETURN);
        mv.visitMaxs(1, 1);
        mv.visitEnd();
    }

    static void addStaticReturnVoid(ClassWriter cw, String name, String desc) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC, name, desc, null, null);
        mv.visitCode();
        mv.visitInsn(Opcodes.RETURN);
        mv.visitMaxs(1, 1);
        mv.visitEnd();
    }

    static void addReturnBool(ClassWriter cw, String name, String desc) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, name, desc, null, null);
        mv.visitCode();
        mv.visitInsn(Opcodes.ICONST_0);
        mv.visitInsn(Opcodes.IRETURN);
        mv.visitMaxs(1, 1);
        mv.visitEnd();
    }

    static void addReturnBoolean(ClassWriter cw, String name, String desc) {
        addReturnBool(cw, name, desc);
    }

    static void addReturnInt(ClassWriter cw, String name, String desc) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, name, desc, null, null);
        mv.visitCode();
        mv.visitInsn(Opcodes.ICONST_0);
        mv.visitInsn(Opcodes.IRETURN);
        mv.visitMaxs(1, 1);
        mv.visitEnd();
    }

    static void addReturnLong(ClassWriter cw, String name, String desc) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, name, desc, null, null);
        mv.visitCode();
        mv.visitInsn(Opcodes.LCONST_0);
        mv.visitInsn(Opcodes.LRETURN);
        mv.visitMaxs(2, 1);
        mv.visitEnd();
    }

    static void addReturnFloat(ClassWriter cw, String name, String desc) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, name, desc, null, null);
        mv.visitCode();
        mv.visitInsn(Opcodes.FCONST_0);
        mv.visitInsn(Opcodes.FRETURN);
        mv.visitMaxs(1, 1);
        mv.visitEnd();
    }

    static void addReturnDouble(ClassWriter cw, String name, String desc) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, name, desc, null, null);
        mv.visitCode();
        mv.visitInsn(Opcodes.DCONST_0);
        mv.visitInsn(Opcodes.DRETURN);
        mv.visitMaxs(2, 1);
        mv.visitEnd();
    }

    static void addReturnByte(ClassWriter cw, String name, String desc) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, name, desc, null, null);
        mv.visitCode();
        mv.visitInsn(Opcodes.ICONST_0);
        mv.visitInsn(Opcodes.IRETURN);
        mv.visitMaxs(1, 1);
        mv.visitEnd();
    }

    static void addReturnShort(ClassWriter cw, String name, String desc) {
        addReturnByte(cw, name, desc);
    }

    static void addReturnChar(ClassWriter cw, String name, String desc) {
        addReturnByte(cw, name, desc);
    }

    static void addAbstractMethod(ClassWriter cw, String name, String desc) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT, name, desc, null, null);
        mv.visitEnd();
    }

    static void addStaticReturnVoid(String name, String desc) {
        // Placeholder - won't be used
    }
}
