import { test, expect } from "@playwright/test";
import {
  getLanguagePicker,
  openLanguagePicker,
  switchLanguage,
} from "./utils/PageUtils";

test.describe("Language Switcher", () => {
  test.describe("Dropdown visibility and content", () => {
    test("displays language picker in footer", async ({ page }) => {
      await page.goto("/");

      const picker = getLanguagePicker(page);
      await expect(picker).toBeVisible();
      await expect(picker).toContainText("English");
    });

    test("shows available languages when opened", async ({ page }) => {
      await page.goto("/");

      const listbox = await openLanguagePicker(page);
      await expect(listbox).toBeVisible();

      // English should always be present
      await expect(
        listbox.getByRole("option", { name: "English" })
      ).toBeVisible();

      // All options should have display names, not raw locale codes
      const options = listbox.getByRole("option");
      const count = await options.count();
      expect(count).toBeGreaterThanOrEqual(2);

      for (let i = 0; i < count; i++) {
        const text = await options.nth(i).textContent();
        // Should not show raw locale codes like "fr-FR" or "de-DE"
        expect(text).not.toMatch(/^[a-z]{2}(-[A-Z]{2})?$/);
      }
    });

    test("sorts languages by display name", async ({ page }) => {
      await page.goto("/");

      const listbox = await openLanguagePicker(page);
      const options = listbox.getByRole("option");
      const count = await options.count();
      const names: string[] = [];

      for (let i = 0; i < count; i++) {
        const text = await options.nth(i).textContent();
        if (text) names.push(text);
      }

      const collator = new Intl.Collator("en", { sensitivity: "base" });
      const sorted = [...names].sort(collator.compare);
      expect(names).toEqual(sorted);
    });
  });

  test.describe("Language switching preserves path", () => {
    test("English to other language on subpage", async ({ page }) => {
      await page.goto("/download");
      await expect(page).toHaveURL(/\/download/);

      const listbox = await openLanguagePicker(page);

      // Pick the first non-English option
      const options = listbox.getByRole("option");
      const count = await options.count();
      let targetName = "";

      for (let i = 0; i < count; i++) {
        const text = await options.nth(i).textContent();
        if (text && text !== "English") {
          targetName = text;
          break;
        }
      }

      expect(targetName).toBeTruthy();
      await listbox.getByRole("option", { name: targetName }).click();

      // Should preserve /download path with a locale prefix
      await expect(page).toHaveURL(/\/[a-z]{2}(-[A-Z]{2})?\/download/);
    });

    test("other language to English on subpage", async ({ page }) => {
      await page.goto("/fr-FR/download");
      await expect(page).toHaveURL(/\/fr-FR\/download/);

      await switchLanguage(page, "English");

      // Should go to /download without locale prefix
      await page.waitForURL("**/download");
      expect(page.url()).toMatch(/\/download$/);
    });

    test("other language to other language on subpage", async ({ page }) => {
      await page.goto("/fr-FR/download");
      await expect(page).toHaveURL(/\/fr-FR\/download/);

      await switchLanguage(page, "Deutsch");

      await expect(page).toHaveURL(/\/de-DE\/download/);
    });

    test("preserves root path when switching languages", async ({ page }) => {
      await page.goto("/");

      await switchLanguage(page, "Deutsch");

      // Should be at the German root
      await expect(page).toHaveURL(/\/de-DE\/?$/);
    });
  });

  test.describe("Locale persistence", () => {
    test("sets NEXT_LOCALE cookie on language change", async ({
      page,
      context,
    }) => {
      await page.goto("/");

      await switchLanguage(page, "Français");

      await page.waitForURL(/\/fr-FR/);

      const cookies = await context.cookies();
      const localeCookie = cookies.find((c) => c.name === "NEXT_LOCALE");
      expect(localeCookie).toBeDefined();
      expect(localeCookie!.value).toBe("fr-FR");
    });
  });

  test.describe("Localized content", () => {
    test("displays translated content for French", async ({ page }) => {
      await page.goto("/fr-FR");

      await expect(page).toHaveTitle(/Rocky Linux/);

      // French hero text should differ from English
      await expect(page.getByRole("heading", { level: 1 })).not.toContainText(
        "Enterprise Linux, the community way."
      );
    });

    test("displays translated content for German", async ({ page }) => {
      await page.goto("/de-DE");

      await expect(page).toHaveTitle(/Rocky Linux/);

      // German hero text should differ from English
      await expect(page.getByRole("heading", { level: 1 })).not.toContainText(
        "Enterprise Linux, the community way."
      );
    });

    test("falls back to English for missing translations", async ({ page }) => {
      // A low-translation language should still render without errors
      // (falls back to English via deep merge in i18n/request.ts)
      await page.goto("/af-ZA");
      await expect(page).toHaveTitle(/Rocky Linux/);

      // Should show content (either translated or English fallback)
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  });
});
