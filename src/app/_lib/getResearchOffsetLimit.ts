import { Client } from "@notionhq/client";
import { ResearchData } from "../research/ResearchCard";
import { ResearchNotionPage } from "./notionTypes";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function getResearchOffsetLimit(offset: number, limit: number): Promise<{ posts: ResearchData[], total: number }> {
  const databaseId = process.env.NOTION_MY_RESEARCH_DATABASE_ID!;
  const pageSize = 10;
  let fetched: ResearchNotionPage[] = [];
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

    fetched = [...fetched, ...(res.results as ResearchNotionPage[])];
    if (!res.has_more || !res.next_cursor) break;
    cursor = res.next_cursor;
  }

  const total = fetched.length;

  const sliced = fetched.slice(offset, offset + limit);

  const posts: ResearchData[] = sliced.map((page: ResearchNotionPage) => {
    const props = page.properties;
    console.log('Full page properties:', props);
    console.log('OGP property:', props.OGP);
    console.log('OGP files:', props.OGP?.files);
    return {
      id: page.id,
      title: props.Title?.title[0]?.plain_text || "",
      publication: props.Publication?.rich_text[0]?.plain_text || "",
      author: props.Author?.rich_text[0]?.plain_text || "",
      date: props.Date?.date?.start || "",
      url: props.URL?.url || "",
      ogp: { url: props.OGP?.files[0]?.file?.url || "" },
      createdAt: page.created_time,
      updatedAt: page.last_edited_time,
      publishedAt: props.PublishedAt?.date?.start,
      revisedAt: props.RevisedAt?.date?.start,
    };
  });

  console.log(posts);
  console.log(posts[0].ogp);

  return { posts, total };
}
