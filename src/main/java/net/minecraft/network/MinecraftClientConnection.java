package net.minecraft.network;

import poc.networking.NetBridge;

import java.lang.reflect.Method;
import java.util.Objects;
import java.util.Optional;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.function.Consumer;

/**
 * Minecraft ClientConnection replacement that uses NetBridge instead of Netty.
 */
public class MinecraftClientConnection {
    private static final float CURRENT_PACKET_COUNTER_WEIGHT = 0.2F;

    private static final Object CLIENT_IO_GROUP = null;
    private static final Object EPOLL_CLIENT_IO_GROUP = null;
    private static final Object LOCAL_CLIENT_IO_GROUP = null;

    private static final Runnable EMPTY_RUNNABLE = () -> { };

    private static volatile Class<?> handshakePacketClass;
    private static volatile Class<?> connectionIntentClass;

    private static void initHandshakeClasses() {
        if (handshakePacketClass != null || connectionIntentClass != null) return;
        try {
            handshakePacketClass = Class.forName("net.minecraft.network.protocol.handshake.ClientIntentionPacket");
        } catch (Exception e) {
            System.err.println("[MCC] ClientIntentionPacket not found: " + e.getMessage());
        }
        try {
            connectionIntentClass = Class.forName("net.minecraft.network.protocol.handshake.ClientIntent");
        } catch (Exception e) {
            System.err.println("[MCC] ClientIntent not found: " + e.getMessage());
        }
    }

    private final Object side;
    private volatile boolean duringLogin;
    private final Queue<Consumer<MinecraftClientConnection>> queuedTasks;
    private volatile Object prePlayStateListener;
    private volatile Object packetListener;
    private volatile Object disconnectionInfo;
    private boolean encrypted;
    private boolean disconnected;
    private int packetsReceivedCounter;
    private int packetsSentCounter;
    private float averagePacketsReceived;
    private float averagePacketsSent;
    private int ticks;
    private boolean errored;
    private volatile Object pendingDisconnectionInfo;
    private Object packetSizeLogger;

    public MinecraftClientConnection(Object side) {
        this.side = side;
        this.duringLogin = true;
        this.queuedTasks = new ConcurrentLinkedQueue<>();
    }

    public void channelActive(Object ctx) throws Exception { }
    public void channelInactive(Object ctx) { }
    public void exceptionCaught(Object ctx, Throwable cause) { }

    protected void channelRead0(Object ctx, Object msg) {
        if (!NetBridge.isOpen()) return;
        if (packetListener == null) {
            throw new IllegalStateException("Received a packet before the packet listener was initialized");
        }
    }

    public void send(Object packet) {
        send(packet, null);
    }
    public void send(Object packet, Object callbacks) {
        send(packet, callbacks, true);
    }
    public void send(Object packet, Object callbacks, boolean syncImmediately) {
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
        if (!NetBridge.isOpen()) return;
    }

    private void handleQueuedTasks() {
        if (!NetBridge.isOpen() || queuedTasks.isEmpty()) return;
        synchronized (queuedTasks) {
            while (!queuedTasks.isEmpty()) {
                Consumer<MinecraftClientConnection> task = queuedTasks.poll();
                if (task != null) task.accept(this);
            }
        }
    }

    private void handlePacket(Object packet, Object listener) {
        if (listener != null && packet != null) {
            try {
                Method apply = packet.getClass().getMethod("apply", listener.getClass());
                apply.invoke(packet, listener);
            } catch (Exception e) {
                System.err.println("[MCC] dispatch failed: " + e);
            }
        }
    }

    private void sendInternal(Object packet, Object callbacks, boolean syncImmediately) {
        if (!NetBridge.isOpen()) return;
        handleQueuedTasks();
        packetsSentCounter++;
        averagePacketsSent = 0.75F * averagePacketsSent + 0.25F;

        try {
            int packetId = getPacketId(packet);
            if (packetId == 0) {
                System.err.println("[MCC] Failed to resolve packet ID");
                return;
            }
            byte[] payload = serializePacketData(packet);
            NetBridge.writePacket(packetId, payload);
        } catch (Exception e) {
            System.err.println("[MCC] Serialization error: " + e);
        }
    }

    private static Object newFriendlyByteBuf(int initialCapacity) throws Exception {
        Class<?> friendlyByteBufClass = Class.forName("net.minecraft.network.FriendlyByteBuf");
        Class<?> byteBufClass = Class.forName("io.netty.buffer.ByteBuf");
        Class<?> allocatorClass = Class.forName("io.netty.buffer.ByteBufAllocator");
        Object allocator = allocatorClass.getMethod("ioAllocator").invoke(null);
        Object byteBuf = allocatorClass.getMethod("buffer").invoke(allocator, initialCapacity);
        return friendlyByteBufClass.getConstructor(byteBufClass).newInstance(byteBuf);
    }

    private static byte[] toByteArray(Object buf) throws Exception {
        Class<?> friendlyByteBufClass = buf.getClass();
        Class<?> byteBufClass = Class.forName("io.netty.buffer.ByteBuf");
        Object byteBuf = getUnderlyingByteBuf(friendlyByteBufClass, buf);
        int readable = (int) byteBufClass.getMethod("readableBytes").invoke(byteBuf);
        Object sliced = byteBufClass.getMethod("readSlice", int.class).invoke(byteBuf, readable);
        byte[] out = new byte[readable];
        Method getBytes = byteBufClass.getMethod("getBytes", int.class, byte[].class, int.class, int.class);
        getBytes.invoke(sliced, 0, out, 0, readable);
        Method release = byteBufClass.getMethod("release");
        release.invoke(sliced);
        return out;
    }

    private static byte[] serializePacketData(Object packet) throws Exception {
        Class<?> friendlyByteBufClass = Class.forName("net.minecraft.network.FriendlyByteBuf");
        Object buf = newFriendlyByteBuf(64);
        Method write = packet.getClass().getMethod("write", friendlyByteBufClass);
        write.invoke(packet, buf);
        return toByteArray(buf);
    }

    private static Object getUnderlyingByteBuf(Class<?> friendlyByteBufClass, Object buf) throws Exception {
        for (java.lang.reflect.Field field : friendlyByteBufClass.getDeclaredFields()) {
            if (java.lang.reflect.Modifier.isStatic(field.getModifiers())) continue;
            Class<?> type = field.getType();
            if ("io.netty.buffer.ByteBuf".equals(type.getName())) {
                field.setAccessible(true);
                return field.get(buf);
            }
        }
        String[] fieldNames = {"f_83293_", "f_129018_", "field_83293_", "field_129018_"};
        for (String name : fieldNames) {
            try {
                java.lang.reflect.Field f = friendlyByteBufClass.getDeclaredField(name);
                f.setAccessible(true);
                return f.get(buf);
            } catch (NoSuchFieldException ignored) { }
        }
        throw new NoSuchFieldException("FriendlyByteBuf underlying ByteBuf field not found");
    }

    private static int getPacketId(Object packet) {
        try {
            Method getId = packet.getClass().getMethod("getId");
            Object idObj = getId.invoke(packet);
            if (idObj instanceof Integer) {
                int id = (Integer) idObj;
                if (id != 0) return id;
            }
        } catch (NoSuchMethodException ignored) { }
        catch (Exception e) {
            System.err.println("[MCC] packet.getId() failed: " + e);
        }
        return 0;
    }

    public void onPacket(byte[] frame) {
        Object currentListener = this.packetListener;
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
            if (currentListener != null) {
                handlePacket(packet, currentListener);
            }
            packetsReceivedCounter++;
            averagePacketsReceived = 0.75F * averagePacketsReceived + 0.25F;
            System.out.printf("[MCC] Dispatched packetId=%d%n", packetId);
        } catch (Exception e) {
            System.err.println("[MCC] Packet dispatch failed: " + e);
        }
    }

    public void connect(String hostname, int port, Object listener) {
        this.packetListener = listener;
        this.duringLogin = false;
        NetBridge.attach();
        NetBridge.setPacketListener(listener);
        NetBridge.setConnection(this);
    }

    public void connect(String hostname, int port, Object listener, Object networkState) {
        this.packetListener = listener;
        this.duringLogin = true;
        NetBridge.attach();
        NetBridge.setPacketListener(listener);
        NetBridge.setNetworkState(networkState);
        NetBridge.setConnection(this);
    }

    public void initiateHandshake(String hostname, int port) {
        initHandshakeClasses();
        if (handshakePacketClass == null || connectionIntentClass == null) {
            System.err.println("[MCC] Handshake classes not available");
            return;
        }
        try {
            java.lang.reflect.Constructor<?> c =
                handshakePacketClass.getConstructor(int.class, String.class, int.class, connectionIntentClass);
            java.lang.reflect.Field loginField = null;
            for (java.lang.reflect.Field f : connectionIntentClass.getFields()) {
                if ("LOGIN".equals(f.getName())) {
                    loginField = f;
                    break;
                }
            }
            if (loginField == null) {
                loginField = connectionIntentClass.getField("field_44975");
            }
            Object packet = c.newInstance(767, hostname, port, loginField.get(null));
            send(packet);
            System.out.printf("[MCC] Initiated handshake to %s:%d%n", hostname, port);
        } catch (Exception e) {
            System.err.println("[MCC] Failed to initiate handshake: " + e);
        }
    }

    public void setPlayState(Object playListener, Object clientPlayNetworkState) {
        this.packetListener = playListener;
        this.duringLogin = false;
        NetBridge.setPacketListener(playListener);
        NetBridge.setNetworkState(clientPlayNetworkState);
    }

    public void disconnect(Object info) {
        if (disconnected) return;
        disconnected = true;
        this.disconnectionInfo = info;
        NetBridge.clearConnection();
        NetBridge.close();
        if (packetListener != null) {
            try {
                Method onDisconnected = packetListener.getClass().getMethod("onDisconnected", Object.class);
                onDisconnected.invoke(packetListener, info);
            } catch (Exception ignored) { }
        }
    }

    public void disconnect(String reason) {
        disconnect(reason);
    }

    public boolean isLocal() { return false; }
    public Object getSide() { return side; }
    public Object getOppositeSide() { return side; }

    public Object getAddress() { return null; }
    public String getAddressAsString(boolean resolve) { return "WebRTC"; }
    public boolean isOpen() { return NetBridge.isOpen() && !disconnected; }

    public void tick() {
        handleQueuedTasks();
        if (!isOpen() || disconnected) return;
        ticks++;
        if (ticks % 20 == 0) { }
    }

    public Object getDisconnectionInfo() { return disconnectionInfo; }
    public int getPacketsReceivedCounter() { return packetsReceivedCounter; }
    public int getPacketsSentCounter() { return packetsSentCounter; }
    public float getAveragePacketsReceived() { return averagePacketsReceived; }
    public float getAveragePacketsSent() { return averagePacketsSent; }
    public int getTicks() { return ticks; }
    public boolean isErrored() { return errored; }
    public void setErrored(boolean errored) { this.errored = errored; }
    public Object getPacketSizeLogger() { return packetSizeLogger; }
}