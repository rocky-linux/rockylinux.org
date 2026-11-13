# CLAUDE.md

Official Rocky Linux website — Next.js App Router, React, TypeScript, next-intl, shadcn/ui (Radix), Tailwind.

## Commands

- `npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck` · `npm run test` (Jest) · `npm run e2e` (Playwright)
- `npm run check:downloads` — verify URLs in `data/downloads.json`
- Before committing, run `npm run lint`, `npm run typecheck`, and `npm run test` yourself and fix warnings too. The husky pre-commit hook only runs eslint (errors block, warnings don't) and prettier on staged files — it does not typecheck or run tests.
- `predev`/`prebuild`/`postinstall` clone content from rocky-linux/rockylinux.org-content. Set `SKIP_NEWS_FETCH=1` when offline.

## Layout

- Pages: `app/[locale]/<route>/page.tsx`; page-only components in `app/[locale]/<route>/components/`
- Reusable feature components: `components/` or `components/<feature>/`; UI primitives (shadcn/ui only): `components/ui/`
- Global types: `types/`; ambient declarations: `@types/`; app-wide hooks: `hooks/` (create with the first one)
- Data: `data/*.json`; locale config: `config/i18nProperties.ts`, `i18n/`
- `proxy.ts` is Next 16's replacement for `middleware.ts` — never create a `middleware.ts`
- Import alias `@/*` → repo root

## Content repo

Some content lives in rocky-linux/rockylinux.org-content and is cloned in at dev/build time (`scripts/fetch-news-content.mjs`). The affected paths are listed under the content-repo comment in `.gitignore` (currently `news/`, `events/`, and `public/images/content/`). Never create or edit files there — they're overwritten on every fetch and never committed. New or changed content (e.g. a news post or an event) goes in a PR to the content repo; only rendering code belongs here.

## Conventions

- All user-facing text via next-intl. Add strings ONLY to `messages/en.json` — Crowdin generates the other locales.
- Use `Link` and navigation helpers from `@/i18n/navigation`, never `next/link`.
- Pages are server components that compose structure via `children`; client state lives in a provider with a custom hook, not in the page. See `docs/development/pages-and-navigation.md` before creating or restructuring a page.
- React component props are typed `Readonly<Props>` (SonarQube S6759).
- Every exported function, component, and hook has a full JSDoc block: summary, `@param` for each parameter (including destructured props fields), `@returns`, and `@throws` when it can throw.
- Follow WCAG 2.1 AA.
- Write tests for new features and bug fixes.

## TypeScript

- IMPORTANT: Never use `any` — not as an annotation, cast (`as any`), or generic argument. Use a real type, a generic, `Record<string, unknown>`, or `unknown` with narrowing. If you believe `any` is truly unavoidable, stop and ask the user first with your justification. ESLint enforces this outside `__tests__/`; the rule applies there too.
- Before creating a type, search `types/`, `@types/`, and nearby files for an existing one.
- Placement: global/shared → `types/`; used by one page only → top of that page file; shared by a few related pages → `<route>/types/` (prefer promoting to `types/`).
- Hooks: page/feature hook → its own `useX.ts` beside the components using it; app-wide → `hooks/`.

## Git

- Branch from `develop` and open PRs against `develop` (= staging). `develop` → `main` (= production) is a release PR.

## Shell gotchas

- Quote bracketed paths in zsh: `git add "app/[locale]/..."`.

## Docs (read on demand)

- Index: `docs/README.md`
- Adding pages, components, header/footer nav, sitemap: `docs/development/pages-and-navigation.md`
- Composition patterns rationale: `docs/research/react-composition-patterns.md`
- i18n caching / Vercel locale detection: `docs/i18n/caching-and-locale-detection.md` — read before touching locale routing or caching
- GitHub Project issues/epics: `docs/project/issue-management.md` — read before creating or organizing issues
- Disabling downloads: `docs/downloads/disabling-downloads.md`
- Known build warnings: `docs/known-issues.md`

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
