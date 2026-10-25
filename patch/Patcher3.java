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
import java.util.HashSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
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
 *
 * Normalizes JAR entry paths: for each .class file, reads its internal JVM class name
 * via ASM ClassReader.getClassName() and ensures the archive path matches (internal name + ".class").
 * Preserves valid obfuscated root entries (e.g. aij.class) and non-class resources.
 * Detects duplicate entries and class-name collisions before promotion.
 */
public final class Patcher3 {
    public static void main(String[] args) throws IOException {
        if (args.length != 2) {
            System.err.println("usage: Patcher3 <in.jar> <out.jar>");
            System.exit(2);
        }
        Path in = Paths.get(args[0]);
        Path out = Paths.get(args[1]);
        int classes = 0, skipped = 0, other = 0, stubbed = 0, normalized = 0;
        List<String> duplicates = new ArrayList<>();
        List<String> collisions = new ArrayList<>();

        Map<String, byte[]> contents = new HashMap<>();
        Set<String> seenEntries = new HashSet<>();
        Set<String> seenInternal = new HashSet<>();
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
                    String outName = name;
                    if (name.endsWith(".class")) {
                        String internal = null;
                        try {
                            ClassReader cr = new ClassReader(bytes);
                            internal = cr.getClassName();
                        } catch (Exception ex) {
                            // Not a valid class file; keep original name
                            internal = null;
                        }
                        if (internal != null && !internal.isEmpty()) {
                            // ASM getClassName() returns dotted form; JAR entries use slashes
                            String normalizedPath = internal.replace('.', '/') + ".class";
                            if (!normalizedPath.equals(name)) {
                                normalized++;
                            }
                            outName = normalizedPath;
                            // Detect class-name collisions
                            if (seenInternal.contains(internal)) {
                                collisions.add(internal);
                            }
                            seenInternal.add(internal);
                        }
                        if ("net/minecraft/network/ClientConnection.class".equals(outName)) {
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
                        } else if (outName.startsWith("com/mojang/")) {
                            // Replace com.mojang classes with minimal stubs to avoid TeaVM LambdaMetafactory issues
                            bytes = createMojangStub(outName);
                            stubbed++;
                        } else {
                            // Copy all other classes as-is
                            other++;
                        }
                    } else {
                        other++;
                    }
                    // Detect duplicate entries
                    if (seenEntries.contains(outName)) {
                        duplicates.add(outName);
                    }
                    seenEntries.add(outName);
                    contents.put(outName, bytes);
                }
            }
        }
        // Report duplicates and collisions
        if (!duplicates.isEmpty()) {
            System.err.println("WARNING: duplicate entries detected: " + duplicates);
        }
        if (!collisions.isEmpty()) {
            System.err.println("WARNING: class-name collisions detected: " + collisions);
        }
        // Fail on collisions (do not promote ambiguous output)
        if (!collisions.isEmpty()) {
            System.err.println("Patcher3: ABORTING due to class-name collisions");
            System.exit(1);
        }
        Files.createDirectories(out.getParent());
        // Write to temp file first, then promote
        Path tmp = out.resolveSibling(out.getFileName() + ".tmp");
        try (JarOutputStream jos = new JarOutputStream(Files.newOutputStream(tmp))) {
            for (var entry : contents.entrySet()) {
                jos.putNextEntry(new JarEntry(entry.getKey()));
                jos.write(entry.getValue());
                jos.closeEntry();
            }
        }
        // Promote temp to final
        Files.move(tmp, out, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
        System.out.println("Patcher3: " + classes + " classes rewritten (ClientConnection only), "
                + stubbed + " classes stubbed (com.mojang), " + other + " resources copied, "
                + skipped + " entries dropped, " + normalized + " entries normalized, "
                + duplicates.size() + " duplicates, " + collisions.size() + " collisions -> " + out);
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