import Link from "next/link";

import Pill from "@/components/pills/Pill";
import { buttonVariants } from "@/components/ui/button";

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";
import HeroTitleBg from "./HeroTitleBg";

export default function Hero() {
  const t = useTranslations("pages.home.hero");

  return (
    <div className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="inline-flex space-x-6">
              <Pill>{t("whatsNewPill")}</Pill>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                <span>{t("versionReleased", { version: "9.2" })}</span>
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl font-display">
            {t.rich("title", {
              bg: chunks => (
                <span className="relative whitespace-nowrap text-green-500">
                  <HeroTitleBg></HeroTitleBg>
                  <span className="relative">{chunks}</span>
                </span>
              ),
            })}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">{t("content")}</p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/download"
              className={buttonVariants({ variant: "secondary" })}
            >
              {t("downloadButton")}
            </Link>
            <a
              href="#"
              className="flex items-center text-sm font-semibold leading-6 text-gray-900"
            >
              <span>{t("migrateButton")}</span>
              <ChevronRightIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="relative">
              <picture>
                <span className="absolute top-1 left-1 mt-1 ml-1 h-full w-full bg-black rounded-md"></span>
                <img
                  src="/images/rocky9.png"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="w-[76rem] fold-bold rounded-md relative inline-block h-full border-2 border-black/70 bg-white text-base font-semibold text-black"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
