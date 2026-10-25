package joptsimple;

import java.util.*;

public interface ArgumentSpec<T> extends Iterable<T> {
    String description();
    List<String> defaultValues();
    OptionType required();
    boolean isRequired();
    void requiredUnlessPresent(String option);
    void requiredUnlessPresent(String... options);
    void requiredIfPresent(String option);
    void requiredIfPresent(String... options);
    boolean isOfType(String type);
}
