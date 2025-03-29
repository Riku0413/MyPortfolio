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
// import { fetchAllMetaFromPrivateRepo } from "../_lib/github_list"; // ← メタだけ取得
import { client } from "../_lib/microCMS";
import { BlogData } from "./BlogCard";

// const dataArray: BlogData[] = [
//   {
//     id: "001",
//     url: "https://i.imgur.com/Cij5vdL.png",
//     title: "Card 1",
//     description:
//       "Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very different direction to its predecessor, namely the fact that this time round instead of fighting against various mutated zombies, you’re now dealing with more occult enemies like werewolves and vampires.",
//     date: "2025/03/15",
//   },
//   {
//     id: "002",
//     url: "/oist.jpg",
//     title: "Card 2",
//     description: "Description 2",
//     date: "2024/12/01",
//   },
//   {
//     id: "003",
//     url: "/radwimps.jpg",
//     title: "Card 3",
//     description: "Description 3",
//     date: "2024/10/10",
//   },
// ];

export default async function Home() {
  // const posts = await fetchAllMetaFromPrivateRepo();
  // console.log(posts);

  const data = await client.get({
    endpoint: "blog",
  });

  const dataArray: BlogData[] = data.contents.map((item: BlogData) => ({
    id: item.id,
    title: item.title,
    date: item.date,
    content: item.content,
    ogp: { url: item.ogp?.url },
    description: item.description,
  }));

  return (
    <>
      <Header />
      <div className="bg-gray-100">
        <GlayImage title="Blog" url="/poland.jpg" />
        {/* <Space h="xl" /> */}
        {/* <Text ta="center" size="40px" fw={700}>
          Read blogs
        </Text> */}
        <Space h="xl" />
        {/* <ul className="space-y-8 px-4 max-w-3xl mx-auto">
          {posts.map((post) => (
            <li key={post.id} className="p-4 border rounded shadow bg-white">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <p>{post.description}</p>
            </li>
          ))}
        </ul> */}
        <BlogGrid dataArray={dataArray} />
        <Space h="xl" />
      </div>
      <Footer />
    </>
  );
}
