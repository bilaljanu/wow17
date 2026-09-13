#!/bin/bash
# sanity_check.sh — run after every claimed "done" step, before trusting it.
# Exits non-zero and prints a clear reason if state looks fabricated/stale.
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

FAIL=0
warn() { echo "  [WARN] $1"; }
fail() { echo "  [FAIL] $1"; FAIL=1; }
ok()   { echo "  [OK]   $1"; }

echo "=== Sanity check: $(date) ==="

# 1. PROJECT_STATE.md must be newer than it was at last check, if a build ran
if [ -f PROJECT_STATE.md ]; then
  STATE_AGE=$(( $(date +%s) - $(stat -c %Y PROJECT_STATE.md 2>/dev/null || stat -f %m PROJECT_STATE.md) ))
  if [ "$STATE_AGE" -gt 7200 ]; then
    warn "PROJECT_STATE.md hasn't been touched in $((STATE_AGE/60)) minutes — confirm work is actually happening."
  else
    ok "PROJECT_STATE.md updated $((STATE_AGE/60)) min ago."
  fi
else
  fail "PROJECT_STATE.md missing entirely."
fi

# 2. Latest build log, if referenced in state, must actually exist and be non-trivial
LATEST_LOG=$(find build/logs -name "build-*.log" 2>/dev/null | sort | tail -1)
if [ -n "$LATEST_LOG" ]; then
  LINES=$(wc -l < "$LATEST_LOG")
  if [ "$LINES" -lt 20 ]; then
    fail "$LATEST_LOG has only $LINES lines — looks interrupted/incomplete, not a real finished build."
  else
    ok "$LATEST_LOG has $LINES lines."
  fi
  TAIL=$(tail -3 "$LATEST_LOG")
  if ! echo "$TAIL" | grep -qiE "BUILD SUCCESS|BUILD FAILURE|error|analysis complete|diagnostics"; then
    warn "$LATEST_LOG doesn't end with a recognizable completion marker — check manually:"
    echo "$TAIL" | sed 's/^/         /'
  fi
else
  warn "No build/logs/build-*.log found yet — expected once phase 1+ has actually run."
fi

# 3. dashboard.json must be valid JSON and roughly in sync with PROJECT_STATE.md's claimed phase
if [ -f dashboard/dashboard.json ]; then
  if ! python3 -c "import json; json.load(open('dashboard/dashboard.json'))" 2>/dev/null; then
    fail "dashboard/dashboard.json is not valid JSON."
  else
    DASH_PHASE=$(python3 -c "import json; print(json.load(open('dashboard/dashboard.json')).get('phase'))" 2>/dev/null)
    STATE_PHASE=$(grep -m1 "^Phase [0-9]" PROJECT_STATE.md 2>/dev/null | grep -oE "[0-9]+" | head -1)
    if [ -n "$DASH_PHASE" ] && [ -n "$STATE_PHASE" ] && [ "$DASH_PHASE" != "$STATE_PHASE" ]; then
      warn "dashboard.json says phase $DASH_PHASE but PROJECT_STATE.md says phase $STATE_PHASE — one is stale."
    else
      ok "dashboard.json phase roughly matches PROJECT_STATE.md."
    fi
  fi
else
  warn "dashboard/dashboard.json missing."
fi

# 4. Category-2 red flag: grep recent diffs/stub files for suspicious GL/threading no-ops
if [ -d patch ] || [ -d src ]; then
  SUSPECT=$(grep -rlE "class (GL14|GL30|GlStateManager|Thread|EventExecutor|Selector)\b" --include="*.java" . 2>/dev/null | grep -v "^./mc-fetch\|^./input")
  if [ -n "$SUSPECT" ]; then
    warn "Found local stub-looking classes shadowing GL/threading names — verify these aren't no-op stubs (category-2 problems must not be papered over):"
    echo "$SUSPECT" | sed 's/^/         /'
  fi
fi

echo "=== End sanity check ==="
if [ "$FAIL" -eq 1 ]; then
  echo "RESULT: FAILED — do not trust the last claimed step until these are resolved."
  exit 1
else
  echo "RESULT: no hard failures (warnings above still worth a human glance)."
  exit 0
fi
