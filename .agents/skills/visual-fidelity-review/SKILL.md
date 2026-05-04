---
name: visual-fidelity-review
description: Use this skill for any UI implementation or refinement task based on screenshots, visual references, browser renders, spacing, typography, layout, colors, proportions, or pixel fidelity. Do not use for non-visual backend tasks.
---

# Visual Fidelity Review Skill

## Goal

Recreate the provided visual reference as accurately as possible in real frontend code.

The reference screenshot is the visual source of truth.

Do not redesign.
Do not reinterpret.
Do not decorate.
Do not fake the result.

The goal is visual fidelity, not creative improvement.

## When to use this skill

Use this skill whenever the task involves:

- implementing UI from a screenshot
- refining UI to match a screenshot
- comparing a coded result against a reference
- adjusting layout
- adjusting spacing
- adjusting typography
- adjusting colors
- adjusting proportions
- improving pixel fidelity
- correcting visual mismatches

## Absolute prohibitions

Never:

- insert the screenshot into the page
- use the screenshot as an image
- use the screenshot as a CSS background
- use the screenshot as an overlay
- use the screenshot as a crop source
- use the screenshot as a mask
- use the screenshot as a canvas shortcut
- trace the screenshot as a fake UI
- crop parts of the screenshot and reuse them
- claim visual fidelity without comparing against a current rendered result
- continue visual refinement blindly without a current rendered screenshot
- change unrelated sections
- add decorative elements not visible in the reference

The screenshot may be used only as a reference.

## Required visual loop

For every visual task, follow this loop:

1. Inspect the original reference screenshot.
2. Identify the exact target section.
3. Extract measurable visual requirements:
   - layout structure
   - element sizes
   - spacing
   - alignment
   - typography
   - font weight
   - font size
   - line height
   - letter spacing
   - colors
   - contrast
   - borders
   - radius
   - shadows
   - proportions
4. Implement only the requested change.
5. Inspect the rendered result if this can be done reliably.
6. If rendered inspection is not reliable, stop and ask the user for a fresh screenshot of the current coded result.
7. Compare the current rendered screenshot against the original reference screenshot.
8. List the visual mismatches.
9. Fix the highest-impact mismatch first.
10. Repeat until the result is materially closer to the reference.

Do not continue visual refinement without a current rendered-result screenshot.

## User screenshot rule

If you cannot reliably inspect the browser output yourself, ask the user exactly this:

"Please provide a fresh screenshot of the current rendered result so I can compare it against the original reference before continuing."

After receiving the screenshot:

1. Treat it as the current coded render.
2. Compare it against the original target reference.
3. Identify concrete visual mismatches.
4. Fix the most important mismatch first.
5. Do not continue to the next visual area until the current area has been compared.

Never say the visual result is correct unless it has been compared against a current rendered screenshot.

## Edit priority

Fix visual problems in this order:

1. Overall layout structure
2. Major proportions
3. Alignment
4. Spacing
5. Typography size
6. Typography weight
7. Line height and letter spacing
8. Color and contrast
9. Borders and radius
10. Shadows and fine details

Do not polish small details before the main structure is correct.

## Measurement behavior

When working from a screenshot:

- use the screenshot dimensions as a reference
- estimate pixel distances carefully
- compare relative distances between elements
- compare text scale against surrounding elements
- compare white space and density
- compare the hierarchy before adjusting details
- prefer measurable differences over vague visual judgment

Do not rely on memory.
Do not rely on generic design taste.
Rely on the reference.

## Scope control

Only edit files and sections required for the requested visual change.

Do not:

- refactor unrelated code
- rename unrelated files
- normalize unrelated styles
- change unrelated layout areas
- replace unrelated assets
- introduce new visual systems
- clean up code outside the task scope

## Comparison report

When comparing the current render to the reference, report mismatches concretely.

Bad:
- "It looks close."
- "The layout is improved."
- "The design is cleaner."

Good:
- "The right column is approximately 20px too far left."
- "The heading weight is heavier than the reference."
- "The vertical spacing between the title and image is too large."
- "The background is darker than the reference."
- "The card radius is too round."

## Stop conditions

Stop and ask the user when:

- the rendered result cannot be inspected reliably
- the screenshot is unclear
- the target section is ambiguous
- the requested change conflicts with the reference
- further refinement would require guessing
- a fresh rendered screenshot is needed for comparison

## Final response format

At the end of each iteration, respond only with:

1. Changed:
2. Still different:
3. Needs user screenshot: yes/no
4. Unclear / needs confirmation:
5. Screenshot copy check:
   - no screenshot pixels were copied, embedded, cropped, traced, or reused directly
