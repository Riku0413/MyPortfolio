import Header from "../_components/Header";
import Footer from "../_components/Footer";
import GlayImage from "../_components/GlayImage";
import { Space } from "@mantine/core";
import WorksGrid from "./WorksGrid";
import { client } from "../_lib/microCMS";
import { WorksData } from "./WorksGrid";

export default async function Home() {
  const data = await client.get({
    endpoint: "works",
  });
  console.log(data);
  const dataArray: WorksData[] = data.contents.map((item: WorksData) => ({
    id: item.id,
    title: item.title,
    date: item.date,
    description: item.description,
    content: item.content,
    ogp: { url: item.ogp?.url },
  }));

  return (
    <>
      <Header></Header>
      <div className="bg-gray-100">
        <GlayImage title="Works" url="/works.jpg" />
        <Space h="xl" />
        <WorksGrid dataArray={dataArray} />
      </div>
      <Footer></Footer>
    </>
  );
}
