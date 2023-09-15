import { useTranslations } from "next-intl";
import Link from "next-intl/link";

const Logo = () => {
  const t = useTranslations("header");
  const tOrganization = useTranslations("organization");

  return (
    <Link href="/" className="-m-1.5 p-1.5">
      <span className="sr-only">{tOrganization("name")}</span>
      <picture>
        <img
          className="h-8 w-auto"
          src="/images/logo.svg"
          alt={t("altRockyLogo")}
        />
      </picture>
    </Link>
  );
};

export default Logo;
