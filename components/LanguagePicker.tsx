"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Cookies from "js-cookie";
import { Globe } from "lucide-react";

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

export default function LanguagePicker({
  availableLanguages,
}: LanguagePickerProps) {
  const locale = useLocale();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    Cookies.set("NEXT_LOCALE", newLocale, { path: "/" });

    const segments = pathname.split("/").filter(Boolean);
    const pathWithoutLocale =
      segments.length > 1 ? `/${segments.slice(1).join("/")}` : "/";

    const newPath =
      newLocale === "en"
        ? pathWithoutLocale
        : `/${newLocale}${pathWithoutLocale}`;

    window.location.href = newPath;
  };

  return (
    <Select
      defaultValue={locale}
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger className="w-[180px]">
        <Globe className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {availableLanguages.map((lang) => (
          <SelectItem
            key={lang}
            value={lang}
          >
            {languageNames[lang] || lang}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
