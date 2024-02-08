import Date from "@/components/Date";

import { getPostData } from "@/lib/news";

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
  const postData: PostData = await getPostData(params.slug);

  return {
    title: postData.title,
  };
}

export default async function Post({ params }: Props) {
  const postData: PostData = await getPostData(params.slug);

  return (
    <>
      <div className="mx-auto max-w-3xl text-base leading-7 my-24">
        <p className="text-base font-semibold leading-7 text-primary text-center uppercase font-display">
          <Date dateString={postData.date} />
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center font-display">
          {postData.title}
        </h1>
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </div>
    </>
  );
}
