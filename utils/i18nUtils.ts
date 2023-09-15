import { availableLanguages } from "@/config/i18nProperties";
import type { AvailableLanguagesType } from "@/types/i18nTypes";

export const checkLanguage = (language: string): AvailableLanguagesType => {
  if (typeof language === "string") {
    if (!availableLanguages.includes(language as any)) {
      return "en";
    }

    return language as AvailableLanguagesType;
  } else {
    return "en";
  }
};

export const getMessages = async (locale: AvailableLanguagesType) => {
  return (await import(`@/dictionaries/${locale}.json`)).default;
};
