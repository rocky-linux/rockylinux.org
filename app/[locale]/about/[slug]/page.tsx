import { checkIfSlugIsValid, getContentData } from "@/lib/aboutPages";
import { notFound } from "next/navigation";

export type Params = {
  slug: string;
};

export type Props = {
  params: Params;
};

export type pageData = {
  title: string;
  description: string;
  contentHtml: string;
};

export async function generateMetadata({ params }: Props) {
  const slug = params.slug;

  if (!(await checkIfSlugIsValid(slug))) {
    return {
      title: "Not Found",
    };
  }

  const pageData: pageData = await getContentData(slug);

  return {
    title: `${pageData.title} - Rocky Linux`,
  };
}

export default async function Page({ params }: Props) {
  const slug = params.slug;

  if (!(await checkIfSlugIsValid(slug))) {
    notFound();
  }

  const pageData: pageData = await getContentData(slug);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-base leading-7">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center font-display">
          {pageData.title}
        </h1>
        <div
          className="prose dark:prose-invert prose-headings:font-display prose-a:text-primary prose-pre:bg-muted prose-pre:py-3 prose-pre:px-4 prose-pre:rounded prose-img:rounded-md max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: pageData.contentHtml }}
        />
      </div>
    </div>
  );
}
