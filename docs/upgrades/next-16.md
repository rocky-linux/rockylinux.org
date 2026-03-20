# Next.js 16 Upgrade

**Date:** 2026-03-16
**From:** Next.js 15.5.12 → Next.js 16.1.7

## What Changed

### Package updates

- `next` 15.5.12 → 16.1.7
- `eslint-config-next` 15.5.9 → 16.1.7
- `react` / `react-dom` already on 19.2.x (compatible)

### Middleware → Proxy

Next.js 16 renames `middleware.ts` to `proxy.ts`. The exported function changes from a default export to a named `proxy` export. The proxy runs on the Node.js runtime (not Edge).

**Before:**

```ts
// middleware.ts
export default createMiddleware({ ... });
```

**After:**

```ts
// proxy.ts
export const proxy = createMiddleware({ ... });
```

### ESLint config modernized

Replaced the `FlatCompat` bridge from `@eslint/eslintrc` with native flat config exports from `eslint-config-next@16`. Removed `@eslint/eslintrc` and `@eslint/compat` as dependencies.

### Turbopack is now default

Next.js 16 uses Turbopack for both `next dev` and `next build`. No configuration changes were needed since the project has no custom webpack config.

### New lint rule: `react-hooks/set-state-in-effect`

`eslint-config-next@16` ships updated `eslint-plugin-react-hooks` with stricter rules. The `set-state-in-effect` rule flags `setState` calls directly inside `useEffect` bodies. `TabsClient.tsx` was refactored to use `useSyncExternalStore` for hydration detection instead of `useState` + `useEffect`, and a derived state pattern instead of a sync effect.

### ESLint stays at v9

ESLint 10 is incompatible with `eslint-plugin-react` (bundled in `eslint-config-next`). See [decision record](../decisions/eslint-9-over-biome.md).

## Behavioral Changes

### Image optimization defaults

Next.js 16 changes several `images` defaults. We accepted the new defaults:

- `minimumCacheTTL`: 60s → 4 hours (better for production caching)
- `imageSizes`: removed `16` from the array
- `qualities`: restricted to `[75]` (was all values 1-100)

### Build output

- `next dev` now outputs to `.next/dev` (not `.next`)
- Build output shows `ƒ Proxy (Middleware)` instead of `ƒ Middleware`

## Files Modified

- `proxy.ts` (renamed from `middleware.ts`)
- `eslint.config.mjs`
- `package.json` / `package-lock.json`
- `app/[locale]/download/components/TabsClient.tsx`

## References

- [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Next.js 16 blog post](https://nextjs.org/blog/next-16)
- [Middleware to proxy rename](https://nextjs.org/docs/messages/middleware-to-proxy)
- [next-intl proxy docs](https://next-intl.dev/docs/routing/middleware)

Last updated: 2026-03-16
