import { expect, type Locator, type Page } from "@playwright/test";

/**
 * Returns a locator for the language picker combobox in the footer.
 *
 * Scoped to the footer (`contentinfo` role) so the lookup works regardless
 * of the translated `aria-label` value.
 *
 * @param {Page} page - The Playwright page object.
 * @returns {Locator} A locator targeting the language picker combobox.
 *
 * @example
 * ```ts
 * const picker = getLanguagePicker(page);
 * await expect(picker).toBeVisible();
 * ```
 */
export const getLanguagePicker = (page: Page): Locator => {
  return page.getByRole("contentinfo").getByRole("combobox");
};

/**
 * Opens the language picker dropdown and returns a locator for its listbox.
 *
 * Clicks the combobox trigger, then follows the {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls aria-controls}
 * attribute to locate the exact portaled listbox. This is necessary because
 * Radix UI renders the listbox outside the trigger's DOM tree.
 *
 * @param {Page} page - The Playwright page object.
 * @returns {Promise<Locator>} A locator targeting the opened listbox element.
 * @throws {Error} If the combobox has no `aria-controls` attribute after opening.
 *
 * @see {@link https://github.com/radix-ui/primitives/issues/2288 Radix open-close race condition}
 * @see [Testing Patterns](../../docs/e2e/testing-patterns.md) for full context on Radix Select gotchas.
 *
 * @example
 * ```ts
 * const listbox = await openLanguagePicker(page);
 * await expect(listbox.getByRole("option", { name: "Français" })).toBeVisible();
 * ```
 */
export const openLanguagePicker = async (page: Page): Promise<Locator> => {
  const picker = getLanguagePicker(page);

  // Read aria-controls before clicking — Radix sets it even when closed,
  // and after the click Playwright may not be able to re-query the element
  // within the footer (Radix portal overlay can interfere).
  await picker.scrollIntoViewIfNeeded();
  const listboxId = await picker.getAttribute("aria-controls");
  if (!listboxId) {
    throw new Error("Language picker has no aria-controls attribute");
  }

  await picker.click();

  const listbox = page.locator(`[id="${listboxId}"]`);
  await expect(listbox).toBeVisible();
  return listbox;
};

/**
 * Switches the site language via the footer language picker.
 *
 * Opens the dropdown and selects the option matching the given display name.
 * Triggers a full page navigation via `window.location.href`.
 *
 * @param {Page} page - The Playwright page object.
 * @param {string} languageName - The display name of the target language
 *   (e.g. `"Français"`, `"Deutsch"`, `"English"`).
 *   See `languageNames` in {@link ../../components/LanguagePicker.tsx} for all valid values.
 * @returns {Promise<void>}
 *
 * @example
 * ```ts
 * await switchLanguage(page, "Français");
 * await expect(page).toHaveURL(/\/fr-FR\//);
 * ```
 */
export const switchLanguage = async (
  page: Page,
  languageName: string
): Promise<void> => {
  const listbox = await openLanguagePicker(page);
  await listbox.getByRole("option", { name: languageName }).click();
};
