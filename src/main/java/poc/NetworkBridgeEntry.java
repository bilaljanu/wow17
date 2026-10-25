package poc;

/**
 * Networking bridge entry point.
 *
 * This class previously exposed JS hooks, but those paths have been removed
 * to avoid TeaVM JSO/lambda analysis issues during compilation.
 */
public final class NetworkBridgeEntry {

    private NetworkBridgeEntry() {}

    public static void main(String[] args) {
        // Placeholder for future non-JS bridge wiring
    }
}
