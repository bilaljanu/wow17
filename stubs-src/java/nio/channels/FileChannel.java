package java.nio.channels;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.spi.SelectorProvider;

public abstract class FileChannel extends java.nio.channels.spi.AbstractInterruptibleChannel implements SeekableByteChannel, java.nio.channels.GatheringByteChannel, java.nio.channels.ScatteringByteChannel {
    protected FileChannel() {}

    public abstract long position() throws IOException;
    public abstract FileChannel position(long newPosition) throws IOException;
    public abstract long size() throws IOException;
    public abstract int read(ByteBuffer dst) throws IOException;
    public abstract long read(ByteBuffer[] dsts, int offset, int length) throws IOException;
    public abstract int write(ByteBuffer src) throws IOException;
    public abstract long write(ByteBuffer[] srcs, int offset, int length) throws IOException;
    public abstract long transferTo(long position, long count, java.nio.channels.WritableByteChannel target) throws IOException;
    public abstract long transferFrom(java.nio.channels.ReadableByteChannel src, long position, long count) throws IOException;
    public abstract int read(ByteBuffer dst, long position) throws IOException;
    public abstract int write(ByteBuffer src, long position) throws IOException;
    public abstract FileChannel lock(long position, long size, boolean shared) throws IOException;
    public abstract FileChannel lock() throws IOException;
    public abstract FileLock tryLock(long position, long size, boolean shared) throws IOException;
    public abstract FileLock tryLock() throws IOException;
    public abstract FileChannel truncate(long size) throws IOException;
    public abstract void force(boolean metaData) throws IOException;

    protected abstract void implCloseChannel() throws IOException;
}
