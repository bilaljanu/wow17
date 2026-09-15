package poc;

import poc.networking.NetBridge;
import poc.networking.JsNetBridge;
import poc.networking.LocalNetBridge;
import poc.rendering.RenderLoop;
import net.minecraft.client.MinecraftClient;
import net.minecraft.network.MinecraftClientConnection;
import org.teavm.jso.typedarrays.Uint8Array;

/**
 * Browser bootstrap entry point.
 *
 * This intentionally does NOT call the desktop Minecraft launcher; the desktop
 * entrypoint references jvm-only APIs (jopt-simple, Guava, Proxy, etc.) that
 * TeaVM cannot resolve, which prevents JS output from being emitted.
 *
 * For the browser demo we only need the WebRTC/Netty-bypass bridge to be
 * initialized, so this class wires up the connection and stops there.
 */
public final class ClientMain {

    // Keepalive references to prevent TeaVM DCE of @JSBody/@JSExport methods
    // Without these, methods like JsNetBridge.joinServer() get DCE'd and don't appear in classes.js
    @SuppressWarnings("unused")
    private static final Class<?> KEEPALIVE_JSNETBRIDGE = JsNetBridge.class;
    @SuppressWarnings("unused")
    private static final Class<?> KEEPALIVE_NETBRIDGE = NetBridge.class;

    public static void main(String[] args) throws Exception {
        // First diagnostic: confirm main() is invoked
        JsNetBridge.diagnosticLog();

        MinecraftClientConnection connection = new MinecraftClientConnection(null);
        NetBridge.attach();
        NetBridge.setConnection(connection);

        // Export NetBridge packet methods to window for JS interop
        // These must be called explicitly to prevent TeaVM DCE from removing them
        JsNetBridge.exportWritePacket();
        JsNetBridge.exportOnReceive();

        // Keep onReceiveFrame alive by calling it from Java
        // This prevents TeaVM DCE from removing the method body
        try {
            JsNetBridge.onReceiveFrame(new Uint8Array(0));
        } catch (Exception e) {
            System.out.println("[ClientMain] onReceiveFrame called (DCE prevention only): " + e.getMessage());
        }

        // Explicitly call writePacket to prevent TeaVM DCE of the packet send path
        // This ensures pn_NetBridge_writePacket survives dead-code elimination
        try {
            NetBridge.writePacket(0, new byte[0]);
        } catch (Exception e) {
            System.out.println("[ClientMain] writePacket called (DCE prevention only): " + e.getMessage());
        }

        // Explicitly call joinServer via JsNetBridge to prevent TeaVM DCE
        // This ensures the method survives dead-code elimination and appears in classes.js
        try {
            JsNetBridge.joinServer("localhost", 0);
        } catch (Exception e) {
            // joinServer requires valid channel; failure is expected before connection
            System.out.println("[ClientMain] joinServer called (DCE prevention only): " + e.getMessage());
        }

        // Explicitly call callJoinServer to prevent TeaVM DCE
        try {
            JsNetBridge.callJoinServer("localhost", 0);
        } catch (Exception e) {
            System.out.println("[ClientMain] callJoinServer called (DCE prevention only): " + e.getMessage());
        }

        // Export callJoinServer to JavaScript
        try {
            JsNetBridge.exportCallJoinServer();
        } catch (Exception e) {
            System.out.println("[ClientMain] exportCallJoinServer called (DCE prevention only): " + e.getMessage());
        }

        // Explicitly call initiateHandshake to prevent TeaVM DCE
        // This ensures the method survives dead-code elimination and appears in classes.js
        try {
            connection.initiateHandshake("localhost", 0);
        } catch (Exception e) {
            System.out.println("[ClientMain] initiateHandshake called (DCE prevention only): " + e.getMessage());
        }

        System.out.println("[ClientMain] Browser client bootstrap complete");

        // Start the render loop
        RenderLoop.bindFrameCallback();
        RenderLoop.start();
    }
}