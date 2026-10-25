package joptsimple;

import java.util.*;

public class OptionSet {
    public boolean has(String option) { return false; }
    public boolean has(OptionSpec<?> option) { return false; }
    public <T> T valueOf(OptionSpec<T> option) { return null; }
    public String[] args() { return new String[0]; }
    public List<String> nonOptionArguments() { return Collections.emptyList(); }
    public boolean hasHelp() { return false; }
}
