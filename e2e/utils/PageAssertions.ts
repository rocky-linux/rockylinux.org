import { expect, type Page } from "@playwright/test";

/**
 * Asserts the current page is the Community Charter page.
 *
 * @param {Page} page - The Playwright page object.
 * @returns {Promise<void>}
 *
 * @example
 * ```ts
 * await expectCharterPage(page);
 * ```
 */
export const expectCharterPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/about\/charter/);
  await expect(page).toHaveTitle(/Community Charter - Rocky Linux/);
};

/**
 * Asserts the current page is the Sponsors page.
 *
 * @param {Page} page - The Playwright page object.
 * @returns {Promise<void>}
 *
 * @example
 * ```ts
 * await expectSponsorsPage(page);
 * ```
 */
export const expectSponsorsPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/about\/sponsors/);
  await expect(page).toHaveTitle(/Sponsors - Rocky Linux/);
};

/**
 * Asserts the current page is the Partners page.
 *
 * @param {Page} page - The Playwright page object.
 * @returns {Promise<void>}
 *
 * @example
 * ```ts
 * await expectPartnersPage(page);
 * ```
 */
export const expectPartnersPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/about\/partners/);
  await expect(page).toHaveTitle(/Partners - Rocky Linux/);
};

/**
 * Asserts the current page is the Code of Conduct page.
 *
 * @param {Page} page - The Playwright page object.
 * @returns {Promise<void>}
 *
 * @example
 * ```ts
 * await expectCocPage(page);
 * ```
 */
export const expectCocPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/about\/coc/);
  await expect(page).toHaveTitle(/Code of Conduct - Rocky Linux/);
};

/**
 * Asserts the current page is the Commercial Support page.
 *
 * @param {Page} page - The Playwright page object.
 * @returns {Promise<void>}
 *
 * @example
 * ```ts
 * await expectSupportPage(page);
 * ```
 */
export const expectSupportPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/support\/support-providers/);
  await expect(page).toHaveTitle(/Commercial Support - Rocky Linux/);
};

/**
 * Asserts the current page is the Shop page.
 *
 * @param {Page} page - The Playwright page object.
 * @returns {Promise<void>}
 *
 * @example
 * ```ts
 * await expectShopPage(page);
 * ```
 */
export const expectShopPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/contribute\/shop/);
  await expect(page).toHaveTitle(/Shop - Rocky Linux/);
};

/**
 * Asserts the current page is the Download page.
 *
 * @param {Page} page - The Playwright page object.
 * @returns {Promise<void>}
 *
 * @example
 * ```ts
 * await expectDownloadPage(page);
 * ```
 */
export const expectDownloadPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/download/);
  await expect(page).toHaveTitle(/Download - Rocky Linux/);
};

/**
 * Asserts the current page is the Licensing page.
 *
 * @param {Page} page - The Playwright page object.
 * @returns {Promise<void>}
 *
 * @example
 * ```ts
 * await expectLicensingPage(page);
 * ```
 */
export const expectLicensingPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/legal\/licensing/);
  await expect(page).toHaveTitle(/Licensing - Rocky Linux/);
};

/**
 * Asserts the current page is the Privacy Policy page.
 *
 * @param {Page} page - The Playwright page object.
 * @returns {Promise<void>}
 *
 * @example
 * ```ts
 * await expectPrivacyPolicyPage(page);
 * ```
 */
export const expectPrivacyPolicyPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/legal\/privacy/);
  await expect(page).toHaveTitle(/Privacy Policy - Rocky Linux/);
};

/**
 * Asserts the current page is the Trademark Usage page.
 *
 * @param {Page} page - The Playwright page object.
 * @returns {Promise<void>}
 *
 * @example
 * ```ts
 * await expectTrademarkUsagePage(page);
 * ```
 */
export const expectTrademarkUsagePage = async (page: Page) => {
  await expect(page).toHaveURL(/\/legal\/trademarks/);
  await expect(page).toHaveTitle(/Trademark Usage - Rocky Linux/);
};
