import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export const processMarkdown = (content: string) => {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content);
};

export const processMarkdownAsHTML = async (content: string) => {
  return (await processMarkdown(content)).toString();
};
