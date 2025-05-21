import Header from "../_components/Header";
import Footer from "../_components/Footer";
import GlayImage from "../_components/GlayImage";
import { Space } from "@mantine/core";
import ResearchGrid from "./ResearchGrid";
import { ResearchData } from "./ResearchCard";
import { getResearchOffsetLimit } from "../_lib/getResearchOffsetLimit";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: PageProps) {
  const pageParam = searchParams.page;
  const page = typeof pageParam === 'string' ? Number(pageParam) : 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const { posts: dataArray, total } = await getResearchOffsetLimit(offset, limit);

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
