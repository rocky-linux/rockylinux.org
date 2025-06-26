import { getRequestConfig } from "next-intl/server";
import { availableLanguages, defaultLanguage } from "../config/i18nProperties";
import deepmerge from "deepmerge";

async function getMessages(locale: string) {
  let validLocale = locale;
  if (
    !locale ||
    !availableLanguages.includes(locale as (typeof availableLanguages)[number])
  ) {
    validLocale = defaultLanguage;
  }
  const userMessages = (await import(`../messages/${validLocale}.json`))
    .default;
  const defaultMessages = (await import(`../messages/en.json`)).default;
  return deepmerge(defaultMessages, userMessages);
}

export default getRequestConfig(async function ({
  requestLocale,
}: {
  requestLocale?: string | Promise<string | undefined>;
}) {
  let locale =
    typeof requestLocale === "object" &&
    requestLocale !== null &&
    "then" in requestLocale
      ? await requestLocale
      : requestLocale;
  if (
    !locale ||
    !availableLanguages.includes(locale as (typeof availableLanguages)[number])
  ) {
    locale = defaultLanguage;
  }
  return {
    locale,
    messages: await getMessages(locale),
  };
});
