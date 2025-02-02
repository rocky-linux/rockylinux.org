import deepmerge from "deepmerge";
import { getRequestConfig } from "next-intl/server";
import { availableLanguages, defaultLanguage } from "./config/i18nProperties";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !availableLanguages.includes(locale as any)) {
    locale = defaultLanguage;
  }

  const userMessages = (await import(`./messages/${locale}.json`)).default;
  const defaultMessages = (await import(`./messages/en.json`)).default;

  return {
    locale,
    messages: deepmerge(defaultMessages, userMessages),
  };
});
