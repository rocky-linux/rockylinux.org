import Date from "@/components/Date";

import { checkIfSlugIsValid, getPostData } from "@/lib/news";
import { notFound } from "next/navigation";

export type Params = {
  slug: string;
};

export type Props = {
  params: Params;
};

export type PostData = {
  title: string;
  date: string;
  contentHtml: string;
};

export async function generateMetadata({ params }: Props) {
  const slug = params.slug;

  if (!(await checkIfSlugIsValid(slug))) {
    return {
      title: "Not Found",
    };
  }

  const postData: PostData = await getPostData(slug);

  return {
    title: postData.title,
  };
}

export default async function Post({ params }: Props) {
  const slug = params.slug;

  if (!(await checkIfSlugIsValid(slug))) {
    notFound();
  }

  const postData: PostData = await getPostData(params.slug);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-base leading-7">
        <p className="text-base font-semibold leading-7 text-primary text-center uppercase font-display">
          <Date dateString={postData.date} />
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center font-display">
          {postData.title}
        </h1>
        <div
          className="prose dark:prose-invert prose-headings:font-display prose-a:text-primary prose-pre:bg-muted prose-pre:py-3 prose-pre:px-4 prose-pre:rounded prose-img:rounded-md max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </div>
    </div>
  );
}
