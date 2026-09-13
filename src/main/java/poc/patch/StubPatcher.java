package poc.patch;

import org.objectweb.asm.*;
import org.objectweb.asm.tree.*;

import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.jar.*;

public class StubPatcher {
    public static void main(String[] args) throws Exception {
        if (args.length < 2) {
            System.err.println("Usage: StubPatcher <input-jar> <output-jar>");
            System.exit(1);
        }
        Path input = Path.of(args[0]);
        Path output = Path.of(args[1]);

        try (JarFile jar = new JarFile(input.toFile());
             JarOutputStream out = new JarOutputStream(Files.newOutputStream(output))) {

            Enumeration<JarEntry> entries = jar.entries();
            while (entries.hasMoreElements()) {
                JarEntry entry = entries.nextElement();
                String name = entry.getName();

                // Only stub com.mojang classes
                if (name.startsWith("com/mojang/") && name.endsWith(".class")) {
                    writeStubClass(out, name);
                } else {
                    // Copy other entries as-is
                    out.putNextEntry(new JarEntry(name));
                    if (!entry.isDirectory()) {
                        try (InputStream in = jar.getInputStream(entry)) {
                            in.transferTo(out);
                        }
                    }
                    out.closeEntry();
                }
            }
        }
        System.out.println("StubPatcher: wrote " + output);
    }

    private static void writeStubClass(JarOutputStream out, String className) throws IOException {
        String internalName = className.substring(0, className.length() - 6).replace('/', '.');

        ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_FRAMES | ClassWriter.COMPUTE_MAXS);

        // Determine if it's an interface or class based on common patterns
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

        if (isInterface) {
            cw.visit(Opcodes.V1_8, Opcodes.ACC_PUBLIC | Opcodes.ACC_INTERFACE | Opcodes.ACC_ABSTRACT,
                     internalName.replace('.', '/'), null, "java/lang/Object", null);
        } else {
            cw.visit(Opcodes.V1_8, Opcodes.ACC_PUBLIC,
                     internalName.replace('.', '/'), null, "java/lang/Object", null);

            // Default constructor
            MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", "()V", null, null);
            mv.visitCode();
            mv.visitVarInsn(Opcodes.ALOAD, 0);
            mv.visitMethodInsn(Opcodes.INVOKESPECIAL, "java/lang/Object", "<init>", "()V", false);
            mv.visitInsn(Opcodes.RETURN);
            mv.visitMaxs(1, 1);
            mv.visitEnd();
        }

        cw.visitEnd();

        JarEntry entry = new JarEntry(className);
        out.putNextEntry(entry);
        out.write(cw.toByteArray());
        out.closeEntry();
    }
}