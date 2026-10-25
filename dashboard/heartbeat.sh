#!/bin/bash
# Send a heartbeat for the current agent.
# Usage: AGENT_NAME="build-pipeline" bash /home/bilal/wow17/dashboard/heartbeat.sh [status] [task] [detail]
# status: working | idle | stalled (default: alive)

AGENT_NAME="${AGENT_NAME:-unknown}"
STATUS="${1:-alive}"
TASK="${2:-}"
DETAIL="${3:-}"

python3 /home/bilal/wow17/dashboard/heartbeat.py "$AGENT_NAME" "$STATUS" "$TASK" "$DETAIL"
