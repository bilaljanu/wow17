package java.net;

public abstract class URLConnection {
    protected URL url;
    protected boolean connected = false;

    protected URLConnection(URL url) {
        this.url = url;
    }

    public URL getURL() {
        return url;
    }

    public int getContentLength() {
        return -1;
    }

    public String getContentType() {
        return null;
    }

    public String getContentEncoding() {
        return null;
    }

    public long getExpiration() {
        return 0;
    }

    public long getLastModified() {
        return 0;
    }

    public String getHeaderField(String name) {
        return null;
    }

    public java.util.Map<String, java.util.List<String>> getHeaderFields() {
        return java.util.Collections.emptyMap();
    }

    public void setConnectTimeout(int timeout) {
    }

    public int getConnectTimeout() {
        return 0;
    }

    public void setReadTimeout(int timeout) {
    }

    public int getReadTimeout() {
        return 0;
    }

    public void connect() {
        connected = true;
    }

    public InputStream getInputStream() throws java.io.IOException {
        return java.io.InputStream.nullInputStream();
    }

    public java.io.OutputStream getOutputStream() throws java.io.IOException {
        return java.io.OutputStream.nullOutputStream();
    }

    public Object getContent() throws java.io.IOException {
        return null;
    }

    public String toString() {
        return url.toString();
    }
}
