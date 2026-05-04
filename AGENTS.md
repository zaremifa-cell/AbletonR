# AGENTS.md

## Purpose

This project is built from visual references.

The reference screenshot is the visual source of truth.

The goal is not to approximate the design.
The goal is to reproduce the reference as accurately as possible in real frontend code.

This is not a redesign task.
This is not a creative interpretation task.
This is not a styling improvisation task.

The task is to recreate the referenced UI faithfully in code.

## Global rules

1. The screenshot is authoritative.

Do not reinterpret it.
Do not redesign it.
Do not "improve" it.
Do not replace it with a different visual idea.

2. Recreate the UI in real code.

Use frontend code, layout, typography, spacing, components, CSS and assets.
Do not fake the final result.

3. Never copy or embed the screenshot itself.

Do not insert the screenshot into the page.
Do not use it as an image.
Do not use it as a CSS background.
Do not use it as an overlay.
Do not use it as a masked layer.
Do not use it as a canvas shortcut.
Do not trace it as a fake UI.
Do not crop parts of it and reuse them.

The screenshot is reference only.

4. No cropping tricks.

Every visible element must be recreated in code.
No part of the screenshot may be reused directly as a visual asset.

5. Modify only what is requested.

Do not change unrelated sections.
Do not change unrelated files.
Do not change unrelated components.
Do not change unrelated layout.
Do not change unrelated spacing.
Do not change unrelated typography.
Do not change unrelated behavior.

6. Preserve visual fidelity.

Match as closely as possible:

- layout structure
- spacing
- alignment
- element sizes
- width and height
- proportions
- typography
- font family
- font weight
- font size
- line height
- letter spacing
- colors
- contrast
- borders
- corner radius
- shadows
- density
- hierarchy

7. Rendered output is the final judge.

Correctness is determined by the rendered browser result.
Correctness is not determined by whether the source code looks clean.
Correctness is not determined by whether the implementation seems reasonable.

8. No decorative additions.

Do not add gradients, shadows, glows, icons, borders, animations, new colors, new layout ideas, or visual effects unless they are visible in the reference or explicitly requested.

9. No guessing.

If the reference is unclear, incomplete, hidden, low-resolution, or ambiguous, stop and report the ambiguity.
Do not silently invent a solution.

10. Pixel accuracy matters.

Use the screenshot dimensions and visible relationships as measurement references.
Estimate pixel values carefully.
Prefer measurable visual relationships over vague approximation.

## Required workflow

For every visual implementation or refinement task, follow this exact loop:

1. Inspect the original reference screenshot carefully.
2. Identify the exact target section.
3. Determine what must be matched:
   - structure
   - spacing
   - alignment
   - sizes
   - proportions
   - typography
   - colors
   - hierarchy
4. Implement only the requested change.
5. If you can reliably inspect the rendered result inside your environment, do so.
6. If you cannot reliably inspect the rendered result, ask the user for a fresh screenshot of the current coded result before continuing visual refinement.
7. Compare the current rendered result against the original reference screenshot.
8. Identify the visual mismatches.
9. Fix the highest-impact mismatch first.
10. Repeat until the rendered result is materially closer to the reference.

Do not continue visual refinement blindly without a current rendered-result screenshot.

## User-provided render screenshot rule

If direct browser inspection is unreliable or unavailable, ask the user for a fresh screenshot of the current rendered output.

Use this exact request:

"Please provide a fresh screenshot of the current rendered result so I can compare it against the original reference before continuing."

After the user provides the screenshot:

1. Compare the user-provided rendered screenshot against the original reference.
2. Identify mismatches.
3. Fix only the highest-impact mismatch first.
4. Ask again for a new rendered screenshot if further visual comparison is needed.

Never pretend to have validated visual fidelity if no current rendered-result screenshot was inspected.

## Visual QA checklist

Before finishing, verify:

- Is the correct section being edited?
- Is the layout structure faithful to the reference?
- Are spacing and alignment close enough?
- Are proportions close enough?
- Are typography, weights and sizes close enough?
- Are colors and contrast close enough?
- Did I avoid redesign?
- Did I avoid decorative additions?
- Did I avoid touching unrelated sections?
- Did I avoid copying, embedding, cropping, tracing, or reusing screenshot pixels?
- Is the current rendered result closer to the reference than before?

If any answer is no, continue refining or report the blocker.

## Forbidden shortcuts

The following are forbidden:

- inserting the screenshot into the page
- cropping parts of the screenshot and reusing them
- tracing the screenshot as a fake UI
- using the screenshot as a background to simulate completion
- making unrelated edits "for consistency"
- replacing accurate structure with a rough mockup
- continuing visual refinement without inspecting a current rendered-result screenshot
- claiming visual fidelity without comparison
- adding decorative elements not present in the reference

## Ambiguity rule

If the reference is ambiguous, incomplete, hidden, too low-resolution, or visually unclear:

1. Stop guessing.
2. Report exactly what is unclear.
3. Ask the user for clarification or a better screenshot.
4. Do not silently choose an invented solution.

## Scope rule

Unless explicitly requested, do not:

- refactor unrelated code
- rename unrelated files
- restyle unrelated sections
- normalize spacing outside the target area
- replace assets outside the target area
- change behavior outside the requested scope
- update dependencies
- restructure the project

## Major-change rule

If a requested change is structurally large, first state briefly:

- what will be changed
- which files or sections will be affected
- what visual risk exists

Then proceed carefully and validate with the rendered screenshot loop.

## Final response format

At the end of each visual iteration, respond only with:

1. Changed:
2. Still different:
3. Needs user screenshot: yes/no
4. Unclear / needs confirmation:
5. Screenshot check:
   - compared against current rendered-result screenshot: yes/no
6. Screenshot copy check:
   - no screenshot pixels were copied, embedded, cropped, traced, or reused directly
