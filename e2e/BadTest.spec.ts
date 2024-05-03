import { test, expect } from "@playwright/test";

test.describe("Bad Test", () => {
  test("has a non-existent checkbox", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("checkbox", { name: "Fail To Find Me" })
    ).toBeVisible();
  });
});
