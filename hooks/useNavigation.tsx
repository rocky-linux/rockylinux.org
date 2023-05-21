import { useMemo } from "react";

export const useNavigation = () => {
  const mainNavigation = useMemo(
    () => [
      { name: "News", href: "/news" },
      { name: "About", href: "/about" },
      { name: "Community", href: "/community" },
      { name: "Documentation", href: "/documentation" },
    ],
    []
  );

  const extraNavigation = useMemo(
    () => [
      {
        name: (
          <>
            Download <span aria-hidden="true">&darr;</span>
          </>
        ),
        href: "/download",
      },
    ],
    []
  );

  const navigation = useMemo(
    () => [...mainNavigation, ...extraNavigation],
    [mainNavigation, extraNavigation]
  );

  return { navigation, mainNavigation, extraNavigation };
};
