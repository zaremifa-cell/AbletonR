# Ableton Programme

A portfolio case study that reimagines Ableton's product ecosystem as a precise, editorial product archive. The project combines Ableton's software and hardware language with a restrained Braun-inspired catalogue system, then implements it as a production Next.js application.

> Personal portfolio project. Not affiliated with, endorsed by, or connected to Ableton AG.

## Live Demo

[https://ableton-r.vercel.app](https://ableton-r.vercel.app)

## Why This Project Exists

This project exists to demonstrate product-minded frontend work beyond a single landing page. It covers routing, responsive layout systems, data-driven product pages, interaction design, cart flows, documentation, automated tests, and production deployment.

The goal is to show how a visually ambitious portfolio piece can still be structured like a maintainable application.

## Case Study Framing

**Problem:** Ableton has a broad product ecosystem: Live, Push, Move, Note, Packs, education, shop, account, and purchase flows. A portfolio redesign needs to communicate that ecosystem without becoming a static Dribbble-style mockup.

**Approach:** Build a multi-page product archive with strong typographic hierarchy, strict responsive behavior, feature-scoped code, and real navigation/cart interactions.

**Outcome:** A deployed Next.js application with product pages, dynamic pack routes, shop/product detail flows, account-style surfaces, mobile-specific interactions, unit tests, E2E coverage, and CI quality gates.

## Screenshots

| Desktop Home | Desktop Live |
| --- | --- |
| ![Home desktop screenshot](public/readme/home-desktop.png) | ![Live desktop screenshot](public/readme/live-desktop.png) |

| Mobile Shop | Mobile Note |
| --- | --- |
| ![Shop mobile screenshot](public/readme/shop-mobile.png) | ![Note mobile screenshot](public/readme/note-mobile.png) |

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Route-level metadata and static generation
- Feature-scoped CSS design system
- Vitest and React Testing Library
- Playwright E2E/audit tests
- Storybook for isolated layout components
- ESLint, Prettier, Husky, lint-staged
- Vercel deployment

## Architecture

The application uses Next.js App Router as the production runtime. Route files stay small and focus on metadata, static params, and passing route props into page implementations.

```txt
src/app/        App Router routes, metadata, static params, server wrappers
src/features/   Larger feature modules with local UI and state helpers
src/views/      Simpler page-level visual compositions
src/components/ Shared layout, section, icon, and utility components
src/contexts/   Client-side cart and preview state
src/data/       Product, pack, footer, and navigation data
src/lib/        Framework adapters and business utilities
src/styles/     Feature-scoped CSS files imported by src/styles.css
src/test/       Vitest setup and framework mocks
e2e/            Playwright coverage for key routes and user flows
```

More detail: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## Testing Strategy

The project uses layered checks rather than relying on one broad test type:

- **Type safety:** `npm run typecheck`
- **Code quality:** `npm run lint`
- **Unit and interaction tests:** `npm run test`
- **Production build validation:** `npm run build`
- **E2E route smoke tests:** `npm run test:e2e`
- **UI audit script:** `npm run audit:ui`
- **Storybook build:** `npm run build-storybook`

GitHub Actions runs the core quality gate on every push and pull request: install, typecheck, lint, tests, and build.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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

## Known Limitations

- This is a portfolio concept, not an official Ableton product or commerce system.
- Checkout and account flows are local/demo flows; they do not process real payments or authenticate against a backend.
- Some visual assets are static portfolio assets rather than CMS-managed content.
- `next/image` migration is a future optimization pass; the current build preserves custom image behavior with standard image elements.
- Storybook still uses the Vite builder as tooling, while the application runtime is Next.js.

## Repository Notes

Internal design decisions and session notes live under `project-governance/`. They document the design and migration process, but the public-facing technical overview is [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
