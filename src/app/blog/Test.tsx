// import { GetStaticProps, GetStaticPaths } from "next";
// import { fetchMarkdownFromPrivateRepo } from "../_lib/github";
// import matter from "gray-matter";
// import { remark } from "remark";
// import html from "remark-html";

// export const getStaticProps: GetStaticProps = async ({}) => {
//   // const slug = params?.slug as string;
//   const raw = await fetchMarkdownFromPrivateRepo("testBlog.md");
//   const { data, content } = matter(raw);
//   const processedContent = await remark().use(html).process(content);
//   const contentHtml = processedContent.toString();

//   return {
//     props: {
//       title: data.title,
//       date: data.date,
//       contentHtml,
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   // 手動指定 or GitHub APIで一覧取得（要実装）
//   return {
//     paths: [{ params: { slug: "post1" } }],
//     fallback: false,
//   };
// };

// type Props = {
//   title: string;
//   date: string;
//   contentHtml: string;
// };

// export default function PostPage({ title, date, contentHtml }: Props) {
//   return (
//     <article>
//       <h1>{title}</h1>
//       <p>{date}</p>
//       <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
//     </article>
//   );
// }
