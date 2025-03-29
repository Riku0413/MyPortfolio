import Header from "../_components/Header";
import Footer from "../_components/Footer";
import GlayImage from "../_components/GlayImage";
import { Space } from "@mantine/core";
import ResearchCard from "./ResearchCard";
import { ResearchData } from "./ResearchCard";
import { client } from "../_lib/microCMS";

// const dataArray: ResearchData[] = [
//   {
//     id: "001",
//     title: "The best laptop for Frontend engineers in 2022",
//     description: "The best laptop for Frontend engineers in 2022",
//     date: "Feb 6th",
//     url: "https://example.com",
//     tags: ["technology"],
//     coverImage:
//       "https://images.unsplash.com/photo-1602080858428-57174f9431cf?auto=format&fit=crop&w=400&q=80",
//     content: "content",
//   },
//   {
//     id: "002",
//     title: "The best laptop for Frontend engineers in 2022",
//     description: "The best laptop for Frontend engineers in 2022",
//     date: "Feb 6th",
//     url: "https://example.com",
//     tags: ["technology"],
//     coverImage:
//       "https://images.unsplash.com/photo-1602080858428-57174f9431cf?auto=format&fit=crop&w=400&q=80",
//     content: "content",
//   },
//   {
//     id: "003",
//     title: "The best laptop for Frontend engineers in 2022",
//     description: "The best laptop for Frontend engineers in 2022",
//     date: "Feb 6th",
//     url: "https://example.com",
//     tags: ["technology"],
//     coverImage:
//       "https://images.unsplash.com/photo-1602080858428-57174f9431cf?auto=format&fit=crop&w=400&q=80",
//     content: "content",
//   },
// ];

export default async function Home() {
  const data = await client.get({
    endpoint: "research",
  });
  console.log(data);

  const dataArray: ResearchData[] = data.contents.map((item: ResearchData) => ({
    id: item.id,
    title: item.title,
    publication: item.publication,
    author: item.author,
    date: item.date,
    url: item.url,
    ogp: { url: item.ogp?.url },
  }));

  return (
    <>
      <Header></Header>
      <div className="bg-gray-100">
        <GlayImage title="Research" url="/research.jpg" />
        <Space h="xl" />
        {dataArray.map((data) => (
          <div key={data.id}>
            <ResearchCard key={data.id} data={data} />
            <Space h="md" />
          </div>
        ))}
        {/* </div> */}
        <Space h="md" />
      </div>
      <Footer></Footer>
    </>
  );
}
