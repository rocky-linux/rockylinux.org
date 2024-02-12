import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SlugNotFound() {
  const t = useTranslations("news.notFound");

  return (
    <div className="pt-10 pb-24 sm:pt-12 sm:pb-32">
      <div className="mx-auto max-w-3xl text-base leading-7">
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center font-display">
          {t("title")}
        </h1>
        <div className="prose dark:prose-invert prose-headings:font-display prose-a:text-primary prose-pre:bg-muted prose-pre:py-3 prose-pre:px-4 prose-pre:rounded prose-img:rounded-md max-w-none">
          {t.rich("description", {
            newsLink: (chunks) => <Link href="/news">{chunks}</Link>,
          })}
        </div>
      </div>
    </div>
  );
}
