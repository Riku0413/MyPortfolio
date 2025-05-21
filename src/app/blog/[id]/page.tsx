import Header from "../../_components/Header";
import Footer from "../../_components/Footer";
import { Space } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { formatToJSTDate } from "@/app/_lib/formatToJSTDate";
import { notFound } from "next/navigation";
import getBlogMarkdownManually from "@/app/_lib/getBlogMarkdownManually";
import { convertMarkdownToHtml } from "../../_lib/markdown";
import TableOfContents from "./TableOfContents";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const path = await Promise.resolve(params.id.split("/").pop() || "");

  // const data = await client.get({
  //   endpoint: `blog/${path}`,
  // }).catch(() => null);

  const data = await getBlogMarkdownManually(path);
  console.log(data.content);
  const content = await convertMarkdownToHtml(data.content);
  console.log(content);


  if (!data) return notFound();

  return (
    <>
      <Header />
      <div className="bg-gray-100">
        <Space h="xl" />
        <div className="max-w-6xl mx-auto px-0 sm:px-4">
          <div className="flex flex-col items-center mb-8">
            <h1 className="font-bold text-2xl w-[80%] text-center leading-[1.5]">
              {data.title}
            </h1>
            <p className="text-sm text-gray-500 mt-8 mb-4">
              {formatToJSTDate(data.date)}
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:flex-1">
              <div className="p-4 rounded shadow bg-white">
                <div
                  className="markdown"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
              <div className="mt-8 flex justify-between px-4 sm:px-0">
                {data.prev && (
                  <Link href={`/blog/${data.prev.id}`} className="flex items-center text-gray-600 hover:text-gray-900">
                    <Image src="/arrow-left.svg" alt="Previous" width={20} height={20} className="mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Previous</div>
                      <div className="font-medium">{data.prev.title}</div>
                    </div>
                  </Link>
                )}
                {data.next && (
                  <Link href={`/blog/${data.next.id}`} className="flex items-center text-gray-600 hover:text-gray-900">
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Next</div>
                      <div className="font-medium">{data.next.title}</div>
                    </div>
                    <Image src="/arrow-right.svg" alt="Next" width={20} height={20} className="ml-2" />
                  </Link>
                )}
              </div>
            </div>
            <div className="w-full md:w-64">
              <TableOfContents content={content} />
            </div>
          </div>
        </div>
        <Space h="xl" />
      </div>
      <Footer />
    </>
  );
}
