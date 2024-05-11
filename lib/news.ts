import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { processMarkdownAsHTML } from "@/utils/remarkUtils";

const postsDirectory = path.join(process.cwd(), "news");

export async function checkIfSlugIsValid(slug: string) {
  // Check that the slug does not contain any slashes to prevent directory traversal
  if (slug.includes("/") || slug.includes("\\")) {
    return false;
  }

  const fullPath = path.join(postsDirectory, `${slug}.md`);

  try {
    await fs.promises.access(fullPath);
    return true;
  } catch {
    return false;
  }
}

export async function getSortedPostsData(
  numPosts?: number
): Promise<
  {
    slug: string;
    excerpt: string;
    contentHtml: string;
    date: string;
    title: string;
  }[]
> {
  const fileNames = await fs.promises.readdir(postsDirectory);

  const allPostsData = await Promise.all(
    fileNames.map(async (filename) => {
      const slug = filename.replace(/\.md$/, "");

      const fullPath = path.join(postsDirectory, filename);
      const fileContents = await fs.promises.readFile(fullPath, "utf8");

      const matterResult = matter(fileContents);

      const contentHtml = await processMarkdownAsHTML(matterResult.content);
      const plainText = contentHtml.replace(/<[^>]*>/g, "");
      const excerpt = plainText.substring(0, 200) + "...";

      return {
        slug,
        excerpt, // Include both excerpt and full content
        contentHtml,
        ...(matterResult.data as { date: string; title: string }),
      };
    })
  );

  return allPostsData
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    })
    .slice(0, numPosts || allPostsData.length);
}

export async function getAllPostSlugs() {
  const fileNames = await fs.promises.readdir(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  const fileContents = await fs.promises.readFile(fullPath, "utf8");

  if (!fileContents) {
    throw new Error(`Post with slug "${slug}" does not exist.`);
  }

  const matterResult = matter(fileContents);

  const contentHtml = await processMarkdownAsHTML(matterResult.content);

  const plainText = contentHtml.replace(/<[^>]*>/g, "");
  const excerpt = plainText.substring(0, 200) + "...";

  return {
    slug,
    contentHtml,
    excerpt,
    ...(matterResult.data as { date: string; title: string }),
  };
}
