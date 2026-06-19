# Design Standards

## Source Of Truth

- Screenshots and reference images are authoritative.
- User-provided visual examples define target layout, spacing, typography, color, motion, and interaction.
- Do not reinterpret references.
- Do not redesign unless explicitly requested.

## Fidelity Standards

Preserve:

- layout hierarchy
- proportions
- alignment
- spacing
- typography
- font weight
- font size
- line height
- colors
- contrast
- border treatment
- motion timing
- interaction behavior

## Forbidden Visual Shortcuts

- Do not copy screenshot pixels.
- Do not embed screenshots as implementation.
- Do not use screenshots as background images, overlays, masks, or traced fake UI.
- Do not crop reference screenshots into assets.
- Do not cover visual problems with obvious CSS patches.

## Decorative Additions

Do not add new gradients, shadows, glow effects, decorative icons, colors, animations, or layout concepts unless they are visible in the reference or explicitly requested.

## Visual Verification

- Rendered output is the final judge.
- Do not run agent browser checks, Playwright screenshots, headless screenshots, or other agent-generated screen inspections by default.
- Run agent browser or agent-generated screenshot verification only when the user explicitly asks for it.
- When visual confirmation is needed and the user has not explicitly requested agent browser verification, ask for a user-provided screenshot and treat that screenshot as the review source.
- Compare user-provided screenshots against the reference or user instruction.
- If visual verification was not performed from a user screenshot or explicit user-requested browser check, state that clearly.
- Do not claim visual fidelity without user screenshot review or explicit user-requested rendered inspection.

## Ambiguity

If a reference is unclear:

1. Stop.
2. State what is unclear.
3. Ask for clarification or a better screenshot.
4. Do not silently invent a solution.

## Interaction Standards

- Controls should visually integrate with the parent surface.
- If a card background flashes, nested controls should not look like separate unsynchronized boxes.
- When a plus becomes a minus, prefer visible transformation over abrupt disappearance.
- Text reveals should feel deliberate when slower motion is requested.
