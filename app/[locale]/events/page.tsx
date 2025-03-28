import { getTranslations } from "next-intl/server";
import EventList from "./components/EventList";

export async function generateMetadata() {
  const t = await getTranslations("events");

  return {
    title: `${t("title")} - Rocky Linux`,
    description: t("description"),
  };
}

export default async function EventsPage() {
  const t = await getTranslations("events");

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-2 text-lg leading-8">{t("description")}</p>
        </div>
        <div className="mt-10 sm:mt-16">
          <EventList />
        </div>
      </div>
    </div>
  );
}
