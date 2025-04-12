import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

type PostContent = {
  id: string;
  title: string;
  description: string;
  date: string;
  contentBlocks: any[]; // 本文の Notion block データ
};

export async function getPostById(pageId: string): Promise<PostContent> {
  // 1. メタデータの取得
  const page = await notion.pages.retrieve({ page_id: pageId });
  const props = (page as any).properties;

  const title = props.Title?.title?.[0]?.plain_text || "";
  const description = props.Description?.rich_text?.[0]?.plain_text || "";
  const date = props.Date?.date?.start || "";

  // 2. 本文（ブロック）の取得
  const blocks: any[] = [];
  let cursor: string | undefined = undefined;

  do {
    const res = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });

    blocks.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);

  return {
    id: pageId,
    title,
    description,
    date,
    contentBlocks: blocks,
  };
}
