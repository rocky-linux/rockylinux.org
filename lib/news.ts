import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { imageSize } from "image-size";
import { processMarkdownAsHTML } from "@/utils/remarkUtils";

const postsDirectory = path.join(process.cwd(), "news");
const publicDirectory = path.join(process.cwd(), "public");

export type PostImage = {
  src: string;
  srcDark?: string;
  alt: string;
  width: number;
  height: number;
  /** Caps the rendered width in CSS pixels. Defaults to the full content column. */
  displayWidth?: number;
};

export type Post = {
  slug: string;
  excerpt: string;
  contentHtml: string;
  date: string;
  title: string;
  author?: string;
  image?: PostImage;
};

type PostFrontmatter = {
  date: string;
  title: string;
  author?: string;
  image?: string;
  imageDark?: string;
  imageAlt?: string;
  imageWidth?: number;
};

// Paths are root-relative to `public`, but authors write them with and without
// the leading slash. Consumers cannot take the bare form: `next/image` throws
// on it and `absoluteUrl` would join it straight onto the origin, so a single
// missing slash returns 500 for the whole post. Normalize instead of rejecting,
// since both forms clearly mean the same file.
function normalizeImagePath(src: string) {
  return src.startsWith("/") ? src : `/${src}`;
}

// Returns undefined for unreadable files so a bad reference in the content
// repo drops the image instead of failing the build.
async function getImageDimensions(src: string) {
  const fullPath = path.join(publicDirectory, src);

  if (!fullPath.startsWith(publicDirectory + path.sep)) {
    return undefined;
  }

  try {
    const { width, height } = imageSize(await fs.promises.readFile(fullPath));
    return { width, height };
  } catch {
    return undefined;
  }
}

// The dark variant is optional, so a broken one drops only itself and leaves
// the light image to render on both themes.
async function resolveDarkVariant(
  rawSrc: string | undefined,
  lightDimensions: { width: number; height: number }
) {
  if (!rawSrc) {
    return undefined;
  }

  const src = normalizeImagePath(rawSrc);
  const dimensions = await getImageDimensions(src);

  if (!dimensions) {
    console.warn(`Could not resolve dark post image "${src}"`);
    return undefined;
  }

  // Both variants render at the light image's dimensions, so a mismatch would
  // distort the dark one.
  if (
    dimensions.width !== lightDimensions.width ||
    dimensions.height !== lightDimensions.height
  ) {
    console.warn(
      `Dark post image "${src}" is ${dimensions.width}x${dimensions.height}, ` +
        `but the light variant is ${lightDimensions.width}x${lightDimensions.height}`
    );
  }

  return src;
}

async function resolvePostImage(
  frontmatter: PostFrontmatter
): Promise<PostImage | undefined> {
  if (!frontmatter.image) {
    return undefined;
  }

  const src = normalizeImagePath(frontmatter.image);
  const dimensions = await getImageDimensions(src);

  if (!dimensions) {
    console.warn(`Could not resolve post image "${src}"`);
    return undefined;
  }

  const srcDark = await resolveDarkVariant(frontmatter.imageDark, dimensions);

  return {
    src,
    ...(srcDark ? { srcDark } : {}),
    alt: frontmatter.imageAlt ?? "",
    ...dimensions,
    ...(frontmatter.imageWidth ? { displayWidth: frontmatter.imageWidth } : {}),
  };
}

async function buildPost(slug: string, fileContents: string): Promise<Post> {
  const matterResult = matter(fileContents);
  const data = matterResult.data as PostFrontmatter;

  const {
    image: _image,
    imageDark: _imageDark,
    imageAlt: _imageAlt,
    imageWidth: _imageWidth,
    ...frontmatter
  } = data;

  const contentHtml = await processMarkdownAsHTML(matterResult.content);
  const plainText = contentHtml.replace(/<[^>]*>/g, "");
  const excerpt = plainText.substring(0, 150) + "...";

  const image = await resolvePostImage(data);

  return {
    slug,
    excerpt,
    contentHtml,
    ...frontmatter,
    ...(image ? { image } : {}),
  };
}

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

export async function getSortedPostsData(numPosts?: number): Promise<Post[]> {
  const fileNames = await fs.promises.readdir(postsDirectory);

  const allPostsData = await Promise.all(
    fileNames.map(async (filename) => {
      const slug = filename.replace(/\.md$/, "");

      const fullPath = path.join(postsDirectory, filename);
      const fileContents = await fs.promises.readFile(fullPath, "utf8");

      return buildPost(slug, fileContents);
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

export async function getPostData(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  const fileContents = await fs.promises.readFile(fullPath, "utf8");

  if (!fileContents) {
    throw new Error(`Post with slug "${slug}" does not exist.`);
  }

  return buildPost(slug, fileContents);
}
