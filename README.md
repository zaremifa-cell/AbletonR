# Ableton Programme

A portfolio redesign concept for Ableton, built as a precise product archive for music-making tools. The visual direction combines Ableton's software and hardware language with the disciplined catalogue logic of Braun and Dieter Rams references.

> Personal portfolio project. Not affiliated with, endorsed by, or connected to Ableton AG.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Route-level metadata and static generation
- Custom CSS design system
- Vitest, React Testing Library, Playwright, Lighthouse CI
- ESLint, Prettier, Husky, lint-staged

## Project Focus

- Premium product-led visual system
- Responsive desktop and mobile layouts
- Multi-page catalogue flow for Live, Push, Move, Packs, Rent-to-Own, and Shop
- Interactive product panels, cart flow, newsletter form, and account-style surfaces
- Clear semantic structure, strong typography, and restrained motion

## Getting Started

```bash
npm install
npm run dev
```

The active runtime is Next.js. Legacy Vite comparison commands remain available during migration:

```bash
npm run dev:vite
npm run build:vite
```

## Quality Checks

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

## Production Preview

```bash
npm run build
npm run preview
```

## Repository Notes

Internal design decisions and session notes live under `project-governance/`. They are working documentation for the design process, not part of the public product surface.
