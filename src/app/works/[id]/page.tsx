import Header from "../../_components/Header";
import Footer from "../../_components/Footer";
import { Space } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { formatToJSTDate } from "@/app/_lib/formatToJSTDate";
import { convertMarkdownToHtml } from "../../_lib/markdown";
import getWorksMarkdownManually from "../../_lib/getWorksMarkdownManually";

// type Props = {
//   params: { id: string };
// };

export default async function Page({params}: {params: Promise<{ id: string }>}) {
  const path = (await params).id.split("/").pop() || '';


  const work = await getWorksMarkdownManually(path);
  const content = await convertMarkdownToHtml(work.content);

  return (
    <>
      <Header />
      <div className="bg-gray-100">
        {/* <div className="pt-4 pl-4">
          <Link href={`/works`} className="block w-[30px] h-[30px] active:bg-gray-200 rounded">
            <Image src="/arrow-left.svg" alt="back" width={30} height={30} />
          </Link>
        </div> */}
        <Space h="xl" />
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-2xl w-[80%] text-center leading-[1.5]">
              {work.title}
            </h1>
            <p className="text-sm text-gray-500 mt-8 mb-4">
              {formatToJSTDate(work.date)}
            </p>
          </div>
          <div className="p-4 rounded shadow bg-white">
            <div
              className="markdown prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
        <Space h="xl" />
      </div>
      <Footer />
    </>
  );
}
