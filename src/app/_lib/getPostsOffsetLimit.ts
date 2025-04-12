// // scripts/testNotion.ts または pages/api/test.ts
// import { Client } from "@notionhq/client";

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export default async function getDatabaseMeta() {
//   const response = await notion.databases.query({
//     database_id: process.env.NOTION_DATABASE_ID!,
//     page_size: 2, // ← 2件だけ取得
//     sorts: [
//       {
//         property: "Date", // ← Dateでソート
//         direction: "descending",
//       },
//     ],
//   });

//   const posts = response.results.map((page: any) => {
//     const props = page.properties;

//     return {
//       id: page.id,
//       title: props.Name?.title[0]?.plain_text || "",
//       description: props.Description?.rich_text[0]?.plain_text || "",
//       date: props.Date?.date?.start || "",
//       ogp: props.OGP?.files[0]?.file?.url || "",
//     };
//   });

//   return posts;
// }

import { Client } from "@notionhq/client";
import { BlogData } from "../blog/BlogCard";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// type Post = {
//   id: string;
//   title: string;
//   description: string;
//   date: string;
//   ogp: string;
// };

// export async function getPostsOffsetLimit(offset: number, limit: number): Promise<BlogData[]> {
//   const databaseId = process.env.NOTION_DATABASE_ID!;
//   const pageSize = 10; // Notion API 最大は100、でも小分けに扱うと安全
//   let fetched: any[] = [];
//   let cursor: string | undefined = undefined;

//   while (fetched.length < offset + limit) {
//     const res = await notion.databases.query({
//       database_id: databaseId,
//       page_size: pageSize,
//       start_cursor: cursor,
//       sorts: [
//         {
//           property: "Date",
//           direction: "descending",
//         },
//       ],
//     });

//     fetched = [...fetched, ...res.results];
//     if (!res.has_more || !res.next_cursor) break;
//     cursor = res.next_cursor;
//   }

//   const sliced = fetched.slice(offset, offset + limit);

//   const posts: BlogData[] = sliced.map((page: any) => {
//     const props = page.properties;
//     console.log(props);
//     return {
//       id: page.id,
//       title: props.Name?.title[0]?.plain_text || "",
//       description: props.Description?.rich_text[0]?.plain_text || "",
//       date: props.Date?.date?.start || "",
//       ogp: { url: props.OGP?.files[0]?.external?.url || "", },
//       content: "",
//     };
//   });

//   return posts;
// }

export async function getPostsOffsetLimit(offset: number, limit: number): Promise<{ posts: BlogData[], total: number }> {
  const databaseId = process.env.NOTION_DATABASE_ID!;
  const pageSize = 10;
  let fetched: any[] = [];
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

    fetched = [...fetched, ...res.results];
    if (!res.has_more || !res.next_cursor) break;
    cursor = res.next_cursor;
  }

  const total = fetched.length;

  const sliced = fetched.slice(offset, offset + limit);

  const posts: BlogData[] = sliced.map((page: any) => {
    const props = page.properties;
    return {
      id: page.id,
      title: props.Name?.title[0]?.plain_text || "",
      description: props.Description?.rich_text[0]?.plain_text || "",
      date: props.Date?.date?.start || "",
      ogp: { url: props.OGP?.files[0]?.external?.url || "", },
      content: "",
    };
  });

  return { posts, total };
}
