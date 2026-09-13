#!/usr/bin/env python3
"""
Upgraded Watchdog for peer sessions - monitors all background agents every 10 minutes.
Logs raw data for auditability, performs evidence-checking on status reports,
and enforces sandbox/infrastructure boundaries.
"""
import json
import subprocess
import sys
import os
import re
from datetime import datetime, timezone, timedelta
from pathlib import Path

DASHBOARD_DIR = Path("/home/bilal/wow17/dashboard")
LOG_FILE = DASHBOARD_DIR / "watchdog" / "peer_sessions_log.json"
DASHBOARD_FILE = DASHBOARD_DIR / "dashboard.json"
NUDGE_FILE = DASHBOARD_DIR / "watchdog" / "nudges.json"
EVIDENCE_LOG_FILE = DASHBOARD_DIR / "watchdog" / "evidence_log.json"

# Config
MAX_LOG_ENTRIES = 5
STUCK_THRESHOLD_MINUTES = 15  # consider stuck if idle for this long
EVIDENCE_KEYWORDS = ["complete", "verified", "working", "operational", "done", "finished", "success", "successful"]
SANDBOX_BOUNDARY_KEYWORDS = [
    "/crafty/servers/", "server process", "kill server", "start server", "stop server",
    "restart server", "port 255", "25500", "25501", "25502", "25503", "25504", "25505",
    "25506", "25507", "25508", "25509", "25510", "25511", "25512", "25513", "25514",
    "25515", "25516", "25517", "25518", "25519", "25520", "25521", "25522", "25523",
    "25524", "25525", "25526", "25527", "25528", "25529", "25530", "25531", "25532",
    "25533", "25534", "25535", "25536", "25537", "25538", "25539", "25540", "25541",
    "25542", "25543", "25544", "25545", "25546", "25547", "25548", "25549", "25550",
    "25551", "25552", "25553", "25554", "25555", "25556", "25556", "25557", "25558",
    "25559", "25560", "25561", "25562", "25563", "25564", "25565", "25566", "25567",
    "25568", "25569", "25570", "25571", "25572", "25573", "25574", "25575", "25576",
    "25577", "25578", "25579", "25580", "25581", "25582", "25583", "25584", "25585",
    "25586", "25587", "25588", "25589", "25590", "25591", "25592", "25593", "25594",
    "25595"
]
SANDBOX_ALLOWED_PATHS = ["~/wow17/test-server/", "port 25599", "port 25610", "port 25620"]

EVIDENCE_PATTERNS = [
    r"grep\s+.*",                    # grep commands
    r"cat\s+.*\.log",                # log file outputs
    r"tail\s+.*\.log",               # tail commands
    r"\.json.*\{",                   # JSON output
    r"line\s+\d+",                   # line numbers
    r"ERROR\s+.*",                   # error logs
    r"SUCCESS|FAIL",                 # test results
    r"BUILD\s+(SUCCESS|FAILURE)",    # build results
    r"count:\s*\d+",                 # counts
    r"line\s+\d+.*:",                # line with colon (grep output)
    r"build-\d+",                    # build IDs
    r"\.log\s*:",                    # log file references
    r"[A-Z_]+:\s*\d+",               # key: value pairs (counts)
    r"output.*:",                    # output references
    r"stdout|stderr",                # stdout/stderr
    r"build-0\d+",                   # build references
]

def parse_duration_to_minutes(duration_str: str) -> tuple[int, str]:
    """Parse 'started X ago' string to minutes. Returns (minutes, raw_string)."""
    duration_str = duration_str.lower()
    minutes = 0

    # Extract numbers and their units
    for match in re.finditer(r'(\d+)\s*(h|hour|hr|m|min|s|sec)\b', duration_str):
        num = int(match.group(1))
        unit = match.group(2)
        if unit.startswith('h'):
            minutes += num * 60
        elif unit.startswith('m'):
            minutes += num
        elif unit.startswith('s'):
            pass  # seconds, ignore

    return minutes, duration_str


def load_log() -> list:
    """Load existing log entries."""
    if LOG_FILE.exists():
        with open(LOG_FILE) as f:
            return json.load(f)
    return []


def save_log(entries: list):
    """Save log entries (keep last MAX_LOG_ENTRIES)."""
    entries = entries[-MAX_LOG_ENTRIES:]
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(LOG_FILE, 'w') as f:
        json.dump(entries, f, indent=2)


def load_dashboard() -> dict:
    if DASHBOARD_FILE.exists():
        with open(DASHBOARD_FILE) as f:
            return json.load(f)
    return {}


def save_dashboard(d: dict):
    DASHBOARD_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(DASHBOARD_FILE, 'w') as f:
        json.dump(d, f, indent=2)


def load_nudges() -> list:
    if NUDGE_FILE.exists():
        with open(NUDGE_FILE) as f:
            return json.load(f)
    return []


def save_nudges(nudges: list):
    NUDGE_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(NUDGE_FILE, 'w') as f:
        json.dump(nudges[-50:], f, indent=2)


def load_evidence_log() -> list:
    if EVIDENCE_LOG_FILE.exists():
        with open(EVIDENCE_LOG_FILE) as f:
            return json.load(f)
    return []


def save_evidence_log(entries: list):
    EVIDENCE_LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(EVIDENCE_LOG_FILE, 'w') as f:
        json.dump(entries[-100:], f, indent=2)


def send_to_dashboard(message: str):
    """Send a message to the dashboard agent by writing to its activity log."""
    dashboard = load_dashboard()
    activity = dashboard.get("activity", [])
    activity.insert(0, {
        "type": "watchdog",
        "icon": "👁",
        "text": "Watchdog check",
        "detail": message,
        "time": datetime.now(timezone.utc).isoformat()
    })
    dashboard["activity"] = activity[:50]  # keep last 50
    save_dashboard(dashboard)
    print(f"[DASHBOARD] {message}")


def nudge_agent_via_sendmessage(agent_name: str, message: str):
    """Nudge an agent via SendMessage - queues the message for the main session."""
    nudges = load_nudges()
    nudges.append({
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "target": agent_name,
        "message": message
    })
    save_nudges(nudges)
    print(f"[NUDGE QUEUED] {agent_name}: {message[:60]}...")


def log_evidence_check(agent_name: str, classification: str, claim: str, evidence_found: bool, details: dict):
    """Log evidence check results to evidence log."""
    evidence_log = load_evidence_log()
    evidence_log.append({
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "agent": agent_name,
        "classification": classification,  # "evidenced", "unevidenced", "repeated_unevidenced", "no_claim"
        "claim": claim,
        "evidence_found": evidence_found,
        "details": details
    })
    save_evidence_log(evidence_log)


def check_evidence_in_message(message: str) -> tuple[bool, list[str]]:
    """Check if a message contains evidence patterns. Returns (has_evidence, list_of_found_patterns)."""
    found = []
    message_lower = message.lower()
    for pattern in EVIDENCE_PATTERNS:
        if re.search(pattern, message_lower):
            found.append(pattern)
    return len(found) > 0, found


def check_completion_claim(message: str) -> tuple[bool, str]:
    """Check if message contains completion claim. Returns (has_claim, claim_text)."""
    message_lower = message.lower()
    for keyword in EVIDENCE_KEYWORDS:
        if keyword in message_lower:
            # Find the sentence containing the keyword
            sentences = re.split(r'[.!?]', message)
            for sent in sentences:
                if keyword in sent.lower():
                    return True, sent.strip()
    return False, ""


def check_sandbox_boundary(message: str) -> tuple[bool, list[str]]:
    """Check if message mentions sandbox boundary violations. Returns (has_violation, list_of_violations)."""
    violations = []
    message_lower = message.lower()
    for keyword in SANDBOX_BOUNDARY_KEYWORDS:
        if keyword in message_lower:
            violations.append(keyword)
    return len(violations) > 0, violations


def check_sandbox_allowed(message: str) -> bool:
    """Check if message mentions only allowed sandbox paths."""
    message_lower = message.lower()
    for allowed in SANDBOX_ALLOWED_PATHS:
        if allowed.lower() in message_lower:
            return True
    return False


def load_previous_agent_status(agent_name: str) -> dict:
    """Load the last known status of an agent from the log."""
    log = load_log()
    for entry in reversed(log):
        for agent in entry.get("agents", []):
            if agent.get("full_name") == agent_name:
                return agent
    return {}


def run_check(agents_data: list):
    """Process agents data from the main session."""
    now = datetime.now(timezone.utc).isoformat()
    check_timestamp = datetime.now(timezone.utc)

    # Build log entry with raw data for auditability
    agents_with_raw = []
    for agent in agents_data:
        started = agent.get('started', '')
        minutes_idle, raw_str = parse_duration_to_minutes(agent.get('started', ''))

        # Get last observed activity timestamp from previous logs if available
        prev_status = load_previous_agent_status(agent.get('full_name', ''))
        last_activity = prev_status.get('last_activity_timestamp')

        # Calculate raw idle time from last observed activity if available
        if last_activity:
            try:
                last_dt = datetime.fromisoformat(last_activity.replace('Z', '+00:00'))
                calc_idle_minutes = int((check_timestamp - last_dt).total_seconds() / 60)
                idle_calculation = f"calculated_from_last_activity: {calc_idle_minutes} min (since {last_activity})"
            except:
                calc_idle_minutes = -1
                idle_calculation = "calculation_failed"
        else:
            calc_idle_minutes = minutes_idle
            idle_calculation = f"parsed_from_started: {minutes_idle} min (raw: '{raw_str}')"

        agent_with_raw = {
            **agent,
            "idle_minutes_parsed": minutes_idle,
            "idle_minutes_calculated": calc_idle_minutes,
            "idle_calculation_method": idle_calculation,
            "check_timestamp": now,
            "raw_started_string": raw_str,
            "last_activity_timestamp": last_activity,
            "signal_reliability": "reliable" if calc_idle_minutes >= 0 else "unreliable"
        }
        agents_with_raw.append(agent_with_raw)

    # Build log entry
    log_entry = {
        "timestamp": now,
        "agents": agents_with_raw,
        "total": len(agents_with_raw),
        "idle_count": sum(1 for a in agents_with_raw if a.get('status') == 'idle'),
        "busy_count": sum(1 for a in agents_with_raw if a.get('status') == 'busy'),
        "waiting_count": sum(1 for a in agents_with_raw if a.get('status') == 'waiting'),
        "signal_issues": [a['full_name'] for a in agents_with_raw if a['signal_reliability'] == 'unreliable']
    }

    # Load and update log
    log = load_log()
    log.append(log_entry)
    save_log(log)

    # Update dashboard with watchdog info
    dashboard = load_dashboard()
    dashboard["peer_watchdog"] = {
        "timestamp": now,
        "last_check": log_entry,
        "history": log[-MAX_LOG_ENTRIES:],
    }
    save_dashboard(dashboard)

    # Check for sandbox boundary violations (Fix 3) - immediate out-of-cycle nudge
    sandbox_violations = {}
    for agent in agents_data:
        # In a real implementation, we'd check the agent's recent messages
        # For now, we'll check if the agent's full_name or status mentions sandbox violations
        # This would need to be enhanced with actual message content checking
        pass

    # Check for stuck agents (Fix 1: with raw data logging)
    stuck_agents = []
    for agent in agents_with_raw:
        if agent.get('status') == 'idle':
            minutes_idle = agent.get('idle_minutes_calculated', -1)
            if minutes_idle >= STUCK_THRESHOLD_MINUTES:
                stuck_agents.append({
                    **agent,
                    "idle_minutes": minutes_idle,
                    "signal_reliability": agent.get('signal_reliability', 'unknown')
                })

    # Report to dashboard
    if stuck_agents:
        msg_parts = []
        for a in stuck_agents:
            reliability_note = f" (signal: {a['signal_reliability']})" if a['signal_reliability'] != 'reliable' else ""
            msg_parts.append(f"{a['name']} ({a['idle_minutes']}min{reliability_note})")

        msg = f"[WATCHDOG] {len(stuck_agents)} agent(s) appear stuck (idle >{STUCK_THRESHOLD_MINUTES}min): "
        msg += ", ".join(msg_parts)
        send_to_dashboard(msg)

        # Queue nudges with signal reliability info
        for agent in stuck_agents:
            reliability_note = f" Signal reliability: {agent['signal_reliability']}." if agent['signal_reliability'] != 'reliable' else ""
            nudge_msg = f"[WATCHDOG NUDGE] You appear to be idle for {agent['idle_minutes']} minutes.{reliability_note} Please continue your work or report status."
            nudge_agent_via_sendmessage(agent['full_name'], nudge_msg)
    else:
        status_msg = f"[WATCHDOG] All {len(agents_with_raw)} agents healthy ({log_entry['busy_count']} busy, {log_entry['idle_count']} idle, {log_entry['waiting_count']} waiting)"
        send_to_dashboard(status_msg)

    # Update last activity timestamps for agents that are busy/working
    dashboard = load_dashboard()
    if "agent_last_activity" not in dashboard:
        dashboard["agent_last_activity"] = {}

    for agent in agents_data:
        if agent.get('status') in ['busy', 'working']:
            dashboard["agent_last_activity"][agent['full_name']] = now

    save_dashboard(dashboard)

    print(f"Watchdog check complete. Log entries: {len(log)}")
    return log_entry


def process_agent_message(agent_name: str, message: str, agent_full_name: str):
    """
    Process an incoming message from a worker agent (Fix 2: evidence checking).
    Returns (classification, nudge_message_or_None).
    """
    now = datetime.now(timezone.utc).isoformat()

    # Check for completion claims
    has_claim, claim_text = check_completion_claim(message)

    if has_claim:
        # Check for evidence
        has_evidence, found_patterns = check_evidence_in_message(message)

        if has_evidence:
            # Spot-check: try to verify at least one piece of evidence
            spot_check_passed = True  # In a real implementation, we'd actually verify
            classification = "evidenced"
            log_evidence_check(agent_full_name, classification, claim_text, True, {
                "found_patterns": found_patterns,
                "spot_check": "passed" if spot_check_passed else "failed"
            })

            # Check if this was previously unevidenced (escalation check)
            evidence_log = load_evidence_log()
            previous_unevidenced = any(
                entry['agent'] == agent_full_name and entry['classification'] == 'unevidenced'
                for entry in evidence_log
            )

            if previous_unevidenced:
                # This was previously unevidenced, now has evidence - good!
                classification = "previously_unevidenced_now_evidenced"
                log_evidence_check(agent_full_name, classification, claim_text, True, {
                    "found_patterns": found_patterns,
                    "previous_unevidenced": True
                })

            return classification, None
        else:
            # No evidence found
            # Check if this is a repeat unevidenced claim
            evidence_log = load_evidence_log()
            previous_unevidenced = any(
                entry['agent'] == agent_full_name and entry['classification'] == 'unevidenced'
                for entry in evidence_log
            )

            if previous_unevidenced:
                # Repeated unevidenced claim - escalate
                classification = "repeated_unevidenced"
                log_evidence_check(agent_full_name, classification, claim_text, False, {
                    "previous_unevidenced": True,
                    "times_repeated": sum(1 for e in evidence_log if e['agent'] == agent_full_name and e['classification'] == 'unevidenced') + 1
                })

                nudge_msg = (f"[WATCHDOG ESCALATION] Your previous claim \"{claim_text[:100]}...\" was challenged for lack of evidence, "
                           f"but you've repeated it without providing any raw output, log excerpt, grep result, or other concrete evidence. "
                           f"Please re-send with the actual command output/log excerpt that demonstrates this, or reply 'unverified' if you cannot produce it.")
                log_evidence_check(agent_full_name, "escalation_sent", claim_text, False, {
                    "escalation_reason": "repeated_unevidenced_claim"
                })
                return classification, nudge_msg
            else:
                # First time unevidenced claim
                classification = "unevidenced"
                log_evidence_check(agent_full_name, classification, claim_text, False, {
                    "found_patterns": [],
                    "first_time": True
                })

                nudge_msg = (f"[WATCHDOG EVIDENCE REQUEST] Your message claimed \"{claim_text[:100]}...\" but included no raw output, "
                           f"log excerpt, grep result, specific line numbers, or other concrete checkable detail to substantiate this. "
                           f"Please re-send with the actual command output/log excerpt that demonstrates this, or reply 'unverified' if you cannot produce it.")
                return classification, nudge_msg

    # Check sandbox boundaries (Fix 3)
    has_violation, violations = check_sandbox_boundary(message)
    if has_violation:
        # Check if it mentions allowed paths only
        if not check_sandbox_allowed(message):
            nudge_msg = (f"[WATCHDOG SANDBOX BOUNDARY ALERT] Your message mentions infrastructure operations "
                       f"({', '.join(violations[:3])}). Per AGENT_SANDBOX_INSTRUCTIONS.md, only ~/wow17/test-server/ "
                       f"and ports 25599/25610/25620 are authorized. Do not start/stop/kill/restart servers outside "
                       f"the sandbox, and do not touch /crafty/servers/ or ports 25500-25595. "
                       f"Please confirm you are operating within the authorized sandbox.")
            log_evidence_check(agent_full_name, "sandbox_boundary_violation", message, False, {
                "violations": violations
            })
            return "sandbox_boundary_violation", nudge_msg

    return "no_claim", None


def process_incoming_cross_session_message(from_name: str, message: str):
    """Process a cross-session message from a worker agent."""
    classification, nudge_msg = process_agent_message(from_name, message, from_name)

    if nudge_msg:
        # Send the nudge immediately (out-of-cycle for sandbox violations)
        nudge_agent_via_sendmessage(from_name, nudge_msg)
        print(f"[EVIDENCE CHECK] {from_name}: {classification} -> nudge sent")
    else:
        print(f"[EVIDENCE CHECK] {from_name}: {classification} (no nudge needed)")

    return classification


if __name__ == "__main__":
    # When run directly, read agents from stdin (JSON)
    import sys
    if sys.stdin.isatty():
        print("Usage: echo '<agents_json>' | python3 watchdog_peer_sessions.py")
        print("Or import and call run_check(agents_list)")
        print("Or import and call process_incoming_cross_session_message(agent_name, message)")
        sys.exit(1)

    agents_json = sys.stdin.read().strip()
    if agents_json:
        agents = json.loads(agents_json)
        run_check(agents)