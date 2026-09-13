package poc.compat.java.lang;
public final class Character implements java.io.Serializable, Comparable<Character> {
    private static final long serialVersionUID = 3786009709580582316L;
    public static final int MIN_VALUE = 0;
    public static final int MAX_VALUE = 65535;
    private final char value;
    public Character(char value) { this.value = value; }
    public char charValue() { return value; }
    public int compareTo(Character anotherCharacter) { return this.value - anotherCharacter.value; }
    public boolean equals(Object obj) { return obj instanceof Character && value == ((Character) obj).value; }
    public int hashCode() { return value; }
    public String toString() { return String.valueOf(value); }
    public static boolean isDigit(char ch) { return ch >= '0' && ch <= '9'; }
    public static boolean isLetter(char ch) { return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'); }
    public static boolean isLetterOrDigit(char ch) { return isLetter(ch) || isDigit(ch); }
    public static boolean isUpperCase(char ch) { return ch >= 'A' && ch <= 'Z'; }
    public static boolean isLowerCase(char ch) { return ch >= 'a' && ch <= 'z'; }
    public static char toUpperCase(char ch) { return isLowerCase(ch) ? (char)(ch - 32) : ch; }
    public static char toLowerCase(char ch) { return isUpperCase(ch) ? (char)(ch + 32) : ch; }
}
