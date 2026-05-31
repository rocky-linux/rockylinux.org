import { test, expect, type Page } from "@playwright/test";

/**
 * Scheduled branding (see `data/branding-schedule.json`) swaps the logo icon
 * and the browser favicon during configured date ranges. The active window is
 * computed client-side from the current date, so these tests use Playwright's
 * clock API to pin "now" to a date inside and outside the Pride Month range
 * without touching the system clock.
 *
 * The favicon swap is the piece unit tests can't cover: it's an imperative
 * `<link rel="icon">` mutation in BrandedLogo's useEffect, not part of React's
 * render tree. These tests assert it actually lands in a real browser.
 */

// Mid-month / midday so the assertion holds regardless of the browser timezone.
const DURING_PRIDE = new Date("2026-06-15T12:00:00");
const OUTSIDE_PRIDE = new Date("2026-05-15T12:00:00");

/**
 * The logo's branded icon, scoped to the header. When branding is active the
 * logo renders an `<image>` (the Pride icon); otherwise it renders the default
 * green orb `<path>`.
 */
const headerLogoImage = (page: Page) =>
  page.getByRole("banner").locator("image");

const headerLogoDefaultIcon = (page: Page) =>
  page.getByRole("banner").locator("svg path[fill='#10B981']");

/** The favicon `<link>` the effect points at the Pride favicon. */
const prideFavicon = (page: Page) =>
  page.locator("link[rel='icon'][href*='pride_favicon']");

test.describe("Scheduled branding logo", () => {
  test("swaps the logo icon and favicon during an active period", async ({
    page,
  }) => {
    // Must pin the clock before navigation so the component's date check and
    // favicon effect see the mocked "now" on first client render.
    await page.clock.setFixedTime(DURING_PRIDE);
    await page.goto("/");

    // Logo renders the Pride icon instead of the default green orb.
    await expect(headerLogoImage(page)).toHaveAttribute("href", /pride\.png/);
    await expect(headerLogoDefaultIcon(page)).toHaveCount(0);

    // The effect replaces the favicon link in <head>.
    await expect(prideFavicon(page)).toHaveCount(1);
  });

  test("uses the default logo and favicon outside any active period", async ({
    page,
  }) => {
    await page.clock.setFixedTime(OUTSIDE_PRIDE);
    await page.goto("/");

    // Default green-orb icon renders; no branded <image>.
    await expect(headerLogoDefaultIcon(page)).toBeVisible();
    await expect(headerLogoImage(page)).toHaveCount(0);

    // The effect early-returns, so the Pride favicon is never injected.
    await expect(prideFavicon(page)).toHaveCount(0);
  });
});
