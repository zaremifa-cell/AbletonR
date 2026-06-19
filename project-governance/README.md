# Project Governance

This folder contains the working rules, project knowledge, quality-control process, session history, and review cycle for this project.

Before making changes, read:

1. `project-governance/README.md`
2. `project-governance/project-brief.md`
3. `project-governance/working-rules.md`
4. `project-governance/design-standards.md`
5. `project-governance/technical-standards.md`
6. `project-governance/quality-control.md`
7. `project-governance/visual-taste-profile.md`
8. `project-governance/design-decisions.md`
9. `project-governance/agent-speed-mode.md`
10. `project-governance/session-index.md`
11. `project-governance/review/consolidated-lessons.md`

Read `project-governance/visual-output-workflow.md` when the task involves references, visual direction, design variants, HTML visual briefs, or screenshot-based visual review.

## Purpose

The goal is to keep every work session consistent with project direction, previous decisions, known risks, and accepted quality standards.

## Required Work Cycle

1. Read the required governance files.
2. Identify the requested scope.
3. Determine likely affected files.
4. State what must not be changed.
5. Keep changes narrow and auditable.
6. Verify the result with relevant build/test checks and, for visual approval, user-provided screenshot review unless the user explicitly asks for browser verification.
7. Create a session log for meaningful work.
8. Update `session-index.md`.
9. Propose or apply review-cycle updates only when evidence supports them.

Do not run agent browser checks or agent-generated screenshots unless the user explicitly asks for browser verification.

## Conflict Rule

If instructions conflict, the stricter visual fidelity requirement wins.

## Documentation Boundary

This folder is intentionally neutral and reusable. It should not contain tool-specific ownership claims or visible statements about how the project was produced.
