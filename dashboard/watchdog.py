#!/usr/bin/env python3
"""Watchdog daemon - monitors agent heartbeats and project health."""
import json, time, os, datetime

DASH = "/home/bilal/wow17/dashboard/dashboard.json"
PROJECT = "/home/bilal/wow17"

HEARTBEAT_TIMEOUT = 60  # seconds before marking agent as stalled
WATCHDOG_POLL = 10      # seconds

def now():
    return datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=2))).isoformat(timespec="seconds")

def load_dashboard():
    with open(DASH) as f:
        return json.load(f)

def save_dashboard(d):
    d["updated_at"] = now()
    with open(DASH, "w") as f:
        json.dump(d, f, indent=2)

def check_agent_health(agents):
    """Check heartbeats and update agent statuses."""
    current_time = time.time()
    health_report = {}

    for agent_id, hb in agents.items():
        last_seen = hb.get("timestamp", "")
        reported_status = hb.get("status", "unknown")
        try:
            hb_time = datetime.datetime.fromisoformat(last_seen).timestamp()
            age = current_time - hb_time
        except Exception:
            age = 9999

        # If agent reported itself as idle, silence is expected; only flag working agents as stalled.
        if reported_status == "idle":
            status = "idle"
            health = "idle"
        elif age < HEARTBEAT_TIMEOUT * 0.5:
            status = "working"
            health = "good"
        elif age < HEARTBEAT_TIMEOUT:
            status = "idle"
            health = "idle"
        else:
            status = "stalled"
            health = "stalled"

        health_report[agent_id] = {
            "status": status,
            "health": health,
            "last_seen": last_seen,
            "age_seconds": int(age),
            "task": hb.get("task", ""),
            "detail": hb.get("detail", ""),
        }

    return health_report

def check_build_health(build_history, last_build):
    """Check if builds are progressing or stuck."""
    if not build_history or len(build_history) < 2:
        return {"status": "unknown", "message": "insufficient build history"}

    # Sort by build id
    sorted_builds = sorted(build_history, key=lambda b: int(b.get("id", 0)))

    # Check last build age
    last_build_time = last_build.get("timestamp", "")
    try:
        lb_time = datetime.datetime.fromisoformat(last_build_time).timestamp()
        age = time.time() - lb_time
    except:
        age = 9999

    # Check if error count is decreasing
    recent = [b for b in sorted_builds[-5:] if b.get("errors", 0) > 0]
    if len(recent) >= 2:
        errors_decreasing = True
        for i in range(len(recent)-1):
            if recent[i].get("errors", 0) < recent[i+1].get("errors", 0):
                errors_decreasing = False
                break
    else:
        errors_decreasing = None

    # Determine build health
    if age > 3600:  # 1 hour
        status = "stale"
        message = f"last build {int(age/60)}m ago"
    elif errors_decreasing is False:
        status = "regressing"
        message = "error count increased in recent builds"
    elif errors_decreasing is True:
        status = "improving"
        message = "errors decreasing"
    elif errors_decreasing is None:
        status = "stable"
        message = "insufficient data"
    else:
        status = "unknown"
        message = ""

    return {
        "status": status,
        "message": message,
        "last_build_age": int(age),
        "recent_trend": "decreasing" if errors_decreasing else ("increasing" if errors_decreasing is False else "unknown"),
    }

def check_project_health(d):
    """Overall project health check."""
    errors = d.get("errors", {})
    total = sum(errors.values())
    categories = len(errors)
    has_blocker = errors.get("gl_rendering", 0) > 0 or errors.get("netty_threading", 0) > 5

    if total == 0:
        status = "complete"
        message = "all errors resolved"
    elif has_blocker:
        status = "blocked"
        message = "structural blockers present"
    elif total < 50:
        status = "near_complete"
        message = f"{total} errors remaining"
    elif total < 150:
        status = "progressing"
        message = f"{total} errors, making progress"
    else:
        status = "early_stage"
        message = f"{total} errors, early burn-down phase"

    return {
        "status": status,
        "message": message,
        "total_errors": total,
        "categories": categories,
        "has_blocker": has_blocker,
    }

def check_stalled_progress(build_history, last_build):
    """Detect if progress has stalled."""
    if not build_history or len(build_history) < 3:
        return {"stalled": False, "reason": "insufficient data"}

    sorted_builds = sorted(build_history, key=lambda b: int(b.get("id", 0)))
    recent = sorted_builds[-3:]

    # Check if last 3 builds have same error count
    error_counts = [b.get("errors", 0) for b in recent]
    if len(set(error_counts)) == 1 and error_counts[0] > 0:
        return {
            "stalled": True,
            "reason": f"error count unchanged for {len(recent)} builds ({error_counts[0]} errors)",
            "since_build": recent[0].get("id", "?"),
        }

    return {"stalled": False, "reason": "progress detected"}

# Main watchdog loop
print("Watchdog daemon starting...")
while True:
    try:
        d = load_dashboard()
        build_history = d.get("build_history", [])
        last_build = d.get("last_build", {})
        agents = d.get("agents", {})

        # Perform health checks
        agent_health = check_agent_health(agents)
        build_health = check_build_health(build_history, last_build)
        project_health = check_project_health(d)
        stalled_check = check_stalled_progress(build_history, last_build)

        # Update dashboard with watchdog info
        d["watchdog"] = {
            "timestamp": now(),
            "agents": agent_health,
            "build": build_health,
            "project": project_health,
            "stalled": stalled_check,
        }

        save_dashboard(d)

        # Log issues
        stalled_agents = [aid for aid, info in agent_health.items() if info["health"] == "stalled"]
        if stalled_agents:
            print(f"[WATCHDOG] Stalled agents: {', '.join(stalled_agents)}", flush=True)

        if stalled_check.get("stalled"):
            print(f"[WATCHDOG] {stalled_check['reason']}", flush=True)

        if project_health["status"] == "blocked":
            print(f"[WATCHDOG] Project blocked: {project_health['message']}", flush=True)

    except Exception as e:
        print(f"[WATCHDOG] Error: {e}")

    time.sleep(WATCHDOG_POLL)
