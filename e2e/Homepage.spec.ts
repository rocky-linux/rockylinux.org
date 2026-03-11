import { test, expect } from "@playwright/test";
import { expectDownloadPage } from "./utils/PageAssertions";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has correct title and page landmarks", async ({ page }) => {
    await expect(page).toHaveTitle(/Rocky Linux/);

    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("hero download button navigates to download page", async ({ page }) => {
    const hero = page.getByRole("region", { name: /community way/i });

    await hero.getByRole("link", { name: "Download" }).click();

    await expectDownloadPage(page);
  });

  test("hero migrate button links to migration docs", async ({ page }) => {
    const hero = page.getByRole("region", { name: /community way/i });
    const migrateLink = hero.getByRole("link", { name: "Migrate" });

    await expect(migrateLink).toHaveAttribute(
      "href",
      /docs\.rockylinux\.org\/guides\/migrate2rocky/
    );
  });

  test("news section shows articles that link to news pages", async ({
    page,
  }) => {
    const newsSection = page.getByRole("region", { name: "Latest News" });
    await expect(newsSection).toBeVisible();

    const articleLinks = newsSection.getByRole("link");
    expect(await articleLinks.count()).toBeGreaterThanOrEqual(1);

    // Click the first news article and verify navigation
    await articleLinks.first().click();
    await expect(page).toHaveURL(/\/news\//);
  });

  test("sponsors section displays partner links", async ({ page }) => {
    const sponsorsSection = page.getByRole("region", { name: "Backed By" });
    await expect(sponsorsSection).toBeVisible();

    const sponsorLinks = sponsorsSection.getByRole("link");
    expect(await sponsorLinks.count()).toBeGreaterThanOrEqual(3);
  });
});

test.describe("Homepage navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("desktop nav download button navigates to download page", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Desktop navigation not visible on mobile");

    const navDownload = page
      .getByRole("navigation", { name: "Global" })
      .getByRole("link", { name: "Download" });

    await navDownload.click();
    await expectDownloadPage(page);
  });

  test("desktop nav dropdown links to subpages", async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop navigation not visible on mobile");

    await page.getByRole("button", { name: "About" }).click();

    const charterLink = page.getByRole("link", { name: "Community Charter" });
    await expect(charterLink).toBeVisible();
    await charterLink.click();

    await expect(page).toHaveURL(/\/about\/charter/);
  });

  test("mobile menu opens and contains navigation links", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Mobile menu only visible on small screens");

    await page.getByRole("button", { name: "Open Main Menu" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await expect(dialog.getByRole("link", { name: "News" })).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Download" })).toBeVisible();
  });

  test("footer contains legal and social links", async ({ page }) => {
    const footer = page.getByRole("contentinfo");

    await expect(footer.getByRole("link", { name: "Licensing" })).toBeVisible();
    await expect(
      footer.getByRole("link", { name: "Privacy Policy" })
    ).toBeVisible();
    await expect(footer.getByRole("link", { name: "GitHub" })).toBeVisible();
  });
});
