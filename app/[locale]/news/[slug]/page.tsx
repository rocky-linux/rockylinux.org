import type { Metadata } from "next";

import Date from "@/components/Date";
import ShareButtons from "@/components/shareButtons/ShareButtons";

import { checkIfSlugIsValid, getPostData } from "@/lib/news";
import { safeJsonLdStringify } from "@/utils/jsonLd";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export type Params = {
  locale: string;
  slug: string;
};

export type Props = {
  params: Promise<Params>;
};

export type PostData = {
  title: string;
  date: string;
  author?: string;
  contentHtml: string;
  excerpt: string;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (!(await checkIfSlugIsValid(slug))) {
    return {
      title: "Not Found",
    };
  }

  const postData: PostData = await getPostData(slug);
  const url = `https://rockylinux.org/news/${slug}`;
  const author = postData.author || "Rocky Linux Team";

  return {
    title: `${postData.title} - Rocky Linux`,
    description: postData.excerpt,
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      url,
      siteName: "Rocky Linux",
      locale: "en_US",
      type: "article",
      publishedTime: postData.date,
      authors: [author],
    },
  };
}

export default async function Post({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!(await checkIfSlugIsValid(slug))) {
    notFound();
  }

  const postData: PostData = await getPostData(slug);
  const author = postData.author || "Rocky Linux Team";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: postData.title,
    description: postData.excerpt,
    datePublished: postData.date,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Rocky Linux",
      url: "https://rockylinux.org",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://rockylinux.org/news/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
      />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-base leading-7">
          <p className="text-base font-semibold leading-7 text-primary text-center uppercase font-display">
            <Date dateString={postData.date} />
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl mb-2 text-center font-display">
            {postData.title}
          </h1>
          <p className="text-base leading-7 text-center mb-12 italic">
            {author}
          </p>
          <div
            className="prose dark:prose-invert prose-headings:font-display prose-a:text-primary prose-pre:bg-muted prose-pre:py-3 prose-pre:px-4 prose-pre:rounded prose-pre:text-black dark:prose-pre:text-white prose-img:rounded-md max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
          <ShareButtons url={`https://rockylinux.org/news/${slug}`} />
        </div>
      </div>
    </>
  );
}
