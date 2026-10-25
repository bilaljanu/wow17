package poc.networking;

import net.minecraft.client.MinecraftClient;
import net.minecraft.network.MinecraftClientConnection;
import net.minecraft.network.NetworkSide;
import net.minecraft.network.listener.ClientLoginPacketListener;
import net.minecraft.network.NetworkState;
import net.minecraft.server.integrated.IntegratedServer;
import net.minecraft.server.integrated.IntegratedServerLoader;
import net.minecraft.world.level.storage.LevelStorage;
import net.minecraft.world.level.LevelInfo;
import net.minecraft.world.gen.GeneratorOptions;
import net.minecraft.registry.DynamicRegistryManager;
import net.minecraft.world.dimension.DimensionOptionsRegistryHolder;

import java.util.function.Function;

/**
 * Local/in-process NetBridge for singleplayer mode.
 *
 * This bypasses WebRTC entirely and connects the client directly to an
 * IntegratedServer instance running in the same JVM. Packets are passed
 * directly between client and server without serialization overhead.
 */
public final class LocalNetBridge {

    private static volatile boolean open;
    private static volatile MinecraftClientConnection clientConnection;
    private static volatile IntegratedServer integratedServer;
    private static volatile MinecraftClient minecraftClient;

    // Packet listener sink
    private static volatile Object listener;
    private static volatile Object networkState;

    public static void setMinecraftClient(MinecraftClient client) {
        minecraftClient = client;
    }

    public static void setConnection(MinecraftClientConnection connection) {
        clientConnection = connection;
    }

    public static void clearConnection() {
        clientConnection = null;
    }

    public static void attach() {
        open = true;
        // For local mode, we don't need to call JsNetBridge.onAttach()
        // because there's no WebRTC DataChannel to initialize.
    }

    /**
     * Start the integrated server and connect the client locally.
     * This is the singleplayer equivalent of joinServer().
     */
    public static void startLocalServer(String worldName, LevelInfo levelInfo, GeneratorOptions generatorOptions,
                                         Function<DynamicRegistryManager, DimensionOptionsRegistryHolder> dimensionRegistry) {
        if (minecraftClient == null) {
            throw new IllegalStateException("MinecraftClient not set. Call setMinecraftClient() first.");
        }

        System.out.println("[LocalNetBridge] Starting integrated server for world: " + worldName);

        // Get the level storage from the client
        LevelStorage levelStorage = minecraftClient.getLevelStorage();
        if (levelStorage == null) {
            throw new IllegalStateException("LevelStorage not available from MinecraftClient");
        }

        // Create the integrated server loader
        IntegratedServerLoader loader = new IntegratedServerLoader(minecraftClient, levelStorage);

        // Start the server asynchronously
        loader.createAndStart(
            worldName,
            levelInfo,
            generatorOptions,
            dimensionRegistry,
            null // screen - we don't need a loading screen in headless mode
        );

        // The server will be set on the client via MinecraftClient.startIntegratedServer()
        // We can poll for it or use a callback approach
        waitForServerStartup();
    }

    /**
     * Poll until the integrated server is started and assigned to the client.
     */
    private static void waitForServerStartup() {
        int attempts = 0;
        while (attempts < 100) { // 10 seconds max
            try {
                Thread.sleep(100);
            } catch (InterruptedException ignored) {
                Thread.currentThread().interrupt();
                break;
            }
            attempts++;
            if (minecraftClient != null) {
                IntegratedServer server = getIntegratedServer(minecraftClient);
                if (server != null) {
                    integratedServer = server;
                    System.out.println("[LocalNetBridge] Integrated server started: " + server);
                    return;
                }
            }
        }
        throw new IllegalStateException("Integrated server failed to start within timeout");
    }

    /**
     * Get the integrated server from MinecraftClient using reflection.
     */
    private static IntegratedServer getIntegratedServer(MinecraftClient client) {
        try {
            java.lang.reflect.Field f = MinecraftClient.class.getDeclaredField("server");
            f.setAccessible(true);
            return (IntegratedServer) f.get(client);
        } catch (Exception e) {
            System.err.println("[LocalNetBridge] Failed to get integrated server: " + e);
            return null;
        }
    }

    /**
     * Send a packet from client to integrated server (in-process).
     * This bypasses WebRTC and directly injects the packet into the server's network handler.
     */
    public static void writePacket(int packetId, byte[] payload) {
        if (!open) {
            System.out.println("[LocalNetBridge] Channel not open, packet dropped");
            return;
        }

        if (integratedServer == null) {
            System.out.println("[LocalNetBridge] Integrated server not available, packet dropped");
            return;
        }

        System.out.printf("[LocalNetBridge] Client -> Server packet id=%d, len=%d%n", packetId, payload.length);

        // In a full implementation, we'd decode the payload and call the server's
        // packet handler directly. For now, we simulate by putting it in the
        // client connection's receive path.
        if (clientConnection != null) {
            // Create a frame with VarInt(packetId) + payload
            byte[] frame = new byte[calculateVarIntLength(packetId) + payload.length];
            int pos = writeVarInt(frame, 0, packetId);
            System.arraycopy(payload, 0, frame, pos, payload.length);
            clientConnection.onPacket(frame);
        }
    }

    /**
     * Receive a packet from integrated server to client (in-process).
     * Called by the server when it sends packets to the client.
     */
    public static void receiveFromServer(byte[] frame) {
        if (!open) {
            return;
        }

        if (clientConnection != null) {
            System.out.printf("[LocalNetBridge] Server -> Client frame len=%d%n", frame.length);
            clientConnection.onPacket(frame);
        }
    }

    public static void close() {
        open = false;
        if (integratedServer != null) {
            integratedServer.stop(false);
            integratedServer = null;
        }
    }

    public static boolean isOpen() {
        return open;
    }

    public static void setPacketListener(Object listener) {
        LocalNetBridge.listener = listener;
    }

    public static void setNetworkState(Object state) {
        LocalNetBridge.networkState = state;
    }

    public static Object getNetworkStateForReflection() {
        return networkState;
    }

    public static Object getRegistryForReflection(Object state) {
        return NetBridge.getRegistryForReflection(state);
    }

    public static Object lookupPacketFromRegistry(int packetId, byte[] bodyBytes) {
        return NetBridge.lookupPacketFromRegistry(packetId, bodyBytes);
    }

    // --- VarInt utilities (same as NetBridge) ---

    public static int[] readVarIntInfo(byte[] buf, int offset) {
        return NetBridge.readVarIntInfo(buf, offset);
    }

    public static int calculateVarIntLength(int value) {
        return NetBridge.calculateVarIntLength(value);
    }

    public static int writeVarInt(byte[] buf, int offset, int value) {
        return NetBridge.writeVarInt(buf, offset, value);
    }
}