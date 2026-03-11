# Internationalization Caching and Locale Detection

This document details a caching issue that affected the Rocky Linux website's internationalization system, the research findings, the solution that was implemented, and the current i18n architecture.

## Table of Contents

- [Problem Summary](#problem-summary)
- [Symptoms](#symptoms)
- [Root Cause Analysis](#root-cause-analysis)
- [Technical Deep Dive](#technical-deep-dive)
- [Solution Options Considered](#solution-options-considered)
- [Implemented Solution](#implemented-solution)
- [Current Architecture](#current-architecture)
- [Testing Plan](#testing-plan)
- [References](#references)

---

## Problem Summary

Users visiting the Rocky Linux website experienced random language switching on page refresh. Despite having `Accept-Language: en-US,en;q=0.9` in their browser headers, pages occasionally rendered in other languages (e.g., Traditional Chinese, Hindi).

**Affected Stack:**

- Next.js 15.5.6
- next-intl 4.3.12
- Deployed on Vercel

---

## Symptoms

1. Page refreshes show content in random languages
2. The issue is inconsistent - sometimes 2-3 refreshes show English, then suddenly another language appears
3. No `NEXT_LOCALE` cookie is present in user's browser
4. User's `Accept-Language` header clearly shows English preference
5. The `Vary` response header does NOT include `Accept-Language`:
   ```
   Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch
   ```

---

## Root Cause Analysis

### The Multi-Layered Problem

This issue stems from the interaction between three systems:

1. **next-intl's locale detection** reads the `Accept-Language` header
2. **Next.js App Router** marks pages as dynamic when headers are read
3. **Vercel's edge cache** doesn't cache dynamic pages properly

### Why This Happens

#### Layer 1: next-intl Middleware Configuration

The previous middleware configuration had `localeDetection: true`, which caused next-intl to read the `Accept-Language` header to determine the user's preferred locale.

#### Layer 2: Next.js Dynamic Rendering

When any code path calls `headers()` or `cookies()` in a Server Component, Next.js automatically:

- Marks the page as **dynamic**
- Sets `Cache-Control: private, no-store`
- Prevents public caching

From [Next.js Discussion #82571](https://github.com/vercel/next.js/discussions/82571):

> "As soon as you call `headers()` or `cookies()` in a Server Component (RSC/SSR), the framework marks the page as 'dynamic' and sends it with `Cache-Control: private, no-store`."

#### Layer 3: Vercel Edge Caching

Vercel's edge cache respects `Cache-Control` headers:

- `private, no-store` = No caching, every request hits origin
- Without proper `Vary: Accept-Language`, cached responses may be served to wrong users

The `X-Vercel-Cache: MISS` header observed indicates pages are being dynamically rendered on each request, but the rendering can pick up stale data or race conditions.

### The Vary Header Fix (Already Applied)

The ability to set custom `Vary` headers in middleware was fixed in:

- [PR #75536](https://github.com/vercel/next.js/pull/75536) - Merged February 4, 2025
- Released in [Next.js 15.4](https://nextjs.org/blog/next-15-4)

**Our Next.js version (15.5.6) includes this fix**, but it doesn't solve the underlying problem because:

1. The Vary header fix allows _setting_ the header
2. But Next.js still marks pages as `private, no-store` when `headers()` is called
3. Private pages aren't cached publicly regardless of Vary headers

---

## Technical Deep Dive

### How next-intl Detects Locale

1. **Middleware runs first** - Reads `Accept-Language` header, negotiates locale
2. **Attaches `x-next-intl-locale` header** to the request for downstream use
3. **Server Components read this header** via `headers().get('x-next-intl-locale')`
4. **This triggers dynamic rendering** - Page marked as private

### Previous Request Flow (Before Fix)

```
User Request (Accept-Language: en-US)
    ↓
Vercel Edge (Check cache) → MISS (dynamic page)
    ↓
Next.js Middleware (next-intl)
    ↓
Read Accept-Language header
    ↓
Set x-next-intl-locale header
    ↓
Server Component Rendering
    ↓
Call headers() to get locale → TRIGGERS DYNAMIC MODE
    ↓
Response with Cache-Control: private, no-store
    ↓
Vercel: Cannot cache publicly
```

### Why Random Languages Appeared

The randomness was likely caused by:

1. **Race conditions in edge functions** - Multiple concurrent requests may interfere
2. **Stale closure data** - Edge function instances may retain old locale context
3. **Missing locale fallback** - When locale detection fails, fallback behavior is undefined

---

## Solution Options Considered

### Option A: Disable Locale Detection + Enable Static Rendering (Implemented)

Disable automatic `Accept-Language` detection and use `setRequestLocale()` to enable static rendering.

**Pros:**

- Pages become statically renderable and cacheable
- Each locale path is cached independently
- Predictable, deterministic behavior
- URLs remain unchanged (`/download` for English)

**Cons:**

- First-time visitors see default locale (English)
- Users must use language picker to switch

### Option B: Always Use Locale Prefix

Change to `localePrefix: "always"` so every URL has an explicit locale (`/en/download`).

**Pros:**

- Clear URL structure for SEO
- Each path is independently cacheable
- Can keep `localeDetection` for initial redirects

**Cons:**

- Changes all English URLs (breaking change)
- Requires redirects for old URLs
- More complex sitemap

### Option C: Accept Dynamic Rendering

Keep current setup and accept dynamic rendering on every request.

**Pros:**

- No code changes needed
- Auto-detection continues to work

**Cons:**

- Every request hits the server (slower, more expensive)
- Random locale bug persists
- Poor performance at scale

---

## Implemented Solution

**Option A** was implemented: locale detection is disabled and static rendering is enabled.

### Centralized Routing Configuration

Routing is defined in `i18n/routing.ts` using `defineRouting()`:

```typescript
// i18n/routing.ts
import { defineRouting } from "next-intl/routing";
import { availableLanguages, defaultLanguage } from "@/config/i18nProperties";

export const routing = defineRouting({
  locales: availableLanguages,
  defaultLocale: defaultLanguage,
  localePrefix: "as-needed",
});
```

### Middleware

The middleware spreads the shared routing config and disables locale detection:

```typescript
// middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
  ...routing,
  localeDetection: false,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

### Locale-Aware Navigation

`i18n/navigation.ts` exports locale-aware navigation primitives created from the shared routing config:

```typescript
// i18n/navigation.ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

All components must use `Link` from `@/i18n/navigation` instead of `next/link` to ensure links respect the current locale.

### ESLint Enforcement

An ESLint `no-restricted-imports` rule prevents direct use of `next/link`:

```typescript
// eslint.config.mjs (excerpt)
"no-restricted-imports": [
  "error",
  {
    paths: [
      {
        name: "next/link",
        message:
          "Use `import { Link } from '@/i18n/navigation'` instead to ensure locale-aware routing.",
      },
    ],
  },
],
```

This rule is applied to both TypeScript and JavaScript files to prevent regressions.

### setRequestLocale in Layout and Pages

`setRequestLocale()` is called in the layout and all pages to enable static rendering:

```typescript
// app/[locale]/layout.tsx
import { setRequestLocale } from "next-intl/server";

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  // ...
}
```

### generateStaticParams

All locale variants are pre-generated at build time:

```typescript
// app/[locale]/layout.tsx
export function generateStaticParams() {
  return availableLanguages.map((locale) => ({ locale }));
}
```

---

## Current Architecture

### Key Files

| File                       | Purpose                                                                    |
| -------------------------- | -------------------------------------------------------------------------- |
| `i18n/routing.ts`          | Centralized routing config (`defineRouting()`)                             |
| `i18n/navigation.ts`       | Locale-aware `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname` |
| `middleware.ts`            | Spreads routing config, disables `localeDetection`                         |
| `config/i18nProperties.ts` | `availableLanguages` and `defaultLanguage` constants                       |
| `eslint.config.mjs`        | `no-restricted-imports` rule enforcing `@/i18n/navigation` Link            |

### Request Flow (Current)

```
User Request
    ↓
Vercel Edge (Check cache) → HIT if previously rendered
    ↓
Next.js Middleware (next-intl)
    ↓
Route based on URL locale prefix (no Accept-Language sniffing)
    ↓
Statically Rendered Page (setRequestLocale)
    ↓
Response with cacheable headers
    ↓
Vercel: Caches for future requests
```

### Adding a New Locale-Aware Link

Always import `Link` from the i18n navigation module:

```typescript
import { Link } from "@/i18n/navigation";

// Usage is identical to next/link
<Link href="/download">Download</Link>
```

The ESLint rule will catch any accidental use of `next/link`.

---

## Testing Plan

### Verify Static Rendering

```bash
# Build locally
npm run build

# Check for "Static" indicator in build output
# Pages should show as static (○) not dynamic (λ)
```

### Test Cache Headers

- Deploy to Vercel preview
- Check response headers:
  - `Cache-Control` should NOT be `private, no-store`
  - `X-Vercel-Cache` should show `HIT` on subsequent requests

### Test Locale Paths

- `/download` → English content
- `/zh-TW/download` → Traditional Chinese content
- `/fr-FR/download` → French content

### Test Language Picker

- Switch language using picker
- Verify `NEXT_LOCALE` cookie is set
- Verify subsequent visits respect cookie

### Test Edge Cases

- Direct URL access to non-English locale
- Switching between locales rapidly
- Clearing cookies and revisiting

### Performance Testing

Compare before/after:

- Time to First Byte (TTFB)
- Cache hit rate on Vercel dashboard
- Build output size

---

## References

### Next.js Issues and Discussions

- [Discussion #82571: Next.js and Vary Headers](https://github.com/vercel/next.js/discussions/82571) - Core explanation of why Vary headers don't work with dynamic rendering
- [Issue #55396: Vary header can't be overwritten in middleware](https://github.com/vercel/next.js/issues/55396) - Original bug report, fixed in PR #75536
- [PR #75536: Preserve custom Vary headers](https://github.com/vercel/next.js/pull/75536) - The fix merged February 4, 2025
- [Issue #48480: Cannot set Vary header in middleware](https://github.com/vercel/next.js/issues/48480) - Related issue

### next-intl Documentation and Issues

- [Middleware Documentation](https://next-intl.dev/docs/routing/middleware) - Official middleware configuration guide
- [Discussion #936: Locale cookie may not be updated (Vercel)](https://github.com/amannn/next-intl/discussions/936) - Vercel-specific cookie issues
- [Discussion #232: Cache with Server Components](https://github.com/amannn/next-intl/discussions/232) - Caching strategies discussion
- [next-intl 4.0 Release Notes](https://next-intl.dev/blog/next-intl-4-0) - Breaking changes and new features

### Release Notes

- [Next.js 15.4 Release Notes](https://nextjs.org/blog/next-15-4) - Includes Vary header fix
- [Next.js 15.5 Release Notes](https://nextjs.org/blog/next-15-5) - Current version

### Community Resources

- [Vercel Community: Language reset issue](https://community.vercel.com/t/next-intl-i18n-language-reset-to-previous-locale-in-vercel/6231) - Similar reported issues
- [Stack Overflow: Disable automatic locale detection](https://stackoverflow.com/questions/77485970/disable-automatic-locale-detection-in-next-intl-on-first-visit) - Community solutions

---

## Appendix: Debug Commands

### Check Current Locale (Browser Console)

```javascript
// Get current locale from HTML
document.documentElement.lang;

// Check browser language preferences
navigator.languages;

// Check for NEXT_LOCALE cookie
document.cookie.split(";").find((c) => c.includes("NEXT_LOCALE"));

// Clear locale cookie
document.cookie =
  "NEXT_LOCALE=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
```

### Verify Response Headers (curl)

```bash
curl -I -H "Accept-Language: en-US,en;q=0.9" https://rockylinux.org/download
```

Look for:

- `Cache-Control` header
- `Vary` header
- `X-Vercel-Cache` header

---

_Document created: November 2025_
_Last updated: March 2026_
