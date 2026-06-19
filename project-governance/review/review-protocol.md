# Review Protocol

## Purpose

The review cycle turns session history into durable project knowledge. It is evidence-based consolidation, not vague summarization.

## When To Run

Run this process after major sessions, especially when:

- the user corrected an implementation direction
- a visual decision was accepted or rejected
- a repeated mistake occurred
- a reusable implementation pattern emerged
- a fragile area was discovered
- the project direction changed

## Required Inputs

Review:

1. latest session log
2. previous session logs
3. `project-brief.md`
4. `working-rules.md`
5. `design-standards.md`
6. `technical-standards.md`
7. `quality-control.md`
8. `review/consolidated-lessons.md`

## Extract

Identify:

- repeated mistakes
- successful patterns
- fragile areas
- user preferences
- design constraints
- technical constraints
- new rules that should become permanent project knowledge

## Criteria For Permanent Updates

Only add a lesson or rule to permanent documentation if it is:

- specific
- actionable
- project-relevant
- based on work-session evidence
- useful for preventing future mistakes

Do not add vague rules such as "be careful" or "make it better."

## Pending Updates

If an update is uncertain, speculative, or needs user confirmation, write it to:

`project-governance/review/pending-updates.md`

Do not apply uncertain updates directly to permanent files.

## Consolidated Lessons Format

Each lesson in `review/consolidated-lessons.md` must include:

- lesson
- evidence/source
- why it matters
- rule to follow next time

## Output

At the end of a review cycle, record:

- what was reviewed
- what permanent lessons were added
- what pending updates were proposed
- what was intentionally not added
