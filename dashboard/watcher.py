#!/usr/bin/env python3
"""Background watcher — monitors project changes and auto-feeds to dashboard."""
import json, time, os, subprocess, datetime

DASH = "/home/bilal/wow17/dashboard/dashboard.json"
PROJECT = "/home/bilal/wow17"
POLL = 3  # seconds

def now():
    return datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=2))).isoformat(timespec="seconds")

def feed(icon, text, detail="", typ="action"):
    with open(DASH) as f:
        d = json.load(f)
    entry = {"type": typ, "icon": icon, "text": text, "detail": detail, "time": now()}
    d.setdefault("activity", []).append(entry)
    d["updated_at"] = now()
    d["activity"] = d["activity"][-100:]
    with open(DASH, "w") as f:
        json.dump(d, f, indent=2)

def update_build_history(build_id, result, errors=0, unique=0, duration="—", note=""):
    try:
        with open(DASH) as f:
            d = json.load(f)
        hist = d.get("build_history", [])
        existing = next((b for b in hist if b["id"] == build_id), None)
        if existing:
            existing["result"] = result
            existing["errors"] = errors
            existing["unique"] = unique
            existing["duration"] = duration
            existing["note"] = note
        else:
            hist.append({"id": build_id, "result": result, "errors": errors, "unique": unique, "duration": duration, "note": note})
        hist.sort(key=lambda b: b["id"], reverse=True)
        d["build_history"] = hist[:20]
        d["updated_at"] = now()
        with open(DASH, "w") as f:
            json.dump(d, f, indent=2)
    except Exception as e:
        print(f"build history update failed: {e}")

def get_mtimes(paths):
    mtimes = {}
    for p in paths:
        try:
            mtimes[p] = os.path.getmtime(p)
        except:
            pass
    return mtimes

def find_java_files(root):
    files = []
    for dirpath, _, filenames in os.walk(root):
        for f in filenames:
            if f.endswith(".java"):
                files.append(os.path.join(dirpath, f))
    return files

# Baseline
src_files = find_java_files(os.path.join(PROJECT, "src"))
patch_files = find_java_files(os.path.join(PROJECT, "patch"))
build_logs = [
    os.path.join(PROJECT, "build/logs/build-005.log"),
    os.path.join(PROJECT, "build/logs/build-006.log"),
    os.path.join(PROJECT, "build/logs/build-007.log"),
    os.path.join(PROJECT, "build/logs/build-004.log"),
]
key_files = [
    os.path.join(PROJECT, "PROJECT_STATE.md"),
    os.path.join(PROJECT, "dashboard/dashboard.json"),
    os.path.join(PROJECT, "pom.xml"),
]
all_watch = src_files + patch_files + build_logs + key_files
prev = get_mtimes(all_watch)
prev_sizes = {}
for p in all_watch:
    try:
        prev_sizes[p] = os.path.getsize(p)
    except:
        pass

# Track build-005 tail position
build_log = os.path.join(PROJECT, "build/logs/build-005.log")
tail_pos = 0
try:
    tail_pos = os.path.getsize(build_log)
except:
    pass

feed("●", "File watcher started", f"Monitoring {len(all_watch)} files, 3s poll", "action")

while True:
    time.sleep(POLL)
    try:
        # Check for new/changed java files
        new_src = find_java_files(os.path.join(PROJECT, "src"))
        new_patch = find_java_files(os.path.join(PROJECT, "patch"))
        all_java = new_src + new_patch

        for f in all_java:
            if f not in prev:
                rel = f.replace(PROJECT + "/", "")
                feed("+", f"New file: {rel}", "Java source added", "file")
                prev[f] = os.path.getmtime(f)
                try:
                    prev_sizes[f] = os.path.getsize(f)
                except:
                    pass
                all_watch.append(f)

        # Check modified files
        for f in all_watch:
            try:
                mt = os.path.getmtime(f)
                sz = os.path.getsize(f)
                if f in prev and mt > prev[f]:
                    rel = f.replace(PROJECT + "/", "")
                    size_diff = sz - prev_sizes.get(f, 0)

                    if "build/logs" in rel:
                        # Build log changed — tail new lines
                        try:
                            with open(f, "r") as fh:
                                fh.seek(tail_pos)
                                new_lines = fh.readlines()
                                tail_pos = fh.tell()
                                if new_lines:
                                    last_line = new_lines[-1].strip()
                                    if "[ERROR]" in last_line:
                                        feed("!", "Build error", last_line[:120], "error")
                                    elif "[INFO] Running TeaVM" in last_line:
                                        feed("●", "TeaVM analysis started", rel, "build")
                                    elif "BUILD SUCCESS" in last_line:
                                        feed("✓", "Build SUCCESS", rel, "build")
                                        # parse build number from filename
                                        import re
                                        m = re.search(r'build-(\d+)\.log', rel)
                                        if m:
                                            bid = m.group(1)
                                            update_build_history(bid, "success", note="detected by watcher")
                                    elif "BUILD FAILURE" in last_line:
                                        feed("✗", "Build FAILURE", rel, "error")
                                        import re
                                        m = re.search(r'build-(\d+)\.log', rel)
                                        if m:
                                            bid = m.group(1)
                                            update_build_history(bid, "failure", note="detected by watcher")
                                    elif "[INFO]" in last_line:
                                        pass  # too noisy
                                    else:
                                        feed("●", f"Build output: {last_line[:100]}", "", "build")
                        except:
                            pass
                    elif f.endswith(".java"):
                        feed("+", f"Modified: {rel.replace('src/main/java/poc/compat/', '')}", f"{size_diff:+d} bytes", "file")
                    elif rel == "PROJECT_STATE.md":
                        feed("◆", "PROJECT_STATE.md updated", "Other agent updated project state", "decision")
                    elif rel == "dashboard/dashboard.json":
                        pass  # skip self
                    elif rel == "pom.xml":
                        feed("◆", "pom.xml modified", "Build config changed", "decision")

                    prev[f] = mt
                    prev_sizes[f] = sz
            except:
                pass

    except Exception as e:
        feed("!", f"Watcher error: {e}", "", "error")
