import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { processMarkdownAsHTML } from "@/utils/remarkUtils";

const contentDirectory = path.join(process.cwd(), "legal");

export async function checkIfSlugIsValid(slug: string) {
  if (!slug || typeof slug !== "string") {
    return false;
  }

  // Check that the slug does not contain any slashes to prevent directory traversal
  if (slug.includes("/") || slug.includes("\\")) {
    return false;
  }

  const fullPath = path.join(contentDirectory, `${slug}.md`);

  try {
    await fs.promises.access(fullPath);
    return true;
  } catch {
    return false;
  }
}

export async function getContentData(slug: string) {
  const fullPath = path.join(contentDirectory, `${slug}.md`);

  const fileContents = await fs.promises.readFile(fullPath, "utf8");

  if (!fileContents) {
    throw new Error(`Page with slug "${slug}" does not exist.`);
  }

  const matterResult = matter(fileContents);

  const contentHtml = await processMarkdownAsHTML(matterResult.content);

  return {
    slug,
    contentHtml,
    ...(matterResult.data as { title: string; description: string }),
  };
}
