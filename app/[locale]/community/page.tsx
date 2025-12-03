import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import Quiz from "./components/Quiz";
import { QuizInterests } from "./components/QuizInterestTypes";

export const metadata: Metadata = {
  title: "Community Quick Start - Rocky Linux",
  description:
    "Welcome! Find out how to get started in the Rocky Linux community.",
};

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
      link: (chunks) => {
        return (
          <Link
            target="_blank"
            href="https://chat.rockylinux.org/"
            className="text-primary underline"
          >
            {chunks}
          </Link>
        );
      },
    }),
    bugs: t("interests.bugs.title"),
    bugsDescription: t.rich("interests.bugs.description", {
      link1: (chunks) => {
        return (
          <Link
            target="_blank"
            href="https://chat.rockylinux.org/"
            className="text-primary underline"
          >
            {chunks}
          </Link>
        );
      },
      link2: (chunks) => {
        return (
          <Link
            target="_blank"
            href="https://bugs.rockylinux.org/"
            className="text-primary underline"
          >
            {chunks}
          </Link>
        );
      },
    }),
    webdev: t("interests.webdev.title"),
    webDevDescription: t.rich("interests.webdev.description", {
      link1: (chunks) => {
        return (
          <Link
            target="_blank"
            href="https://chat.rockylinux.org/"
            className="text-primary underline"
          >
            {chunks}
          </Link>
        );
      },
      link2: (chunks) => {
        return (
          <Link
            target="_blank"
            href="https://chat.rockylinux.org/rocky-linux/channels/web"
            className="text-primary underline"
          >
            {chunks}
          </Link>
        );
      },
      link3: (chunks) => {
        return (
          <Link
            target="_blank"
            href="https://github.com/rocky-linux/rockylinux.org"
            className="text-primary underline"
          >
            {chunks}
          </Link>
        );
      },
    }),
    graphics: t("interests.graphics.title"),
    graphicsDescription: t.rich("interests.graphics.description", {
      link1: (chunks) => {
        return (
          <Link
            target="_blank"
            href="https://chat.rockylinux.org/"
            className="text-primary underline"
          >
            {chunks}
          </Link>
        );
      },
      link2: (chunks) => {
        return (
          <Link
            target="_blank"
            href="https://chat.rockylinux.org/rocky-linux/channels/design"
            className="text-primary underline"
          >
            {chunks}
          </Link>
        );
      },
    }),
    release: t("interests.release.title"),
    releaseDescription: t.rich("interests.release.description", {
      link1: (chunks) => {
        return (
          <Link
            target="_blank"
            href="https://chat.rockylinux.org/"
            className="text-primary underline"
          >
            {chunks}
          </Link>
        );
      },
      link2: (chunks) => {
        return (
          <Link
            target="_blank"
            href="https://chat.rockylinux.org/rocky-linux/channels/development"
            className="text-primary underline"
          >
            {chunks}
          </Link>
        );
      },
    }),
    sig: t("interests.sig.title"),
    sigDescription: t.rich("interests.sig.description", {
      link1: (chunks) => {
        return (
          <Link
            target="_blank"
            href="https://chat.rockylinux.org/"
            className="text-primary underline"
          >
            {chunks}
          </Link>
        );
      },
      link2: (chunks) => {
        return (
          <Link
            target="_blank"
            href="https://wiki.rockylinux.org/special_interest_groups/"
            className="text-primary underline"
          >
            {chunks}
          </Link>
        );
      },
    }),
    docs: t("interests.docs.title"),
    docsDescription: t.rich("interests.docs.description", {
      link1: (chunks) => {
        return (
          <Link
            target="_blank"
            href="https://chat.rockylinux.org/"
            className="text-primary underline"
          >
            {chunks}
          </Link>
        );
      },
      link2: (chunks) => {
        return (
          <Link
            target="_blank"
            href="https://chat.rockylinux.org/rocky-linux/channels/documentation"
            className="text-primary underline"
          >
            {chunks}
          </Link>
        );
      },
      link3: (chunks) => {
        return (
          <Link
            target="_blank"
            href="https://github.com/rocky-linux/documentation/blob/main/README.md"
            className="text-primary underline"
          >
            {chunks}
          </Link>
        );
      },
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
