import { availableLanguages } from "@/config/i18nProperties";
import type { AvailableLanguagesType } from "@/types/i18nTypes";

export const checkLanguage = (language: string): AvailableLanguagesType => {
  if (typeof language === "string") {
    if (
      !availableLanguages.includes(
        language as (typeof availableLanguages)[number]
      )
    ) {
      return "en";
    }

    return language as AvailableLanguagesType;
  } else {
    return "en";
  }
};

export const getMessages = async (locale: AvailableLanguagesType) => {
  return (await import(`@/messages/${locale}.json`)).default;
};
