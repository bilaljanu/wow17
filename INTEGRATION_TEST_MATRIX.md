# Reproducible Real-Server Integration Test Matrix
## Minecraft Java 1.21.1 → Browser via TeaVM

## EXECUTIVE SUMMARY
Current state: Infrastructure is running but tests lack automation, Purpur validation, and browser bootstrap.  
Key gaps identified: 1) No Chrome DevTools automation, 2) No Purpur 1.21.1 sandbox, 3) Manual test coordination required, 4) TeaVM build staleness unverified.

## ENVIRONMENT CONTEXT
- Working directory: `/home/bilal/wow17`
- Approved sandbox ports (per `AGENT_SANDBOX_INSTRUCTIONS.md`): **25599, 25610, 25620**
- Real Crafty-managed server (OFF-LIMITS): port 25565 (Mojang auth enabled)
- Current services:
  - WebRTC Proxy: port 8766 (TCP) - [RUNNING, PID 1867823]
  - Test Sandbox MC Server: port 25620 - [RUNNING, PID 2257375, vanilla 1.21.1]
  - Real MC Server: port 25565 - [RUNNING, Mojang auth enabled]
  - Google Chrome: [AVAILABLE, v150.0.7871.124]
  - Purpur 1.21.1 build 2329: `/tmp/purpur.jar` (MD5: `dc0026462cac76c869335feb43388a76`, 53.1 MB)

## REQUIRED SETUP FOR REPRODUCIBLE TESTING

### 1. Purpur 1.21.1 Sandbox Environment (DO NOT MODIFY REAL SERVER)
```bash
mkdir -p /home/bilal/wow17/purpur-server/{world,logs}
cp /tmp/purpur.jar /home/bilal/wow17/purpur-server/purpur-1.21.1.jar
cd /home/bilal/wow17/purpur-server
echo "eula=true" > eula.txt
cat > server.properties << 'EOF'
# Purpur 1.21.1 Sandbox - Generated for Integration Testing
server-port=25599
online-mode=false
max-players=4
view-distance=8
motd=Purpur Integration Test Server
enable-rcon=false
enable-query=false
network-compression-threshold=256
use-native-transport=true
prevent-proxy-connections=false
allow-nether=true
gamemode=survival
difficulty=easy
generate-structures=true
spawn-protection=16
