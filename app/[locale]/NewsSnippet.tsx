import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { format } from "date-fns";

import { getSortedPostsData } from "@/lib/news";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NewsSnippet = async () => {
  const posts = await getSortedPostsData(6);
  const t = await getTranslations("home.news");

  return (
    <div className="py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-2 lg:px-0">
        <div className="lg:text-center">
          <h2 className="text-3xl font-bold font-display tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-2 text-lg leading-8">{t("description")}</p>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 pt-10 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/news/${post.slug}`}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="font-display font-bold truncate">
                    {post.title}
                  </CardTitle>
                  <CardDescription>
                    {format(new Date(post.date), "MMMM d, yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="group relative">
                    <p className="line-clamp-3 text-sm leading-6">
                      {post.excerpt}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSnippet;
