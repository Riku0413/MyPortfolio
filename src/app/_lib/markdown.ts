import { remark } from "remark";
import gfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import rehypeImageSize from "rehype-img-size";

export async function convertMarkdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(gfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeImageSize, { dir: "public" })
    .use(rehypeStringify)
    .process(markdown);
  
  // 画像タグをNext.jsのImageコンポーネントに変換
  const html = result.toString();
  const optimizedHtml = html.replace(
    /<img([^>]*)src="([^"]*)"([^>]*)>/g,
    (match, before, src, after) => {
      return `<img${before}src="${src}"${after} loading="lazy" decoding="async" />`;
    }
  );

  return optimizedHtml;
}
