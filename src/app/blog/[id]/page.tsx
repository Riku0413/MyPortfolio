import Header from "../../_components/Header";
import Footer from "../../_components/Footer";
import { Space } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../_lib/microCMS";
import { formatToJSTDate } from "@/app/_lib/formatToJSTDate";
import { notFound } from "next/navigation";

export default async function Page({params}: {params: Promise<{ id: string }>}) {
  const path = (await params).id.split("/").pop();

  const data = await client.get({
    endpoint: `blog/${path}`,
  }).catch(() => null);

  if (!data) return notFound();

  return (
    <>
      <Header />
      <div className="bg-gray-100">
        <div className="pt-4 pl-4">
          <Link href={`/blog`} className="block w-[30px] h-[30px]">
            <Image src="/arrow-left.svg" alt="back" width={30} height={30} />
          </Link>
        </div>
        <Space h="xl" />
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-4xl w-[80%] text-center leading-[1.5]">
              {data.title}
            </h1>
            <p className="text-sm text-gray-500 mt-8 mb-4">
              {formatToJSTDate(data.date)}
            </p>
          </div>
          <div className="p-4 rounded shadow bg-white">
            <div
              className="markdown"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </div>
        </div>
        <Space h="xl" />
      </div>
      <Footer />
    </>
  );
}
