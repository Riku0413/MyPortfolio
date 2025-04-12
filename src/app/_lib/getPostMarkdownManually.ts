import { Client } from "@notionhq/client";
import blocksToMarkdown from "../_lib/blocksToMarkdown";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function getPostMarkdownManually(pageId: string) {
  const page = await notion.pages.retrieve({ page_id: pageId });
  const props = (page as any).properties;

  const title = props.Title?.title?.[0]?.plain_text || "";
  const description = props.Description?.rich_text?.[0]?.plain_text || "";
  const date = props.Date?.date?.start || "";

  // 本文ブロック取得
  const blocksRes = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });

  const markdown = blocksToMarkdown(blocksRes.results);

  return {
    id: pageId,
    title: title,
    description: description,
    date: date,
    content: markdown,
  };
}
