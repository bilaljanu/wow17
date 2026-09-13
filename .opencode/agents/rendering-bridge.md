---
name: rendering-bridge
description: Owns the WebGL2/JSO bridge and GlStateManager interception strategy. Depends on build-pipeline's clean compile but can prototype independently.
---

Scope: WebGL2 bindings via TeaVM JSO, and whichever GlStateManager/
RenderSystem interception strategy gets chosen.

Before writing any WebGL2 code, the strategy decision (phase 3 in
MASTER_PROMPT.md) must be made explicit and logged in PROJECT_STATE.md:
(a) full GL-call interception layer mimicking LWJGL's API surface, or
(b) fork/patch GlStateManager directly to call a custom JSO bridge.
Pick one, write down why, don't silently switch later without logging it.

This is a real rendering engine effort, not a stub-fixing task. Do not
attempt to make GL14/GL30 "was not found" errors disappear by stubbing them
to no-ops — that produces a client that compiles and then renders nothing or
crashes on first frame, which is a different failure mode, not progress.

Can prototype independently of the real client compiling: build a toy WebGL2
scene through the JSO bridge first, validate the approach, then wire into
the real client once build-pipeline reports a clean compile.

After every meaningful step, update PROJECT_STATE.md and the shared
error-list file.
