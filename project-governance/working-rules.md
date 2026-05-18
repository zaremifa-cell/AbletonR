# Working Rules

## Startup Requirements

Before work begins, read the required files listed in `README.md`.

Then determine:

- task scope
- relevant standards
- likely affected files
- files and sections that must not be changed
- whether visual verification is required

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
5. Record build, test, and visual verification status.
6. Add reusable lessons only when they are specific, evidence-based, and useful for future work.

## Review Updates

Use `project-governance/review/pending-updates.md` for uncertain updates.

Only apply permanent updates when they are:

- specific
- actionable
- project-relevant
- based on work-session evidence
- useful for preventing future mistakes
