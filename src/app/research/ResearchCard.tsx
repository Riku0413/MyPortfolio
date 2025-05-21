"use client";

import { Card, Group, Text, Space, Loader } from "@mantine/core";
import Image from "next/image";
import { formatToJSTDate } from "../_lib/formatToJSTDate";
import { useState, useEffect } from "react";

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
  const [imageLoading, setImageLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card
      withBorder
      radius="md"
      p={0}
      className="w-[90%] sm:w-[70%] md:w-[90%] lg:w-[900px] mx-auto transition-transform shadow-sm hover:scale-[1.01] hover:shadow-md duration-150 ease-in-out overflow-hidden"
    >
      <a href={data.url} target="_blank" rel="noopener noreferrer">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[300px] relative h-[250px] md:h-[200px]">
            {isMounted && imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 rounded-l-md">
                <Loader size="sm" />
              </div>
            )}
            <Image
              src={data.ogp?.url || "/default.jpg"}
              alt="Cover image"
              fill
              className="rounded-l-md object-contain"
              sizes="(max-width: 768px) 100vw, 300px"
              style={{ objectPosition: 'center' }}
              priority
              loading="eager"
              onLoadingComplete={() => setImageLoading(false)}
            />
          </div>

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
