import Header from "./_components/Header";
import Footer from "./_components/Footer";
import AboutMe from "./_home/AboutMe";
import { Text } from "@mantine/core";
import { Space } from "@mantine/core";
import Featured from "./_home/Featured";
import History from "./_home/History";
import GlayImage from "./_components/GlayImage";

export default function Home() {
  return (
    <>
      <Header></Header>
      <div className="bg-gray-100">
        <GlayImage title="Home" url="/pcb.jpg" />

        <Space h="xl" />
        <Text ta="center" size="40px" fw={700}>
          About me
        </Text>
        <Space h="xl" />

        <AboutMe />

        <Space h="xl" />
        <Space h="xl" />

        <Text ta="center" size="40px" fw={700}>
          Featured
        </Text>
        <Space h="xl" />

        <Featured />

        <Space h="xl" />
        <Text ta="center" size="40px" fw={700}>
          CV
        </Text>
        <Space h="xl" />

        <History />

        <Space h="xl" />
      </div>
      <Footer></Footer>
    </>
  );
}
