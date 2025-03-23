import Header from "../_components/Header";
import Footer from "../_components/Footer";
import GlayImage from "../_components/GlayImage";
import { Space } from "@mantine/core";
import WorksList from "./WorksList";

export default function Home() {
  return (
    <>
      <Header></Header>
      <div className="bg-gray-100">
        <GlayImage title="Works" url="/pcb.jpg" />
        <Space h="xl" />
        <WorksList />
      </div>
      <Footer></Footer>
    </>
  );
}
