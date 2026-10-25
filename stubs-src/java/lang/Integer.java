package java.lang;

public final class Integer extends Number implements Comparable<Integer> {
    public static final int MIN_VALUE = -2147483648;
    public static final int MAX_VALUE = 2147483647;
    public static final int SIZE = 32;
    public static final int BYTES = 4;
    public static final Class<Integer> TYPE = (Class<Integer>) Class.getPrimitiveClass("int");

    private final int value;

    public Integer(int value) { this.value = value; }
    public Integer(String s) throws NumberFormatException { this.value = parseInt(s); }

    public byte byteValue() { return (byte)value; }
    public short shortValue() { return (short)value; }
    public int intValue() { return value; }
    public long longValue() { return value; }
    public float floatValue() { return value; }
    public double doubleValue() { return value; }

    public int hashCode() { return value; }
    public boolean equals(Object obj) { return obj instanceof Integer && ((Integer)obj).value == value; }
    public String toString() { return String.valueOf(value); }
    public int compareTo(Integer anotherInteger) { return Integer.compare(value, anotherInteger.value); }

    public static int parseInt(String s) throws NumberFormatException { return parseInt(s, 10); }
    public static int parseInt(String s, int radix) throws NumberFormatException {
        if (s == null) throw new NumberFormatException("null");
        int result = 0;
        boolean negative = false;
        int i = 0, len = s.length();
        if (len == 0) throw new NumberFormatException("Empty string");
        char firstChar = s.charAt(0);
        if (firstChar == '-') { negative = true; i++; }
        else if (firstChar == '+') { i++; }
        if (i == len) throw new NumberFormatException("Sign only");
        for (; i < len; i++) {
            char c = s.charAt(i);
            int digit = Character.digit(c, radix);
            if (digit < 0) throw new NumberFormatException("Invalid digit: " + c);
            result = result * radix + digit;
        }
        return negative ? -result : result;
    }

    public static String toString(int i) { return String.valueOf(i); }
    public static String toString(int i, int radix) {
        if (radix < Character.MIN_RADIX || radix > Character.MAX_RADIX) radix = 10;
        if (i == 0) return "0";
        boolean negative = i < 0;
        if (negative && i == MIN_VALUE) return "-2147483648";
        int u = negative ? -i : i;
        char[] buf = new char[33];
        int pos = buf.length;
        while (u != 0) {
            int rem = u % radix;
            u /= radix;
            buf[--pos] = Character.forDigit(rem, radix);
        }
        if (negative) buf[--pos] = '-';
        return new String(buf, pos, buf.length - pos);
    }

    public static int valueOf(String s) throws NumberFormatException { return parseInt(s); }
    public static Integer valueOf(int i) { return new Integer(i); }
    public static Integer decode(String nm) throws NumberFormatException {
        int radix = 10, i = 0;
        boolean negative = false;
        if (nm.startsWith("-")) { negative = true; i++; }
        if (nm.startsWith("0x", i) || nm.startsWith("0X", i)) { radix = 16; i += 2; }
        else if (nm.startsWith("#", i)) { radix = 16; i++; }
        else if (nm.startsWith("0", i) && nm.length() > i + 1) { radix = 8; i++; }
        int val = parseInt(nm.substring(i), radix);
        return negative ? -val : val;
    }

    public static long toUnsignedLong(int x) { return x & 0xffffffffL; }

    public static int compare(int x, int y) { return (x < y) ? -1 : ((x == y) ? 0 : 1); }
    public static int compareUnsigned(int x, int y) { return Long.compare(toUnsignedLong(x), toUnsignedLong(y)); }
    public static int divideUnsigned(int dividend, int divisor) { return (int)(toUnsignedLong(dividend) / toUnsignedLong(divisor)); }
    public static int remainderUnsigned(int dividend, int divisor) { return (int)(toUnsignedLong(dividend) % toUnsignedLong(divisor)); }
    public static int toUnsignedInt(long x) { return (int)x; }
    public static long toUnsignedLong(long x) { return x; }

    public static int highestOneBit(int i) { i |= (i >> 1); i |= (i >> 2); i |= (i >> 4); i |= (i >> 8); i |= (i >> 16); return i - (i >>> 1); }
    public static int lowestOneBit(int i) { return i & -i; }
    public static int numberOfLeadingZeros(int i) { if (i == 0) return 32; int n = 1; if ((i >>> 16) == 0) { n += 16; i <<= 16; } if ((i >>> 24) == 0) { n += 8; i <<= 8; } if ((i >>> 28) == 0) { n += 4; i <<= 4; } if ((i >>> 30) == 0) { n += 2; i <<= 2; } n -= i >>> 31; return n; }
    public static int numberOfTrailingZeros(int i) { int n = 32; int y; if (i != 0) { n--; y = i << 16; if (y != 0) { n -= 16; i = y; } y = i << 8; if (y != 0) { n -= 8; i = y; } y = i << 4; if (y != 0) { n -= 4; i = y; } y = i << 2; if (y != 0) { n -= 2; i = y; } n -= (i >>> 31); } return n; }
    public static int bitCount(int i) { i = i - ((i >>> 1) & 0x55555555); i = (i & 0x33333333) + ((i >>> 2) & 0x33333333); i = (i + (i >>> 4)) & 0x0f0f0f0f; i = i + (i >>> 8); i = i + (i >>> 16); return i & 0x3f; }
    public static int rotateLeft(int i, int distance) { return (i << distance) | (i >>> -distance); }
    public static int rotateRight(int i, int distance) { return (i >>> distance) | (i << -distance); }
    public static int reverse(int i) { i = (i & 0x55555555) << 1 | (i >>> 1) & 0x55555555; i = (i & 0x33333333) << 2 | (i >>> 2) & 0x33333333; i = (i & 0x0f0f0f0f) << 4 | (i >>> 4) & 0x0f0f0f0f; i = (i << 24) | ((i & 0xff00) << 8) | ((i >>> 8) & 0xff00) | (i >>> 24); return i; }
    public static int signum(int i) { return (i >> 31) | (-i >>> 31); }
    public static int reverseBytes(int i) { return (i >>> 24) | ((i >>> 8) & 0xff00) | ((i << 8) & 0xff0000) | (i << 24); }

    public static int sum(int a, int b) { return a + b; }
    public static int max(int a, int b) { return Math.max(a, b); }
    public static int min(int a, int b) { return Math.min(a, b); }
}