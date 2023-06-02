import { checkLanguage, getMessages } from "@/utils/i18nUtils";
import { notFound } from "next/navigation";
import { createTranslator } from "next-intl";

type GenerateMetadataProps = {
  params: { locale: string };
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
