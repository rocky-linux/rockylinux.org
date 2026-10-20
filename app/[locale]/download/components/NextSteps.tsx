import { useTranslations } from "next-intl";

const STEPS = [
  { id: "install", href: "https://docs.rockylinux.org/guides/installation/" },
  { id: "docs", href: "https://docs.rockylinux.org" },
  { id: "migrate", href: "https://docs.rockylinux.org/guides/migrate2rocky/" },
  { id: "community", href: "https://forums.rockylinux.org" },
] as const;

const NextSteps = () => {
  const t = useTranslations("download.nextSteps");

  return (
    <section aria-labelledby="next-steps-heading">
      <h2
        id="next-steps-heading"
        className="text-2xl font-bold font-display tracking-tight"
      >
        {t("title")}
      </h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ id, href }) => (
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
