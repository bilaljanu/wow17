package poc.compat.java.io;

public class RandomAccessFile implements java.io.DataOutput, java.io.DataInput, java.io.Closeable {
    public RandomAccessFile(String name, String mode) throws java.io.FileNotFoundException {}
    public RandomAccessFile(java.io.File file, String mode) throws java.io.FileNotFoundException {}
    public final void close() throws java.io.IOException {}
    public final long length() throws java.io.IOException { return 0; }
    public final void seek(long pos) throws java.io.IOException {}
    public final int read() throws java.io.IOException { return -1; }
    public final int read(byte[] b) throws java.io.IOException { return -1; }
    public final int read(byte[] b, int off, int len) throws java.io.IOException { return -1; }
    public final void readFully(byte[] b) throws java.io.IOException {}
    public final void readFully(byte[] b, int off, int len) throws java.io.IOException {}
    public final int skipBytes(int n) throws java.io.IOException { return 0; }
    public final boolean readBoolean() throws java.io.IOException { return false; }
    public final byte readByte() throws java.io.IOException { return 0; }
    public final int readUnsignedByte() throws java.io.IOException { return 0; }
    public final short readShort() throws java.io.IOException { return 0; }
    public final int readUnsignedShort() throws java.io.IOException { return 0; }
    public final char readChar() throws java.io.IOException { return 0; }
    public final int readInt() throws java.io.IOException { return 0; }
    public final long readLong() throws java.io.IOException { return 0; }
    public final float readFloat() throws java.io.IOException { return 0; }
    public final double readDouble() throws java.io.IOException { return 0; }
    public final String readLine() throws java.io.IOException { return null; }
    public final String readUTF() throws java.io.IOException { return null; }
    public final void write(int b) throws java.io.IOException {}
    public final void write(byte[] b) throws java.io.IOException {}
    public final void write(byte[] b, int off, int len) throws java.io.IOException {}
    public final void writeBoolean(boolean v) throws java.io.IOException {}
    public final void writeByte(int v) throws java.io.IOException {}
    public final void writeShort(int v) throws java.io.IOException {}
    public final void writeChar(int v) throws java.io.IOException {}
    public final void writeInt(int v) throws java.io.IOException {}
    public final void writeLong(long v) throws java.io.IOException {}
    public final void writeFloat(float v) throws java.io.IOException {}
    public final void writeDouble(double v) throws java.io.IOException {}
    public final void writeBytes(String s) throws java.io.IOException {}
    public final void writeChars(String s) throws java.io.IOException {}
    public final void writeUTF(String s) throws java.io.IOException {}
    public final poc.compat.java.nio.channels.FileChannel getChannel() throws java.io.IOException { return null; }
}
