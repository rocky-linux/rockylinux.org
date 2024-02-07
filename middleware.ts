import createMiddleware from "next-intl/middleware";
import { availableLanguages } from "./config/i18nProperties";

export default createMiddleware({
  // A list of all locales that are supported
  locales: [...availableLanguages],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "en",
});

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
