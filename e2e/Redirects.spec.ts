import { test } from "@playwright/test";
import {
  expectDownloadPage,
  expectTrademarkUsagePage,
} from "./utils/PageUtils";

test.describe("Website Redirects", () => {
  test("redirects old /cloud-images to /download", async ({ page }) => {
    await page.goto("/cloud-images");

    await expectDownloadPage(page);
  });
  test("redirects old /alternative-images to /download", async ({ page }) => {
    await page.goto("/alternative-images");

    await expectDownloadPage(page);
  });
  test("redirects old /trademark to /legal/trademarks", async ({ page }) => {
    await page.goto("/trademark");

    await expectTrademarkUsagePage(page);
  });
});
