import { test, expect } from "@playwright/test";
import { getArchFromUrl, switchArch } from "./utils/DownloadUtils";

test.describe("Download page structure and defaults", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/download?arch=x86_64");
  });

  test("has correct title and page landmarks", async ({ page }) => {
    await expect(page).toHaveTitle(/Download - Rocky Linux/);

    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("architecture tabs are visible on desktop", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Desktop uses tabs, mobile uses combobox");

    await expect(page.getByRole("tab", { name: /x86_64/ })).toBeVisible();
    await expect(page.getByRole("tab", { name: /aarch64/ })).toBeVisible();
  });

  test("architecture combobox is visible on mobile", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Mobile uses combobox instead of tabs");

    await expect(
      page.getByRole("combobox", { name: "Select architecture" })
    ).toBeVisible();
  });

  test("download buttons are present in the first card", async ({ page }) => {
    const main = page.getByRole("main");
    // Wait for at least one ISO download link to appear (client-side hydration)
    await expect(main.getByRole("link", { name: /ISO/ }).first()).toBeVisible();
  });
});

test.describe("Download URL query state — direct navigation", () => {
  test("?arch=aarch64 selects ARM tab", async ({ page, isMobile }) => {
    test.skip(isMobile, "Tab selection is desktop only");

    await page.goto("/download?arch=aarch64");

    await expect(
      page.getByRole("tab", { name: /aarch64/, selected: true })
    ).toBeVisible();
  });

  test("?arch=ppc64le selects PowerPC tab", async ({ page, isMobile }) => {
    test.skip(isMobile, "Tab selection is desktop only");

    await page.goto("/download?arch=ppc64le");

    await expect(
      page.getByRole("tab", { name: /ppc64le/, selected: true })
    ).toBeVisible();
  });

  test("?arch=bogus falls back to a valid tab", async ({ page, isMobile }) => {
    test.skip(isMobile, "Tab selection is desktop only");

    await page.goto("/download?arch=bogus");

    // Verify one of the known architecture tabs is selected
    const archTablist = page.getByRole("tablist").first();
    const selectedArchTab = archTablist.getByRole("tab", { selected: true });
    await expect(selectedArchTab).toBeVisible();
  });

  test("no ?arch param selects a valid architecture", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Tab selection is desktop only");

    await page.goto("/download");

    // Verify one of the known architecture tabs is selected
    const archTablist = page.getByRole("tablist").first();
    const selectedArchTab = archTablist.getByRole("tab", { selected: true });
    await expect(selectedArchTab).toBeVisible();
  });
});

test.describe("Download architecture switching updates URL", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/download?arch=x86_64");
  });

  test("clicking ARM tab updates URL to arch=aarch64", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Tab switching is desktop only");

    await switchArch(page, /aarch64/);

    expect(getArchFromUrl(page)).toBe("aarch64");
  });

  test("clicking PowerPC tab updates URL to arch=ppc64le", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Tab switching is desktop only");

    await switchArch(page, /ppc64le/);

    expect(getArchFromUrl(page)).toBe("ppc64le");
  });

  test("tabpanel content changes to match selected architecture", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Tab switching is desktop only");

    await switchArch(page, /aarch64/);

    await expect(page.getByRole("tabpanel", { name: /aarch64/ })).toBeVisible();
  });
});

test.describe("Download browser back/forward navigation", () => {
  test("back and forward navigate architecture history", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Tab switching is desktop only");

    await page.goto("/download?arch=x86_64");
    await switchArch(page, /aarch64/);
    await switchArch(page, /ppc64le/);

    // Back to aarch64
    await page.goBack();
    await expect(page).toHaveURL(/arch=aarch64/);
    await expect(page.getByRole("tabpanel", { name: /aarch64/ })).toBeVisible();
    await expect(page).toHaveURL(/\/download/);

    // Back to x86_64
    await page.goBack();
    await expect(page).toHaveURL(/arch=x86_64/);
    await expect(page.getByRole("tabpanel", { name: /x86_64/ })).toBeVisible();

    // Forward to aarch64
    await page.goForward();
    await expect(page).toHaveURL(/arch=aarch64/);
    await expect(page.getByRole("tabpanel", { name: /aarch64/ })).toBeVisible();
  });
});

test.describe("Download version switching", () => {
  test("switching version tab within a card changes displayed content", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Version tabs are desktop only");

    await page.goto("/download?arch=x86_64");

    const defaultImagesHeading = page.getByRole("heading", {
      name: "Default Images",
      level: 3,
    });
    await expect(defaultImagesHeading).toBeVisible();

    // Click "Rocky Linux 9" version tab
    const rl9Tab = page.getByRole("tab", { name: "Rocky Linux 9" }).first();
    await rl9Tab.click();

    // Verify a tabpanel for RL9 appears (content changed)
    await expect(
      page.getByRole("tabpanel", { name: "Rocky Linux 9" }).first()
    ).toBeVisible();
  });
});

test.describe("Download cloud provider section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/download?arch=x86_64");
  });

  test("cloud images card has provider buttons", async ({ page }) => {
    await expect(page.getByRole("button", { name: "AWS AMI" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Google Cloud" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Microsoft Azure" })
    ).toBeVisible();
  });

  test("AWS AMI button opens a dialog with deploy links", async ({ page }) => {
    await page.getByRole("button", { name: "AWS AMI" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    const deployLinks = dialog.getByRole("link", { name: /Deploy/i });
    expect(await deployLinks.count()).toBeGreaterThanOrEqual(1);

    // The drawer's Close button can end up outside the viewport when the
    // data table is tall. Use Escape key which is the standard dialog
    // dismissal pattern and works reliably regardless of scroll position.
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });
});

test.describe("Download links have valid hrefs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/download?arch=x86_64");
  });

  test("ISO download buttons link to rockylinux.org", async ({ page }) => {
    const main = page.getByRole("main");
    const dvdLink = main.getByRole("link", { name: "DVD ISO" }).first();
    await expect(dvdLink).toHaveAttribute("href", /rockylinux\.org/);
  });

  test("supplementary links are present with hrefs", async ({ page }) => {
    const main = page.getByRole("main");

    const torrentLink = main.getByRole("link", { name: /Torrent/i }).first();
    await expect(torrentLink).toHaveAttribute("href", /.+/);

    const checksumLink = main.getByRole("link", { name: /CHECKSUM/i }).first();
    await expect(checksumLink).toHaveAttribute("href", /.+/);
  });
});
