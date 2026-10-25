package joptsimple;

import java.util.*;

public interface OptionSpec<T> {
    String options();
    boolean acceptsArguments();
    String description();
    T value(OptionSet optionSet);
    List<String> defaultValues();
    OptionType required();
    boolean isRequired();
    void requiredUnlessPresent(String option);
    void requiredUnlessPresent(String... options);
    void requiredIfPresent(String option);
    void requiredIfPresent(String... options);
}
