import { defineRouting } from "next-intl/routing";
import { availableLanguages, defaultLanguage } from "@/config/i18nProperties";

export const routing = defineRouting({
  locales: availableLanguages,
  defaultLocale: defaultLanguage,
  localePrefix: "as-needed",
});
