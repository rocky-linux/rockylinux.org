import fs from "fs/promises";
import path from "path";
import { MetadataRoute } from "next";
import { getSortedPostsData } from "@/lib/news";

interface StaticPageData {
  route: string;
  lastModified: Date;
}

async function getStaticPagesData(
  directory: string
): Promise<StaticPageData[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const pages: StaticPageData[] = [];
  const excludedDirs = ["contribute", "legal", "resources", "support"];

  for (const entry of entries) {
    const res = path.resolve(directory, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "[locale]") {
        const localePages = await getStaticPagesData(res);
        const filteredLocalePages = localePages.filter(
          (page) => !page.route.includes("[") && !page.route.includes("]")
        );
        pages.push(...filteredLocalePages);
      } else if (entry.name !== "components" && entry.name !== "[slug]") {
        let routePath = res.replace(/^app\//, "/").replace(/\.tsx$/, "");

        if (directory.includes("[locale]")) {
          const parts = res.split("/");
          const localeIndex = parts.indexOf("[locale]");
          const routeParts = parts.slice(localeIndex + 1);
          routePath = "/" + routeParts.join("/");
        }

        if (!routePath.endsWith("/")) {
          routePath += "/";
        }

        const dirName = path.basename(res);
        if (!excludedDirs.includes(dirName)) {
          pages.push({
            route: routePath,
            lastModified: new Date(),
          });
        }

        pages.push(...(await getStaticPagesData(res)));
      }
    }
  }

  return pages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const links = [
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

  const posts = await getSortedPostsData();

  posts.forEach((post) => {
    links.push({
      url: `https://rockylinux.org/news/${post.slug}`,
      lastModified: new Date(post.date),
    });
  });

  const staticPages = await getStaticPagesData("app/[locale]");

  staticPages.forEach((page) => {
    links.push({
      url: `https://rockylinux.org${page.route}`,
      lastModified: page.lastModified,
    });
  });

  return links;
}
