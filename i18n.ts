import deepmerge from "deepmerge";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const userMessages = (await import(`./messages/${locale}.json`)).default;
  const defaultMessages = (await import(`./messages/en.json`)).default;

  return {
    messages: deepmerge(defaultMessages, userMessages),
  };
});
