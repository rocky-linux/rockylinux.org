"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlobeIcon } from "@radix-ui/react-icons";
import { availableLanguages as allLocales } from "@/config/i18nProperties";

type LanguagePickerProps = {
  availableLanguages: string[];
};

const languageNames: Record<string, string> = {
  "af-ZA": "Afrikaans",
  "ar-SA": "العربية",
  "ca-ES": "Català",
  "cs-CZ": "Čeština",
  "da-DK": "Dansk",
  "de-DE": "Deutsch",
  "el-GR": "Ελληνικά",
  en: "English",
  "es-ES": "Español",
  "fa-IR": "فارسی",
  "fi-FI": "Suomi",
  "fr-FR": "Français",
  "he-IL": "עברית",
  "hi-IN": "हिन्दी",
  "hu-HU": "Magyar",
  "id-ID": "Bahasa Indonesia",
  "it-IT": "Italiano",
  "ja-JP": "日本語",
  "ka-GE": "ქართული",
  "ko-KR": "한국어",
  "nl-NL": "Nederlands",
  "no-NO": "Norsk",
  "pl-PL": "Polski",
  "pt-BR": "Português (Brasil)",
  "pt-PT": "Português",
  "ro-RO": "Română",
  "ru-RU": "Русский",
  "sr-SP": "Српски",
  "sv-SE": "Svenska",
  "ta-IN": "தமிழ்",
  "tr-TR": "Türkçe",
  "uk-UA": "Українська",
  "vi-VN": "Tiếng Việt",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
};

function getDisplayName(locale: string): string {
  return languageNames[locale] || locale;
}

export default function LanguagePicker({
  availableLanguages,
}: LanguagePickerProps) {
  const locale = useLocale();
  const t = useTranslations("global");
  const pathname = usePathname();

  const collator = new Intl.Collator("en", { sensitivity: "base" });
  const sortedLanguages = [...availableLanguages].sort((a, b) =>
    collator.compare(getDisplayName(a), getDisplayName(b))
  );

  const handleLanguageChange = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    // Strip existing locale prefix if present
    const segments = pathname.split("/").filter(Boolean);
    const firstSegment = segments[0];
    const hasLocalePrefix =
      firstSegment &&
      allLocales.includes(firstSegment as (typeof allLocales)[number]);
    const pathWithoutLocale = hasLocalePrefix
      ? `/${segments.slice(1).join("/") || ""}`
      : pathname;

    const newPath =
      newLocale === "en"
        ? pathWithoutLocale || "/"
        : `/${newLocale}${pathWithoutLocale}`;

    window.location.href = newPath;
  };

  return (
    <Select
      defaultValue={locale}
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger
        className="w-[180px]"
        aria-label={t("selectLanguage")}
      >
        <GlobeIcon className="mr-2 h-4 w-4" />
        <SelectValue placeholder={t("selectLanguage")} />
      </SelectTrigger>
      <SelectContent>
        {sortedLanguages.map((lang) => (
          <SelectItem
            key={lang}
            value={lang}
          >
            {getDisplayName(lang)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
