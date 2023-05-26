import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const useNavigation = () => {
  const t = useTranslations("menu");

  const mainNavigation = useMemo(
    () => [
      { name: t("news"), href: "/news" },
      { name: t("about"), href: "/about" },
      { name: t("community"), href: "/community" },
      { name: t("documentation"), href: "/documentation" },
    ],
    [t]
  );

  const extraNavigation = useMemo(
    () => [
      {
        name: (
          <>
            {t("download")} <span aria-hidden="true">&darr;</span>
          </>
        ),
        href: "/download",
      },
    ],
    [t]
  );

  const navigation = useMemo(
    () => [...mainNavigation, ...extraNavigation],
    [mainNavigation, extraNavigation]
  );

  return { navigation, mainNavigation, extraNavigation };
};
