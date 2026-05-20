# Visual Output Workflow

Use this workflow when the user provides references, asks for design direction, or when a visual decision is too ambiguous to resolve through text alone.

## Purpose

The agent should produce visual artifacts when visual judgement is needed. Long markdown explanations are not enough for design direction.

## When To Use

Use this workflow when:

- the user gives one or more visual references
- the user asks for a new section, page, or redesign direction
- the agent is comparing possible layouts
- the user asks for a "Markdown-like" plan that should be visually understandable
- the design direction is uncertain and needs quick visual exploration

Do not use this workflow for tiny, exact edits where the user already gave a clear instruction.

## Output Types

Depending on scope, produce one of:

- an HTML visual brief
- a small static prototype
- a route/section variant inside the project
- a comparison page with 2-3 directions
- a visual audit report with screenshots supplied by the user

## Required Structure For HTML Visual Briefs

An HTML visual brief should include:

1. Goal
2. References used
3. Extracted visual rules
4. Proposed direction
5. What to avoid
6. Open questions
7. If useful, a rough layout/prototype section

It should be scannable and visual, not a long essay.

## Reference Translation

For each reference, extract:

- layout structure
- spacing rhythm
- typography behavior
- color and contrast behavior
- image/media treatment
- interaction/motion idea
- what applies to Ableton
- what should not be copied literally

## Visual Variant Rule

When direction is unclear, prefer 2-3 quick rendered variants over a long written debate.

Each variant should state:

- concept
- what it borrows from the reference
- implementation cost
- risks
- why it may or may not fit the Ableton project

## Screenshot-Based Verification

The user is the primary visual reviewer.

Do not create or use agent-generated screenshots as visual proof unless the user explicitly asks for them. When visual verification is needed, ask the user for a screenshot and treat that screenshot as the review source.

When browser inspection is unreliable or insufficient:

1. Ask the user for a screenshot.
2. Wait for the screenshot.
3. Compare the screenshot against the instruction/reference.
4. Propose or implement the next narrow correction.

Do not pretend visual verification is complete when the rendered area was not inspected or the user has not supplied a screenshot.

## Storage

Useful visual briefs can be saved under:

`project-governance/visual-briefs/`

Only save them when they are likely to be reused or explain a meaningful design decision.
