import { Client } from "@notionhq/client";
import blocksToMarkdown from "./blocksToMarkdown";
import { WorksNotionPage } from "./notionTypes";
import { isNotionBlock } from "./types/notion";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function getWorksMarkdownManually(pageId: string) {
  const page = await notion.pages.retrieve({ page_id: pageId }) as WorksNotionPage;
  const props = page.properties;

  const title = props.Title?.title?.[0]?.plain_text || "";
  const description = props.Description?.rich_text?.[0]?.plain_text || "";
  const date = props.Date?.date?.start || "";
  const slug = props.Slug?.rich_text?.[0]?.plain_text || "";

  // 本文ブロック取得
  const blocksRes = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });

  const validBlocks = blocksRes.results.filter(isNotionBlock);
  const markdown = blocksToMarkdown(validBlocks);

  return {
    id: pageId,
    title: title,
    description: description,
    date: date,
    slug: slug,
    content: markdown,
  };
} 