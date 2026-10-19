import RSS from "rss";
import { getSortedPostsData, type Post } from "@/lib/news";
import { absoluteUrl } from "@/lib/seo";

// Feed readers cannot apply the site's theme, so only the light variant is used.
function contentWithImage(post: Post) {
  if (!post.image) {
    return post.contentHtml;
  }

  const { src, alt, width, height } = post.image;
  const escapedAlt = alt.replace(/"/g, "&quot;");

  return `<p><img src="${absoluteUrl(src)}" alt="${escapedAlt}" width="${width}" height="${height}" /></p>${post.contentHtml}`;
}

export async function GET() {
  const feed = new RSS({
    title: "Rocky Linux RSS Feed",
    description: "Get all the latest news from the Rocky Linux project.",
    site_url: "https://rockylinux.org",
    feed_url: `https://rockylinux.org/rss.xml`,
    copyright: `${new Date().getFullYear()} Rocky Enterprise Software Foundation`,
    language: "en",
    pubDate: new Date(),
  });

  const posts = await getSortedPostsData();

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      custom_elements: [{ "content:encoded": contentWithImage(post) }],
      url: `https://rockylinux.org/news/${post.slug}`,
      date: new Date(post.date),
      ...(post.image && {
        enclosure: { url: absoluteUrl(post.image.src) },
      }),
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
