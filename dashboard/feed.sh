#!/bin/bash
# Quick feed helper for all agents
# Usage: bash /home/bilal/wow17/dashboard/feed.sh icon text detail type
# Types: action, file, build, error, decision

python3 /home/bilal/wow17/dashboard/feed.py "$1" "$2" "$3" "$4"

# Also send heartbeat so watchdog knows this agent is alive
AGENT_NAME="${AGENT_NAME:-unknown}"
python3 /home/bilal/wow17/dashboard/heartbeat.py "$AGENT_NAME" "alive" "$2" "$3"
