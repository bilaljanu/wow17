package org.apache.logging.log4j.core.layout;

import org.apache.logging.log4j.core.LogEvent;
import org.apache.logging.log4j.core.config.plugins.Plugin;
import org.apache.logging.log4j.core.config.plugins.PluginAttribute;
import org.apache.logging.log4j.core.config.plugins.PluginElement;
import org.apache.logging.log4j.core.config.plugins.PluginFactory;
import org.apache.logging.log4j.core.helpers.Booleans;
import org.apache.logging.log4j.core.helpers.Chars;
import org.apache.logging.log4j.core.pattern.LogEventPatternConverter;
import org.apache.logging.log4j.core.pattern.PatternConverter;
import org.apache.logging.log4j.core.pattern.PatternFormatter;
import org.apache.logging.log4j.core.pattern.PatternParser;
import org.apache.logging.log4j.core.pattern.RegexReplacement;
import org.apache.logging.log4j.core.util.KeyValuePair;

import java.io.Serializable;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

@Plugin(name = "PatternLayout", category = "Core", elementType = "layout", printObject = true)
public class PatternLayout extends AbstractStringLayout {
    public static final String DEFAULT_CONVERSION_PATTERN = "%m%n";
    public static final String KEY = "PatternLayout";

    private final String pattern;
    private final PatternFormatter[] formatters;
    private final Configuration configuration;

    protected PatternLayout(Configuration configuration, Charset charset, PatternFormatter[] formatters,
                            String pattern, boolean alwaysWriteExceptions, boolean noConsoleNoAnsi,
                            Header header, Footer footer) {
        super(charset, alwaysWriteExceptions, noConsoleNoAnsi, header, footer);
        this.configuration = configuration;
        this.formatters = formatters;
        this.pattern = pattern;
    }

    @Override
    public String toSerializable(LogEvent event) {
        StringBuilder buf = new StringBuilder();
        for (PatternFormatter formatter : formatters) {
            formatter.format(event, buf);
        }
        return buf.toString();
    }

    @PluginFactory
    public static PatternLayout createLayout(
            @PluginAttribute("pattern") String pattern,
            @PluginAttribute("alwaysWriteExceptions") String alwaysWriteExceptions,
            @PluginAttribute("noConsoleNoAnsi") String noConsoleNoAnsi,
            @PluginAttribute("header") String headerPattern,
            @PluginAttribute("footer") String footerPattern,
            @PluginAttribute("charset") String charsetName,
            @PluginElement("Replace") RegexReplacement regexReplacement,
            @PluginElement("KeyValuePair") KeyValuePair[] keyValuePairs,
            Configuration configuration) {
        Charset charset = Charset.forName(charsetName != null ? charsetName : "UTF-8");
        boolean alwaysWrite = Booleans.parseBoolean(alwaysWriteExceptions, true);
        boolean noAnsi = Booleans.parseBoolean(noConsoleNoAnsi, false);
        Header header = Header.createHeader(headerPattern, configuration, charset);
        Footer footer = Footer.createFooter(footerPattern, configuration, charset);

        List<PatternFormatter> formatters = new ArrayList<>();
        PatternParser parser = PatternParser.getInstance();
        parser.parse(pattern, formatters, configuration, regexReplacement, keyValuePairs);
        return new PatternLayout(configuration, charset,
                formatters.toArray(new PatternFormatter[0]), pattern, alwaysWrite, noAnsi, header, footer);
    }

    public String getPattern() {
        return pattern;
    }
}