import fs from "fs/promises";
import path from "path";
import { MetadataRoute } from "next";
import { getSortedPostsData } from "@/lib/news";
import { availableLanguages } from "@/config/i18nProperties";
import { localeUrl } from "@/lib/seo";

interface StaticPageData {
  route: string;
  lastModified: Date;
}

const isExcludedDirectory = (name: string) =>
  ["contribute", "legal", "resources", "support"].includes(name);

async function getStaticPagesData(
  directory: string
): Promise<StaticPageData[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const pages: StaticPageData[] = [];

  for (const entry of entries) {
    const res = path.resolve(directory, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "[locale]") {
        const localePages = await getStaticPagesData(res);
        pages.push(
          ...localePages.filter(
            (page) => !page.route.includes("[") && !page.route.includes("]")
          )
        );
      } else if (
        entry.name !== "components" &&
        entry.name !== "[slug]" &&
        !isExcludedDirectory(entry.name)
      ) {
        const relativeRoutePath = path
          .relative("app/[locale]", res)
          .replace(/\.tsx$/, "");
        const routePath = "/" + relativeRoutePath + "/";

        pages.push({ route: routePath, lastModified: new Date() });

        pages.push(...(await getStaticPagesData(res)));
      }
    }
  }

  return pages;
}

/**
 * Builds hreflang alternate links for a given path across all locales.
 */
function alternateLanguages(pagePath: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const lang of availableLanguages) {
    languages[lang] = localeUrl(lang, pagePath);
  }
  return languages;
}

/**
 * Creates a sitemap entry with alternate language links.
 */
function sitemapEntry(
  pagePath: string,
  lastModified: Date
): MetadataRoute.Sitemap[number] {
  return {
    url: localeUrl("en", pagePath),
    lastModified,
    alternates: { languages: alternateLanguages(pagePath) },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const baseLinks = [
    sitemapEntry("/", now),
    sitemapEntry("/legal/licensing", now),
    sitemapEntry("/legal/privacy", now),
    sitemapEntry("/legal/trademarks", now),
    sitemapEntry("/about/coc", now),
  ];

  const [posts, staticPages] = await Promise.all([
    getSortedPostsData(),
    getStaticPagesData("app/[locale]"),
  ]);

  const postLinks = posts.map((post) =>
    sitemapEntry(`/news/${post.slug}`, new Date(post.date))
  );

  const staticPageLinks = staticPages.map((page) =>
    sitemapEntry(page.route, page.lastModified)
  );

  return [...baseLinks, ...postLinks, ...staticPageLinks];
}
