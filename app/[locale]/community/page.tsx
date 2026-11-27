import { getTranslations, setRequestLocale } from "next-intl/server";
import { extLink } from "@/components/SmartLink";
import type { Metadata } from "next";
import Quiz from "./components/Quiz";
import { QuizInterests } from "./components/QuizInterestTypes";
import { alternatesForPath } from "@/lib/seo";

const MATTERMOST = "https://chat.rockylinux.org/";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Community Quick Start - Rocky Linux",
    description:
      "Welcome! Find out how to get started in the Rocky Linux community.",
    alternates: alternatesForPath(locale, "/community"),
  };
}

type Props = {
  params: Promise<{ locale: string }>;
};

const CommunityPage = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("community");

  const quizTranslations: QuizInterests = {
    chatting: t("interests.chatting.title"),
    chattingDescription: t.rich("interests.chatting.description", {
      link: extLink(MATTERMOST),
    }),
    bugs: t("interests.bugs.title"),
    bugsDescription: t.rich("interests.bugs.description", {
      link1: extLink(MATTERMOST),
      link2: extLink("https://bugs.rockylinux.org/"),
    }),
    webdev: t("interests.webdev.title"),
    webDevDescription: t.rich("interests.webdev.description", {
      link1: extLink(MATTERMOST),
      link2: extLink("https://chat.rockylinux.org/rocky-linux/channels/web"),
      link3: extLink("https://github.com/rocky-linux/rockylinux.org"),
    }),
    graphics: t("interests.graphics.title"),
    graphicsDescription: t.rich("interests.graphics.description", {
      link1: extLink(MATTERMOST),
      link2: extLink("https://chat.rockylinux.org/rocky-linux/channels/design"),
    }),
    release: t("interests.release.title"),
    releaseDescription: t.rich("interests.release.description", {
      link1: extLink(MATTERMOST),
      link2: extLink(
        "https://chat.rockylinux.org/rocky-linux/channels/development"
      ),
    }),
    sig: t("interests.sig.title"),
    sigDescription: t.rich("interests.sig.description", {
      link1: extLink(MATTERMOST),
      link2: extLink("https://wiki.rockylinux.org/special_interest_groups/"),
    }),
    docs: t("interests.docs.title"),
    docsDescription: t.rich("interests.docs.description", {
      link1: extLink(MATTERMOST),
      link2: extLink(
        "https://chat.rockylinux.org/rocky-linux/channels/documentation"
      ),
      link3: extLink(
        "https://github.com/rocky-linux/documentation/blob/main/README.md"
      ),
    }),
    noSelection: t("noSelection"),
  };

  return (
    <>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-display tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-2 text-lg leading-8">{t("description")}</p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl grid-cols-1 gap-8 border-t pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <Quiz translations={quizTranslations} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityPage;
