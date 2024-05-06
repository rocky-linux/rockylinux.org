import { test } from "@playwright/test";
import {
  expectCharterPage,
  expectSponsorsPage,
  expectPartnersPage,
  expectCocPage,
  expectDownloadPage,
  expectTrademarkUsagePage,
  expectPrivacyPolicyPage,
  expectSupportPage,
  expectShopPage,
  expectLicensingPage,
} from "./utils/PageUtils";

test.describe("Website Redirects", () => {
  test("redirects old /community-charter to /about/charter", async ({
    page,
  }) => {
    await page.goto("/community-charter");

    await expectCharterPage(page);
  });
  test("redirects old /sponsors to /about/sponsors", async ({ page }) => {
    await page.goto("/sponsors");

    await expectSponsorsPage(page);
  });
  test("redirects old /partners to /about/partners", async ({ page }) => {
    await page.goto("/partners");

    await expectPartnersPage(page);
  });
  test("redirects old /coc to /about/coc", async ({ page }) => {
    await page.goto("/coc");

    await expectCocPage(page);
  });
  test("redirects old /support to /support/support-providers", async ({
    page,
  }) => {
    await page.goto("/support");

    await expectSupportPage(page);
  });
  test("redirects olds /merch to /contribute/shop", async ({ page }) => {
    await page.goto("/merch");

    await expectShopPage(page);
  });
  test("redirects old /cloud-images to /download", async ({ page }) => {
    await page.goto("/cloud-images");

    await expectDownloadPage(page);
  });
  test("redirects old /alternative-images to /download", async ({ page }) => {
    await page.goto("/alternative-images");

    await expectDownloadPage(page);
  });
  test("redirects old /licensing to /legal/licensing", async ({ page }) => {
    await page.goto("/licensing");

    await expectLicensingPage(page);
  });
  test("redirects old /privacy-policy to /legal/privacy", async ({ page }) => {
    await page.goto("/privacy-policy");

    await expectPrivacyPolicyPage(page);
  });
  test("redirects old /trademark to /legal/trademarks", async ({ page }) => {
    await page.goto("/trademark");

    await expectTrademarkUsagePage(page);
  });
});
