package joptsimple;

public class OptionSet {
    public Object valueOf(joptsimple.OptionSpec<?> option) { return null; }
    public String[] valuesOf(joptsimple.OptionSpec<?> option) { return new String[0]; }
    public boolean has(joptsimple.OptionSpec<?> option) { return false; }
    public boolean has(String option) { return false; }
}
