import Header from "../_components/Header";
import Footer from "../_components/Footer";
import GlayImage from "../_components/GlayImage";
import { Space } from "@mantine/core";
import ResearchGrid from "./ResearchGrid";
import { getResearchOffsetLimit } from "../_lib/getResearchOffsetLimit";

type SearchParams = { [key: string]: string | string[] | undefined }

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams;
  const pageParam = params.page;
  const page = typeof pageParam === 'string' ? Number(pageParam) : 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const { posts: dataArray } = await getResearchOffsetLimit(offset, limit);

  return (
    <>
      <Header></Header>
      <div className="bg-gray-100">
      <GlayImage title="Research" url="/research.jpg" />
      <Space h="xl" />
      <ResearchGrid dataArray={dataArray} />
      <Space h="xl" />
      </div>
      <Footer></Footer>
    </>
  );
}
