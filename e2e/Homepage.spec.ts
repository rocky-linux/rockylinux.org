import { test, expect } from "@playwright/test";

test.describe("Core Rocky Brand", () => {
  test("has title", async ({ page }) => {
    await page.goto("/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Rocky Linux/);
  });
});

test.describe("Downloads Flow", () => {
  test("has two download buttons on desktop", async ({ page, isMobile }) => {
    const verifyDownloadPage = async () => {
      await expect(page).toHaveURL(/\/download/);
      await expect(page).toHaveTitle(/Download - Rocky Linux/);
    };

    await page.goto("/");

    // Check that we have a download button in the navigation on desktop.
    if (!isMobile) {
      const navDownloadButton = page
        .getByRole("navigation")
        .getByRole("button", { name: "Download" });

      await expect(navDownloadButton).toBeVisible();

      await navDownloadButton.click();

      await verifyDownloadPage();

      await page.goBack();
    }

    // Check that we have a download button in the hero section.

    const heroDownloadButton = page.getByRole("main").getByRole("button", {
      name: "Download",
    });

    await expect(heroDownloadButton).toBeVisible();

    await heroDownloadButton.click();

    await verifyDownloadPage();
  });
});
