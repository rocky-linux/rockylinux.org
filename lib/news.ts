import fs from "fs";
import path from "path";

import matter from "gray-matter";
import remarkFootnotes from "remark-footnotes";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const postsDirectory = path.join(process.cwd(), "news");

// -------------------------------------------------
// GET THE DATA OF ALL POSTS IN SORTED ORDER BY DATE
/*
  Returns an array that looks like this:
  [
    {
      slug: 'ssg-ssr',
      title: 'When to Use Static Generation v.s. Server-side Rendering',
      date: '2020-01-01'
    },
    {
      slug: 'pre-rendering',
      title: 'Two Forms of Pre-rendering',
      date: '2020-01-02'
    }
  ]
*/
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((filename) => {
    const slug = filename.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as { date: string; title: string }),
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// ------------------------------------------------
// GET THE SLUGS OF ALL POSTS FOR THE DYNAMIC ROUTING
/*
  Returns an array that looks like this:
  [
    {
      params: {
        slug: 'ssg-ssr'
      }
    },
    {
      params: {
        slug: 'pre-rendering'
      }
    }
  ]
*/
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

// --------------------------------
// GET THE DATA OF A SINGLE POST FROM THE SLUG
export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFootnotes, { inlineNotes: true })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}
