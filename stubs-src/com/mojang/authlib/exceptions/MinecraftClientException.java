package com.mojang.authlib.exceptions;

public class MinecraftClientException extends Exception {
    public MinecraftClientException() {
        super();
    }

    public MinecraftClientException(String message) {
        super(message);
    }

    public MinecraftClientException(String message, Throwable cause) {
        super(message, cause);
    }

    public MinecraftClientException(Throwable cause) {
        super(cause);
    }
}