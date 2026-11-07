import { useTranslations } from "next-intl";

import { docsUrls } from "@/utils/docsLinks";

interface NextStepsProps {
  /** Selected release; docs links point at that release's documentation */
  versionId: string;
}

/**
 * Links to what to do after downloading, pointing at the documentation for the
 * selected release.
 *
 * @param props - Component props.
 * @param props.versionId - Selected release, e.g. "rocky-10".
 * @returns The "What's next?" section.
 */
const NextSteps = ({ versionId }: Readonly<NextStepsProps>) => {
  const t = useTranslations("download.nextSteps");
  const docs = docsUrls(versionId);
  const steps = [
    { id: "install", href: docs.install },
    { id: "docs", href: docs.home },
    { id: "migrate", href: docs.migrate },
    { id: "community", href: "https://forums.rockylinux.org" },
  ] as const;

  return (
    <section aria-labelledby="next-steps-heading">
      <h2
        id="next-steps-heading"
        className="text-2xl font-bold font-display tracking-tight"
      >
        {t("title")}
      </h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ id, href }) => (
          <li key={id}>
            <a
              href={href}
              className="block h-full rounded-xl border bg-card p-4 transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-ring"
            >
              <span className="block font-display font-bold">
                {t(`${id}.title`)}
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {t(`${id}.text`)}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NextSteps;
