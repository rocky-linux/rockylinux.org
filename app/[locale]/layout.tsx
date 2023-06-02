import { NextIntlClientProvider, createTranslator, useLocale } from "next-intl";
import { checkLanguage } from "@/utils/i18nUtils";
import { notFound } from "next/navigation";
import "./globals.css";

import Header from "./layout/header/Header";

import type { AvailableLanguagesType } from "@/types/i18nTypes";
import type { ReactNode } from "react";

async function getMessages(locale: AvailableLanguagesType) {
  try {
    return (await import(`@/dictionaries/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

type GenerateMetadataProps = {
  children: ReactNode;
  params: { locale: AvailableLanguagesType };
};

export async function generateMetadata({
  params: { locale: uncheckedLocale },
}: GenerateMetadataProps) {
  const locale = checkLanguage(uncheckedLocale);
  const messages = await getMessages(locale);

  const t = createTranslator({ locale, messages });

  return {
    title: t("organization.name"),
    description: t("organization.description"),
    icons: {
      icon: "/favicon.png",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: AvailableLanguagesType };
}) {
  const uncheckedLocale = useLocale();
  const locale = checkLanguage(uncheckedLocale);
  const messages = await getMessages(locale);

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html className="h-full" lang={locale}>
      <body className="h-full">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
