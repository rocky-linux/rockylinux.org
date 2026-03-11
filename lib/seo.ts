import { availableLanguages, defaultLanguage } from "@/config/i18nProperties";
import type { Metadata } from "next";

const BASE_URL = "https://rockylinux.org";

/**
 * Builds a full URL for a given locale and path.
 * English (default locale) has no prefix; others use `/{locale}{path}`.
 */
export function localeUrl(locale: string, path: string): string {
  return locale === defaultLanguage
    ? `${BASE_URL}${path}`
    : `${BASE_URL}/${locale}${path}`;
}

/**
 * Generates hreflang alternate links and canonical URL for a page.
 * Use this in `generateMetadata` to produce `<link rel="alternate" hreflang="...">` tags.
 */
export function alternatesForPath(
  locale: string,
  path: string
): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const lang of availableLanguages) {
    languages[lang] = localeUrl(lang, path);
  }
  languages["x-default"] = localeUrl(defaultLanguage, path);

  return {
    canonical: localeUrl(locale, path),
    languages,
  };
}
