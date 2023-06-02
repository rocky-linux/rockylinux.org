import { useTranslations } from "next-intl";

const TopHeaderBar = () => {
  const t = useTranslations("header");

  return (
    <div className="bg-gray-200 mx-auto flex max-w-7xl py-2 px-6 lg:px-8 lg:rounded-b-lg">
      <picture>
        <img
          src="/images/resf-logo.svg"
          className="h-7 w-auto"
          alt={t("altRESFLogo")}
        />
      </picture>
    </div>
  );
};

export default TopHeaderBar;
