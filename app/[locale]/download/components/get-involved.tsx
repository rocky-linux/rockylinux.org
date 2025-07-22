import { useTranslations } from "next-intl";

const GetInvolved = () => {
  const t = useTranslations("download");

  return (
    <div>
      <h1 className="text-xl font-bold font-display tracking-tight sm:text-2xl">
        {t("getInvolved.title")}
      </h1>
      <p className="mt-2 text-base">{t("getInvolved.text")}</p>
    </div>
  );
};

export default GetInvolved;
