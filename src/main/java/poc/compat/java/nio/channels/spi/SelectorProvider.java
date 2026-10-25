package poc.compat.java.nio.channels.spi;
public abstract class SelectorProvider {
    protected SelectorProvider() {}
    public static SelectorProvider provider() {
        return new SelectorProvider() {
            public java.nio.channels.Selector openSelector() throws java.io.IOException { throw new java.io.IOException("NIO not supported"); }
        };
    }
    public abstract java.nio.channels.Selector openSelector() throws java.io.IOException;
}
