import * as i18nUtils from "../i18nUtils";
import "@/config/i18nProperties";
import "@/dictionaries/en.json";

jest.mock("@/config/i18nProperties", () => {
  return {
    availableLanguages: ["en", "de"],
  };
});

jest.mock("@/dictionaries/en.json", () => {
  return {
    foo: "bar",
  };
});

describe("i18n Utils", () => {
  describe("checkLanguage Utility", () => {
    it("allows English", () => {
      expect(i18nUtils.checkLanguage("en")).toBe("en");
    });

    it("allows German", () => {
      expect(i18nUtils.checkLanguage("de")).toBe("de");
    });

    it("defaults to English when passed Italian", () => {
      expect(i18nUtils.checkLanguage("it")).toBe("en");
    });

    it("defaults to English when passed a blank string", () => {
      expect(i18nUtils.checkLanguage("")).toBe("en");
    });
  });
  describe("getMessages", () => {
    it("returns English messages", async () => {
      const messages = await i18nUtils.getMessages("en");
      expect(messages.foo).toBe("bar");
    });
  });
});
