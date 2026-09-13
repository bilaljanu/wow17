package com.google.common.collect;

import java.util.Collection;
import java.util.List;

public class ImmutableList extends java.util.AbstractList {
    public static ImmutableList of() {
        return new ImmutableList();
    }

    public static ImmutableList copyOf(Collection elements) {
        return new ImmutableList();
    }

    ImmutableList() {}

    @Override
    public Object get(int index) {
        return null;
    }

    @Override
    public int size() {
        return 0;
    }
}
