import { Client } from "@notionhq/client";
import { WorksData } from "../works/WorksCard";
import { WorksNotionPage } from "./notionTypes";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function getWorksOffsetLimit(offset: number, limit: number): Promise<{ works: WorksData[], total: number }> {
  const databaseId = process.env.NOTION_MY_WORKS_DATABASE_ID!;
  const pageSize = 10;
  let fetched: WorksNotionPage[] = [];
  let cursor: string | undefined = undefined;

  while (fetched.length < offset + limit) {
    const res = await notion.databases.query({
      database_id: databaseId,
      page_size: pageSize,
      start_cursor: cursor,
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    fetched = [...fetched, ...(res.results as WorksNotionPage[])];
    if (!res.has_more || !res.next_cursor) break;
    cursor = res.next_cursor;
  }

  const total = fetched.length;

  const sliced = fetched.slice(offset, offset + limit);

  const works: WorksData[] = sliced.map((page: WorksNotionPage) => {
    const props = page.properties;
    return {
      id: page.id,
      title: props.Title?.title[0]?.plain_text || "",
      description: props.Description?.rich_text[0]?.plain_text || "",
      date: props.Date?.date?.start || "",
      ogp: { url: props.OGP?.files[0]?.file?.url || "" },
      content: "",
    };
  });

  return { works, total };
} 