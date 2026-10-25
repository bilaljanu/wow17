package poc.patch;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.jar.*;

/**
 * Merges inner class entries from source jar into target jar.
 * Restores missing inner classes that were dropped during deobfuscation.
 * Uses a sorted entry list to ensure reproducible output.
 */
public final class MergeInnerClasses {
    public static void main(String[] args) throws IOException {
        if (args.length != 3) {
            System.err.println("usage: MergeInnerClasses <source.jar> <target.jar> <output.jar>");
            System.exit(2);
        }
        
        Path source = Paths.get(args[0]);
        Path target = Paths.get(args[1]);
        Path output = Paths.get(args[2]);
        
        Map<String, byte[]> entries = new TreeMap<>();
        int added = 0;
        
        // Read target jar first
        try (JarFile jar = new JarFile(target.toFile())) {
            Enumeration<JarEntry> e = jar.entries();
            while (e.hasMoreElements()) {
                JarEntry je = e.nextElement();
                String name = je.getName();
                if (!name.endsWith("/") && !entries.containsKey(name)) {
                    try (InputStream is = jar.getInputStream(je)) {
                        entries.put(name, is.readAllBytes());
                    }
                }
            }
        }
        
        // Add missing entries from source
        try (JarFile jar = new JarFile(source.toFile())) {
            Enumeration<JarEntry> e = jar.entries();
            while (e.hasMoreElements()) {
                JarEntry je = e.nextElement();
                String name = je.getName();
                if (!name.endsWith("/") && !entries.containsKey(name)) {
                    try (InputStream is = jar.getInputStream(je)) {
                        entries.put(name, is.readAllBytes());
                        added++;
                    }
                }
            }
        }
        
        // Write output jar
        Files.createDirectories(output.getParent());
        Path tmp = output.resolveSibling(output.getFileName() + ".tmp");
        try (JarOutputStream jos = new JarOutputStream(Files.newOutputStream(tmp))) {
            for (Map.Entry<String, byte[]> entry : entries.entrySet()) {
                jos.putNextEntry(new JarEntry(entry.getKey()));
                jos.write(entry.getValue());
                jos.closeEntry();
            }
        }
        Files.move(tmp, output, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
        
        System.out.println("MergeInnerClasses: " + added + " inner classes restored -> " + output);
    }
}
