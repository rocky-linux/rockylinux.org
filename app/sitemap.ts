import fs from "fs/promises";
import path from "path";
import { MetadataRoute } from "next";
import { getSortedPostsData } from "@/lib/news";

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
        let relativeRoutePath = path
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseLinks = [
    {
      url: "https://rockylinux.org",
      lastModified: new Date(),
    },
    {
      url: "https://rockylinux.org/legal/licensing",
      lastModified: new Date(),
    },
    {
      url: "https://rockylinux.org/legal/privacy",
      lastModified: new Date(),
    },
    {
      url: "https://rockylinux.org/legal/trademarks",
      lastModified: new Date(),
    },
    {
      url: "https://rockylinux.org/about/coc",
      lastModified: new Date(),
    },
  ];

  const [posts, staticPages] = await Promise.all([
    getSortedPostsData(),
    getStaticPagesData("app/[locale]"),
  ]);

  const postLinks = posts.map((post) => ({
    url: `https://rockylinux.org/news/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const staticPageLinks = staticPages.map((page) => ({
    url: `https://rockylinux.org${page.route}`,
    lastModified: page.lastModified,
  }));

  return [...baseLinks, ...postLinks, ...staticPageLinks];
}
