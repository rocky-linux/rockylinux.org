import { expect, type Page } from "@playwright/test";

export const expectCharterPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/about\/charter/);
  await expect(page).toHaveTitle(/Community Charter - Rocky Linux/);
};

export const expectSponsorsPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/about\/sponsors/);
  await expect(page).toHaveTitle(/Sponsors - Rocky Linux/);
};

export const expectPartnersPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/about\/partners/);
  await expect(page).toHaveTitle(/Partners - Rocky Linux/);
};

export const expectCocPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/about\/coc/);
  await expect(page).toHaveTitle(/Code of Conduct - Rocky Linux/);
};

export const expectSupportPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/support\/support-providers/);
  await expect(page).toHaveTitle(/Commercial Support - Rocky Linux/);
};

export const expectShopPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/contribute\/shop/);
  await expect(page).toHaveTitle(/Shop - Rocky Linux/);
};

export const expectDownloadPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/download/);
  await expect(page).toHaveTitle(/Download - Rocky Linux/);
};

export const expectLicensingPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/legal\/licensing/);
  await expect(page).toHaveTitle(/Licensing - Rocky Linux/);
};

export const expectPrivacyPolicyPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/legal\/privacy/);
  await expect(page).toHaveTitle(/Privacy Policy - Rocky Linux/);
};

export const expectTrademarkUsagePage = async (page: Page) => {
  await expect(page).toHaveURL(/\/legal\/trademarks/);
  await expect(page).toHaveTitle(/Trademark Usage - Rocky Linux/);
};
