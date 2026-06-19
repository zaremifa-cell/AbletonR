# Working Rules

## Startup Requirements

Before work begins, read the required files listed in `README.md`.

Then determine:

- task scope
- relevant standards
- likely affected files
- files and sections that must not be changed
- whether build verification is required
- whether visual confirmation needs a user-provided screenshot or an explicit user request for agent browser verification

## Daily Context Requirements

At the start of each working day, or when starting a new thread without loaded project context, extract a short working-memory summary from:

1. `project-governance/project-brief.md`
2. `project-governance/visual-taste-profile.md`
3. `project-governance/design-decisions.md`
4. `project-governance/review/consolidated-lessons.md`
5. the latest entries in `project-governance/session-index.md`
6. the latest relevant files in `project-governance/sessions/`

The summary should capture the user's durable criteria, accepted/rejected patterns, current unresolved issues, and recent implementation context. Use it to guide every subsequent prompt in that day. Keep the summary high-level and actionable; do not replay full session logs or turn it into a template.

Durable context to preserve:

- The user is the primary visual reviewer.
- Do not run browser checks, Playwright screenshots, headless screenshots, or agent-generated visual inspections unless the user explicitly asks for browser verification.
- When visual approval is needed, ask for a user screenshot.
- Move quickly with narrow edits, preserve accepted design direction, and avoid making the user repeat established preferences.

## Scope Rules

- Change only what was requested.
- Do not touch unrelated sections.
- Do not restyle unrelated components for consistency.
- Do not refactor unrelated code.
- Do not move files unless requested.
- Do not update dependencies unless the task requires it.

## Work Session Rules

- Keep changes narrow and auditable.
- Prefer existing project patterns.
- Stop and ask for clarification when the request is ambiguous.
- Record meaningful work in `sessions/`.
- Update `session-index.md` after creating a session log.

## End-Of-Session Requirements

For meaningful work:

1. Create a session log in `project-governance/sessions/`.
2. Update `project-governance/session-index.md`.
3. Record unresolved issues.
4. Record exact files changed.
5. Record build, test, and visual verification status, including whether visual approval depends on a user screenshot.
6. Add reusable lessons only when they are specific, evidence-based, and useful for future work.

## Review Updates

Use `project-governance/review/pending-updates.md` for uncertain updates.

Only apply permanent updates when they are:

- specific
- actionable
- project-relevant
- based on work-session evidence
- useful for preventing future mistakes
