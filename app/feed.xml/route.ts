import RSS from "rss";
import { getSortedPostsData } from "@/lib/news";

export async function GET() {
  const feed = new RSS({
    title: "Rocky Linux RSS Feed",
    description: "Get all the latest news from the Rocky Linux project.",
    site_url: "https://rockylinux.org",
    feed_url: `https://rockylinux.org/feed.xml`,
    copyright: `${new Date().getFullYear()} Rocky Enterprise Software Foundation`,
    language: "en",
    pubDate: new Date(),
  });

  const posts = await getSortedPostsData();

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `https://rockylinux.org/news/${post.slug}`,
      date: new Date(post.date),
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
