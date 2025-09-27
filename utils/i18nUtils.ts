import { availableLanguages } from "@/config/i18nProperties";
import type { Locale } from "@/types/i18nTypes";

export const checkLanguage = (language: string): Locale => {
  if (typeof language === "string") {
    if (
      !availableLanguages.includes(
        language as (typeof availableLanguages)[number]
      )
    ) {
      return "en";
    }

    return language as Locale;
  } else {
    return "en";
  }
};

export const getMessages = async (locale: Locale) => {
  return (await import(`@/messages/${locale}.json`)).default;
};
