import org.objectweb.asm.ClassWriter;
import org.objectweb.asm.MethodVisitor;
import org.objectweb.asm.Opcodes;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.function.Consumer;

public class StubGenerator {
    public static void main(String[] args) throws Exception {
        Path outDir = Paths.get("/home/bilal/wow17/build/stubs");
        Files.createDirectories(outDir);

        // ConcurrentLinkedQueue
        genClass(outDir, "java/util/concurrent/ConcurrentLinkedQueue",
                "java/lang/Object", new String[]{"java/util/Queue", "java/io/Serializable"},
                cw -> {
                    cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", "()V", null, null);
                    mv(cw, "<init>", "()V", m -> {
                        m.visitVarInsn(Opcodes.ALOAD, 0);
                        m.visitMethodInsn(Opcodes.INVOKESPECIAL, "java/lang/Object", "<init>", "()V", false);
                        m.visitInsn(Opcodes.RETURN);
                        m.visitMaxs(1, 1);
                    });
                    cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", "(Ljava/util/Collection;)V", null, null);
                    mv(cw, "<init>", "(Ljava/util/Collection;)V", m -> {
                        m.visitVarInsn(Opcodes.ALOAD, 0);
                        m.visitMethodInsn(Opcodes.INVOKESPECIAL, "java/lang/Object", "<init>", "()V", false);
                        m.visitInsn(Opcodes.RETURN);
                        m.visitMaxs(2, 2);
                    });
                    def(cw, "offer", "(Ljava/lang/Object;)Z", Opcodes.ACC_PUBLIC, true);
                    def(cw, "poll", "()Ljava/lang/Object;", Opcodes.ACC_PUBLIC, false);
                    def(cw, "peek", "()Ljava/lang/Object;", Opcodes.ACC_PUBLIC, false);
                    def(cw, "size", "()I", Opcodes.ACC_PUBLIC, true);
                    def(cw, "isEmpty", "()Z", Opcodes.ACC_PUBLIC, true);
                    def(cw, "contains", "(Ljava/lang/Object;)Z", Opcodes.ACC_PUBLIC, true);
                    def(cw, "remove", "(Ljava/lang/Object;)Z", Opcodes.ACC_PUBLIC, true);
                    def(cw, "add", "(Ljava/lang/Object;)Z", Opcodes.ACC_PUBLIC, true);
                    def(cw, "iterator", "()Ljava/util/Iterator;", Opcodes.ACC_PUBLIC, false);
                    def(cw, "toArray", "()[Ljava/lang/Object;", Opcodes.ACC_PUBLIC, false);
                    def(cw, "toArray", "([Ljava/lang/Object;)[Ljava/lang/Object;", Opcodes.ACC_PUBLIC, false);
                });

        // java.net.Proxy
        genClass(outDir, "java/net/Proxy",
                "java/lang/Object", new String[]{"java/io/Serializable"},
                cw -> {
                    cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL,
                            "NO_PROXY", "Ljava/net/Proxy;", null, null).visitEnd();
                    cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", "(Ljava/net/Proxy$Type;Ljava/net/SocketAddress;)V", null, null);
                    mv(cw, "<init>", "(Ljava/net/Proxy$Type;Ljava/net/SocketAddress;)V", m -> {
                        m.visitVarInsn(Opcodes.ALOAD, 0);
                        m.visitMethodInsn(Opcodes.INVOKESPECIAL, "java/lang/Object", "<init>", "()V", false);
                        m.visitInsn(Opcodes.RETURN);
                        m.visitMaxs(2, 3);
                    });
                    def(cw, "type", "()Ljava/net/Proxy$Type;", Opcodes.ACC_PUBLIC, false);
                    def(cw, "address", "()Ljava/net/SocketAddress;", Opcodes.ACC_PUBLIC, false);
                });

        // java.net.Proxy.Type
        genClass(outDir, "java/net/Proxy$Type",
                "java/lang/Enum", null,
                cw -> {
                    cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL | Opcodes.ACC_ENUM,
                            "DIRECT", "Ljava/net/Proxy$Type;", null, "DIRECT").visitEnd();
                    cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL | Opcodes.ACC_ENUM,
                            "HTTP", "Ljava/net/Proxy$Type;", null, "HTTP").visitEnd();
                    cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL | Opcodes.ACC_ENUM,
                            "SOCKS", "Ljava/net/Proxy$Type;", null, "SOCKS").visitEnd();
                });

        // java.net.Authenticator
        genClass(outDir, "java/net/Authenticator",
                "java/lang/Object", null,
                cw -> {
                    cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", "()V", null, null);
                    mv(cw, "<init>", "()V", m -> {
                        m.visitVarInsn(Opcodes.ALOAD, 0);
                        m.visitMethodInsn(Opcodes.INVOKESPECIAL, "java/lang/Object", "<init>", "()V", false);
                        m.visitInsn(Opcodes.RETURN);
                        m.visitMaxs(1, 1);
                    });
                    def(cw, "requestPasswordAuthentication",
                            "(Ljava/lang/String;Ljava/net/InetAddress;ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/net/PasswordAuthentication;",
                            Opcodes.ACC_PROTECTED, false);
                    def(cw, "requestPasswordAuthentication",
                            "(Ljava/lang/String;Ljava/net/InetAddress;ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/net/URL;Ljava/net/Authenticator$RequestorType;)Ljava/net/PasswordAuthentication;",
                            Opcodes.ACC_PROTECTED, false);
                    def(cw, "getDefault", "()Ljava/net/Authenticator;", Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC, false);
                    def(cw, "setDefault", "(Ljava/net/Authenticator;)V", Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC, false);
                });

        // java.net.Authenticator.RequestorType
        genClass(outDir, "java/net/Authenticator$RequestorType",
                "java/lang/Enum", null,
                cw -> {
                    cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL | Opcodes.ACC_ENUM,
                            "PROXY", "Ljava/net/Authenticator$RequestorType;", null, "PROXY").visitEnd();
                    cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL | Opcodes.ACC_ENUM,
                            "SERVER", "Ljava/net/Authenticator$RequestorType;", null, "SERVER").visitEnd();
                });

        // com.google.common.base.Stopwatch
        genClass(outDir, "com/google/common/base/Stopwatch",
                "java/lang/Object", null,
                cw -> {
                    cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL,
                            "UNNECESSARY", "Lcom/google/common/base/Stopwatch;", null, null).visitEnd();
                    cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", "()V", null, null);
                    mv(cw, "<init>", "()V", m -> {
                        m.visitVarInsn(Opcodes.ALOAD, 0);
                        m.visitMethodInsn(Opcodes.INVOKESPECIAL, "java/lang/Object", "<init>", "()V", false);
                        m.visitInsn(Opcodes.RETURN);
                        m.visitMaxs(1, 1);
                    });
                    cw.visitMethod(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC, "createUnstarted",
                            "()Lcom/google/common/base/Stopwatch;", null, null);
                    mv(cw, "createUnstarted", "()Lcom/google/common/base/Stopwatch;", m -> {
                        m.visitTypeInsn(Opcodes.NEW, "com/google/common/base/Stopwatch");
                        m.visitInsn(Opcodes.DUP);
                        m.visitMethodInsn(Opcodes.INVOKESPECIAL, "com/google/common/base/Stopwatch", "<init>", "()V", false);
                        m.visitInsn(Opcodes.ARETURN);
                        m.visitMaxs(2, 0);
                    });
                    cw.visitMethod(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC, "createStarted",
                            "()Lcom/google/common/base/Stopwatch;", null, null);
                    mv(cw, "createStarted", "()Lcom/google/common/base/Stopwatch;", m -> {
                        m.visitTypeInsn(Opcodes.NEW, "com/google/common/base/Stopwatch");
                        m.visitInsn(Opcodes.DUP);
                        m.visitMethodInsn(Opcodes.INVOKESPECIAL, "com/google/common/base/Stopwatch", "<init>", "()V", false);
                        m.visitInsn(Opcodes.ARETURN);
                        m.visitMaxs(2, 0);
                    });
                    def(cw, "start", "()Lcom/google/common/base/Stopwatch;", Opcodes.ACC_PUBLIC, false);
                    def(cw, "stop", "()Lcom/google/common/base/Stopwatch;", Opcodes.ACC_PUBLIC, false);
                    def(cw, "reset", "()Lcom/google/common/base/Stopwatch;", Opcodes.ACC_PUBLIC, false);
                    def(cw, "elapsed", "()J", Opcodes.ACC_PUBLIC, false);
                    def(cw, "isRunning", "()Z", Opcodes.ACC_PUBLIC, true);
                });

        // New stubs for missing methods
        stubIntegerToUnsignedLong(outDir);
        stubLog4jPriority(outDir);
        stubLog4jLogger(outDir);
        stubSystemMapLibraryName(outDir);
        stubSystemLoad(outDir);
        stubClassLoaderGetResource(outDir);
        stubClassLoaderGetResources(outDir);
        stubClassGetGenericSuperclass(outDir);
        stubUUIDConstructor(outDir);
        stubParameterizedTypeGetRawType(outDir);

        System.out.println("Generated stubs to " + outDir);
    }

    static void genClass(Path outDir, String name, String superName, String[] ifaces, Consumer<ClassWriter> builder) throws Exception {
        ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_MAXS);
        int access = Opcodes.ACC_PUBLIC;
        if (name.contains("$")) {
            access |= Opcodes.ACC_STATIC;
        }
        cw.visit(Opcodes.V21, access, name.replace('.', '/'), null, superName.replace('.', '/'), ifaces == null ? null : java.util.Arrays.stream(ifaces).map(s -> s.replace('.', '/')).toArray(String[]::new));
        builder.accept(cw);
        cw.visitEnd();
        String fileName = name.replace('.', '/') + ".class";
        Path file = outDir.resolve(fileName);
        Files.createDirectories(file.getParent());
        Files.write(file, cw.toByteArray());
    }

    static void mv(ClassWriter cw, String name, String desc, Consumer<MethodVisitor> builder) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, name, desc, null, null);
        builder.accept(mv);
        mv.visitEnd();
    }

    static void def(ClassWriter cw, String name, String desc, int access, boolean returnsBool) {
        MethodVisitor mv = cw.visitMethod(access, name, desc, null, null);
        mv.visitCode();
        if (desc.endsWith(")V")) {
            mv.visitInsn(Opcodes.RETURN);
            mv.visitMaxs(0, 1);
        } else if (returnsBool) {
            mv.visitInsn(Opcodes.ICONST_0);
            mv.visitInsn(Opcodes.IRETURN);
            mv.visitMaxs(1, 1);
        } else if (desc.endsWith(")J")) {
            mv.visitInsn(Opcodes.LCONST_0);
            mv.visitInsn(Opcodes.LRETURN);
            mv.visitMaxs(2, 1);
        } else if (desc.endsWith(")I")) {
            mv.visitInsn(Opcodes.ICONST_0);
            mv.visitInsn(Opcodes.IRETURN);
            mv.visitMaxs(1, 1);
        } else {
            mv.visitInsn(Opcodes.ACONST_NULL);
            mv.visitInsn(Opcodes.ARETURN);
            mv.visitMaxs(1, 1);
        }
        mv.visitEnd();
    }

    // Stub for java.lang.Integer.toUnsignedLong
    static void stubIntegerToUnsignedLong(Path outDir) throws Exception {
        genClass(outDir, "java/lang/Integer",
                "java/lang/Object", null,
                cw -> {
                    mv(cw, "toUnsignedLong", "(I)J", m -> {
                        m.visitCode();
                        // return 0L as a stub
                        m.visitInsn(Opcodes.LCONST_0);
                        m.visitInsn(Opcodes.LRETURN);
                        m.visitMaxs(2, 1);
                    });
                });
    }

    // Stub for org.apache.log4j.Priority
    static void stubLog4jPriority(Path outDir) throws Exception {
        genClass(outDir, "org/apache/log4j/Priority",
                "java/lang/Object", null,
                cw -> {
                    // No fields or methods needed for stub
                });
    }

    // Stub for org.apache.log4j.Logger
    static void stubLog4jLogger(Path outDir) throws Exception {
        genClass(outDir, "org/apache/log4j/Logger",
                "java/lang/Object", null,
                cw -> {
                    // Method: log(Ljava/lang/String;Lorg/apache/log4j/Priority;Ljava/lang/Object;Ljava/lang/Throwable;)V
                    mv(cw, "log", "(Ljava/lang/String;Lorg/apache/log4j/Priority;Ljava/lang/Object;Ljava/lang/Throwable;)V", m -> {
                        m.visitCode();
                        m.visitInsn(Opcodes.RETURN);
                        m.visitMaxs(4, 4);
                    });
                    // Method: isEnabledFor(Lorg/apache/log4j/Priority;)Z
                    mv(cw, "isEnabledFor", "(Lorg/apache/log4j/Priority;)Z", m -> {
                        m.visitCode();
                        // return false as a stub
                        m.visitInsn(Opcodes.ICONST_0);
                        m.visitInsn(Opcodes.IRETURN);
                        m.visitMaxs(1, 1);
                    });
                });
    }

    // Stub for java.lang.System.mapLibraryName
    static void stubSystemMapLibraryName(Path outDir) throws Exception {
        genClass(outDir, "java/lang/System",
                "java/lang/Object", null,
                cw -> {
                    mv(cw, "mapLibraryName", "(Ljava/lang/String;)Ljava/lang/String;", m -> {
                        m.visitCode();
                        // return the input string as a stub
                        m.visitVarInsn(Opcodes.ALOAD, 0);
                        m.visitInsn(Opcodes.ARETURN);
                        m.visitMaxs(1, 1);
                    });
                });
    }

    // Stub for java.lang.System.load
    static void stubSystemLoad(Path outDir) throws Exception {
        genClass(outDir, "java/lang/System",
                "java/lang/Object", null,
                cw -> {
                    mv(cw, "load", "(Ljava/lang/String;)V", m -> {
                        m.visitCode();
                        m.visitInsn(Opcodes.RETURN);
                        m.visitMaxs(1, 1);
                    });
                });
    }

    // Stub for java.lang.ClassLoader.getResource
    static void stubClassLoaderGetResource(Path outDir) throws Exception {
        genClass(outDir, "java/lang/ClassLoader",
                "java/lang/Object", null,
                cw -> {
                    mv(cw, "getResource", "(Ljava/lang/String;)Ljava/net/URL;", m -> {
                        m.visitCode();
                        // return null as a stub
                        m.visitInsn(Opcodes.ACONST_NULL);
                        m.visitInsn(Opcodes.ARETURN);
                        m.visitMaxs(1, 1);
                    });
                });
    }

    // Stub for java.lang.ClassLoader.getResources
    static void stubClassLoaderGetResources(Path outDir) throws Exception {
        genClass(outDir, "java/lang/ClassLoader",
                "java/lang/Object", null,
                cw -> {
                    mv(cw, "getResources", "(Ljava/lang/String;)Ljava/util/Enumeration;", m -> {
                        m.visitCode();
                        // return null as a stub
                        m.visitInsn(Opcodes.ACONST_NULL);
                        m.visitInsn(Opcodes.ARETURN);
                        m.visitMaxs(1, 1);
                    });
                });
    }

    // Stub for java.lang.Class.getGenericSuperclass
    static void stubClassGetGenericSuperclass(Path outDir) throws Exception {
        genClass(outDir, "java/lang/Class",
                "java/lang/Object", null,
                cw -> {
                    mv(cw, "getGenericSuperclass", "()Ljava/lang/reflect/Type;", m -> {
                        m.visitCode();
                        // return null as a stub
                        m.visitInsn(Opcodes.ACONST_NULL);
                        m.visitInsn(Opcodes.ARETURN);
                        m.visitMaxs(1, 1);
                    });
                });
    }

    // Stub for java.util.UUID.<init>(JJ)V
    static void stubUUIDConstructor(Path outDir) throws Exception {
        genClass(outDir, "java/util/UUID",
                "java/lang/Object", null,
                cw -> {
                    mv(cw, "<init>", "(JJ)V", m -> {
                        m.visitCode();
                        m.visitVarInsn(Opcodes.ALOAD, 0);
                        m.visitMethodInsn(Opcodes.INVOKESPECIAL, "java/lang/Object", "<init>", "()V", false);
                        m.visitInsn(Opcodes.RETURN);
                        m.visitMaxs(2, 3);
                    });
                });
    }

    // Stub for java.lang.reflect.ParameterizedType.getRawType
    static void stubParameterizedTypeGetRawType(Path outDir) throws Exception {
        genClass(outDir, "java/lang/reflect/ParameterizedType",
                "java/lang/Object", null,
                cw -> {
                    mv(cw, "getRawType", "()Ljava/lang/reflect/Type;", m -> {
                        m.visitCode();
                        // return null as a stub
                        m.visitInsn(Opcodes.ACONST_NULL);
                        m.visitInsn(Opcodes.ARETURN);
                        m.visitMaxs(1, 1);
                    });
                });
    }
}

