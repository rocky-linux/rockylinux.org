import { checkLanguage, getMessages } from "@/utils/i18nUtils";
import { notFound } from "next/navigation";
import { createTranslator } from "next-intl";

import type { ReactNode } from "react";
import type { AvailableLanguagesType } from "@/types/i18nTypes";

type GenerateMetadataProps = {
  children: ReactNode;
  params: { locale: AvailableLanguagesType };
};

export async function generateMetadata({
  params: { locale: uncheckedLocale },
}: GenerateMetadataProps) {
  const locale = checkLanguage(uncheckedLocale);
  try {
    const messages = await getMessages(locale);

    const t = createTranslator({ locale, messages });

    return {
      title: `${t("pages.download.download")} | ${t("organization.name")}`,
    };
  } catch {
    notFound();
  }
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
