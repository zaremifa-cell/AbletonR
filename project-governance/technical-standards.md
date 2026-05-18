# Technical Standards

## Stack

- Vite
- React
- TypeScript
- Plain CSS in `src/styles.css`
- Static assets in `public/`

## Framework Rules

- Do not assume Next.js unless the project is changed to use it.
- Do not force Tailwind.
- Do not introduce new styling systems unless explicitly requested.
- Use the existing Vite, React, TypeScript, and CSS setup.

## Component Rules

- Keep page-specific logic in the relevant component.
- Keep Push page logic in `src/components/Push3Page.tsx`.
- Keep Live page logic in `src/components/Live12Page.tsx`.
- Use local React state for page-local interactions.
- Do not introduce global state for local UI behavior.
- Do not refactor unrelated components while implementing a requested change.

## CSS Rules

- Prefer scoped selectors for page-specific changes.
- Avoid broad selector changes that affect unrelated sections.
- Check shared selectors before changing colors or typography.
- Do not change `:root` tokens unless the user asks for a global change.
- Avoid accidental edits to global elements like `.promo`, `.nav`, or shared utility classes when changing page-specific styles.

## Build And Verification

- Run `npm run build` after meaningful TypeScript, React, or CSS changes when feasible.
- For visual work, inspect rendered output when possible.
- If build or visual inspection cannot be run, state that clearly.

## Dependencies

- Do not introduce dependencies unless explicitly requested or clearly necessary.
- Do not update dependencies unless the task requires it.

## Version Control

- Do not commit or push unless explicitly requested.
- When asked to save everything, check status, stage requested files, commit, push, and verify final status.
- Never discard user changes without explicit instruction.
