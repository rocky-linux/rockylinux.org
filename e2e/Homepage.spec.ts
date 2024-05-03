import { test, expect } from "@playwright/test";
import { expectDownloadPage } from "./utils/PageUtils";

test.describe("Core Rocky Brand", () => {
  test("has title", async ({ page }) => {
    await page.goto("/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Rocky Linux/);
  });
});

test.describe("Home Page Downloads Flow", () => {
  test("has download buttons", async ({ page, isMobile }) => {
    await page.goto("/");

    // Check that we have a download button in the navigation on desktop.
    if (!isMobile) {
      const navDownloadButton = page
        .getByRole("navigation")
        .getByRole("button", { name: "Download" });

      await expect(navDownloadButton).toBeVisible();

      await navDownloadButton.click();

      await expectDownloadPage(page);

      await page.goBack();
    }

    // Check that we have a download button in the hero section.

    const heroDownloadButton = page.getByRole("main").getByRole("button", {
      name: "Download",
    });

    await expect(heroDownloadButton).toBeVisible();

    await heroDownloadButton.click();

    await expectDownloadPage(page);
  });
});
