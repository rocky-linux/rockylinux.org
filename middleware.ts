import createMiddleware from "next-intl/middleware";
import { availableLanguages } from "./config/i18nProperties";

export default createMiddleware({
  // A list of all locales that are supported
  locales: [...availableLanguages],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "en",
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
