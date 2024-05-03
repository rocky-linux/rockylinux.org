import { test } from "@playwright/test";
import { expectDownloadPage } from "./utils/PageUtils";

test.describe("Website Redirects", () => {
  test("redirects old /cloud-images to /download", async ({ page }) => {
    await page.goto("/cloud-images");

    await expectDownloadPage(page);
  });
});
