# Technical Standards

## Stack

- Next.js App Router
- React
- TypeScript
- Plain CSS through the `src/styles.css` entrypoint and feature files in `src/styles/`
- Static assets in `public/`

## Migration Cleanup Status

- Next.js App Router is the only application runtime.
- Vite remains only as test and Storybook tooling through Vitest and Storybook's Vite builder.
- Large page areas should move into `src/features/<feature>` when they own multiple components, local state helpers, or route-specific behavior.
- Simpler visual page compositions can remain in `src/views/`.
- Do not create `src/pages/`, because Next.js will treat that folder as Pages Router.

## Framework Rules

- Use Next.js App Router for new routing work.
- Prefer server route files for metadata and static params, with client components only where browser APIs, localStorage, animation state, or interaction state are needed.
- Do not force Tailwind.
- Do not introduce new styling systems unless explicitly requested.
- Use the existing TypeScript and CSS setup.

## Component Rules

- Keep page-specific visual logic in the relevant `src/views/*` component or `src/features/<feature>` module.
- Add route-level Next metadata in `src/app/**/page.tsx` files.
- Use local React state for page-local interactions.
- Do not introduce global state for local UI behavior.
- Do not refactor unrelated components while implementing a requested change.

## CSS Rules

- Prefer scoped selectors for page-specific changes.
- Avoid broad selector changes that affect unrelated sections.
- Check shared selectors before changing colors or typography.
- Do not change `:root` tokens unless the user asks for a global change.
- Avoid accidental edits to global elements like `.promo`, `.nav`, or shared utility classes when changing page-specific styles.
- Split CSS by feature/component and shared behavior. Do not create global desktop/mobile folder trees; keep responsive rules near the feature when it is safe, or in `shared-responsive.css` when preserving cascade order is the lower-risk option.

## Build And Verification

- Run `npm run build` after meaningful TypeScript, React, Next, or CSS changes when feasible.
- Run `npm run typecheck`, `npm run lint`, and `npm run test` after framework or routing changes.
- Do not run agent browser checks, Playwright screenshots, headless screenshots, or other agent-generated screen inspections unless the user explicitly asks for browser verification.
- For visual work, rely on user-provided screenshots for visual approval unless the user explicitly asks the agent to verify in the browser.
- If build or visual verification cannot be run, state that clearly.

## Dependencies

- Do not introduce dependencies unless explicitly requested or clearly necessary.
- Do not update dependencies unless the task requires it.

## Version Control

- Do not commit or push unless explicitly requested.
- When asked to save everything, check status, stage requested files, commit, push, and verify final status.
- Never discard user changes without explicit instruction.

## Deprecated Vite-Era Rules

The following rules were replaced by the Next.js migration:

- Vite as the primary runtime.
- React Router as the primary runtime router.
- Static meta management through `usePageMeta` as the only SEO layer.
- Legacy `src/App.tsx`, `src/main.tsx`, `index.html`, and `vite.config.ts` runtime files.
