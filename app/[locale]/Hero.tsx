import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

const Hero = () => {
  const t = useTranslations("home.hero");
  const tGlobal = useTranslations("global");

  return (
    <div className="relative isolate pt-12 sm:pt-24">
      <div className="pb-12 sm:pb-24">
        <div className="mx-auto max-w-7xl px-2 lg:px-0">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl font-display">
              {t.rich("title", {
                span: (chunks) => (
                  <span className="text-primary">{chunks}</span>
                ),
              })}
            </h1>
            <p className="mt-6 text-lg leading-8">{t("description")}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="/download">
                <Button className="p-5">{tGlobal("download")}</Button>
              </a>
              <a href="https://docs.rockylinux.org/guides/migrate2rocky/">
                <Button
                  variant="secondary"
                  className="p-5"
                >
                  {t("migrate")}
                </Button>
              </a>
            </div>
          </div>
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-slate-900/5 dark:bg-slate-100/5 p-2 ring-1 ring-inset ring-slate-900/10 dark:ring-slate-100/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/images/home-hero.png"
                alt="Rocky Linux Screenshot"
                width={2432}
                height={1442}
                className="rounded-md shadow-2xl ring-1 ring-slate-900/10 dark:ring-slate-100/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
