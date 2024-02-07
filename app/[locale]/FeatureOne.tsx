import { useTranslations } from "next-intl";

import FeaturesList from "./components/FeaturesList";
import Feature from "./components/Feature";

import { MixIcon, RocketIcon, PaperPlaneIcon } from "@radix-ui/react-icons";

const featureIconClassNames = "h-5 w-5 flex-none text-primary";

const FeatureOne = () => {
  const t = useTranslations("home.features");

  return (
    <div className="py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary font-display uppercase">
            {t("subText")}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl font-display">
            {t("title")}
          </p>
          <p className="mt-6 text-lg leading-8">{t("description")}</p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <FeaturesList>
            <Feature description={t("productionReady.description")}>
              <MixIcon
                className={featureIconClassNames}
                aria-hidden="true"
              />
              {t("productionReady.name")}
            </Feature>
            <Feature description={t("communitySupported.description")}>
              <RocketIcon
                className={featureIconClassNames}
                aria-hidden="true"
              />
              {t("communitySupported.name")}
            </Feature>
            <Feature description={t("easyMigration.description")}>
              <PaperPlaneIcon
                className={featureIconClassNames}
                aria-hidden="true"
              />
              {t("easyMigration.name")}
            </Feature>
          </FeaturesList>
        </div>
      </div>
    </div>
  );
};

export default FeatureOne;
