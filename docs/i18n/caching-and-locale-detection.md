# Internationalization Caching and Locale Detection

This document details a critical caching issue affecting the Rocky Linux website's internationalization system, along with the research findings and recommended solutions.

## Table of Contents

- [Problem Summary](#problem-summary)
- [Symptoms](#symptoms)
- [Root Cause Analysis](#root-cause-analysis)
- [Technical Deep Dive](#technical-deep-dive)
- [Solution Options](#solution-options)
- [Recommended Implementation](#recommended-implementation)
- [Testing Plan](#testing-plan)
- [References](#references)

---

## Problem Summary

Users visiting the Rocky Linux website experience random language switching on page refresh. Despite having `Accept-Language: en-US,en;q=0.9` in their browser headers, pages occasionally render in other languages (e.g., Traditional Chinese, Hindi).

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

The current middleware configuration:

```typescript
// middleware.ts
export default createMiddleware({
  locales: [...availableLanguages],
  localePrefix: "as-needed",
  defaultLocale: "en",
  localeDetection: true, // <-- This is the trigger
});
```

With `localeDetection: true`, next-intl reads the `Accept-Language` header to determine the user's preferred locale.

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

### Current Request Flow

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

### Why Random Languages Appear

The randomness is likely caused by:

1. **Race conditions in edge functions** - Multiple concurrent requests may interfere
2. **Stale closure data** - Edge function instances may retain old locale context
3. **Missing locale fallback** - When locale detection fails, fallback behavior is undefined

---

## Solution Options

### Option A: Disable Locale Detection + Enable Static Rendering (Recommended)

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

## Recommended Implementation

We recommend **Option A**: Disable locale detection and enable static rendering.

### Step 1: Update Middleware

```typescript
// middleware.ts
import createMiddleware from "next-intl/middleware";
import { availableLanguages } from "./config/i18nProperties";

export default createMiddleware({
  locales: [...availableLanguages],
  localePrefix: "as-needed",
  defaultLocale: "en",
  localeDetection: false, // Disable Accept-Language detection
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

### Step 2: Add setRequestLocale to Layout

```typescript
// app/[locale]/layout.tsx
import { setRequestLocale } from 'next-intl/server';

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  // Enable static rendering for this locale
  setRequestLocale(locale);

  if (!availableLanguages.includes(locale as Locale)) notFound();

  const messages = await getMessages();

  return (
    // ... rest of layout
  );
}
```

### Step 3: Add setRequestLocale to All Pages

Each page that uses translations needs to call `setRequestLocale`:

```typescript
// app/[locale]/download/page.tsx
import { setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const DownloadPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  // ... rest of page
};
```

### Step 4: Generate Static Params (Optional but Recommended)

To pre-generate all locale variants at build time:

```typescript
// app/[locale]/layout.tsx
export function generateStaticParams() {
  return availableLanguages.map((locale) => ({ locale }));
}
```

---

## Testing Plan

### Pre-Implementation Testing

1. **Document current behavior:**
   - Record response headers for `/download` page
   - Note `X-Vercel-Cache`, `Cache-Control`, `Vary` headers
   - Test with multiple browser locales

2. **Verify the bug:**
   - Clear all cookies
   - Set browser to English only
   - Refresh page 10+ times, document language shown

### Post-Implementation Testing

1. **Verify static rendering:**

   ```bash
   # Build locally
   npm run build

   # Check for "Static" indicator in build output
   # Pages should show as static (○) not dynamic (λ)
   ```

2. **Test cache headers:**
   - Deploy to Vercel preview
   - Check response headers:
     - `Cache-Control` should NOT be `private, no-store`
     - `X-Vercel-Cache` should show `HIT` on subsequent requests

3. **Test locale paths:**
   - `/download` → English content
   - `/zh-TW/download` → Traditional Chinese content
   - `/fr-FR/download` → French content

4. **Test language picker:**
   - Switch language using picker
   - Verify `NEXT_LOCALE` cookie is set
   - Verify subsequent visits respect cookie

5. **Test edge cases:**
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
_Last updated: November 2025_
