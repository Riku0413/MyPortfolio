import { Client } from "@notionhq/client";
import blocksToMarkdown from "../_lib/blocksToMarkdown";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { isNotionBlock } from "./types/notion";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

interface AdjacentPost {
  id: string;
  title: string;
  date: string;
}

async function getAdjacentPosts(currentDate: string): Promise<{ prev?: AdjacentPost; next?: AdjacentPost }> {
  const databaseId = process.env.NOTION_DATABASE_ID!;
  
  // 前後の記事を取得するためのクエリ
  const res = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
    page_size: 100, // 十分な数の記事を取得
  });

  const posts = res.results as PageObjectResponse[];
  const currentIndex = posts.findIndex((post) => {
    const dateProperty = post.properties.Date as { type: "date"; date: { start: string } | null };
    return dateProperty.date?.start === currentDate;
  });

  if (currentIndex === -1) return {};

  const prev = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : undefined;
  const next = currentIndex > 0 ? posts[currentIndex - 1] : undefined;

  return {
    prev: prev ? {
      id: prev.id,
      title: (prev.properties.Title as { type: "title"; title: Array<{ plain_text: string }> }).title[0]?.plain_text || "",
      date: (prev.properties.Date as { type: "date"; date: { start: string } | null }).date?.start || "",
    } : undefined,
    next: next ? {
      id: next.id,
      title: (next.properties.Title as { type: "title"; title: Array<{ plain_text: string }> }).title[0]?.plain_text || "",
      date: (next.properties.Date as { type: "date"; date: { start: string } | null }).date?.start || "",
    } : undefined,
  };
}

export default async function getBlogMarkdownManually(pageId: string) {
  const page = await notion.pages.retrieve({ page_id: pageId }) as PageObjectResponse;
  const props = page.properties;

  const title = (props.Title as { type: "title"; title: Array<{ plain_text: string }> }).title[0]?.plain_text || "";
  const description = (props.Description as { type: "rich_text"; rich_text: Array<{ plain_text: string }> }).rich_text[0]?.plain_text || "";
  const date = (props.Date as { type: "date"; date: { start: string } | null }).date?.start || "";

  // 本文ブロック取得
  const blocksRes = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });

  const validBlocks = blocksRes.results.filter(isNotionBlock);
  const markdown = blocksToMarkdown(validBlocks);

  // 前後の記事を取得
  const adjacentPosts = await getAdjacentPosts(date);

  return {
    id: pageId,
    title: title,
    description: description,
    date: date,
    content: markdown,
    ...adjacentPosts,
  };
}
