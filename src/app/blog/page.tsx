// import Header from "../_components/Header";
// import Footer from "../_components/Footer";
// import GlayImage from "../_components/GlayImage";
// import { Text, Space } from "@mantine/core";
// import BlogGrid from "./BlogGrid";
// import { fetchAllMarkdownFromPrivateRepo } from "../_lib/github";
// import { convertMarkdownToHtml } from "../_lib/markdown";

// export default async function Home() {
//   const posts = await fetchAllMarkdownFromPrivateRepo();
//   console.log(posts);

//   const postsWithHtml = await Promise.all(
//     posts.map(async (post) => {
//       const html = await convertMarkdownToHtml(post.content);
//       console.log(html);
//       return { ...post, html };
//     })
//   );

//   return (
//     <>
//       <Header></Header>
//       <div className="bg-gray-100">
//         <GlayImage title="Blog" url="/poland.jpg" />
//         <Space h="xl" />
//         <Text ta="center" size="40px" fw={700}>
//           Read blogs
//         </Text>
//         <Space h="xl" />
//         <ul className="space-y-8">
//           {postsWithHtml.map((post) => (
//             <li key={post.filename} className="p-4 border rounded shadow">
//               <h2 className="text-xl font-semibold">{post.metadata.title}</h2>
//               <p className="text-sm text-gray-500 mb-2">{post.metadata.date}</p>
//               <div
//                 className="markdown"
//                 dangerouslySetInnerHTML={{ __html: post.html }}
//               />
//             </li>
//           ))}
//         </ul>
//         <BlogGrid />
//         <Space h="xl" />
//       </div>
//       <Footer></Footer>
//     </>
//   );
// }

import Header from "../_components/Header";
import Footer from "../_components/Footer";
import GlayImage from "../_components/GlayImage";
import { Space } from "@mantine/core";
import BlogGrid from "./BlogGrid";
import { client } from "../_lib/microCMS";
// import { BlogData } from "./BlogCard";

import { redirect } from "next/navigation";
import ClientPagination from "./ClientPagination";
import { getPostsOffsetLimit } from "../_lib/getPostsOffsetLimit";
// import { getPostById } from "../_lib/getPageWithContent";
// import getPostMarkdownManually from "../_lib/getPostMarkdownManually";


export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
  // const posts = await getPostsOffsetLimit(0, 5);
  // console.log(posts);
  // console.log(posts[0].ogp);
  // console.log(posts[1].ogp);

  // const post = await getPostMarkdownManually("1d37e061-3c51-803e-b31a-d12769658708");
  // console.log(post.markdown);

  const currentPage = await Number(searchParams.page ?? "1");
  const limit = 6;
  const offset = (currentPage - 1) * limit;

  const data = await client.get({
    endpoint: "blog",
    queries: {
      limit,
      offset,
      orders: "-date",
      fields: "id,title,date,ogp,description"
    },
  });

  console.log(data);

  const { posts, total } = await getPostsOffsetLimit(offset, limit);
// console.log("Total posts:", total);
// console.log("Fetched posts:", posts);

  console.log(posts);

  // const totalCount = data.totalCount; // microCMSのAPIに含まれている
  const totalPages = Math.ceil(total / limit);

  // 不正なページにアクセスした場合
  if (currentPage < 1 || currentPage > totalPages) {
    redirect("/blog?page=1");
  }

  // const dataArray: BlogData[] = data.contents.map((item: BlogData) => ({
  //   id: item.id,
  //   title: item.title,
  //   date: item.date,
  //   content: item.content,
  //   ogp: { url: item.ogp?.url },
  //   description: item.description,
  // }));

  return (
    <>
      <Header />
      <div className="bg-gray-100">
        <GlayImage title="Blog" url="/poland.jpg" />
        <Space h="xl" />
        <BlogGrid dataArray={posts} />
        <Space h="xl" />
        <div className="flex justify-center">

          <ClientPagination total={totalPages} />
        </div>
        <Space h="xl" />
      </div>
      <Footer />
    </>
  );
}
