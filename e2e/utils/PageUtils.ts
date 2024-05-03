import { expect, type Page } from "@playwright/test";

export const expectDownloadPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/download/);
  await expect(page).toHaveTitle(/Download - Rocky Linux/);
};

export const expectTrademarkUsagePage = async (page: Page) => {
  await expect(page).toHaveURL(/\/legal\/trademarks/);
  await expect(page).toHaveTitle(/Trademark Usage - Rocky Linux/);
};
