"use client";

import { Card, Group, Image, Text, AspectRatio, Space } from "@mantine/core";
import { formatToJSTDate } from "../_lib/formatToJSTDate";

export type ResearchData = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  revisedAt?: string;
  title: string;
  publication: string;
  author: string;
  ogp?: {
    url: string;
    height?: number;
    width?: number;
  };
  url?: string;
  date: string;
};

export default function ResearchCard({ data }: { data: ResearchData }) {
  return (
    <Card
      withBorder
      radius="md"
      p={0}
      className="w-[90%] sm:w-[70%] md:w-[90%] lg:w-[900px] mx-auto transition-transform shadow-sm hover:scale-[1.005] hover:shadow-md duration-150 ease-in-out"
    >
      <a href={data.url} target="_blank" rel="noopener noreferrer">
        <div className="flex flex-col md:flex-row">
          <AspectRatio ratio={16 / 9} className="w-full md:w-[300px]">
            <Image
              src={data.ogp?.url ?? "/default.jpg"}
              alt="Cover image"
              className="rounded-l-md object-cover"
            />
          </AspectRatio>

          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <Text
                className="font-semibold leading-snug line-clamp-2"
                size="lg"
              >
                {data.title}
              </Text>
              <Space h="xs" />
              <Text
                className="text-gray-500 font-medium mt-1 mb-3 italic"
                size="sm"
              >
                {data.publication}
              </Text>
            </div>
            <Space h="lg" />

            <Group wrap="nowrap" gap="xs" className="mt-auto">
              <Group wrap="nowrap" gap="xs">
                <Text size="sm" className="text-gray-700">
                  {data.author}
                </Text>
              </Group>
              <Text size="sm" c="dimmed" className="ml-auto">
                {formatToJSTDate(data.date)}
              </Text>
            </Group>
          </div>
        </div>
      </a>
    </Card>
  );
}
