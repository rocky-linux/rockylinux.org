import { availableLanguages } from "@/config/i18nProperties";

interface CrowdinLanguageProgress {
  data: Array<{
    data: {
      languageId: string;
      translationProgress: number;
    };
  }>;
}

export async function getAvailableLanguages(
  threshold: number = 75
): Promise<string[]> {
  try {
    if (!process.env.CROWDIN_PROJECT_ID || !process.env.CROWDIN_API_TOKEN) {
      return [...availableLanguages];
    }

    const response = await fetch(
      `https://api.crowdin.com/api/v2/projects/${process.env.CROWDIN_PROJECT_ID}/languages/progress`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CROWDIN_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return [...availableLanguages];
    }

    const data: CrowdinLanguageProgress = await response.json();

    const qualifiedLanguages = data.data
      .filter((item) => item.data.translationProgress >= threshold)
      .map((item) => {
        return availableLanguages.find((locale) =>
          locale.startsWith(item.data.languageId)
        );
      })
      .filter(Boolean) as string[];

    return [...new Set(["en", ...qualifiedLanguages])].sort();
  } catch (error) {
    return [...availableLanguages];
  }
}
