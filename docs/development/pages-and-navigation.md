# Adding Pages and Navigation

How pages are built in this repo and every place that needs touching when you add one.

## Choose the page type

| Content                                          | Where                                        | Translated?                                                                     |
| ------------------------------------------------ | -------------------------------------------- | ------------------------------------------------------------------------------- |
| Interactive or marketing page                    | `app/[locale]/<route>/page.tsx`              | Yes — strings in `messages/en.json`                                             |
| Long-form prose (charter, CoC, legal, resources) | `about/`, `legal/`, or `resources/<slug>.md` | No — English markdown, rendered by the existing `[slug]` route for that section |

## Translated TSX page

### Page structure

Pages are **server components** — never add `"use client"` to a `page.tsx`. A page is not one huge component: it lays out the structure by composing smaller components as `children`, so the whole tree is visible in one place. State (`useState`) and effects live in client components below the page.

Create `app/[locale]/<route>/page.tsx`:

```tsx
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { alternatesForPath } from "@/lib/seo";
import PageLayout from "@/components/PageLayout";
import ExampleHero from "./components/ExampleHero";
import { ExampleGrid, ExampleColumn } from "./components/ExampleLayout";

type Props = {
  params: Promise<{ locale: string }>;
};

/**
 * Builds the metadata for the example page.
 *
 * @param props - The page props.
 * @param props.params - Route params; resolves to the active locale.
 * @returns The page title, description, and hreflang alternates.
 */
export async function generateMetadata({
  params,
}: Readonly<Props>): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Example - Rocky Linux",
    description: "One-sentence summary of the page.",
    alternates: alternatesForPath(locale, "/example"),
  };
}

/**
 * Renders the example page.
 *
 * @param props - The page props.
 * @param props.params - Route params; resolves to the active locale.
 * @returns The composed page.
 */
const ExamplePage = async ({ params }: Readonly<Props>) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("example");

  return (
    <PageLayout>
      <ExampleHero
        title={t("title")}
        intro={t("intro")}
      />
      <ExampleGrid>
        <ExampleColumn>{t("columnOne")}</ExampleColumn>
        <ExampleColumn>
          <Link href="/download">{t("downloadCta")}</Link>
        </ExampleColumn>
      </ExampleGrid>
    </PageLayout>
  );
};

export default ExamplePage;
```

Rules the template encodes:

- **Props are `Readonly<Props>`** — SonarQube rule S6759 flags mutable component props. Wrap the props type at the parameter (`({ params }: Readonly<Props>)`), not inside the type definition.
- **`params` is a Promise** — always `await params` before reading `locale`.
- **`setRequestLocale(locale)` must run before any `getTranslations` call** — without it the page opts out of static rendering.
- **`alternatesForPath(locale, "/<route>")`** produces the canonical URL and hreflang links for every locale. The path is the route without the locale prefix.
- **Metadata is hardcoded English** for now, with the title format `"<Page Name> - Rocky Linux"`.
- **`Link` comes from `@/i18n/navigation`, never `next/link`** — the i18n `Link` keeps the active locale; don't pass a `locale` prop unless linking into a different locale. ESLint blocks `next/link`.
- **Every exported function and component has a full JSDoc block** — summary, `@param` for each parameter and destructured prop, `@returns`, and `@throws` when it can throw.
- **Client components** (`"use client"`) use `useTranslations("<namespace>")` from `next-intl` instead of `getTranslations`. Prefer resolving translations in the page and passing them in as `children` or props.

Add the strings to `messages/en.json` under a new top-level namespace matching the `getTranslations` argument:

```json
"example": {
  "title": "Example",
  "intro": "Intro paragraph.",
  "columnOne": "First column text.",
  "downloadCta": "Download Rocky Linux"
}
```

Only edit `en.json` — Crowdin generates every other locale file.

### Where components go

| Component                                            | Location                                                                                       |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Used only by this page                               | `app/[locale]/<route>/components/` (or a feature subfolder, e.g. `components/quiz/`)           |
| Reusable across pages (feature/composite components) | `components/` or a feature subfolder `components/<feature>/` (e.g. `components/shareButtons/`) |
| UI primitive (button, dialog, select…)               | `components/ui/` — shadcn/ui pattern only; don't put feature components here                   |

Small, related components that only make sense together (e.g. a provider and its option/answer pieces) can share one file. Anything larger gets its own file in the same folder.

### Composition, not chaining

Compose structure with `children` from the page. Don't **chain** components — a component that internally renders a child, which internally renders a grandchild, drilling props through each layer. Chaining hides the page structure, forces prop drilling, and a `"use client"` near the top turns everything below it into client code.

```tsx
// ❌ Chaining — the page can't show its structure
<CommunitySection translations={quizTranslations} />
// CommunitySection renders <QuizWrapper translations={…} />
// QuizWrapper ("use client") renders <QuizButtons translations={…} selected={…} onSelect={…} />
// QuizButtons renders <QuizButton … /> per interest, plus <QuizAnswerPanel … />
```

A component may render its own children internally **only** when:

- **It maps over data to render per-item children** — e.g. `downloads.map((d) => <DownloadCard … />)`, where the data defines the structure.
- **It is a primitive with fixed internal markup** — e.g. a shadcn `DialogContent` rendering its own close button.
- **It wraps a third-party client component** — e.g. a `"use client"` re-export of a library component.

Passing a prop one or two levels to a component that uses it is ordinary props, not chaining. Rationale and sources: `docs/research/react-composition-patterns.md`.

### Sharing client state: provider + hook

When nested children need shared client state, use a **compound component**: a client provider owns all state and effects and renders no markup; dumb children read the state through a custom hook. Children can sit at any depth without prop drilling, and server components passed through the provider as `children` stay server-rendered.

```
app/[locale]/community/components/quiz/
  Quiz.tsx         # provider + small related pieces (QuizOption, QuizAnswer)
  QuizContext.ts   # context object + state contract
  useQuiz.ts       # the hook
  QuizLayout.tsx   # server-only layout slots
```

```ts
// QuizContext.ts
import { createContext } from "react";

export type Interest =
  | "chat"
  | "reporting"
  | "webdev"
  | "design"
  | "release"
  | "sig"
  | "docs";

export type QuizState = {
  selected: Interest | null;
  select: (interest: Interest) => void;
};

export const QuizContext = createContext<QuizState | null>(null);
```

```ts
// useQuiz.ts
import { use } from "react";
import { QuizContext, type QuizState } from "./QuizContext";

/**
 * Reads the shared quiz state.
 *
 * @returns The selected interest and a setter for it.
 * @throws {Error} When called outside a `<Quiz>` provider.
 */
export const useQuiz = (): QuizState => {
  const ctx = use(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used inside <Quiz>");
  return ctx;
};
```

```tsx
// Quiz.tsx
"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { QuizContext, type Interest } from "./QuizContext";
import { useQuiz } from "./useQuiz";

/**
 * Owns the quiz selection state and its side effects.
 *
 * @param props - The component props.
 * @param props.children - The quiz structure; may include server components.
 * @returns The children wrapped in the quiz context.
 */
export const Quiz = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [selected, setSelected] = useState<Interest | null>(null);

  useEffect(() => {
    if (selected) history.replaceState(null, "", `#${selected}`);
  }, [selected]);

  const value = useMemo(() => ({ selected, select: setSelected }), [selected]);

  return <QuizContext value={value}>{children}</QuizContext>;
};

/**
 * A button that selects one interest.
 *
 * @param props - The component props.
 * @param props.interest - The interest this option selects.
 * @param props.children - The button label.
 * @returns The option button.
 */
export const QuizOption = ({
  interest,
  children,
}: Readonly<{ interest: Interest; children: ReactNode }>) => {
  const { selected, select } = useQuiz();
  return (
    <Button
      variant={selected === interest ? "default" : "outline"}
      aria-pressed={selected === interest}
      onClick={() => select(interest)}
    >
      {children}
    </Button>
  );
};

/**
 * Shows its content only while its interest is selected.
 *
 * @param props - The component props.
 * @param props.interest - The interest this answer belongs to.
 * @param props.children - The answer content.
 * @returns The answer region, or `null` when not selected.
 */
export const QuizAnswer = ({
  interest,
  children,
}: Readonly<{ interest: Interest; children: ReactNode }>) => {
  const { selected } = useQuiz();
  return selected === interest ? <div role="region">{children}</div> : null;
};
```

```tsx
// QuizLayout.tsx — no "use client"; ships no JavaScript
import type { ReactNode } from "react";

type SlotProps = Readonly<{ children: ReactNode }>;

/**
 * Two-column quiz layout.
 *
 * @param props - The component props.
 * @param props.children - The options and answers columns.
 * @returns The layout container.
 */
export const QuizLayout = ({ children }: SlotProps) => (
  <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row md:gap-4">
    {children}
  </div>
);

/**
 * Column holding the quiz options.
 *
 * @param props - The component props.
 * @param props.children - The `QuizOption` buttons.
 * @returns The options column.
 */
export const QuizOptions = ({ children }: SlotProps) => (
  <div className="md:w-1/2 flex flex-wrap gap-2">{children}</div>
);

/**
 * Column holding the quiz answers.
 *
 * @param props - The component props.
 * @param props.children - The `QuizAnswer` regions.
 * @returns The answers column.
 */
export const QuizAnswers = ({ children }: SlotProps) => (
  <div className="md:w-1/2">{children}</div>
);
```

The page composes it, resolving translations on the server:

```tsx
<Quiz>
  <QuizLayout>
    <QuizOptions>
      <QuizOption interest="chat">{t("interests.chatting.title")}</QuizOption>
      <QuizOption interest="docs">{t("interests.docs.title")}</QuizOption>
    </QuizOptions>
    <QuizAnswers>
      <QuizAnswer interest="chat">
        {t.rich("interests.chatting.description", {
          link: (chunks) => (
            <Link
              href="https://chat.rockylinux.org/"
              className="text-primary underline"
            >
              {chunks}
            </Link>
          ),
        })}
      </QuizAnswer>
      <QuizAnswer interest="docs">{t("interests.docs.description")}</QuizAnswer>
    </QuizAnswers>
  </QuizLayout>
</Quiz>
```

Rules for this pattern:

- **The provider owns all state and effects**; children read state through the hook and have no effects of their own.
- **Use React 19 APIs:** render `<QuizContext value={…}>` (not `.Provider`) and read with `use(QuizContext)` inside the hook.
- **The hook throws outside the provider** so misuse fails loudly. Consumers import the hook, never the context object.
- **Memoize the context value** with `useMemo` (and handlers with `useCallback`) — this repo doesn't use React Compiler, and a new value re-renders every consumer.
- **Only components that call the hook need `"use client"`.** Layout slots stay server components.
- **Don't use `cloneElement` or `Children.map`** to inject props into children.
- **Don't use context for data the page already has** (translations, JSON data) — pass it as props or `children`.

### Hooks and types

- A page/feature hook gets its own `useX.ts` file beside the components that use it. A hook used across the app goes in `hooks/` at the repo root (create the folder with the first one).
- Never use `any`. Before creating a type, search `types/`, `@types/`, and nearby files for an existing one.
- Type placement: global/shared → `types/`; used by one page only → top of that page file; shared by a few related pages → `<route>/types/` (prefer promoting to `types/`). A type that defines a provider's state contract can live in its context file (e.g. `Interest` in `QuizContext.ts`).

## Markdown content page

Add `<slug>.md` to `about/`, `legal/`, or `resources/`:

```markdown
---
title: Page Title
description: "One-sentence summary used in page metadata."
---

## First heading

Body content in standard markdown.
```

- Before adding a file, check that the section isn't sourced from rocky-linux/rockylinux.org-content (see the content-repo comment in `.gitignore`). Content is moving to that repo over time; if the section has moved, the change belongs there.
- The page is served at `/<section>/<slug>` with no route code — the section's `[slug]` route checks that the file exists.
- Filenames must not contain dots other than the extension (`gpg-key-info.md`, not `gpg.key.info.md`) — the `Validate Markdown Filenames` CI workflow rejects them.
- Content is English-only; it is not sent to Crowdin.

## Navigation

Header links are hardcoded **twice**, once for each menu. A new header link needs all four of these edits:

1. `messages/en.json` — add the label under `header.nav` (e.g. `header.nav.about.example`).
2. `app/[locale]/components/header/NavigationTypes.ts` — add the key to the `NavigationMenuItems` type.
3. `app/[locale]/Header.tsx` — add `example: tNav("about.example")` to the `navigationTranslations` object.
4. **Both** `app/[locale]/components/header/DesktopNavigation.tsx` **and** `MobileNavigation.tsx` — add the link with its `href`. Missing one leaves the link absent on that viewport.

Footer links are a separate list of `{ name, href }` objects in `app/[locale]/Footer.tsx`, with labels under `footer.nav` in `messages/en.json`.

## Sitemap

`app/sitemap.ts` auto-discovers routes under `app/[locale]/`. It skips `components/` folders, `[slug]` folders, and the `contribute`, `legal`, `resources`, and `support` sections. A normal new page needs no sitemap change. If a page in a skipped section should be indexed, edit `isExcludedDirectory` in `app/sitemap.ts`.

## Verify

1. `npm run lint`, `npm run typecheck`, and `npm run test` — fix warnings as well as errors.
2. `npm run dev`, then open the page at `http://localhost:3000/<route>` (English has no prefix) and at one other locale (e.g. `/de-DE/<route>`) — the non-English page falls back to English strings until Crowdin syncs.
3. If you added a header link, check it at desktop width and in the mobile menu.

Last updated: 2026-10-29
