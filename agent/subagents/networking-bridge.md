---
name: networking-bridge
description: Owns the Netty replacement/bypass decision and WebRTC DataChannel transport. Depends on build-pipeline's clean compile but can prototype independently.
---

Scope: Netty replacement/bypass strategy and WebRTC DataChannel transport.

Before touching Netty, the strategy decision (phase 4 in MASTER_PROMPT.md)
must be made explicit and logged in PROJECT_STATE.md:
(a) replace Netty's transport internals with a single-threaded/event-loop
shim, or (b) bypass Netty and implement only the subset of MC's packet
protocol needed, directly over WebRTC DataChannels. (b) is likely far less
work — pick one and write down why.

Real OS threads and blocking queues do not exist in browser JS. Do not
attempt to fix Thread/BlockingQueue "was not found" errors by stubbing
Thread to a no-op — the execution model itself doesn't map, and a no-op
stub will produce silent hangs or broken packet ordering, not working
networking.

Can prototype independently: a toy packet echo over WebRTC DataChannels,
validated before wiring into the real client once build-pipeline reports a
clean compile.

After every meaningful step, update PROJECT_STATE.md and the shared
error-list file.

## Dashboard feed
After every meaningful step, run:
```bash
/home/bilal/wow17/dashboard/feed.sh "<icon>" "<text>" "<detail>" "<type>"
```
- Types: action, file, build, error, decision

## Heartbeat / watchdog
Set your agent name and send heartbeats so the watchdog tab shows real agent state:
```bash
export AGENT_NAME="networking-bridge"
bash /home/bilal/wow17/dashboard/heartbeat.sh "working" "WebRTC transport" "starting task"
# ... work ...
bash /home/bilal/wow17/dashboard/heartbeat.sh "idle" "" "waiting for next task"
```
