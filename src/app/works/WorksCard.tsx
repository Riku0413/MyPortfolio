"use client";

import { AspectRatio, Card, Text, Loader } from "@mantine/core";
import Link from "next/link";
import { formatToJSTDate } from "../_lib/formatToJSTDate";
import classes from "./WorksCard.module.css";
import NextImage from "next/image";
import { useState } from "react";

export type WorksData = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  revisedAt?: string;
  title: string;
  description: string;
  date: string;
  content?: string;
  ogp?: {
    url: string;
    height?: number;
    width?: number;
  };
};

export default function WorksCard({ article }: { article: WorksData }) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Link href={`/works/${article.id}`} passHref>
      <Card
        key={article.title}
        p="md"
        withBorder
        radius="md"
        className={classes.card}
      >
        <AspectRatio ratio={1920 / 1080}>
          <div className="relative w-full h-full">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50">
                <Loader size="sm" />
              </div>
            )}
            <NextImage
              src={article.ogp?.url ?? "/default.jpg"}
              alt={article.title}
              fill
              className="object-cover"
              priority
              loading="eager"
              onLoadingComplete={() => setImageLoading(false)}
            />
          </div>
        </AspectRatio>
        <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
          {formatToJSTDate(article.date)}
        </Text>
        <Text className={classes.title} mt={5} fw={600}>
          {article.title}
        </Text>
      </Card>
    </Link>
  );
}
