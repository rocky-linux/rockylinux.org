import { availableLanguages } from "@/config/i18nProperties";
import { CrowdinLanguageProgressResponse } from "@/types/i18nTypes";

export async function getAvailableLanguages(
  threshold: number = 75
): Promise<string[]> {
  try {
    if (!process.env.CROWDIN_PROJECT_ID || !process.env.CROWDIN_API_TOKEN) {
      if (!process.env.CROWDIN_PROJECT_ID && !process.env.CROWDIN_API_TOKEN) {
        console.warn(
          "CROWDIN_PROJECT_ID and CROWDIN_API_TOKEN are both not set, falling back to all languages"
        );
      } else if (!process.env.CROWDIN_PROJECT_ID) {
        console.warn(
          "CROWDIN_PROJECT_ID is not set, falling back to all languages"
        );
      } else {
        console.warn(
          "CROWDIN_API_TOKEN is not set, falling back to all languages"
        );
      }
      return [...availableLanguages];
    }

    const response = await fetch(
      `https://api.crowdin.com/api/v2/projects/${process.env.CROWDIN_PROJECT_ID}/languages/progress?limit=500`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CROWDIN_API_TOKEN}`,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      console.error(
        `Crowdin API error: ${response.status} ${response.statusText}`
      );
      return [...availableLanguages];
    }

    const data: CrowdinLanguageProgressResponse = await response.json();

    const qualifiedLanguages = data.data
      .filter((item) => item.data.translationProgress >= threshold)
      .flatMap((item) => {
        const { languageId } = item.data;
        return availableLanguages.filter(
          (locale) =>
            locale === languageId || locale.startsWith(`${languageId}-`)
        );
      });

    return [...new Set(["en", ...qualifiedLanguages])].sort();
  } catch (error) {
    console.error("Error fetching available languages:", error);
    return [...availableLanguages];
  }
}
