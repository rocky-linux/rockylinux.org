import type { ReactNode } from "react";
import acknowledgements from "@/data/security-acknowledgements.json";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata, Route } from "next";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { alternatesForPath } from "@/lib/seo";
import type { SecurityAcknowledgements } from "@/types/securityTypes";

const SECURITY_EMAIL = "security@rockylinux.org";
const PGP_KEY_PATH = "/security-pgp-key.asc";
const PGP_FINGERPRINT = "F4C0 847D 7089 F5B9 B827  E66F 3275 41AF 5CE5 F44B";
const WKD_COMMAND = `gpg --locate-keys ${SECURITY_EMAIL}`;
const LINK_CLASS = "text-primary underline";

type Props = {
  params: Promise<{ locale: string }>;
};

const isExternal = (href: string): boolean => /^https?:\/\//.test(href);

/** Chunk renderer for an off-site link. */
const extLink = (href: string) =>
  function ExtLinkChunk(chunks: ReactNode) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={LINK_CLASS}
      >
        {chunks}
      </a>
    );
  };

/** Chunk renderer for a same-origin link. */
const localLink = (href: string) =>
  function LocalLinkChunk(chunks: ReactNode) {
    return (
      <a
        href={href}
        className={LINK_CLASS}
      >
        {chunks}
      </a>
    );
  };

const renderCode = (chunks: ReactNode) => (
  <code className="bg-muted rounded px-1 py-0.5">{chunks}</code>
);

/** Links a target that may be an app route or an off-site URL. */
const ResourceLink = ({
  href,
  children,
}: Readonly<{ href: string; children: ReactNode }>) =>
  isExternal(href) ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={LINK_CLASS}
    >
      {children}
    </a>
  ) : (
    <Link
      href={href as Route}
      className={LINK_CLASS}
    >
      {children}
    </Link>
  );

/**
 * Builds the metadata for the security page.
 *
 * @param props - The page props.
 * @param props.params - Route params; resolves to the active locale.
 * @returns The page title, description, and hreflang alternates.
 */
export async function generateMetadata({
  params,
}: Readonly<Props>): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Security - Rocky Linux",
    description: "How to report a security vulnerability in Rocky Linux.",
    alternates: alternatesForPath(locale, "/security"),
  };
}

/**
 * Renders the security page.
 *
 * @param props - The page props.
 * @param props.params - Route params; resolves to the active locale.
 * @returns The composed page.
 */
const SecurityPage = async ({ params }: Readonly<Props>) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("security");

  const credits = (acknowledgements as SecurityAcknowledgements)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const relatedLinks = [
    {
      title: t("related.repo"),
      description: t("related.repoDescription"),
      href: "https://docs.rockylinux.org/10/teams/rel_eng/repo/",
    },
    {
      title: t("related.cveHygiene"),
      description: t("related.cveHygieneDescription"),
      href: "https://docs.rockylinux.org/10/guides/security/cve_hygiene/",
    },
    {
      title: t("related.errata"),
      description: t("related.errataDescription"),
      href: "https://errata.rockylinux.org/",
    },
    {
      title: t("related.gpgKeys"),
      description: t("related.gpgKeysDescription"),
      href: "/resources/gpg-key-info",
    },
  ];

  const steps = [
    t("process.step1"),
    t("process.step2"),
    t("process.step3"),
    t("process.step4"),
    t("process.step5"),
  ];

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-display tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg leading-8">{t("description")}</p>
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold font-display tracking-tight">
            {t("reporting.title")}
          </h2>
          <p className="mt-4 leading-7">
            {t.rich("reporting.description", {
              link: localLink(`mailto:${SECURITY_EMAIL}`),
            })}
          </p>
          <p className="mt-4 leading-7">{t("reporting.disclosure")}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold font-display tracking-tight">
            {t("pgp.title")}
          </h2>
          <p className="mt-4 leading-7">
            {t.rich("pgp.description", {
              code1: renderCode,
              code2: renderCode,
            })}
          </p>
          <p className="mt-4 leading-7">
            <a
              href={PGP_KEY_PATH}
              className={LINK_CLASS}
            >
              {t("pgp.downloadLabel")}
            </a>
          </p>
          <p className="mt-4 leading-7">{t("pgp.wkdLabel")}</p>
          <pre className="bg-muted mt-2 overflow-x-auto rounded px-4 py-3 text-sm">
            <code>{WKD_COMMAND}</code>
          </pre>
          <p className="mt-4 leading-7">
            <span className="font-semibold">{t("pgp.fingerprintLabel")}</span>
          </p>
          <pre className="bg-muted mt-2 overflow-x-auto rounded px-4 py-3 text-sm">
            <code>{PGP_FINGERPRINT}</code>
          </pre>
          <p className="mt-4 leading-7">
            {t.rich("pgp.securityTxtNote", {
              link: localLink("/.well-known/security.txt"),
            })}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold font-display tracking-tight">
            {t("scope.title")}
          </h2>
          <p className="mt-4 leading-7">{t("scope.description")}</p>
          <p className="mt-4 leading-7">{t("scope.upstream")}</p>
          <p className="mt-4 leading-7">
            {t.rich("scope.bugs", {
              link: extLink("https://bugs.rockylinux.org"),
            })}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold font-display tracking-tight">
            {t("process.title")}
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-6 leading-7">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold font-display tracking-tight">
            {t("related.title")}
          </h2>
          <ul className="mt-4 space-y-4">
            {relatedLinks.map((item) => (
              <li key={item.href}>
                <ResourceLink href={item.href}>{item.title}</ResourceLink>
                <p className="mt-1 leading-7">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold font-display tracking-tight">
            {t("acknowledgements.title")}
          </h2>
          <p className="mt-4 leading-7">{t("acknowledgements.description")}</p>
          {credits.length === 0 ? (
            <p className="mt-6 leading-7">{t("acknowledgements.empty")}</p>
          ) : (
            <ul className="mt-6 space-y-6">
              {credits.map((credit) => (
                <li
                  key={`${credit.name}-${credit.date}`}
                  className="rounded-xl border p-4 sm:p-6"
                >
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                    <span className="font-semibold">{credit.name}</span>
                    {credit.org ? (
                      <span className="text-sm">
                        {credit.href ? (
                          <a
                            href={credit.href}
                            target="_blank"
                            rel="noreferrer"
                            className={LINK_CLASS}
                          >
                            {credit.org}
                          </a>
                        ) : (
                          credit.org
                        )}
                      </span>
                    ) : null}
                    {credit.cve ? (
                      <Badge variant="secondary">{credit.cve}</Badge>
                    ) : null}
                  </div>
                  <p className="mt-2 leading-7">{credit.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 text-sm">
                    <time dateTime={credit.date}>{credit.date}</time>
                    {credit.advisory ? (
                      <ResourceLink href={credit.advisory}>
                        {t("acknowledgements.advisoryLabel")}
                      </ResourceLink>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default SecurityPage;
