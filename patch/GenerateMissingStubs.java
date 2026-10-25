import org.objectweb.asm.ClassWriter;
import org.objectweb.asm.MethodVisitor;
import org.objectweb.asm.Opcodes;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

public class GenerateMissingStubs {
    public static void main(String[] args) throws Exception {
        String classlibPath = "/home/bilal/wow17/build/teavm-classlib-patched.jar";
        Path tempJar = Paths.get("/home/bilal/wow17/build/teavm-classlib-patched.jar.tmp");

        // Load existing jar
        java.util.Map<String, byte[]> entries = new java.util.LinkedHashMap<>();
        try (java.util.jar.JarFile jar = new java.util.jar.JarFile(classlibPath)) {
            jar.entries().asIterator().forEachRemaining(e -> {
                try {
                    if (!e.isDirectory()) {
                        entries.put(e.getName(), jar.getInputStream(e).readAllBytes());
                    }
                } catch (Exception ex) { throw new RuntimeException(ex); }
            });
        }

        int injected = 0;

        // 1. java.util.concurrent.ConcurrentLinkedQueue
        if (!entries.containsKey("org/teavm/classlib/java/util/concurrent/TConcurrentLinkedQueue.class")) {
            ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_FRAMES | ClassWriter.COMPUTE_MAXS);
            cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC, "org/teavm/classlib/java/util/concurrent/TConcurrentLinkedQueue",
                    null, "org/teavm/classlib/java/lang/TObject",
                    new String[]{"java/util/Queue", "java/io/Serializable"});
            addCtor(cw, "org/teavm/classlib/java/lang/TObject");
            addCtor(cw, "org/teavm/classlib/java/lang/TObject", "(Ljava/util/Collection;)V");
            addMethod(cw, "offer", "(Ljava/lang/Object;)Z", true);
            addMethod(cw, "poll", "()Ljava/lang/Object;", false);
            addMethod(cw, "peek", "()Ljava/lang/Object;", false);
            addMethod(cw, "size", "()I", true);
            addMethod(cw, "isEmpty", "()Z", true);
            entries.put("org/teavm/classlib/java/util/concurrent/TConcurrentLinkedQueue.class", cw.toByteArray());
            System.out.println("  INJECT: TConcurrentLinkedQueue");
            injected++;
        }

        // 2. java.net.Proxy
        if (!entries.containsKey("org/teavm/classlib/java/net/TProxy.class")) {
            ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_FRAMES | ClassWriter.COMPUTE_MAXS);
            cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_FINAL,
                    "org/teavm/classlib/java/net/TProxy", null,
                    "org/teavm/classlib/java/lang/TObject", new String[]{"java/io/Serializable"});
            // NO_PROXY field
            cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL,
                    "NO_PROXY", "Ljava/net/Proxy;", null, null).visitEnd();
            // Type enum
            cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL | Opcodes.ACC_ENUM,
                    "DIRECT", "Ljava/net/Proxy$Type;", null, "DIRECT").visitEnd();
            cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL | Opcodes.ACC_ENUM,
                    "HTTP", "Ljava/net/Proxy$Type;", null, "HTTP").visitEnd();
            cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL | Opcodes.ACC_ENUM,
                    "SOCKS", "Ljava/net/Proxy$Type;", null, "SOCKS").visitEnd();
            addCtor(cw, "org/teavm/classlib/java/lang/TObject");
            addMethod(cw, "type", "()Ljava/net/Proxy$Type;", false);
            addMethod(cw, "address", "()Ljava/net/SocketAddress;", false);
            entries.put("org/teavm/classlib/java/net/TProxy.class", cw.toByteArray());
            System.out.println("  INJECT: TProxy");
            injected++;
        }

        // 3. java.net.Authenticator
        if (!entries.containsKey("org/teavm/classlib/java/net/TAuthenticator.class")) {
            ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_FRAMES | ClassWriter.COMPUTE_MAXS);
            cw.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT,
                    "org/teavm/classlib/java/net/TAuthenticator", null,
                    "org/teavm/classlib/java/lang/TObject", null);
            addCtor(cw, "org/teavm/classlib/java/lang/TObject");
            addStaticMethod(cw, "getDefault", "()Ljava/net/Authenticator;", false);
            addStaticMethod(cw, "setDefault", "(Ljava/net/Authenticator;)V", true);
            addMethod(cw, "requestPasswordAuthentication",
                    "(Ljava/lang/String;Ljava/net/InetAddress;ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/net/PasswordAuthentication;", false);
            addMethod(cw, "requestPasswordAuthentication",
                    "(Ljava/lang/String;Ljava/net/InetAddress;ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/net/URL;Ljava/net/Authenticator$RequestorType;)Ljava/net/PasswordAuthentication;", false);
            entries.put("org/teavm/classlib/java/net/TAuthenticator.class", cw.toByteArray());
            System.out.println("  INJECT: TAuthenticator");
            injected++;
        }

        System.out.println("Total injected: " + injected);

        // Write patched jar
        try (java.util.jar.JarOutputStream jos = new java.util.jar.JarOutputStream(new FileOutputStream(tempJar.toFile()))) {
            for (var entry : entries.entrySet()) {
                jos.putNextEntry(new java.util.jar.JarEntry(entry.getKey()));
                jos.write(entry.getValue());
                jos.closeEntry();
            }
        }
        Files.move(tempJar, Paths.get(classlibPath), java.nio.file.StandardCopyOption.REPLACE_EXISTING);
        System.out.println("Written " + classlibPath);
    }

    static void addCtor(ClassWriter cw, String superName) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", "()V", null, null);
        mv.visitCode();
        mv.visitVarInsn(Opcodes.ALOAD, 0);
        mv.visitMethodInsn(Opcodes.INVOKESPECIAL, superName, "<init>", "()V", false);
        mv.visitInsn(Opcodes.RETURN);
        mv.visitMaxs(1, 1);
        mv.visitEnd();
    }

    static void addCtor(ClassWriter cw, String superName, String desc) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", desc, null, null);
        mv.visitCode();
        mv.visitVarInsn(Opcodes.ALOAD, 0);
        mv.visitMethodInsn(Opcodes.INVOKESPECIAL, superName, "<init>", desc, false);
        mv.visitInsn(Opcodes.RETURN);
        mv.visitMaxs(2, 2);
        mv.visitEnd();
    }

    static void addMethod(ClassWriter cw, String name, String desc, boolean returnsBool) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, name, desc, null, null);
        mv.visitCode();
        if (desc.endsWith(")V")) {
            mv.visitInsn(Opcodes.RETURN);
            mv.visitMaxs(0, 1);
        } else if (returnsBool) {
            mv.visitInsn(Opcodes.ICONST_0);
            mv.visitInsn(Opcodes.IRETURN);
            mv.visitMaxs(1, 1);
        } else if (desc.endsWith(")I")) {
            mv.visitInsn(Opcodes.ICONST_0);
            mv.visitInsn(Opcodes.IRETURN);
            mv.visitMaxs(1, 1);
        } else if (desc.endsWith(")J")) {
            mv.visitInsn(Opcodes.LCONST_0);
            mv.visitInsn(Opcodes.LRETURN);
            mv.visitMaxs(2, 1);
        } else {
            mv.visitInsn(Opcodes.ACONST_NULL);
            mv.visitInsn(Opcodes.ARETURN);
            mv.visitMaxs(1, 1);
        }
        mv.visitEnd();
    }

    static void addStaticMethod(ClassWriter cw, String name, String desc, boolean returnsVoid) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC, name, desc, null, null);
        mv.visitCode();
        if (returnsVoid) {
            mv.visitInsn(Opcodes.RETURN);
            mv.visitMaxs(0, 0);
        } else {
            mv.visitInsn(Opcodes.ACONST_NULL);
            mv.visitInsn(Opcodes.ARETURN);
            mv.visitMaxs(1, 1);
        }
        mv.visitEnd();
    }
}
