import Header from "../_components/Header";
import Footer from "../_components/Footer";
import GlayImage from "../_components/GlayImage";
import { Text, Space } from "@mantine/core";
import BlogGrid from "./BlogGrid";
import { fetchAllMarkdownFromPrivateRepo } from "../_lib/github";
import { convertMarkdownToHtml } from "../_lib/markdown";

export default async function Home() {
  const posts = await fetchAllMarkdownFromPrivateRepo();
  console.log(posts);

  const postsWithHtml = await Promise.all(
    posts.map(async (post) => {
      const html = await convertMarkdownToHtml(post.content);
      console.log(html);
      return { ...post, html };
    })
  );

  return (
    <>
      <Header></Header>
      <div className="bg-gray-100">
        <GlayImage title="Blog" url="/pcb.jpg" />
        <Space h="xl" />
        <Text ta="center" size="40px" fw={700}>
          Read blogs
        </Text>
        <Space h="xl" />
        <ul className="space-y-8">
          {postsWithHtml.map((post) => (
            <li key={post.filename} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold">{post.metadata.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{post.metadata.date}</p>
              {/* <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post.html }}
              /> */}
              {/* <div
                className="prose prose-lg prose-slate max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: post.html }}
              /> */}
              <div
                className="markdown"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </li>
          ))}
        </ul>
        <BlogGrid />
        <Space h="xl" />
      </div>
      <Footer></Footer>
    </>
  );
}
