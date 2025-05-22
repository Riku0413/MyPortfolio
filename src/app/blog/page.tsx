import Header from "../_components/Header";
import Footer from "../_components/Footer";
import GlayImage from "../_components/GlayImage";
import { Space } from "@mantine/core";
import BlogGrid from "./BlogGrid";

import { redirect } from "next/navigation";
import ClientPagination from "./ClientPagination";
import { getBlogsOffsetLimit } from "../_lib/getBlogsOffsetLimit";
// import { getPostById } from "../_lib/getPageWithContent";
// import getPostMarkdownManually from "../_lib/getPostMarkdownManually";

type SearchParams = { [key: string]: string | string[] | undefined }

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  // const posts = await getPostsOffsetLimit(0, 5);
  // console.log(posts);
  // console.log(posts[0].ogp);
  // console.log(posts[1].ogp);

  // const post = await getPostMarkdownManually("1d37e061-3c51-803e-b31a-d12769658708");
  // console.log(post.markdown);

  const params = await searchParams;
  const currentPage = await Number(params.page ?? "1");
  const limit = 6;
  const offset = (currentPage - 1) * limit;

  const { posts, total } = await getBlogsOffsetLimit(offset, limit);
// console.log("Total posts:", total);
// console.log("Fetched posts:", posts);

  console.log(posts);

  // const totalCount = data.totalCount; // microCMSのAPIに含まれている
  const totalPages = Math.ceil(total / limit);

  // 不正なページにアクセスした場合
  if (currentPage < 1 || currentPage > totalPages) {
    redirect("/blog?page=1");
  }

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
