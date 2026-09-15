package poc.networking;

import java.util.Arrays;
import java.util.concurrent.atomic.AtomicInteger;

import net.minecraft.network.MinecraftClientConnection;
import org.teavm.jso.JSClass;

/**
 * Core networking bridge: bypasses Netty and implements MC's packet flow
 * over WebRTC DataChannels directly.
 *
 * Wire format (standard Minecraft):
 *   VarInt(totalLength) + VarInt(packetId) + payloadBytes
 *
 * PacketListener support:
 * - Holds a {@link #listener} used as the decoded-packet sink.
 * - {@link #onReceive(byte[])} parses MC frames, decodes packets via the
 *   current NetworkState's PacketRegistry, and dispatches via Packet.apply(listener).
 * - Login/play state transitions are handled by swapping the active NetworkState
 *   via {@link #setNetworkState(Object)}.
 */
public final class NetBridge {

    private static volatile boolean open;
    private static final AtomicInteger packetSequence = new AtomicInteger(0);

    // PacketListener sink: may be any MC listener interface (play, login, configuration, etc.)
    private static volatile Object listener; // PacketListener
    private static volatile Object networkState; // net.minecraft.network.NetworkState<?,?>
    private static volatile MinecraftClientConnection connection;

    public static void setConnection(MinecraftClientConnection connection) {
        NetBridge.connection = connection;
    }

    public static MinecraftClientConnection getConnection() {
        return connection;
    }

    public static void clearConnection() {
        NetBridge.connection = null;
    }

    public static void attach() {
        open = true;
        JsNetBridge.onAttach();
    }

    /**
     * Receive raw bytes from the DataChannel, parse MC frames, decode and dispatch packets.
     * Each frame: VarInt(totalLength) + VarInt(packetId) + payload
     * <p>
     * This version processes only the first frame to avoid TeaVM JSClassProcessor NPE
     * associated with while-loop control flow in onReceive.
     */

    public static void onReceive(byte[] data) {
        // [RUNTIME E] NetBridge.onReceive ENTERED
        System.out.println("[RUNTIME E] NetBridge.onReceive ENTERED, data.length=" + (data != null ? data.length : "null"));
        if (!open || data == null || data.length == 0) {
            System.out.println("[NetBridge] Channel not open or data empty, returning");
            return;
        }

        // Read frame length (VarInt)
        int[] lenInfo = readVarIntInfo(data, 0);
        int frameLength = lenInfo[0];
        int afterLen = lenInfo[1];

        // [RUNTIME F] frameLength parsed
        System.out.println("[RUNTIME F] frameLength=" + frameLength + ", afterLen=" + afterLen + ", data.length=" + data.length);

        if (frameLength < 0) {
            System.err.println("[NetBridge] Invalid VarInt frame length at offset 0");
            return;
        }

        int frameStart = afterLen;
        int frameEnd = frameStart + frameLength;

        if (frameEnd > data.length) {
            System.out.println("[NetBridge] Incomplete frame, waiting for more data... (have=" + (data.length) + ", need=" + frameLength + ")");
            return;
        }

        // Extract frame bytes: VarInt(packetId) + payload
        // Use pooled buffer to avoid allocation for each frame
        byte[] frame = PacketPool.acquire(frameEnd - frameStart);
        System.arraycopy(data, frameStart, frame, 0, frameEnd - frameStart);
        int packetId = readVarIntInfo(frame, 0)[0];
        // [RUNTIME G] packetId parsed
        System.out.println("[RUNTIME G] packetId=" + packetId + " from frameLength=" + frameLength);
        System.out.printf("[NetBridge] Received packet %d (frameLen=%d)%n",
                packetSequence.incrementAndGet(), frameLength);
        dispatchFrame(frame);

        // Return the frame buffer to the pool after processing
        PacketPool.release(frame);
    }

    // --- PacketListener sink -------------------------------------------------

    /**
     * Register the PacketListener that should receive deserialized packets.
     */
    public static void setPacketListener(Object listener) {
        NetBridge.listener = listener;
    }

    /**
     * Set the current NetworkState so that dispatchFrame() can look up the correct
     * PacketRegistry/deserializer for incoming packet IDs.
     */
    public static void setNetworkState(Object state) {
        NetBridge.networkState = state;
    }

    /**
     * Return the current NetworkState for reflective packet-ID resolution.
     * Null-safe: returns null when no state has been registered.
     */
    public static Object getNetworkStateForReflection() {
        return NetBridge.networkState;
    }

    /**
     * Return the PacketRegistry for the given NetworkState instance.
     * Null-safe: returns null when the state or registry cannot be located.
     */
    public static Object getRegistryForReflection(Object state) {
        if (state == null) {
            return null;
        }
        try {
            return getRegistry(state);
        } catch (Exception e) {
            System.err.println("[NetBridge] getRegistryForReflection failed: " + e);
            return null;
        }
    }

    /**
     * Send a framed MC packet: VarInt(totalLength) + VarInt(packetId) + payload
     */

    public static void writePacket(int packetId, byte[] payload) {
        if (!open) {
            System.out.println("[NetBridge] Channel not open, packet dropped");
            return;
        }

        int packetIdLen = calculateVarIntLength(packetId);
        int payloadLen = payload.length;
        int totalLen = packetIdLen + payloadLen;
        int totalLenEncodedLen = calculateVarIntLength(totalLen);

        // Use pooled buffer for the frame to reduce GC pressure
        byte[] frame = PacketPool.acquire(totalLenEncodedLen + totalLen);

        int pos = 0;
        pos = writeVarInt(frame, pos, totalLen);
        pos = writeVarInt(frame, pos, packetId);
        System.arraycopy(payload, 0, frame, pos, payloadLen);

        JsNetBridge.sendBytes(frame);

        // Return the buffer to the pool after sending
        PacketPool.release(frame);

        System.out.printf("[NetBridge] Sent packet %d (id=%d, len=%d)%n",
                packetSequence.incrementAndGet(), packetId, payloadLen);
    }

    public static void close() {
        open = false;
        JsNetBridge.onClose();
    }

    /**
     * Plugin hook: request the webport to join a Minecraft server.
     * Delegates to JsNetBridge.joinServer(), which calls into the
     * webport's server-join handler.
     */
    public static void joinServer(String host, int port) {
        if (!open) {
            System.out.println("[NetBridge] Channel not open, joinServer dropped");
            return;
        }
        JsNetBridge.joinServer(host, port);
        System.out.printf("[NetBridge] joinServer(%s, %d)%n", host, port);
        // Initiate Minecraft protocol handshake
        if (connection != null) {
            connection.initiateHandshake(host, port);
        }
    }

    public static boolean isOpen() {
        return open;
    }

    // --- Frame dispatch ------------------------------------------------------

    /**
     * Parse VarInt(packetId) + payload from frame bytes, decode the packet,
     * and dispatch via packet.apply(listener).
     */

    private static void dispatchFrame(byte[] frame) {
        MinecraftClientConnection conn = NetBridge.connection;
        if (conn != null) {
            conn.onPacket(frame);
            return;
        }

        Object currentListener = NetBridge.listener;
        if (currentListener == null) {
            System.out.println("[NetBridge] No packet listener registered, dropping frame");
            return;
        }

        if (frame.length == 0) {
            System.out.println("[NetBridge] Empty frame, dropping");
            return;
        }

        try {
            // Frame layout: VarInt(packetId) + payloadBytes
            int[] idInfo = readVarIntInfo(frame, 0);
            int packetId = idInfo[0];
            int bodyOffset = idInfo[1];

            byte[] packetBody = Arrays.copyOfRange(frame, bodyOffset, frame.length);
            System.out.printf("[NetBridge] Dispatching packetId=%d to listener=%s%n",
                    packetId, currentListener.getClass().getName());

            // Decode packet from registry
            Object packet = lookupPacketFromRegistry(packetId, packetBody);
            if (packet == null) {
                System.err.printf("[NetBridge] Unknown packetId=%d or failed decode, dropping%n", packetId);
                return;
            }

            // Packet.apply(listener) is the MC dispatch contract.
            java.lang.reflect.Method apply = packet.getClass().getMethod("apply", currentListener.getClass());
            apply.invoke(packet, currentListener);
            System.out.printf("[NetBridge] Dispatched packetId=%d via %s.apply(%s)%n",
                    packetId, packet.getClass().getSimpleName(),
                    currentListener.getClass().getSimpleName());

        } catch (NoSuchMethodException e) {
            System.err.println("[NetBridge] Packet does not implement apply() for current listener: " + e);
        } catch (Exception e) {
            System.err.println("[NetBridge] Packet dispatch failed: " + e);
        }
    }

    /**
     * Direct packet dispatch from JS bridge: accepts pre-parsed packetId and payload.
     * Used by JsNetBridge.onReceivePacket to avoid byte[] call-site issues.
     */
    public static void dispatchPacketDirect(int packetId, byte[] payload) {
        MinecraftClientConnection conn = NetBridge.connection;
        if (conn != null) {
            // For MCC path, we need to reconstruct a frame
            byte[] frame = buildFrame(packetId, payload);
            conn.onPacket(frame);
            return;
        }

        Object currentListener = NetBridge.listener;
        if (currentListener == null) {
            System.out.println("[NetBridge] No packet listener registered, dropping packet");
            return;
        }

        if (payload == null || payload.length == 0) {
            System.out.println("[NetBridge] Empty payload, dropping");
            return;
        }

        try {
            // Decode packet from registry
            Object packet = lookupPacketFromRegistry(packetId, payload);
            if (packet == null) {
                System.err.printf("[NetBridge] Unknown packetId=%d or failed decode, dropping%n", packetId);
                return;
            }

            // Packet.apply(listener) is the MC dispatch contract.
            java.lang.reflect.Method apply = packet.getClass().getMethod("apply", currentListener.getClass());
            apply.invoke(packet, currentListener);
            System.out.printf("[NetBridge] Dispatched packetId=%d via %s.apply(%s)%n",
                    packetId, packet.getClass().getSimpleName(),
                    currentListener.getClass().getSimpleName());

        } catch (NoSuchMethodException e) {
            System.err.println("[NetBridge] Packet does not implement apply() for current listener: " + e);
        } catch (Exception e) {
            System.err.println("[NetBridge] Packet dispatch failed: " + e);
        }
    }

    private static byte[] buildFrame(int packetId, byte[] payload) {
        int packetIdLen = calculateVarIntLength(packetId);
        int payloadLen = payload.length;
        int totalLen = packetIdLen + payloadLen;
        int totalLenEncodedLen = calculateVarIntLength(totalLen);

        byte[] frame = PacketPool.acquire(totalLenEncodedLen + totalLen);
        int pos = 0;
        pos = writeVarInt(frame, pos, totalLen);
        pos = writeVarInt(frame, pos, packetId);
        System.arraycopy(payload, 0, frame, pos, payloadLen);
        return frame;
    }

    // --- PacketRegistry / codec reflection ------------------------------------

    /**
     * Attempt to decode a packet instance from (id + body) using the current
     * NetworkState's PacketRegistry.  Returns null when the registry cannot be
     * located or the packet is unknown.
     */
    public static Object lookupPacketFromRegistry(int packetId, byte[] bodyBytes) {
        Object state = NetBridge.networkState;
        if (state == null) {
            return null;
        }

        try {
            Object registry = getRegistry(state);
            if (registry == null) {
                return null;
            }

            Object packet = decodePacket(registry, packetId, bodyBytes);
            if (packet != null) {
                return packet;
            }
        } catch (Exception e) {
            System.err.println("[NetBridge] Registry lookup failed: " + e);
        }
        return null;
    }

    static Object getRegistry(Object state) throws Exception {
        // Field access first (MC 1.18+ uses f_13253_, some builds use p_131552_)
        try {
            java.lang.reflect.Field f = state.getClass().getDeclaredField("f_13253_");
            f.setAccessible(true);
            return f.get(state);
        } catch (NoSuchFieldException ignored) { }
        try {
            java.lang.reflect.Field f = state.getClass().getDeclaredField("p_131552_");
            f.setAccessible(true);
            return f.get(state);
        } catch (NoSuchFieldException ignored) { }

        // getter access
        try {
            return state.getClass().getMethod("getRegistry").invoke(state);
        } catch (NoSuchMethodException ignored) { }
        try {
            return state.getClass().getMethod("codec").invoke(state);
        } catch (NoSuchMethodException ignored) { }

        return null;
    }

    private static Object decodePacket(Object registry, int packetId, byte[] bodyBytes) throws Exception {
        // 1) registry.byId(id) → Packet<?>
        try {
            java.lang.reflect.Method m = registry.getClass().getMethod("byId", int.class);
            Object packet = m.invoke(registry, packetId);
            if (packet != null) {
                return populatePacket(packet, bodyBytes);
            }
        } catch (NoSuchMethodException ignored) { }

        // 2) registry.codec(id) → PacketCodec; codec.decode(reader)
        try {
            java.lang.reflect.Method codecById = registry.getClass().getMethod("codec", int.class);
            Object codec = codecById.invoke(registry, packetId);
            if (codec != null) {
                return decodeWithCodec(codec, bodyBytes);
            }
        } catch (NoSuchMethodException ignored) { }

        // 3) registry.codec(packetClass) → PacketCodec; codec.decode(reader)
        try {
            Class<?> packetClass = Class.forName("net.minecraft.network.packet.Packet");
            java.lang.reflect.Method codecByPacket = registry.getClass().getMethod("codec", packetClass);
            Object codec = codecByPacket.invoke(registry, packetClass);
            if (codec != null) {
                return decodeWithCodec(codec, bodyBytes);
            }
        } catch (NoSuchMethodException | ClassNotFoundException ignored) { }

        return null;
    }

    private static Object decodeWithCodec(Object codec, byte[] bodyBytes) throws Exception {
        Class<?> friendlyByteBufClass = Class.forName("net.minecraft.network.FriendlyByteBuf");
        Object buffer = createBuffer(friendlyByteBufClass, bodyBytes);

        java.lang.reflect.Method decode = codec.getClass().getMethod("decode", friendlyByteBufClass);
        return decode.invoke(codec, buffer);
    }

    private static Object populatePacket(Object packet, byte[] bodyBytes) throws Exception {
        Class<?> friendlyByteBufClass = Class.forName("net.minecraft.network.FriendlyByteBuf");
        Object buffer = createBuffer(friendlyByteBufClass, bodyBytes);

        java.lang.reflect.Method read = packet.getClass().getMethod("read", friendlyByteBufClass);
        read.invoke(packet, buffer);
        return packet;
    }

    private static Object createBuffer(Class<?> bufClass, byte[] data) throws Exception {
        Class<?> byteBufClass = Class.forName("io.netty.buffer.ByteBuf");
        Class<?> allocatorClass = Class.forName("io.netty.buffer.ByteBufAllocator");
        Object allocator = allocatorClass.getMethod("ioAllocator").invoke(null);
        Object byteBuf = allocatorClass.getMethod("buffer").invoke(allocator, data.length);
        Object buffer = bufClass.getConstructor(byteBufClass).newInstance(byteBuf);
        bufClass.getMethod("writeBytes", byteBufClass).invoke(buffer, byteBuf);
        return buffer;
    }

    // --- VarInt utilities ----------------------------------------------------

    /**
     * Scratch buffer for readVarIntInfo to avoid per-call allocations.
     * Single-threaded context (browser main thread), safe to reuse.
     */
    private static final int[] VAR_INT_SCRATCH = new int[2];

    /**
     * Read a VarInt from {@code buf[offset]} and store [value, newOffset]
     * into the provided scratch array. Returns the same array reference.
     * Zero allocations per call.
     */
    public static int[] readVarIntInfo(byte[] buf, int offset) {
        if (offset >= buf.length) {
            VAR_INT_SCRATCH[0] = 0;
            VAR_INT_SCRATCH[1] = offset;
            return VAR_INT_SCRATCH;
        }

        int current = buf[offset] & 0xFF;
        // Fast path: single-byte VarInt (0-127)
        if ((current & 0x80) == 0) {
            VAR_INT_SCRATCH[0] = current;
            VAR_INT_SCRATCH[1] = offset + 1;
            return VAR_INT_SCRATCH;
        }

        // Multi-byte VarInt - fall back to original algorithm
        int result = 0;
        int shift = 0;
        int pos = offset;

        do {
            if (pos >= buf.length) {
                VAR_INT_SCRATCH[0] = result;
                VAR_INT_SCRATCH[1] = pos;
                return VAR_INT_SCRATCH;
            }
            current = buf[pos++] & 0xFF;
            result |= (current & 0x7F) << shift;
            shift += 7;
            if (shift > 28) {
                VAR_INT_SCRATCH[0] = -1;
                VAR_INT_SCRATCH[1] = pos;
                return VAR_INT_SCRATCH;
            }
        } while ((current & 0x80) != 0);

        VAR_INT_SCRATCH[0] = result;
        VAR_INT_SCRATCH[1] = pos;
        return VAR_INT_SCRATCH;
    }

    public static int readVarInt(byte[] buf, int offset) {
        int result = 0;
        int shift = 0;
        int current;

        do {
            if (offset >= buf.length) return -1;
            current = buf[offset++] & 0xFF;
            result |= (current & 0x7F) << shift;
            shift += 7;
            if (shift > 28) return -1;
        } while ((current & 0x80) != 0);

        return result;
    }

    public static int writeVarInt(byte[] buf, int offset, int value) {
        if (value < 0) throw new IllegalArgumentException("VarInt values must be >= 0");

        // Fast path: single-byte VarInt (0-127)
        if (value < 0x80) {
            buf[offset] = (byte) value;
            return 1;
        }

        // Multi-byte VarInt - fall back to original algorithm
        int pos = offset;
        do {
            byte b = (byte) (value & 0x7F);
            value >>>= 7;
            if (value != 0 || (b & 0x80) != 0) {
                b |= 0x80;
            }
            buf[pos++] = b;
        } while (value != 0);
        return pos - offset;
    }

    public static int calculateVarIntLength(int value) {
        if (value < 0) throw new IllegalArgumentException("VarInt values must be >= 0");
        int length = 0;
        do {
            value >>>= 7;
            length++;
        } while (value != 0 && length < 5);
        return length;
    }
}