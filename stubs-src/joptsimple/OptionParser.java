package joptsimple;

import java.util.ArrayList;
import java.util.List;

public class OptionParser {
    public OptionParser() {}
    public OptionParser(String... options) { this(); }
    public void accept(String option) {}
    public void acceptAll(List<String> options) {}
    public OptionSet parse(String... arguments) { return new OptionSet(); }
    public OptionSet parse(java.util.List<String> arguments) { return new OptionSet(); }
    public void addOption(String option) { addOption(option, false); }
    public void addOption(String option, boolean acceptsArgument) {}
    public void addOption(String option, boolean acceptsArgument, String longOption) {}
    public OptionSpec<Void> accepts(String option) { return null; }
    public <T> OptionSpec<T> accepts(String option, String description) { return null; }
    public <T> OptionSpec<T> acceptsAll(java.util.Set<String> options, String description) { return null; }
    public NonOptionArgumentSpec<String> nonOptions() { return null; }
    public Object helpFormatterFor(String usage) { return null; }
    public boolean allowsUnrecognizedOptions() { return false; }
    public boolean allowsUnrecognizedOptions(boolean allow) { return false; }
    public OptionSpec<Void> accepts(String option) { return null; }
}
