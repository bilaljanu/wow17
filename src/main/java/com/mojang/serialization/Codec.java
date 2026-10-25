package com.mojang.serialization;

public class Codec<A> {
    public static final Codec<?> PASSTHROUGH = new Codec<>();

    public Codec<A> validate(java.util.function.Function validator) {
        return this;
    }
}
