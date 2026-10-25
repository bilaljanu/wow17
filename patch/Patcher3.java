package poc.patch;

import org.objectweb.asm.ClassReader;
import org.objectweb.asm.ClassWriter;
import org.objectweb.asm.Opcodes;
import org.objectweb.asm.ClassVisitor;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.jar.JarOutputStream;

/**
 * ASM 9.6 bytecode rewriter stage of the compile pipeline.
 * Skips io/netty and org/apache/log4j classes to avoid including them in the patched jar.
 * Replaces net.minecraft.network.ClientConnection with poc.networking.MinecraftClientConnection
 * to bypass Netty and use WebRTC DataChannels instead.
 *
 * Also replaces com.mojang.* classes with minimal stubs to avoid TeaVM LambdaMetafactory
 * analysis crashes on bytecode patterns that are not supported.
 */
public final class Patcher3 {
    public static void main(String[] args) throws IOException {
        if (args.length != 2) {
            System.err.println("usage: Patcher3 <in.jar> <out.jar>");
            System.exit(2);
        }
        Path in = Paths.get(args[0]);
        Path out = Paths.get(args[1]);
        int classes = 0, skipped = 0, other = 0, stubbed = 0;

        Map<String, byte[]> contents = new HashMap<>();
        try (JarFile jar = new JarFile(in.toFile())) {
            var entries = jar.entries();
            while (entries.hasMoreElements()) {
                JarEntry e = entries.nextElement();
                String name = e.getName();
                if (name.endsWith("/")) continue;
                if (name.equals("module-info.class")
                        || name.startsWith("META-INF/") && (
                            name.endsWith(".SF") || name.endsWith(".RSA") || name.endsWith(".DSA"))) {
                    skipped++;
                    continue;
                }
                // Skip Netty, log4j, and logging/log4j classes entirely
                if (name.startsWith("io/netty/") || name.startsWith("org/apache/log4j/") || name.startsWith("org/apache/logging/log4j/")) {
                    skipped++;
                    continue;
                }
                try (InputStream is = jar.getInputStream(e)) {
                    byte[] bytes = is.readAllBytes();
                    if (name.endsWith(".class")) {
                        if ("net/minecraft/network/ClientConnection.class".equals(name)) {
                            // Replace ClientConnection with our WebRTC-based version
                            ClassReader cr = new ClassReader(bytes);
                            ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_MAXS);
                            cr.accept(new ClassVisitor(Opcodes.ASM9, cw) {
                                @Override
                                public void visit(int version, int access, String name, String signature, String superName, String[] interfaces) {
                                    super.visit(version, access, "poc/networking/MinecraftClientConnection", signature, superName, interfaces);
                                }

                                @Override
                                public void visitSource(String source, String debug) {
                                    super.visitSource("ClientConnection.java", debug);
                                }
                            }, 0);
                            bytes = cw.toByteArray();
                            classes++;
                        } else if (name.startsWith("com/mojang/")) {
                            // Replace com.mojang classes with minimal stubs to avoid TeaVM LambdaMetafactory issues
                            bytes = createMojangStub(name);
                            stubbed++;
                        } else {
                            // Copy all other classes as-is
                            other++;
                        }
                    } else {
                        other++;
                    }
                    contents.put(name, bytes);
                }
            }
        }
        Files.createDirectories(out.getParent());
        try (JarOutputStream jos = new JarOutputStream(Files.newOutputStream(out))) {
            for (var entry : contents.entrySet()) {
                jos.putNextEntry(new JarEntry(entry.getKey()));
                jos.write(entry.getValue());
                jos.closeEntry();
            }
        }
        System.out.println("Patcher3: " + classes + " classes rewritten (ClientConnection only), "
                + stubbed + " classes stubbed (com.mojang), " + other + " resources copied, " + skipped + " entries dropped -> " + out);
    }

    private static byte[] createMojangStub(String className) {
        String internalName = className.substring(0, className.length() - 6).replace('/', '.');
        boolean isInterface = internalName.contains("Listener") ||
                             internalName.contains("Callback") ||
                             internalName.contains("Handler") ||
                             internalName.contains("Function") ||
                             internalName.contains("Supplier") ||
                             internalName.contains("Consumer") ||
                             internalName.contains("Predicate") ||
                             internalName.contains("BiFunction") ||
                             internalName.contains("BiConsumer") ||
                             internalName.contains("Runnable") ||
                             internalName.contains("Callable");

        ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_MAXS);
        if (isInterface) {
            cw.visit(Opcodes.V1_8, Opcodes.ACC_PUBLIC | Opcodes.ACC_INTERFACE | Opcodes.ACC_ABSTRACT,
                     internalName.replace('.', '/'), null, "java/lang/Object", null);
        } else {
            cw.visit(Opcodes.V1_8, Opcodes.ACC_PUBLIC,
                     internalName.replace('.', '/'), null, "java/lang/Object", null);
            org.objectweb.asm.MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", "()V", null, null);
            mv.visitCode();
            mv.visitVarInsn(Opcodes.ALOAD, 0);
            mv.visitMethodInsn(Opcodes.INVOKESPECIAL, "java/lang/Object", "<init>", "()V", false);
            mv.visitInsn(Opcodes.RETURN);
            mv.visitMaxs(1, 1);
            mv.visitEnd();
        }
        cw.visitEnd();
        return cw.toByteArray();
    }
}
