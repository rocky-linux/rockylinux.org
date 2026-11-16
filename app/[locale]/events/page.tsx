import { getTranslations, setRequestLocale } from "next-intl/server";

import { getEvents } from "@/lib/events";
import { alternatesForPath } from "@/lib/seo";

import EventCard from "./components/EventCard";

import type { Metadata } from "next";

/** Re-render daily so events move from upcoming to past without a redeploy. */
export const revalidate = 86400;

type Props = {
  params: Promise<{ locale: string }>;
};

/**
 * Builds the metadata for the events page.
 *
 * @param props - The page props.
 * @param props.params - Route params; resolves to the active locale.
 * @returns The page title, description, and hreflang alternates.
 */
export async function generateMetadata({
  params,
}: Readonly<Props>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("events");
  const title = t("title");
  const description = t("description");

  return {
    title: `${title} - Rocky Linux`,
    description,
    openGraph: {
      title,
      description,
      url: "https://rockylinux.org/events",
      siteName: "Rocky Linux",
      locale: "en_US",
      type: "website",
    },
    alternates: alternatesForPath(locale, "/events"),
  };
}

/**
 * Renders the events page: upcoming events first, then past events.
 *
 * @param props - The page props.
 * @param props.params - Route params; resolves to the active locale.
 * @returns The composed page.
 */
const EventsPage = async ({ params }: Readonly<Props>) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("events");
  const { upcoming, past } = await getEvents();

  const sections = [
    {
      key: "upcoming",
      heading: t("upcoming"),
      empty: t("noUpcoming"),
      events: upcoming,
    },
    { key: "past", heading: t("past"), empty: null, events: past },
  ];

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-display tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-lg leading-8">{t("description")}</p>
        </div>
        {sections.map(({ key, heading, empty, events }) =>
          events.length === 0 && !empty ? null : (
            <section
              key={key}
              aria-labelledby={`events-${key}`}
              className="mt-10 border-t pt-10 sm:mt-16 sm:pt-16"
            >
              <h2
                id={`events-${key}`}
                className="text-2xl font-bold font-display tracking-tight"
              >
                {heading}
              </h2>
              {events.length === 0 ? (
                <p className="mt-6">{empty}</p>
              ) : (
                <ul className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
                  {events.map((event) => (
                    <li key={event.slug}>
                      <EventCard
                        event={event}
                        visitLabel={t("visitWebsite")}
                        externalLinkLabel={t("opensInNewTab")}
                        isPast={key === "past"}
                        attendedLabel={t("attended")}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )
        )}
      </div>
    </div>
  );
};

export default EventsPage;
