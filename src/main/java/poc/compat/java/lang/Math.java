package poc.compat.java.lang;
public final class Math {
    private Math() {}
    public static final double PI = 3.141592653589793;
    public static final double E = 2.718281828459045;
    public static int abs(int a) { return a < 0 ? -a : a; }
    public static long abs(long a) { return a < 0 ? -a : a; }
    public static int max(int a, int b) { return (a >= b) ? a : b; }
    public static long max(long a, long b) { return (a >= b) ? a : b; }
    public static int min(int a, int b) { return (a <= b) ? a : b; }
    public static long min(long a, long b) { return (a <= b) ? a : b; }
    public static double sqrt(double a) { return StrictMath.sqrt(a); }
    public static double pow(double a, double b) { return StrictMath.pow(a, b); }
}
