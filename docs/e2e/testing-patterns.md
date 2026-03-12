# E2E Testing Patterns and Lessons Learned

Patterns, gotchas, and best practices discovered while writing Playwright e2e tests for the Rocky Linux website.

## Radix UI Select Components

### The Open-Then-Close Race Condition

Radix UI Select components can exhibit a race condition where Playwright's `click()` opens the popover, which then immediately closes. This is a [known Radix issue](https://github.com/radix-ui/primitives/issues/2288).

**Symptoms:**

- Tests pass locally but fail intermittently in CI
- The combobox trigger shows `aria-expanded="false"` immediately after clicking
- `getAttribute()` or `toHaveAttribute()` calls timeout waiting for the element

**What we found:** Using `click()` on the trigger works reliably in our case. The issue manifests when you try to re-query the element using `getByRole()` after clicking — Radix's state update can cause Playwright's locator to momentarily lose the element. Using a CSS attribute selector (`page.locator('[role="combobox"][aria-expanded="true"]')`) to find the expanded state is more reliable than re-using the original `getByRole` locator.

### Finding Portaled Listboxes

Radix Select portals its dropdown listbox to `document.body`. This means:

- The listbox is **not** a DOM child of the trigger
- `trigger.locator('[role="listbox"]')` will **not** work
- `page.getByLabel('...').getByRole('listbox')` will **not** work (scopes to DOM children)

**Solution:** Read the `aria-controls` attribute from the combobox trigger **before** clicking — Radix sets it even when the dropdown is closed. This avoids a re-query issue where Radix's portal overlay prevents Playwright from finding the trigger after the dropdown opens.

```typescript
// Read aria-controls before clicking — Radix sets it even when closed
const picker = page.getByRole("contentinfo").getByRole("combobox");
await picker.scrollIntoViewIfNeeded();
const listboxId = await picker.getAttribute("aria-controls");
if (!listboxId) {
  throw new Error("Combobox is missing required aria-controls attribute");
}

await picker.click();
const listbox = page.locator(`[id="${listboxId}"]`);
```

This approach:

- Reads `aria-controls` pre-click, avoiding post-click re-query issues
- Uniquely identifies the listbox even if multiple selects exist on the page
- Follows the actual ARIA relationship Radix establishes
- Works regardless of where Radix portals the content

**Note:** Playwright has an open feature request ([#34348](https://github.com/microsoft/playwright/issues/34348)) to add `ariaChildren` support that would follow `aria-controls` automatically. When that ships, the code could simplify to `picker.getByRole('listbox', { ariaChildren: true })`.

## What E2E Tests Should (and Shouldn't) Test

E2E tests verify **user journeys**, not content. They answer: "Can a user accomplish this task?"

**Do test:**

- Navigation flows — clicking links and buttons reaches the right pages
- Critical CTAs — download, migrate, language switch
- Interactive elements — dropdowns, mobile menu, theme toggle
- Page structure — landmarks exist (banner, main, contentinfo, regions)
- Cross-page flows — homepage → download page → select architecture

**Don't test:**

- Exact static text — headings, descriptions, paragraph copy. These break on every copy edit and provide low confidence value. Use component tests or visual regression instead.
- DOM structure or CSS — implementation details that don't affect users
- Content that's better covered by unit tests — e.g., "does the feature card say 'Production Ready'"

**Granularity:** Each test should cover one user journey or one structural concern. Avoid testing multiple unrelated flows in a single test — it makes failures harder to diagnose.

### Scoping Selectors to Page Sections

Use `<section aria-labelledby="...">` in components to create named regions. This lets tests scope queries precisely:

```typescript
// Good — scoped to a specific section
const hero = page.getByRole("region", { name: /community way/i });
await hero.getByRole("link", { name: "Download" }).click();

// Bad — too broad, could match download links anywhere on the page
await page.getByRole("main").getByRole("link", { name: "Download" }).click();
```

When a section doesn't have a semantic landmark, add `<section aria-labelledby="section-id">` with an `id` on its heading. This improves both accessibility and testability.

## Selector Best Practices

### Prefer Accessible Names Over Generic Roles

Bad:

```typescript
page.getByRole("combobox"); // matches ANY combobox on the page
page.getByRole("listbox"); // matches ANY listbox
```

Good:

```typescript
page.getByRole("combobox", { name: "Select language" });
```

This requires adding `aria-label` to components that don't have visible labels. For our language picker, we added `aria-label="Select language"` to the `SelectTrigger`.

### Centralize Reusable Selectors

Put component interaction helpers in `e2e/utils/PageUtils.ts` when the component is global (appears on every page) or will be tested from multiple spec files:

```typescript
// e2e/utils/PageUtils.ts — scoped to footer so it works on all locales
export const getLanguagePicker = (page: Page): Locator => {
  return page.getByRole("contentinfo").getByRole("combobox");
};

export const openLanguagePicker = async (page: Page): Promise<Locator> => { ... };
export const switchLanguage = async (page: Page, name: string): Promise<void> => { ... };
```

Benefits:

- Selector changes only need updating in one place
- Tests read as high-level actions (`switchLanguage(page, "Français")`)
- New test files can reuse the same helpers

## Inspecting Pages Before Writing Tests

Before writing selectors, use Playwright's built-in CLI tools to inspect the live DOM structure, ARIA roles, and accessible names. This avoids guessing at role names and catches desktop vs. mobile differences early.

### `npx playwright open`

Opens a browser with the Playwright inspector attached. You can hover over elements to see their roles, accessible names, and suggested locators:

```bash
npx playwright open http://localhost:3000/download
```

Use the **Pick locator** button in the inspector toolbar to click any element and get a recommended `getByRole(...)` selector.

### Accessibility snapshots

Playwright can dump the full accessibility tree of a page, which shows every element's role, name, and state. This is invaluable for understanding what `getByRole()` calls will match:

```typescript
// In a test or script
const snapshot = await page.accessibility.snapshot();
console.log(JSON.stringify(snapshot, null, 2));
```

### Desktop vs. mobile differences

Many components render differently at mobile breakpoints (e.g., tabs become combobox selects). Always inspect at both viewport sizes:

```bash
# Desktop (default)
npx playwright open http://localhost:3000/download

# Mobile viewport
npx playwright open --viewport-size=375,812 http://localhost:3000/download
```

Document any differences in the test file and use `test.skip(isMobile, ...)` or `test.skip(!isMobile, ...)` to scope tests to the correct viewport.

## Accessible Names and Localization

### aria-labels Must Be Localized

All `aria-label` attributes must use translation keys via `useTranslations` (or translated strings passed as props to client components). Never hardcode English aria-labels — screen reader users in other languages should hear labels in their own language.

**Pattern for client components with direct i18n access:**

```typescript
// components/LanguagePicker.tsx
const t = useTranslations("global");
<SelectTrigger aria-label={t("selectLanguage")}>
```

**Pattern for client components receiving translations as props:**

```typescript
// Server component (Tabs.tsx) passes translated string
const translations = { selectArchitecture: t("selectArchitecture") };

// Client component (TabsClient.tsx) uses the prop
<SelectTrigger aria-label={translations.selectArchitecture}>
```

When adding a new `aria-label`, add the translation key to `messages/en.json` — Crowdin handles the other 33 locales automatically.

### E2E Selectors and Localized Labels

Most e2e tests navigate to the default English locale (`/`, `/download`, etc.), so selectors using English accessible names work correctly:

```typescript
// This works because these tests start at the English locale
page.getByRole("combobox", { name: "Select language" });
page.getByRole("combobox", { name: "Select architecture" });
```

**Language picker:** The `getLanguagePicker` helper in `PageUtils.ts` scopes the combobox lookup to the footer (`contentinfo` role) instead of matching by accessible name. This avoids breaking when Crowdin translates the `selectLanguage` key — the footer only has one combobox, so the scoped query is unambiguous across all locales.

### `getAttribute()` Does Not Auto-Scroll

Playwright action methods like `click()` and `fill()` automatically scroll elements into view. However, `getAttribute()` does **not** — it only waits for the element to be attached to the DOM.

If the element is in the footer (off-screen), `getAttribute()` may timeout even though `click()` on the same locator would succeed. If you need to call `getAttribute()` on an off-screen element, use `scrollIntoViewIfNeeded()` first, or use a CSS attribute selector approach that doesn't depend on reading the attribute separately.

## Documenting Utility Files with JSDoc

Utility files in `e2e/utils/` are shared across multiple spec files and consumed by other developers. Every exported function **should** have a full JSDoc block including:

- A summary sentence describing what the function does
- A longer description paragraph when behavior isn't obvious from the name (e.g., explaining that a helper waits for a tabpanel transition)
- `@param` tags with `{type}`, name, and description for every parameter
- `@returns` tag with `{type}` and description
- `@throws` tag if the function can throw (e.g., missing ARIA attribute)
- `@example` block with a realistic usage snippet
- `@see` links to related helpers or documentation when relevant

This ensures IDE tooltips show complete documentation when hovering over helpers in spec files.

**Example:**

````typescript
/**
 * Clicks an architecture tab and waits for the corresponding tabpanel to
 * appear (desktop only).
 *
 * After clicking the tab, this helper asserts that a `tabpanel` with a
 * matching accessible name becomes visible, ensuring the UI has fully
 * transitioned before the test continues.
 *
 * @param {Page} page - The Playwright page object.
 * @param {string | RegExp} archName - The accessible name (or pattern) of the
 *   architecture tab to activate, e.g. `"ARM (aarch64)"` or `/aarch64/`.
 * @returns {Promise<void>}
 *
 * @example
 * ```ts
 * await switchArch(page, /aarch64/);
 * expect(getArchFromUrl(page)).toBe("aarch64");
 * ```
 */
````

---

Last updated: 2026-03-11
