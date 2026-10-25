#!/usr/bin/env python3
"""Record an agent heartbeat."""
import json, sys, datetime

DASH = "/home/bilal/wow17/dashboard/dashboard.json"

def beat(agent_id, status, task="", detail=""):
    with open(DASH) as f:
        d = json.load(f)
    now = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=2))).isoformat(timespec="seconds")
    hb = {"status": status, "task": task, "detail": detail, "timestamp": now}
    d.setdefault("agents", {})[agent_id] = hb
    d["updated_at"] = now
    with open(DASH, "w") as f:
        json.dump(d, f, indent=2)

if __name__ == "__main__":
    agent_id = sys.argv[1] if len(sys.argv) > 1 else "unknown"
    status = sys.argv[2] if len(sys.argv) > 2 else "alive"
    task = sys.argv[3] if len(sys.argv) > 3 else ""
    detail = sys.argv[4] if len(sys.argv) > 4 else ""
    beat(agent_id, status, task, detail)
