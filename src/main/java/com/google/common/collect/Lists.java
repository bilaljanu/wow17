package com.google.common.collect;

import java.util.ArrayList;
import java.util.List;

public class Lists {
    public static <T> List<T> newArrayList() {
        return new ArrayList<>();
    }

    public static <T> List<T> newArrayList(T... elements) {
        List<T> list = new ArrayList<>();
        for (T e : elements) {
            list.add(e);
        }
        return list;
    }
}
