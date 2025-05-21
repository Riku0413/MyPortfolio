import Header from "../_components/Header";
import Footer from "../_components/Footer";
import GlayImage from "../_components/GlayImage";
import { Space } from "@mantine/core";
import WorksGrid from "./WorksGrid";
import { getWorksOffsetLimit } from "../_lib/getWorksOffsetLimit";

export default async function Home() {
  const { works: dataArray } = await getWorksOffsetLimit(0, 10);

  console.log(dataArray);

  return (
    <>
      <Header></Header>
      <div className="bg-gray-100">
        <GlayImage title="Works" url="/works.jpg" />
        <Space h="xl" />
        <WorksGrid dataArray={dataArray} />
        <Space h="xl" />
      </div>
      <Footer></Footer>
    </>
  );
}
