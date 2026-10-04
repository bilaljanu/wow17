# BrowserMinecraftSupport

Companion Purpur/Paper 1.21.1 plugin for browser Minecraft client integration.

## Installation

```bash
# Build
export JAVA_HOME=/path/to/jdk21
/maven clean package -f browser-minecraft-support/pom.xml

# Install
cp browser-minecraft-support/target/browser-minecraft-support-1.0.0.jar purpur/plugins/

# Start server
./purpur-1.21.1.sh nogui
```

## Supported Version

- Minecraft 1.21.1 (protocol 767)
- Purpur 1.21.1

## Commands

```
/bmcs status    - Show plugin status
/bmcs reload    - Reload config
/bmcs version   - Show protocol version
```

## Configuration

See `config.yml` generated on first load with defaults:
- enabled: true
- max-sessions: 20
- require-capability-marker: true