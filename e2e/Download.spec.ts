import { test, expect, type Page } from "@playwright/test";
import { getArchFromUrl, switchArch } from "./utils/DownloadUtils";

const choosePlatform = (page: Page, name: RegExp) =>
  page.getByRole("radio", { name }).check();

test.describe("Download page structure and defaults", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/download");
  });

  test("has correct title and page landmarks", async ({ page }) => {
    await expect(page).toHaveTitle(/Download - Rocky Linux/);

    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Download Rocky Linux", level: 1 })
    ).toBeVisible();
  });

  test("walks the user through three numbered steps", async ({ page }) => {
    for (const name of [
      /Choose a release/,
      /Choose where you'll run it/,
      /^Download$/,
    ]) {
      await expect(page.getByRole("heading", { name, level: 2 })).toBeVisible();
    }
  });

  test("defaults to the latest release on servers", async ({ page }) => {
    const release = page.getByRole("radiogroup", { name: /Choose a release/ });
    await expect(
      release.getByRole("radio", { checked: true })
    ).toHaveAccessibleName(/Rocky Linux 10/);

    await expect(
      page.getByRole("radio", { name: /Servers & virtual machines/ })
    ).toBeChecked();
  });

  test("server ISO downloads are explained and listed", async ({ page }) => {
    const main = page.getByRole("main");
    await expect(
      main.getByRole("link", { name: "Download DVD ISO" })
    ).toBeVisible();
    await expect(
      main.getByRole("link", { name: "Download Boot ISO" })
    ).toBeVisible();
    await expect(main.getByText(/no network required/i).first()).toBeVisible();
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

  test("x86_64 is selected by default, not guessed from the browser", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Tab selection is desktop only");

    await expect(
      page.getByRole("tab", { name: /x86_64/, selected: true })
    ).toBeVisible();
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

  test("?version=rocky-9 selects that release", async ({ page }) => {
    await page.goto("/download?version=rocky-9");

    await expect(
      page.getByRole("radio", { name: /Rocky Linux 9/ })
    ).toBeChecked();
    await expect(
      page.getByRole("heading", { name: /Rocky Linux 9/, level: 3 })
    ).toBeVisible();
  });

  test("?platform=cloud opens the cloud options", async ({ page }) => {
    await page.goto("/download?platform=cloud");

    await expect(page.getByRole("radio", { name: /Cloud/ })).toBeChecked();
    await expect(page.getByRole("button", { name: "View AMIs" })).toBeVisible();
  });

  test("invalid query values fall back to valid defaults", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/download?arch=bogus&version=bogus&platform=bogus");

    await expect(
      page.getByRole("radio", { name: /Rocky Linux 10/ })
    ).toBeChecked();
    await expect(
      page.getByRole("radio", { name: /Servers & virtual machines/ })
    ).toBeChecked();
    if (!isMobile) {
      await expect(
        page.getByRole("tab", { name: /x86_64/, selected: true })
      ).toBeVisible();
    }
  });
});

test.describe("Download selection updates URL", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/download");
  });

  test("clicking ARM tab updates URL to arch=aarch64", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Tab switching is desktop only");

    await switchArch(page, /aarch64/);

    expect(getArchFromUrl(page)).toBe("aarch64");
  });

  test("tabpanel content changes to match selected architecture", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Tab switching is desktop only");

    await switchArch(page, /aarch64/);

    await expect(page.getByRole("tabpanel", { name: /aarch64/ })).toBeVisible();
  });

  test("choosing a release updates URL and content", async ({ page }) => {
    await page.getByRole("radio", { name: /Rocky Linux 9/ }).check();

    await expect(page).toHaveURL(/version=rocky-9/);
    await expect(
      page.getByRole("heading", { name: /Rocky Linux 9/, level: 3 })
    ).toBeVisible();
  });

  test("choosing a platform updates URL and content", async ({ page }) => {
    await choosePlatform(page, /Containers/);

    await expect(page).toHaveURL(/platform=containers/);
    await expect(
      page.getByRole("link", { name: /Docker Hub/ }).first()
    ).toBeVisible();
    await expect(page.getByText(/podman pull/).first()).toBeVisible();
  });
});

test.describe("Download browser back/forward navigation", () => {
  test("changing any selection does not add history entries", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/download");
    const before = await page.evaluate(() => window.history.length);

    await page.getByRole("radio", { name: /Rocky Linux 9/ }).check();
    await choosePlatform(page, /Cloud/);
    await choosePlatform(page, /Containers/);
    if (!isMobile) {
      await choosePlatform(page, /Servers & virtual machines/);
      await switchArch(page, /aarch64/);
    }

    expect(await page.evaluate(() => window.history.length)).toBe(before);
  });

  test("arrow keys through the release picker do not add history entries", async ({
    page,
  }) => {
    await page.goto("/download");
    const before = await page.evaluate(() => window.history.length);

    await page.getByRole("radio", { name: /Rocky Linux 10/ }).focus();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");

    await expect(page).toHaveURL(/version=rocky-8/);
    expect(await page.evaluate(() => window.history.length)).toBe(before);
  });

  test("a link with an unavailable platform is normalized on load", async ({
    page,
  }) => {
    await page.goto("/download?version=rocky-8&platform=wsl");

    await expect(
      page.getByRole("radio", { name: /Servers & virtual machines/ })
    ).toBeChecked();
    await expect(page).not.toHaveURL(/platform=wsl/);

    // The dropped value must not come back when switching releases
    await page.getByRole("radio", { name: /Rocky Linux 10/ }).check();
    await expect(
      page.getByRole("radio", { name: /Servers & virtual machines/ })
    ).toBeChecked();
  });

  test("URL reflects the platform actually shown after a release change", async ({
    page,
  }) => {
    await page.goto("/download?version=rocky-10&platform=wsl");
    await page.getByRole("radio", { name: /Rocky Linux 8/ }).check();

    await expect(page).toHaveURL(/version=rocky-8/);
    await expect(page).not.toHaveURL(/platform=wsl/);
    await expect(
      page.getByRole("radio", { name: /Servers & virtual machines/ })
    ).toBeChecked();
  });

  test("back after choosing a platform leaves the selection", async ({
    page,
  }) => {
    await page.goto("/download");
    await page.goto("/download?version=rocky-10");
    await choosePlatform(page, /Cloud/);
    await expect(page).toHaveURL(/platform=cloud/);

    // The platform replaced the entry, so Back goes to the previous page
    await page.goBack();
    await expect(page).toHaveURL(/\/download$/);
  });
});

test.describe("Download architecture selector", () => {
  test("containers have no per-architecture tabs", async ({ page }) => {
    await page.goto("/download?platform=containers");

    await expect(page.getByText(/podman pull/).first()).toBeVisible();
    await expect(page.getByRole("tab")).toHaveCount(0);
    await expect(page.getByRole("tabpanel")).toHaveCount(0);
  });

  test("a single architecture renders no orphan tabpanel", async ({ page }) => {
    await page.goto("/download?version=rocky-9&platform=devices");

    await expect(page.getByText("Architecture: ARM (aarch64)")).toBeVisible();
    await expect(page.getByRole("tabpanel")).toHaveCount(0);
  });
});

test.describe("Download documentation links", () => {
  test("link to the docs for the selected release", async ({ page }) => {
    await page.goto("/download");
    await expect(
      page.getByRole("link", { name: /Documentation/ })
    ).toHaveAttribute("href", "https://docs.rockylinux.org/10/");

    await page.getByRole("radio", { name: /Rocky Linux 9/ }).check();
    await expect(
      page.getByRole("link", { name: /Documentation/ })
    ).toHaveAttribute("href", "https://docs.rockylinux.org/9/");
    await expect(
      page.getByRole("link", { name: /Installation guide/ })
    ).toHaveAttribute(
      "href",
      "https://docs.rockylinux.org/9/guides/9_6_installation/"
    );
  });
});

test.describe("Download cloud provider section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/download?platform=cloud");
  });

  test("cloud platform lists the provider marketplaces", async ({ page }) => {
    await expect(page.getByRole("button", { name: "View AMIs" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Google Cloud/ })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Microsoft Azure/ })
    ).toBeVisible();
  });

  test("View AMIs opens a dialog with deploy links", async ({ page }) => {
    await page.getByRole("button", { name: "View AMIs" }).click();

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
    await page.goto("/download");
  });

  test("ISO download buttons link to rockylinux.org", async ({ page }) => {
    const main = page.getByRole("main");
    const dvdLink = main.getByRole("link", { name: /DVD ISO/ }).first();
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
