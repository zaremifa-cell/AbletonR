# Consolidated Lessons

Permanent lessons distilled from project sessions. Add only specific, evidence-based, reusable lessons.

## Lesson 1: Scope visual changes tightly

- Lesson: Visual changes must target only the requested section and selectors.
- Evidence/source: Imported from prior user/project context before formal session logging existed.
- Why it matters: Broad background changes accidentally affected unrelated areas, including the promo bar and lower Push sections.
- Rule to follow next time: Before changing CSS, identify the exact selectors for the target section and verify unrelated shared selectors are not affected.

## Lesson 2: Do not fake image fixes with obvious CSS patches

- Lesson: If the user asks for image/background fidelity, do not cover a mismatch with a visible CSS block.
- Evidence/source: Imported from prior user/project context before formal session logging existed.
- Why it matters: The user rejected a CSS patch as amateur because it did not actually solve the asset fidelity problem.
- Rule to follow next time: For image asset problems, first use the correct provided asset or a deterministic asset workflow; do not fake the result with a CSS overlay unless explicitly requested.

## Lesson 3: Visual claims need user screenshot review

- Lesson: For visual work, build success is not enough.
- Evidence/source: Imported from prior user/project context before formal session logging existed.
- Why it matters: Some CSS changes appeared correct in code but did not affect the actual rendered section as intended.
- Rule to follow next time: Ask for and use a fresh user screenshot before claiming visual correctness. Do not run agent browser checks or agent-generated screenshots unless the user explicitly asks for browser verification.

## Lesson 4: Preserve accepted interaction patterns

- Lesson: Once a user approves an interaction direction, refine only the requested detail.
- Evidence/source: Imported from prior user/project context before formal session logging existed.
- Why it matters: The user approved the compact card and plus/minus behavior, then requested only timing and visual refinements.
- Rule to follow next time: Do not restructure approved interaction logic unless explicitly asked.

## Lesson 5: Make dark image transitions gradual, not abrupt

- Lesson: When replacing a white/light-feeling product-image transition with a darker one, preserve the accepted smooth crossfade feel.
- Evidence/source: `project-governance/sessions/2026-05-18-0950-session.md`, user feedback on the Push expressive-instrument plus interaction and rejection of the first abrupt blackout attempt.
- Why it matters: The user wanted the transition to become dark instead of white, but explicitly rejected an instant black screen because the earlier smooth transition behavior felt better.
- Rule to follow next time: Do not add a hard blackout hold as the first solution. Keep the previous transition structure where possible, switch the underlying transition surface to black, and tune opacity/brightness gradually.

## Lesson 6: Register image layers before tuning crossfade curves

- Lesson: Product image crossfades need both images rendered in the same fixed-size stage with identical positioning, sizing, and object-fit rules before opacity timing is tuned.
- Evidence/source: `project-governance/sessions/2026-05-18-0950-session.md`, Push expressive-instrument transition refinement.
- Why it matters: Tuning easing and opacity by eye did not solve the unprofessional feeling because the active and previous image layers were not rendered with exactly the same layout rules, and the source image dimensions differed slightly.
- Rule to follow next time: For image swaps, first create a stable image stage with a fixed aspect ratio and absolutely stacked layers, then add a separate shared dim/transition layer if darkening is needed.

## Lesson 7: Hide pixel mismatch with fade-through-dim

- Lesson: When two images are not perfectly pixel-aligned, avoid direct crossfade and use a fade-through-dim transition with a short dark hold.
- Evidence/source: `project-governance/sessions/2026-05-18-0950-session.md`, Push expressive-instrument transition refinement.
- Why it matters: Direct opacity overlap made the two Push images visibly double or shift, while the dark hold hides the handoff.
- Rule to follow next time: Keep both images fixed in the same stage, animate only opacity, raise the dim layer first, fade out the old image under darkness, fade in the new image while still dimmed, then remove the dim layer.

## Lesson 8: Do not ship derived overlays without visual match

- Lesson: A transparent overlay asset can be useful only if its brightness, edge feather, and registration match the base render closely enough to avoid visible light/dark mismatch.
- Evidence/source: `project-governance/sessions/2026-05-18-0950-session.md`, rejected generated overlay attempt for the Push expressive-instrument transition.
- Why it matters: The derived overlay introduced a visible patch-like light/dark difference, which the user rejected as not professional.
- Rule to follow next time: If using a partial overlay, verify it visually as a static final state before judging the transition; otherwise revert to the better full-image state or obtain a proper source asset for the changing region.

## Lesson 9: Do not let split-layout titles collide with dividers

- Lesson: In a hard split-screen layout, large centered titles must be composed around the divider instead of allowing letters to cross it.
- Evidence/source: `project-governance/sessions/2026-05-18-0950-session.md`, Push `Two ways to work` correction after the title crossed the central split line.
- Why it matters: A single letter intersecting the divider made the layout look accidental even though the images were correct.
- Rule to follow next time: If a title spans a split layout with a visible center divider, split the title into left/right spans or otherwise reserve a clear center gap before tuning image placement.

## Lesson 10: User screenshots are the visual review source

- Lesson: Do not use agent-generated screenshots as proof of visual correctness unless the user explicitly asks for them.
- Evidence/source: 2026-05-19 user correction after an agent screenshot-based check missed that the previous Push `Two ways to work` footer was still visible above the Connections section.
- Why it matters: The user's browser screenshot is the authoritative visual context; agent screenshots can capture a different scroll position, viewport, or state and lead to incorrect claims.
- Rule to follow next time: For visual approval, ask for and use the user's screenshot. Use build/code checks for technical validation only, and do not run or claim visual correctness from agent-created screenshots unless the user explicitly asks for browser verification.

## Lesson 11: Use evidence for alignment instead of estimating it

- Lesson: When the user asks for two visual elements to share an exact line or equal distance from a divider, use concrete evidence instead of estimating by eye.
- Evidence/source: `project-governance/sessions/2026-05-28-0926-session.md`, Shop hero correction where `Buying flow` and `View cart` needed equal distance from the lower white line.
- Why it matters: Repeated eye-based adjustments created frustration and moved the wrong element. The successful correction measured the lower hero line to `Buying flow` and `View cart` and made both distances 35px.
- Rule to follow next time: If exact alignment is requested, use code-level geometry and user screenshots by default. Measure rendered element rects and report before/after distances only when the user explicitly asks for browser verification.

## Lesson 12: Preserve vertical hierarchy during alignment refinements

- Lesson: Do not convert vertically grouped content into separate horizontal grid columns when the user only asks for alignment and spacing refinement.
- Evidence/source: `project-governance/sessions/2026-05-28-0926-session.md`, Shop hero correction where splitting `Shop` and its description into side-by-side grid items was rejected.
- Why it matters: The requested result was the original hierarchy with better alignment, not a new composition.
- Rule to follow next time: Before changing layout model, confirm whether the existing hierarchy should remain. Prefer margin, padding, line-height, and measured offsets over structural layout changes when the hierarchy is already accepted.

## Lesson 13: Scroll affordances must not block scrolling

- Lesson: Adding a cue for horizontal product scrolling must not interfere with natural rail scrolling.
- Evidence/source: `project-governance/sessions/2026-05-28-0926-session.md`, Shop product rail correction where a JavaScript wheel guard prevented left/right scrolling and was rejected.
- Why it matters: The indicator is secondary; the primary interaction must remain usable.
- Rule to follow next time: For horizontal rail cues, prefer passive progress state and CSS overscroll containment. Do not intercept wheel/touch gestures unless there is a measured bug and the fix preserves native scrolling.
