import { type Locator, type Page, expect } from "@playwright/test";

/**
 * Returns a locator for an architecture tab by its display name (desktop).
 *
 * On desktop viewports the download page renders architecture options as
 * `tab` elements inside a `tablist`. Use this helper to target a specific
 * architecture tab for assertions without clicking it.
 *
 * @param {Page} page - The Playwright page object.
 * @param {string | RegExp} archName - The accessible name (or pattern) of the
 *   architecture tab, e.g. `"AMD/Intel (x86_64)"` or `/x86_64/`.
 * @returns {Locator} A locator targeting the matching tab element.
 *
 * @example
 * ```ts
 * const tab = getArchTab(page, /aarch64/);
 * await expect(tab).toBeVisible();
 * ```
 */
export const getArchTab = (page: Page, archName: string | RegExp): Locator =>
  page.getByRole("tab", { name: archName });

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
export const switchArch = async (
  page: Page,
  archName: string | RegExp
): Promise<void> => {
  await page.getByRole("tab", { name: archName }).click();
  await expect(page.getByRole("tabpanel", { name: archName })).toBeVisible();
};

/**
 * Parses the `arch` query parameter from the current page URL.
 *
 * Useful for verifying that architecture tab clicks correctly update the
 * URL search params without needing regex URL assertions.
 *
 * @param {Page} page - The Playwright page object.
 * @returns {string | null} The value of the `arch` query parameter, or `null`
 *   if it is not present.
 *
 * @example
 * ```ts
 * await page.goto("/download?arch=x86_64");
 * expect(getArchFromUrl(page)).toBe("x86_64");
 *
 * await page.goto("/download");
 * expect(getArchFromUrl(page)).toBeNull();
 * ```
 */
export const getArchFromUrl = (page: Page): string | null =>
  new URL(page.url()).searchParams.get("arch");
