package com.mojang.brigadier.tree;

import com.mojang.brigadier.Command;
import com.mojang.brigadier.RedirectModifier;
import com.mojang.brigadier.arguments.ArgumentType;
import com.mojang.brigadier.builder.LiteralArgumentBuilder;
import com.mojang.brigadier.builder.RequiredArgumentBuilder;
import com.mojang.brigadier.context.CommandContext;
import com.mojang.brigadier.context.CommandContextBuilder;
import com.mojang.brigadier.exceptions.CommandSyntaxException;
import com.mojang.brigadier.suggestion.Suggestions;
import com.mojang.brigadier.suggestion.SuggestionsBuilder;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletableFuture;

public interface CommandNode<S> {
    Command<S> getCommand();
    boolean canUse(S source);
    Collection<CommandNode<S>> getChildren();
    CommandNode<S> getChild(String name);
    Collection<String> getInputUsage();
    String getUsageText();
    CompletableFuture<Suggestions> listSuggestions(CommandContext<S> context, SuggestionsBuilder builder) throws CommandSyntaxException;
    void addChild(CommandNode<S> child);
    boolean equals(Object o);
    int hashCode();
    String toString();

    static <S> RequiredArgumentBuilder<S, ?> argument(String name, ArgumentType<?> type) {
        return null;
    }

    static <S> LiteralArgumentBuilder<S> literal(String literal) {
        return null;
    }
}