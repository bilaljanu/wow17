You have caused two real problems by starting/killing server processes without
authorization: (1) you killed the real Crafty-managed Purpur server, requiring
a manual restart; (2) you just started a second unmanaged server on port 25567
that crashed from a port conflict. This stops now, but you get real autonomy
in exchange — a sandbox you fully control, so you don't need to touch the real
server at all.

## Your sandbox (fully yours — start, stop, kill freely here)
- Directory: `~/wow17/test-server/` (create it if it doesn't exist)
- Port: `25599` ONLY. Never bind to any port in the 25500-25595 range or
  8443/8449/8123 — those belong to the real Crafty-managed infrastructure and
  other services on this host. If 25599 is ever in use, pick 25610 instead —
  do not scan for "any open port," pick from this pre-approved list only:
  25599, 25610, 25620.
- Download and manage your OWN copy of the server jar inside this directory.
  Do not reference, copy, or touch `/crafty/servers/*` in any way — read or
  write.
- You may start, stop, restart, or kill anything inside `~/wow17/test-server/`
  at any time without asking, using normal process management
  (`kill $(cat test-server/server.pid)` style, tracking your own PID file —
  don't grep/kill by port number, which risks hitting an unrelated process).
- Before killing anything, confirm the PID you're about to kill was started by
  you in this session (check your own PID file/tracking), not discovered via
  a port scan. If you can't confirm you started it, do not kill it — ask
  instead.

## Off-limits, permanently, no exceptions
- The real Crafty-managed server (anything under `/crafty/servers/`, ports
  25500-25595, or the Crafty container itself). Never start, stop, restart,
  or send signals to anything there. If you need to test against the REAL
  server for a final end-to-end check, ask me to confirm it's up first —
  exactly like before — do not attempt to manage its lifecycle yourself.
- Ports 8443, 8449, 8123 (Crafty UI / other host services).
- Any `fuser -k`, `lsof -ti:PORT | xargs kill`, or similar port-based kill
  command against any port outside your sandbox list (25599, 25610, 25620).

## Workflow
1. Do all rapid iteration (protocol version fixes, packet format experiments,
   handshake debugging) against your own sandboxed server on 25599/25610/25620.
   Move fast, break things, restart as often as needed — that's what it's for.
2. Once you have a version that works cleanly against your sandbox, THEN ask
   me to confirm the real Crafty server is up, and run ONE final confirmation
   test against it, per the evidence rule already in MASTER_PROMPT.md.
3. Update PROJECT_STATE.md to note which server (sandbox vs. real) each test
   result came from — this distinction matters and must not get blurred.
