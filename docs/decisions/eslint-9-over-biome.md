# Decision: Stay on ESLint 9 Instead of Migrating to Biome or ESLint 10

**Date:** 2026-03-16
**Status:** Accepted

## Context

During the Next.js 16 upgrade, we evaluated three linting options:

1. **ESLint 10** — blocked because `eslint-plugin-react` (bundled in `eslint-config-next`) uses the removed `context.getFilename()` API ([eslint-plugin-react#3977](https://github.com/jsx-eslint/eslint-plugin-react/issues/3977), [vercel/next.js#89764](https://github.com/vercel/next.js/issues/89764)).
2. **Biome** — Next.js 16 supports it as a first-class linter. Replaces ESLint + Prettier in a single tool with 10-100x faster execution.
3. **ESLint 9 + eslint-config-next 16** — smallest change, everything works.

## Decision

Stay on **ESLint 9 with eslint-config-next 16**.

## Rationale

Biome has no equivalent for `react/jsx-no-literals`, which enforces that all user-facing text in JSX uses the i18n translation system. With 34 supported languages, this rule is load-bearing — it is the automated guardrail preventing untranslatable hardcoded strings from shipping. Losing it would be a real regression in code quality.

Additional gaps in Biome:

- No JSDoc rules (used on `e2e/utils/**/*.ts` for documentation enforcement)
- No Next.js-specific rules (`@next/next/no-img-element`, `@next/next/no-html-link-for-pages`, etc.)
- No `singleAttributePerLine` formatting option

ESLint 10 is blocked by an upstream plugin incompatibility with no timeline for a fix.

## Revisit When

- Biome adds a `jsx-no-literals` equivalent
- `eslint-plugin-react` ships ESLint 10 support
- The `@eslint-react` project (`eslint-plugin-react-x`) adds a `jsx-no-literals` equivalent

## References

- [eslint-plugin-react#3977 — ESLint 10 compatibility](https://github.com/jsx-eslint/eslint-plugin-react/issues/3977)
- [vercel/next.js#89764 — ESLint v10 TypeError](https://github.com/vercel/next.js/issues/89764)
- [Biome rule coverage](https://biomejs.dev/linter/rules/)
- [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
