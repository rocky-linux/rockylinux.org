import deepmerge from "deepmerge";
import { availableLanguages, defaultLanguage } from "./config/i18nProperties";

export default async function getMessages(locale: string) {
  let validLocale = locale;

  if (
    !locale ||
    !availableLanguages.includes(locale as (typeof availableLanguages)[number])
  ) {
    validLocale = defaultLanguage;
  }

  const userMessages = (await import(`./messages/${validLocale}.json`)).default;
  const defaultMessages = (await import(`./messages/en.json`)).default;

  return deepmerge(defaultMessages, userMessages);
}

export const getRequestConfig = async ({ locale }: { locale: string }) => {
  return {
    messages: await getMessages(locale),
    locale: locale,
  };
};
