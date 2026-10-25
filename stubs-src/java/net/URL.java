package java.net;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class URL implements java.io.Serializable {
    private final String protocol;
    private final String host;
    private final int port;
    private final String file;
    private final String ref;

    public URL(String spec) throws MalformedURLException {
        this.protocol = "http";
        this.host = "";
        this.port = -1;
        this.file = spec;
        this.ref = null;
    }

    public URL(String protocol, String host, int port, String file) throws MalformedURLException {
        this.protocol = protocol;
        this.host = host;
        this.port = port;
        this.file = file;
        this.ref = null;
    }

    public URL(String protocol, String host, String file) throws MalformedURLException {
        this(protocol, host, -1, file);
    }

    public URL(URL context, String spec) throws MalformedURLException {
        this(spec);
    }

    public URL(URL context, String spec, URLStreamHandler handler) throws MalformedURLException {
        this(spec);
    }

    public String getProtocol() { return protocol; }
    public String getHost() { return host; }
    public int getPort() { return port; }
    public String getFile() { return file; }
    public String getRef() { return ref; }

    public URLConnection openConnection() throws IOException {
        return new URLConnection(this) {};
    }

    public InputStream openStream() throws IOException {
        return openConnection().getInputStream();
    }

    public String toString() {
        return protocol + "://" + host + (port >= 0 ? ":" + port : "") + (file != null ? file : "");
    }

    public boolean equals(Object o) {
        if (o instanceof URL) {
            URL u = (URL) o;
            return toString().equals(u.toString());
        }
        return false;
    }

    public int hashCode() {
        return toString().hashCode();
    }

    public String toExternalForm() {
        return toString();
    }
}
