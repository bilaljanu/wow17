package poc.compat.jso;

/**
 * JSO interface for JavaScript Float32Array.
 * Java code views this as an array-like structure; the TeaVM compiler
 * will deoptimize to use actual ArrayBufferView wrapping.
 *
 * @TEAVM_JSO_NON_NATIVE: true
 */
public class Float32ArrayView {
    private float[] data;

    public Float32ArrayView(float[] data) {
        this.data = data;
    }

    public int length() {
        return data.length;
    }

    public float get(int index) {
        return data[index];
    }

    public void set(int index, float value) {
        data[index] = value;
    }

    public void set(Float32ArrayView src, int offset) {
        for (int i = 0; i < src.length(); i++) {
            data[offset + i] = src.get(i);
        }
    }
}