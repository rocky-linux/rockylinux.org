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

**Solution:** Follow the `aria-controls` attribute from the combobox trigger to find its specific listbox by ID:

```typescript
// After clicking to open the select
const expandedPicker = page.locator(
  '[role="combobox"][aria-label="Select language"][aria-expanded="true"]'
);
const listboxId = await expandedPicker.getAttribute("aria-controls");
const listbox = page.locator(`[id="${listboxId}"]`);
```

This approach:

- Uniquely identifies the listbox even if multiple selects exist on the page
- Follows the actual ARIA relationship Radix establishes
- Works regardless of where Radix portals the content

**Note:** Playwright has an open feature request ([#34348](https://github.com/microsoft/playwright/issues/34348)) to add `ariaChildren` support that would follow `aria-controls` automatically. When that ships, the code could simplify to `picker.getByRole('listbox', { ariaChildren: true })`.

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
// e2e/utils/PageUtils.ts
export const getLanguagePicker = (page: Page): Locator => {
  return page.getByRole("combobox", { name: LANGUAGE_PICKER_LABEL });
};

export const openLanguagePicker = async (page: Page): Promise<Locator> => { ... };
export const switchLanguage = async (page: Page, name: string): Promise<void> => { ... };
```

Benefits:

- Selector changes only need updating in one place
- Tests read as high-level actions (`switchLanguage(page, "Français")`)
- New test files can reuse the same helpers

### `getAttribute()` Does Not Auto-Scroll

Playwright action methods like `click()` and `fill()` automatically scroll elements into view. However, `getAttribute()` does **not** — it only waits for the element to be attached to the DOM.

If the element is in the footer (off-screen), `getAttribute()` may timeout even though `click()` on the same locator would succeed. If you need to call `getAttribute()` on an off-screen element, use `scrollIntoViewIfNeeded()` first, or use a CSS attribute selector approach that doesn't depend on reading the attribute separately.

---

Last updated: 2026-03-11
