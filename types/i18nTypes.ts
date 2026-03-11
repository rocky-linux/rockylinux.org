import { availableLanguages } from "@/config/i18nProperties";

export type Locale = (typeof availableLanguages)[number];

export interface CrowdinLanguage {
  id: string;
  name: string;
  editorCode: string;
  twoLettersCode: string;
  threeLettersCode: string;
  locale: string;
  androidCode: string;
  osxCode: string;
  osxLocale: string;
  pluralCategoryNames: string[];
  pluralRules: string;
  pluralExamples: string[];
  textDirection: "ltr" | "rtl";
  dialectOf: string | null;
}

export interface CrowdinWordsPhrases {
  total: number;
  translated: number;
  preTranslateAppliedTo: number;
  approved: number;
}

export interface CrowdinQaChecksStatus {
  total: number;
  inProgress: number;
  passed: number;
  failed: number;
}

export interface CrowdinLanguageProgressData {
  languageId: string;
  language: CrowdinLanguage;
  words: CrowdinWordsPhrases;
  phrases: CrowdinWordsPhrases;
  translationProgress: number;
  approvalProgress: number;
  qaChecksStatus: CrowdinQaChecksStatus;
}

export interface CrowdinLanguageProgressResponse {
  data: Array<{
    data: CrowdinLanguageProgressData;
  }>;
  pagination: {
    offset: number;
    limit: number;
  };
}
