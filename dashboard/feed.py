#!/usr/bin/env python3
"""Append an activity entry to dashboard.json and touch updated_at."""
import json, sys, datetime

DASH = "/home/bilal/wow17/dashboard/dashboard.json"

def push(icon, text, detail="", typ="action"):
    with open(DASH) as f:
        d = json.load(f)
    now = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=2))).isoformat(timespec="seconds")
    entry = {"type": typ, "icon": icon, "text": text, "detail": detail, "time": now}
    d.setdefault("activity", []).append(entry)
    d["updated_at"] = now
    # keep last 100 entries
    d["activity"] = d["activity"][-100:]
    with open(DASH, "w") as f:
        json.dump(d, f, indent=2)
    print(f"fed: {text}")

if __name__ == "__main__":
    icon = sys.argv[1] if len(sys.argv) > 1 else ">"
    text = sys.argv[2] if len(sys.argv) > 2 else "update"
    detail = sys.argv[3] if len(sys.argv) > 3 else ""
    typ = sys.argv[4] if len(sys.argv) > 4 else "action"
    push(icon, text, detail, typ)
