# Project Brief

## What This Project Is

Ableton Redesign is a Vite, React, and TypeScript frontend project for an Ableton-inspired website. The project is visually driven. User-provided screenshots, examples, and direct visual feedback are the source of truth.

## Design Direction

The project draws from Ableton product identity and a Braun / Dieter Rams influenced visual language:

- restrained layouts
- strong product imagery
- grid-based structure
- precise typography
- minimal decoration
- functional interactions
- controlled visual density through spacing and alignment

The project is not a free redesign exercise. It is an iterative implementation guided by exact visual direction.

## Important User Preferences

- High visual fidelity matters more than broad creative interpretation.
- Narrow, direct changes are preferred over broad refactors.
- Rendered browser output is the final judge for visual work.
- Obvious patch solutions should be avoided.
- Scope must be understood and preserved.
- Previous successes, failures, and unresolved work must remain visible in project history.

## Known Successful Patterns

- Push page interaction changes should use direct React state and tightly scoped CSS.
- If the request is image replacement, first use the exact asset path in `public/`.
- Toggle controls should be visually integrated with their parent surface.
- Crossfades can hide imperfect alignment between related product images.

## Known Failed Patterns

- Do not fake an image background with a visible CSS block when the expected result is an actual asset or faithful image treatment.
- Do not apply styling beyond the requested section.
- Do not alter shared elements such as the promo bar while changing page-specific background colors.
- Do not claim a section changed without verifying the actual selector and rendered result.

## Architecture

- Main routing: `src/App.tsx`
- Push page: `src/components/Push3Page.tsx`
- Live page: `src/components/Live12Page.tsx`
- Shared styles: `src/styles.css`
- Static assets: `public/`

## Visual Language

- Condensed sans-serif typography.
- Hairline dividers.
- Restrained color palette.
- Product-first imagery.
- Intentional motion, not decorative motion.

## Constraints

- Product code must not be modified during governance-only work.
- Visual changes must remain scoped.
- Build command: `npm run build`
- Local Vite server is typically `http://127.0.0.1:5173/`.
