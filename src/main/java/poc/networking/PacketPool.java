package poc.networking;

import java.util.ArrayDeque;
import java.util.Queue;

/**
 * Packet buffer pool to reduce GC pressure during packet encoding/decoding.
 * Reuses byte arrays for common packet sizes.
 */
public final class PacketPool {

    // Pool for small packets (0-64 bytes)
    private static final Queue<byte[]> SMALL_PACKET_POOL = new ArrayDeque<>(16);
    // Pool for medium packets (65-256 bytes)
    private static final Queue<byte[]> MEDIUM_PACKET_POOL = new ArrayDeque<>(8);
    // Pool for large packets (257-1024 bytes)
    private static final Queue<byte[]> LARGE_PACKET_POOL = new ArrayDeque<>(4);

    private PacketPool() {
        // Utility class
    }

    /**
     * Acquire a byte array from the pool appropriate for the given size.
     * @param size minimum required size
     * @return byte array of at least the requested size
     */
    public static byte[] acquire(int size) {
        if (size <= 64) {
            synchronized (SMALL_PACKET_POOL) {
                byte[] buf = SMALL_PACKET_POOL.poll();
                return buf != null ? buf : new byte[64];
            }
        } else if (size <= 256) {
            synchronized (MEDIUM_PACKET_POOL) {
                byte[] buf = MEDIUM_PACKET_POOL.poll();
                return buf != null ? buf : new byte[256];
            }
        } else {
            synchronized (LARGE_PACKET_POOL) {
                byte[] buf = LARGE_PACKET_POOL.poll();
                return buf != null ? buf : new byte[1024];
            }
        }
    }

    /**
     * Release a byte array back to the appropriate pool for reuse.
     * Arrays must be <= 1024 bytes to be pooled.
     * @param buf byte array to release
     */
    public static void release(byte[] buf) {
        if (buf == null) {
            return;
        }
        int length = buf.length;
        if (length <= 64) {
            synchronized (SMALL_PACKET_POOL) {
                if (SMALL_PACKET_POOL.size() < 16) {
                    SMALL_PACKET_POOL.offer(buf);
                }
            }
        } else if (length <= 256) {
            synchronized (MEDIUM_PACKET_POOL) {
                if (MEDIUM_PACKET_POOL.size() < 8) {
                    MEDIUM_PACKET_POOL.offer(buf);
                }
            }
        } else if (length <= 1024) {
            synchronized (LARGE_PACKET_POOL) {
                if (LARGE_PACKET_POOL.size() < 4) {
                    LARGE_PACKET_POOL.offer(buf);
                }
            }
        }
        // Larger arrays are not pooled to avoid excessive memory retention
    }

    /**
     * Pre-fill pools with initial buffers to avoid allocation spikes.
     */
    public static void warmUp() {
        // Pre-allocate common sizes
        for (int i = 0; i < 8; i++) {
            SMALL_PACKET_POOL.offer(new byte[64]);
            MEDIUM_PACKET_POOL.offer(new byte[256]);
            LARGE_PACKET_POOL.offer(new byte[1024]);
        }
    }
}