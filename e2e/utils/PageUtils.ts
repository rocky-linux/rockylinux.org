import { expect, type Page } from "@playwright/test";

export const expectDownloadPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/download/);
  await expect(page).toHaveTitle(/Download - Rocky Linux/);
};
