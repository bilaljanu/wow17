package poc.networking;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSClass;
import org.teavm.jso.typedarrays.Uint8Array;

@JSClass
public final class JsNetBridge {

    private JsNetBridge() {}

    @JSBody(params = {}, script = "window.NetBridgeBridge = window.NetBridgeBridge || {}; window.NetBridgeBridge.attach = true;")
    public static native void onAttach();

    @JSBody(params = "data", script = "if (window.NetBridgeBridge && window.NetBridgeBridge.sendBytes) { window.NetBridgeBridge.sendBytes(new Uint8Array(data)); }")
    public static native void sendBytes(byte[] data);

    @JSBody(params = {}, script = "if (window.NetBridgeBridge && window.NetBridgeBridge.onClose) { window.NetBridgeBridge.onClose(); }")
    public static native void onClose();

    /** Diagnostic: log to browser console immediately */
    @JSBody(params = {}, script = "console.log('[JsNetBridge] Diagnostic: JSBody executed');")
    public static native void diagnosticLog();

    /** Called from JS when a message arrives on the DataChannel.
     * Accepts Uint8Array from JS and forwards to NetBridge. */
    public static void onReceive(byte[] data) {
        // Use reflection to avoid TeaVM JSClassProcessor NPE on direct call site
        try {
            java.lang.reflect.Method method = NetBridge.class.getDeclaredMethod("onReceive", byte[].class);
            method.setAccessible(true);
            method.invoke(null, (Object) data);
        } catch (Exception e) {
            System.out.println("[JsNetBridge] Failed to call NetBridge.onReceive via reflection: " + e);
            // Fallback - if reflection fails, try direct call (might work in some contexts)
            try {
                NetBridge.onReceive(data);
            } catch (Exception e2) {
                System.out.println("[JsNetBridge] Direct call also failed: " + e2);
            }
        }
    }

    /** JS-friendly receive: called from JS with packetId and payload as separate Uint8Arrays.
     * This avoids the TeaVM byte[] call-site NPE. */
    public static void onReceivePacket(int packetId, Uint8Array payload) {
        // Convert Uint8Array to byte[] and call NetBridge
        byte[] payloadBytes = new byte[payload.getLength()];
        for (int i = 0; i < payload.getLength(); i++) {
            payloadBytes[i] = (byte) payload.get(i);
        }
        // Dispatch to NetBridge directly with parsed packetId and payload
        NetBridge.dispatchPacketDirect(packetId, payloadBytes);
    }

    /** JS entry point for inbound frames: called from JS with raw Uint8Array frame data.
     * Parses the frame (VarInt length + VarInt packetId + payload) and dispatches. */
    public static void onReceiveFrame(Uint8Array frame) {
        // [RUNTIME C] JsNetBridge.onReceiveFrame ENTERED
        System.out.println("[RUNTIME C] JsNetBridge.onReceiveFrame ENTERED, frame.length=" + frame.getLength());
        if (frame.getLength() == 0) {
            System.out.println("[RUNTIME C] Empty frame, returning");
            return;
        }
        // Convert Uint8Array to byte[]
        byte[] frameBytes = new byte[frame.getLength()];
        for (int i = 0; i < frame.getLength(); i++) {
            frameBytes[i] = (byte) frame.get(i);
        }
        // Parse VarInt frame length
        int[] lenInfo = readVarIntInfo(frameBytes, 0);
        int frameLength = lenInfo[0];
        int afterLen = lenInfo[1];
        // [RUNTIME F] frameLength parsed
        System.out.println("[RUNTIME F] frameLength=" + frameLength + ", afterLen=" + afterLen);

        if (frameLength < 0 || afterLen + frameLength > frameBytes.length) {
            System.out.println("[NetBridge] Incomplete frame");
            return;
        }

        // Parse VarInt packet ID
        int[] idInfo = readVarIntInfo(frameBytes, afterLen);
        int packetId = idInfo[0];
        // [RUNTIME G] packetId parsed
        System.out.println("[RUNTIME G] packetId=" + packetId + " from frameLength=" + frameLength);

        System.out.println("[RUNTIME C] Dispatching packet " + packetId);
    }

    /**
     * Scratch buffer for readVarIntInfo to avoid per-call allocations.
     * Single-threaded context (browser main thread), safe to reuse.
     */
    private static final int[] VAR_INT_SCRATCH = new int[2];

    private static int[] readVarIntInfo(byte[] buf, int offset) {
        int result = 0;
        int shift = 0;
        int current;
        do {
            if (offset >= buf.length) {
                VAR_INT_SCRATCH[0] = result;
                VAR_INT_SCRATCH[1] = offset;
                return VAR_INT_SCRATCH;
            }
            current = buf[offset++] & 0xFF;
            result |= (current & 0x7F) << shift;
            shift += 7;
            if (shift > 28) {
                VAR_INT_SCRATCH[0] = -1;
                VAR_INT_SCRATCH[1] = offset;
                return VAR_INT_SCRATCH;
            }
        } while ((current & 0x80) != 0);
        VAR_INT_SCRATCH[0] = result;
        VAR_INT_SCRATCH[1] = offset;
        return VAR_INT_SCRATCH;
    }

    /**
     * Server-join hook: invoke from JS to connect to a Minecraft server.
     * Call from webport via: window.NetBridgeBridge.onJoinServer(host, port)
     */
    public static void onJoinServer(String host, int port) {
        NetBridge.joinServer(host, port);
    }

    /** Force export: assign internal TeaVM function to window */
    @JSBody(params = {}, script = "window.NetBridge_writePacket = pn_NetBridge_writePacket;")
    public static native void exportWritePacket();

    /** Force export: assign internal TeaVM function to window for raw frame receive */
    @JSBody(params = {}, script = "window.NetBridge_receivePacket = pn_JsNetBridge_onReceiveFrame;")
    public static native void exportOnReceive();

    /** Export callJoinServer to JavaScript */
    @JSBody(params = {}, script = "window.JsNetBridge_callJoinServer = pn_JsNetBridge_callJoinServer;")
    public static native void exportCallJoinServer();

    /** Direct packet dispatch from JS - bypasses frame parsing for packets already split */
    public static void onReceiveDirect(int packetId, byte[] payload) {
        // Use reflection to avoid TeaVM NPE on direct call to NetBridge methods
        try {
            java.lang.reflect.Method method = NetBridge.class.getDeclaredMethod("dispatchPacketDirect", int.class, byte[].class);
            method.setAccessible(true);
            method.invoke(null, (Object) packetId, (Object) payload);
        } catch (Exception e) {
            System.out.println("[JsNetBridge] Failed to call dispatchPacketDirect via reflection: " + e);
        }
    }

    /** Plugin join-server support: tell the webport to join a server */
    @JSBody(params = {"host", "port"}, script = "if (window.NetBridgeBridge && window.NetBridgeBridge.onJoinServer) { window.NetBridgeBridge.onJoinServer(host, port); }")
    public static native void joinServer(String host, int port);

    /** Expose NetBridge.joinServer to JavaScript - this triggers the actual Minecraft protocol handshake */
    @JSBody(params = {"host", "port"}, script = "if (window.NetBridgeBridge && window.NetBridgeBridge.onJoinServer) { window.NetBridgeBridge.onJoinServer(host, port); }")
    public static native void javaJoinServer(String host, int port);

    /** Call NetBridge.joinServer from Java - this triggers the actual Minecraft protocol handshake */
    public static void callJoinServer(String host, int port) {
        NetBridge.joinServer(host, port);
    }

    /**
     * Browser-facing entry point: triggers the Minecraft client connection initiation.
     * Called from JavaScript when the user clicks Join Server.
     */
    public static void initiateConnection(String host, int port) {
        if (NetBridge.getConnection() == null) {
            System.err.println("[JsNetBridge] Cannot initiate: MinecraftClientConnection is null");
            return;
        }
        System.out.printf("[JsNetBridge] initiateConnection(%s, %d)%n", host, port);
        NetBridge.getConnection().initiateHandshake(host, port);
    }
}
