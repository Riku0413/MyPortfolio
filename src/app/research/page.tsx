import Header from "../_components/Header";
import Footer from "../_components/Footer";
import GlayImage from "../_components/GlayImage";
import { Text, Space } from "@mantine/core";
import PublicationCard from "./PublicationCard";

export default function Home() {
  return (
    <>
      <Header></Header>
      <div className="bg-gray-100">
        <GlayImage title="Research" url="/pcb.jpg" />
        <Space h="xl" />
        <Text ta="center" size="40px" fw={700}>
          Publications
        </Text>
        <Space h="xl" />
        <PublicationCard />
        <PublicationCard />
        <PublicationCard />
      </div>
      <Footer></Footer>
    </>
  );
}
