# Architecture

Ableton Programme is a Next.js App Router portfolio application. The production runtime is Next.js; Vite remains only as developer tooling through Vitest and Storybook.

## Goals

- Keep public routes stable and easy to inspect.
- Separate route metadata from visual/product logic.
- Group larger surfaces by feature rather than by device breakpoint.
- Preserve a custom visual system without introducing unnecessary UI frameworks.
- Keep the project deployable and verifiable through repeatable quality gates.

## Routes

Routes live in `src/app` and use App Router conventions:

```txt
src/app/page.tsx                         Home
src/app/live/page.tsx                    Live 12
src/app/push/page.tsx                    Push 3
src/app/move/page.tsx                    Move
src/app/note/page.tsx                    Note
src/app/packs/page.tsx                   Packs index
src/app/packs/[packSlug]/page.tsx        Static pack detail routes
src/app/rent-to-own/page.tsx             Rent-to-own flow
src/app/shop/page.tsx                    Shop landing
src/app/shop/cart/page.tsx               Cart
src/app/shop/checkout/page.tsx           Checkout demo flow
src/app/shop/account/page.tsx            Account-style demo surface
src/app/shop/product/[productSlug]/page.tsx  Product detail
```

Route files are intentionally thin. They own metadata, static params, and route props; the visual implementation lives in `src/views` or `src/features`.

## Feature Structure

```txt
src/features/shop/
  ShopPage.tsx          Shop route switcher and page-level UI
  ProductCard.tsx       Product card component
  accountStorage.ts     Local demo account/order persistence
  ShopPage.test.tsx     Shop flow tests
  index.ts              Feature exports
```

The Shop flow is feature-scoped because it owns multiple routes, local persistence, product cards, checkout UI, account panels, and cart interactions.

Simpler visual compositions remain in `src/views`. This keeps the migration pragmatic: features move when they have enough internal responsibility to justify a boundary.

## Data Model

Structured content lives in `src/data`:

- Product catalogue data
- Pack metadata and dynamic pack slugs
- Navigation items
- Footer/social links

Business utilities live in `src/lib`, including cart calculations, navigation adapters, and formatting helpers.

## State

Client state is intentionally small:

- `CartContext` owns cart items and cart actions.
- `PackPreviewContext` owns pack preview/hover state.
- Shop account/order history is local demo persistence in `src/features/shop/accountStorage.ts`.

No global state library is used because the app state is small and feature-local.

## Styling

The project uses one CSS entrypoint:

```txt
src/styles.css
```

That entrypoint imports feature and shared CSS files in cascade order:

```txt
src/styles/base.css
src/styles/rent-to-own.css
src/styles/home.css
src/styles/push.css
src/styles/move.css
src/styles/note.css
src/styles/packs.css
src/styles/shop.css
src/styles/live.css
src/styles/shared-responsive.css
src/styles/motion-accessibility.css
```

Responsive code is not split into global mobile/desktop folders. It stays feature-oriented where safe, with shared responsive overrides kept in cascade order during the migration.

## Testing

The testing strategy is layered:

```bash
npm run typecheck    # TypeScript project references
npm run lint         # ESLint with zero warnings
npm run test         # Vitest + React Testing Library
npm run build        # Next.js production build
npm run test:e2e     # Playwright route/user-flow coverage
npm run audit:ui     # Targeted Playwright UI audit script
```

CI runs the core gate: install, typecheck, lint, unit tests, and production build.

## Deployment

The application is deployed to Vercel as a Next.js project.

Production domain:

```txt
https://ableton-r.vercel.app
```

Production builds use:

```bash
npm run build
```

## Follow-Up Opportunities

- Move more large `src/views` pages into feature modules as they grow.
- Convert selected static image usage to `next/image` after visual parity is locked.
- Add more focused tests around mobile navigation and pack/product detail edge cases.
- Add visual regression snapshots once the final portfolio visuals are approved.
