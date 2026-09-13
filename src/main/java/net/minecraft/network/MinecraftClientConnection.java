package net.minecraft.network;

import net.minecraft.network.DisconnectionInfo;
import net.minecraft.network.NetworkSide;
import net.minecraft.text.Text;
import net.minecraft.network.listener.*;
import net.minecraft.network.NetworkState;
import net.minecraft.network.packet.Packet;
import net.minecraft.network.PacketCallbacks;
import net.minecraft.network.handler.NetworkStateTransitions;
import net.minecraft.network.handler.PacketSizeLogger;
import net.minecraft.network.handler.PacketEncoderException;
import net.minecraft.util.math.MathHelper;
import net.minecraft.util.profiler.MultiValueDebugSampleLogImpl;
import poc.networking.NetBridge;

import java.lang.reflect.Method;

import java.util.Objects;
import java.util.Optional;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.function.Consumer;

/**
 * Minecraft ClientConnection replacement that uses NetBridge instead of Netty.
 *
 * Send path:
 *   Packet → FriendlyByteBuf (VarInt(packetId) + packet.write(buf))
 *   → extract raw bytes → NetBridge.writePacket(packetId, payload)
 *   → NetBridge frames as VarInt(totalLen) + VarInt(packetId) + payload → JS
 *
 * Receive path:
 *   JS → NetBridge.onReceive(bytes) → parse frames → decode via registry →
 *   Packet.apply(listener) dispatched inside NetBridge.
 *
 * channelRead0 remains for Netty handler compatibility but actual inbound
 * packets are dispatched by NetBridge.dispatchFrame().
 */
public class MinecraftClientConnection {
    private static final float CURRENT_PACKET_COUNTER_WEIGHT = 0.2F;

    // Netty handler fields retained for method-signature compatibility
    private static final Object CLIENT_IO_GROUP = null;
    private static final Object EPOLL_CLIENT_IO_GROUP = null;
    private static final Object LOCAL_CLIENT_IO_GROUP = null;

    private static final Runnable EMPTY_RUNNABLE = () -> { };

    // Instance fields
    private final NetworkSide side;
    private volatile boolean duringLogin;
    private final Queue<Consumer<MinecraftClientConnection>> queuedTasks;
    private volatile PacketListener prePlayStateListener;
    private volatile PacketListener packetListener;
    private volatile DisconnectionInfo disconnectionInfo;
    private boolean encrypted;
    private boolean disconnected;
    private int packetsReceivedCounter;
    private int packetsSentCounter;
    private float averagePacketsReceived;
    private float averagePacketsSent;
    private int ticks;
    private boolean errored;
    private volatile DisconnectionInfo pendingDisconnectionInfo;
    private PacketSizeLogger packetSizeLogger;

    public MinecraftClientConnection(NetworkSide side) {
        this.side = side;
        this.duringLogin = true;
        this.queuedTasks = new ConcurrentLinkedQueue<>();
        this.packetSizeLogger = new PacketSizeLogger(new MultiValueDebugSampleLogImpl(240));
    }

    // --- Netty handler stubs (compatibility) ----------------------------------

    public void channelActive(io.netty.channel.ChannelHandlerContext ctx) throws Exception {
        // NetBridge attach is driven by JS; nothing to do here.
    }

    public void channelInactive(io.netty.channel.ChannelHandlerContext ctx) {
        disconnect(new DisconnectionInfo(Text.translatable("disconnect.endOfStream")));
    }

    public void exceptionCaught(io.netty.channel.ChannelHandlerContext ctx, Throwable cause) {
        if (cause instanceof PacketEncoderException) {
            // Skip packet due to encoder errors — no-op
        } else {
            disconnect(new DisconnectionInfo(
                Text.translatable("multiplayer.disconnect.generic_reason", cause.toString())));
        }
    }

    /**
     * Netty inbound handler entry.  In the NetBridge architecture, inbound
     * packets are decoded and dispatched by NetBridge.dispatchFrame(), so this
     * path is normally bypassed.  It is retained for handler-pipeline
     * compatibility (e.g. ASM-patched call sites that still invoke it).
     */
    protected void channelRead0(io.netty.channel.ChannelHandlerContext ctx, Packet<?> msg) {
        if (!NetBridge.isOpen()) {
            return;
        }

        if (packetListener == null) {
            throw new IllegalStateException(
                "Received a packet before the packet listener was initialized");
        }

        if (!packetListener.accepts(msg)) {
            disconnect(new DisconnectionInfo(
                Text.translatable(
                    "multiplayer.disconnect.invalid_packet", msg.getClass().getSimpleName())));
            return;
        }

        handlePacket(msg, packetListener);

        packetsReceivedCounter++;
        averagePacketsReceived = MathHelper.lerp(0.75F, averagePacketsReceived, 1.0F);
    }

    // --- Send path (delegates to NetBridge) -----------------------------------

    public void send(Packet<?> packet) {
        send(packet, PacketCallbacks.always(EMPTY_RUNNABLE));
    }

    public void send(Packet<?> packet, PacketCallbacks callbacks) {
        send(packet, callbacks, true);
    }

    public void send(Packet<?> packet, PacketCallbacks callbacks, boolean syncImmediately) {
        if (!NetBridge.isOpen()) {
            queuedTasks.add(ctx -> sendInternal(packet, callbacks, syncImmediately));
            return;
        }
        sendInternal(packet, callbacks, syncImmediately);
    }

    public void submit(Consumer<MinecraftClientConnection> task) {
        if (!NetBridge.isOpen()) {
            queuedTasks.add(task);
            return;
        }
        handleQueuedTasks();
        task.accept(this);
    }

    public void flush() {
        if (!NetBridge.isOpen()) {
            return;
        }
        // NetBridge writes are synchronous; flush is a no-op.
    }

    // --- Internal helpers -----------------------------------------------------

    private void handleQueuedTasks() {
        if (!NetBridge.isOpen() || queuedTasks.isEmpty()) {
            return;
        }
        synchronized (queuedTasks) {
            while (!queuedTasks.isEmpty()) {
                Consumer<MinecraftClientConnection> task = queuedTasks.poll();
                if (task != null) {
                    task.accept(this);
                }
            }
        }
    }

    private void handlePacket(Packet<?> packet, PacketListener listener) {
        if (listener != null && packet != null) {
            try {
                java.lang.reflect.Method apply = packet.getClass().getMethod("apply", PacketListener.class);
                apply.invoke(packet, listener);
            } catch (Exception e) {
                System.err.println("[MCC] dispatch failed: " + e);
            }
        }
    }

    /**
     * Serialize packet using FriendlyByteBuf and send via NetBridge.
     *
     * Wire format produced:
     *   [VarInt(packetId)][packet.write(buf) bytes]
     *
     * NetBridge.writePacket then frames this as:
     *   [VarInt(totalLen)][VarInt(packetId)][payload]
     */
    private void sendInternal(Packet<?> packet, PacketCallbacks callbacks, boolean syncImmediately) {
        if (!NetBridge.isOpen()) {
            return;
        }

        handleQueuedTasks();

        packetsSentCounter++;
        averagePacketsSent = MathHelper.lerp(0.75F, averagePacketsSent, 1.0F);

        try {
            int packetId = getPacketId(packet);
            if (packetId == 0) {
                disconnect(new DisconnectionInfo(
                    Text.translatable("multiplayer.disconnect.generic_reason",
                        "Failed to resolve packet ID for " + packet.getClass().getName())));
                return;
            }

            // Serialize ONLY the packet data (no packetId prefix).
            // NetBridge.writePacket will frame the full wire format:
            //   VarInt(totalLength) + VarInt(packetId) + payload
            byte[] payload = serializePacketData(packet);

            NetBridge.writePacket(packetId, payload);

            // Callbacks are fire-and-forget in this async-over-WebRTC model.
            // A production impl would ack from the remote side and then invoke
            // callbacks.run(); omitted here for simplicity.
        } catch (Exception e) {
            disconnect(new DisconnectionInfo(
                Text.translatable("multiplayer.disconnect.generic_reason",
                    "Serialization error: " + e)));
        }

        if (syncImmediately) {
            // Already synchronous via JsNetBridge.sendBytes.
        }
    }

    /**
     * Allocate a FriendlyByteBuf backed by a fresh Netty ByteBuf.
     */
    private static Object newFriendlyByteBuf(int initialCapacity) throws Exception {
        Class<?> friendlyByteBufClass = Class.forName("net.minecraft.network.FriendlyByteBuf");
        Class<?> byteBufClass = Class.forName("io.netty.buffer.ByteBuf");
        Class<?> allocatorClass = Class.forName("io.netty.buffer.ByteBufAllocator");

        Object allocator = allocatorClass.getMethod("ioAllocator").invoke(null);
        Object byteBuf = allocatorClass.getMethod("buffer").invoke(allocator, initialCapacity);
        return friendlyByteBufClass.getConstructor(byteBufClass).newInstance(byteBuf);
    }

    /**
     * Extract the raw byte[] from a FriendlyByteBuf (releases the backing buffer).
     */
    private static byte[] toByteArray(Object buf) throws Exception {
        Class<?> friendlyByteBufClass = buf.getClass();
        Class<?> byteBufClass = Class.forName("io.netty.buffer.ByteBuf");

        Object byteBuf = getUnderlyingByteBuf(friendlyByteBufClass, buf);
        int readable = (int) byteBufClass.getMethod("readableBytes").invoke(byteBuf);

        Object sliced = byteBufClass.getMethod("readSlice", int.class).invoke(byteBuf, readable);
        byte[] out = new byte[readable];
        java.lang.reflect.Method getBytes = byteBufClass.getMethod("getBytes",
                int.class, byte[].class, int.class, int.class);
        getBytes.invoke(sliced, 0, out, 0, readable);

        java.lang.reflect.Method release = byteBufClass.getMethod("release");
        release.invoke(sliced);
        return out;
    }

    /**
     * Serialize ONLY the packet body (no packetId prefix) into a byte[].
     * NetBridge.writePacket will prepend VarInt(packetId) + outer VarInt(totalLength).
     */
    private static byte[] serializePacketData(Packet<?> packet) throws Exception {
        Class<?> friendlyByteBufClass = Class.forName("net.minecraft.network.FriendlyByteBuf");
        Object buf = newFriendlyByteBuf(64);

        // Delegate to packet.write(buf) — the packet writes its own fields.
        java.lang.reflect.Method write = packet.getClass().getMethod("write", friendlyByteBufClass);
        write.invoke(packet, buf);

        return toByteArray(buf);
    }

    /**
     * Get the underlying Netty ByteBuf from a FriendlyByteBuf instance.
     * Tries to find any non-static field of type io.netty.buffer.ByteBuf.
     */
    private static Object getUnderlyingByteBuf(Class<?> friendlyByteBufClass, Object buf) throws Exception {
        // First, try to find any non-static field of type ByteBuf
        for (java.lang.reflect.Field field : friendlyByteBufClass.getDeclaredFields()) {
            if (java.lang.reflect.Modifier.isStatic(field.getModifiers())) {
                continue;
            }
            Class<?> type = field.getType();
            if ("io.netty.buffer.ByteBuf".equals(type.getName())) {
                field.setAccessible(true);
                return field.get(buf);
            }
        }
        // Fallback to hardcoded field names (different MC builds)
        String[] fieldNames = {"f_83293_", "f_129018_", "field_83293_", "field_129018_"};
        for (String name : fieldNames) {
            try {
                java.lang.reflect.Field f = friendlyByteBufClass.getDeclaredField(name);
                f.setAccessible(true);
                return f.get(buf);
            } catch (NoSuchFieldException ignored) { }
        }
        throw new NoSuchFieldException(
            "FriendlyByteBuf underlying ByteBuf field not found (tried reflection and names: " + String.join(", ", fieldNames) + ")");
    }

    /**
     * Resolve the MC packet ID for the given packet class.  Tries direct
     * {@code packet.getId()} first, then falls back to NetworkState registry
     * reflection when the packet itself does not expose the ID directly.
     */
    private static int getPacketId(Packet<?> packet) {
        // 1) Direct packet.getId() — preferred, works across MC versions
        //    that expose getId() on the Packet interface.
        try {
            Method getId = packet.getClass().getMethod("getId");
            Object idObj = getId.invoke(packet);
            if (idObj instanceof Integer) {
                int id = (Integer) idObj;
                if (id != 0) {
                    return id;
                }
            }
        } catch (NoSuchMethodException ignored) { }
        catch (Exception e) {
            System.err.println("[MCC] packet.getId() failed: " + e);
        }

        // 2) Registry-based lookup via NetworkState (needed for some MC versions).
        Object state = NetBridge.getNetworkStateForReflection();
        if (state == null) {
            return 0;
        }

        try {
            Object registry = NetBridge.getRegistryForReflection(state);
            if (registry == null) {
                return 0;
            }

            Class<?> packetClass = packet.getClass();
            Class<?> registryClass = registry.getClass();

            // 2a) registry.byId(Class<? extends Packet>)
            try {
                Method m = registryClass.getMethod("byId", Class.class);
                Object idObj = m.invoke(registry, packetClass);
                if (idObj instanceof Integer) {
                    return (Integer) idObj;
                }
            } catch (NoSuchMethodException ignored) { }

            // 2b) registry.method_156991(Class) — newer MC registry method
            try {
                Method m = registryClass.getMethod("method_156991", Class.class);
                Object idObj = m.invoke(registry, packetClass);
                if (idObj instanceof Integer) {
                    return (Integer) idObj;
                }
            } catch (NoSuchMethodException ignored) { }

            // 2c) Iterate registry entries to find matching packet class
            try {
                Method entries = registryClass.getMethod("method_156990");
                Object entrySet = entries.invoke(registry);
                for (Object entry : (Iterable<?>) entrySet) {
                    Object entryObj = entry;
                    Method getKey = entryObj.getClass().getMethod("getKey");
                    Method getValue = entryObj.getClass().getMethod("getValue");
                    int id = (int) getKey.invoke(entryObj);
                    Object registeredPacket = getValue.invoke(entryObj);
                    if (packetClass.equals(registeredPacket.getClass())) {
                        return id;
                    }
                }
            } catch (NoSuchMethodException ignored) { }

        } catch (Exception e) {
            System.err.println("[MCC] Failed to resolve packetId for " + packet.getClass().getName() + ": " + e);
        }
        return 0;
    }

    // --- Receive path (entry point from NetBridge.onReceive) ------------------

    /**
     * Receive a raw MC frame (VarInt(packetId) + payload) from NetBridge,
     * decode it via the current registry, and dispatch to {@link #packetListener}.
     *
     * <p>NetBridge.onReceive() parses the outer frame (VarInt(totalLen) + frame bytes)
     * and then hands each inner frame here.  This method owns the decode-and-dispatch
     * logic so it can use the instance {@link #packetListener} and update receive stats.
     */
    public void onPacket(byte[] frame) {
        PacketListener currentListener = this.packetListener;
        if (currentListener == null) {
            System.out.println("[MCC] No packet listener registered, dropping frame");
            return;
        }

        if (frame == null || frame.length == 0) {
            System.out.println("[MCC] Empty frame, dropping");
            return;
        }

        try {
            int[] idInfo = NetBridge.readVarIntInfo(frame, 0);
            int packetId = idInfo[0];
            int bodyOffset = idInfo[1];

            byte[] packetBody = java.util.Arrays.copyOfRange(frame, bodyOffset, frame.length);

            Object packet = NetBridge.lookupPacketFromRegistry(packetId, packetBody);
            if (packet == null) {
                System.err.printf("[MCC] Unknown packetId=%d or failed decode, dropping%n", packetId);
                return;
            }

            @SuppressWarnings("unchecked")
            Packet<?> typedPacket = (Packet<?>) packet;
            if (!currentListener.accepts(typedPacket)) {
                disconnect(new DisconnectionInfo(
                    Text.translatable(
                        "multiplayer.disconnect.invalid_packet",
                        packet.getClass().getSimpleName())));
                return;
            }

            handlePacket(typedPacket, currentListener);

            packetsReceivedCounter++;
            averagePacketsReceived = MathHelper.lerp(0.75F, averagePacketsReceived, 1.0F);

            System.out.printf("[MCC] Dispatched packetId=%d via %s.apply(%s)%n",
                    packetId, packet.getClass().getSimpleName(),
                    currentListener.getClass().getSimpleName());

        } catch (Exception e) {
            System.err.println("[MCC] Packet dispatch failed: " + e);
        }
    }

    // --- Connection lifecycle -------------------------------------------------

    public void connect(String hostname, int port, ClientQueryPacketListener listener) {
        this.packetListener = listener;
        this.duringLogin = false;
        NetBridge.attach();
        NetBridge.setPacketListener(listener);
        NetBridge.setConnection(this);
    }

    public void connect(String hostname, int port, ClientLoginPacketListener listener) {
        this.packetListener = listener;
        this.duringLogin = true;
        NetBridge.attach();
        NetBridge.setPacketListener(listener);
        NetBridge.setNetworkState(getClientLoginNetworkState(listener));
        NetBridge.setConnection(this);
    }

    public <S extends ServerPacketListener, C extends ClientPacketListener>
    void connect(String hostname, int port, NetworkState<S> serverState,
                 NetworkState<C> clientState, C listener, boolean isServer) {
        this.packetListener = listener;
        this.duringLogin = true;
        NetBridge.attach();
        NetBridge.setPacketListener(listener);
        NetBridge.setNetworkState(clientState);
        NetBridge.setConnection(this);
    }

    /**
     * Transition from login listener to play listener on state change.
     */
    public void setPlayState(ServerPacketListener playListener, Object clientPlayNetworkState) {
        this.packetListener = playListener;
        this.duringLogin = false;
        NetBridge.setPacketListener(playListener);
        NetBridge.setNetworkState(clientPlayNetworkState);
    }

    public void disconnect(DisconnectionInfo info) {
        if (disconnected) {
            return;
        }
        disconnected = true;
        this.disconnectionInfo = info;
        NetBridge.clearConnection();
        NetBridge.close();

        if (packetListener != null) {
            packetListener.onDisconnected(info);
        }
    }

    public void disconnect(Text reason) {
        disconnect(new DisconnectionInfo(reason));
    }

    public boolean isLocal() {
        return false;
    }

    public NetworkSide getSide() {
        return side;
    }

    public NetworkSide getOppositeSide() {
        return side == NetworkSide.field_11942
               ? NetworkSide.field_11941
               : NetworkSide.field_11942;
    }

    public java.net.SocketAddress getAddress() {
        return null;
    }

    public String getAddressAsString(boolean resolve) {
        return "WebRTC";
    }

    public boolean isOpen() {
        return NetBridge.isOpen() && !disconnected;
    }

    public void tick() {
        handleQueuedTasks();

        if (packetListener instanceof TickablePacketListener) {
            ((TickablePacketListener) packetListener).tick();
        }

        if (!isOpen() || disconnected) {
            return;
        }

        ticks++;

        if (ticks % 20 == 0) {
            updateStats();
        }

        if (packetSizeLogger != null) {
            packetSizeLogger.push();
        }
    }

    protected void updateStats() {
        // Stats are updated inline in sendInternal and channelRead0.
    }

    // --- Accessors ------------------------------------------------------------

    public DisconnectionInfo getDisconnectionInfo() {
        return disconnectionInfo;
    }

    public int getPacketsReceivedCounter() {
        return packetsReceivedCounter;
    }

    public int getPacketsSentCounter() {
        return packetsSentCounter;
    }

    public float getAveragePacketsReceived() {
        return averagePacketsReceived;
    }

    public float getAveragePacketsSent() {
        return averagePacketsSent;
    }

    public int getTicks() {
        return ticks;
    }

    public boolean isErrored() {
        return errored;
    }

    public void setErrored(boolean errored) {
        this.errored = errored;
    }

    public PacketSizeLogger getPacketSizeLogger() {
        return packetSizeLogger;
    }

    // --- Helpers --------------------------------------------------------------

    /**
     * Introspect the login listener for its NetworkState instance.
     */
    private static Object getClientLoginNetworkState(ClientLoginPacketListener listener) {
        try {
            java.lang.reflect.Method m = listener.getClass().getMethod("getState");
            m.setAccessible(true);
            return m.invoke(listener);
        } catch (Exception ignored) { }
        try {
            java.lang.reflect.Field f = listener.getClass().getDeclaredField("networkState");
            f.setAccessible(true);
            return f.get(listener);
        } catch (Exception ignored) { }
        return null;
    }
}
