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

## Rendered Verification

- Rendered output is the final judge.
- After meaningful visual changes, inspect the browser result when possible.
- Compare against the reference or user instruction.
- If exact pixel comparison is not possible, state that exact verification was not performed.
- Do not claim visual fidelity without visual inspection.

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
