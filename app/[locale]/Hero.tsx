import Image from "next/image";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import DpgLogo from "@/components/otherLogosIcons/DpgLogo";

import { Button } from "@/components/ui/button";
import SmartLink from "@/components/SmartLink";

const highlight = (chunks: ReactNode) => (
  <span className="text-primary">{chunks}</span>
);

const Hero = () => {
  const t = useTranslations("home.hero");
  const tGlobal = useTranslations("global");

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate pt-12 sm:pt-24"
    >
      <div className="pb-12 sm:pb-24">
        <div className="mx-auto max-w-7xl px-2 lg:px-0">
          <div className="mx-auto max-w-2xl text-center">
            <h1
              id="hero-title"
              className="text-4xl font-bold tracking-tight sm:text-6xl font-display"
            >
              {t.rich("title", { span: highlight })}
            </h1>
            <p className="mt-6 text-lg leading-8">{t("description")}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <SmartLink
                href="/download"
                className=""
              >
                <Button className="p-5">{tGlobal("download")}</Button>
              </SmartLink>
              <SmartLink
                href="https://docs.rockylinux.org/guides/migrate2rocky/"
                className=""
              >
                <Button
                  variant="secondary"
                  className="p-5"
                >
                  {t("migrate")}
                </Button>
              </SmartLink>
            </div>
            <SmartLink
              href="https://digitalpublicgoods.net/"
              className=""
            >
              <DpgLogo />
              <p className="text-md font-display mt-2">{t("dpg")}</p>
            </SmartLink>
          </div>
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-slate-900/5 dark:bg-slate-100/5 p-2 ring-1 ring-inset ring-slate-900/10 dark:ring-slate-100/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/images/home-hero.png"
                alt="Rocky Linux Screenshot"
                width={2432}
                height={1442}
                priority
                className="rounded-md shadow-2xl ring-1 ring-slate-900/10 dark:ring-slate-100/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
