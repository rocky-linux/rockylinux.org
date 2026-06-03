import { test, expect, type Page } from "@playwright/test";
import { expectDownloadPage } from "./utils/PageAssertions";

/**
 * Scheduled branding (see `data/branding-schedule.json`) swaps the logo icon
 * and the browser favicon during configured date ranges. The active window is
 * computed client-side from the current date, so these tests use Playwright's
 * clock API to pin "now" to a date inside and outside the Pride Month range
 * without touching the system clock.
 *
 * BrandedLogo renders the favicon declaratively (`<link rel="icon">` in the
 * render tree) so React reconciles it across client-side navigations. An
 * earlier version mutated `document.head` imperatively in a useEffect, which
 * corrupted Next.js head reconciliation and broke client navigation — the URL
 * changed but the page content and <title> stayed stale, so links appeared to
 * need a second click. These tests assert the favicon lands in a real browser
 * AND that navigation still commits on a single click while branding is active.
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

/** The favicon `<link>` pointing at the Pride favicon. */
const prideFavicon = (page: Page) =>
  page.locator("link[rel='icon'][href*='pride_favicon']");

/** Every `<link rel="icon">` in the document head. */
const faviconLinks = (page: Page) => page.locator("link[rel='icon']");

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

    // The favicon link in <head> points at the Pride favicon, and it is the
    // only icon link — the root layout no longer renders a competing default.
    await expect(prideFavicon(page)).toHaveCount(1);
    await expect(faviconLinks(page)).toHaveCount(1);
  });

  test("navigates on a single click while branding is active", async ({
    page,
  }) => {
    // Regression: the imperative favicon mutation used to break client-side
    // navigation while branding was active, so a link needed two clicks.
    await page.clock.setFixedTime(DURING_PRIDE);
    await page.goto("/");

    // Confirm branding is actually active for this run.
    await expect(prideFavicon(page)).toHaveCount(1);

    await page
      .getByRole("region", { name: /community way/i })
      .getByRole("link", { name: "Download" })
      .click();

    // A single click must commit the navigation: URL, <title>, and content.
    await expectDownloadPage(page);
    await expect(
      page.getByRole("region", { name: /community way/i })
    ).toHaveCount(0);

    // The favicon survives the client navigation as the single icon link.
    await expect(prideFavicon(page)).toHaveCount(1);
    await expect(faviconLinks(page)).toHaveCount(1);
  });

  test("uses the default logo and favicon outside any active period", async ({
    page,
  }) => {
    await page.clock.setFixedTime(OUTSIDE_PRIDE);
    await page.goto("/");

    // Default green-orb icon renders; no branded <image>.
    await expect(headerLogoDefaultIcon(page)).toBeVisible();
    await expect(headerLogoImage(page)).toHaveCount(0);

    // No branding active: the Pride favicon is never used, and the only icon
    // link is the default favicon.
    await expect(prideFavicon(page)).toHaveCount(0);
    await expect(faviconLinks(page)).toHaveCount(1);
    await expect(faviconLinks(page)).toHaveAttribute("href", "/favicon.png");
  });
});
