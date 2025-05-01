export default function withNextIntl(i18nPath) {
  return function withConfig(config) {
    return { ...config, i18n: { locales: ["en"], defaultLocale: "en" } };
  };
}
