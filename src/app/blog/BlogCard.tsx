"use client";

import { useMediaQuery } from "@mantine/hooks";
import {
  Badge,
  Card,
  Center,
  Group,
  Space,
  Text,
  useMantineTheme,
  Loader,
  Skeleton,
} from "@mantine/core";
import classes from "./BlogCard.module.css";
import NextImage from "next/image";
import Link from "next/link";
import { formatToJSTDate } from "../_lib/formatToJSTDate";
import { useState, useEffect } from "react";

// export type BlogData = {
//   id: string;
//   title: string;
//   description: string;
//   date: string;
//   content: string;
//   tags?: string[];
//   coverImage?: string;
// };

export type BlogData = {
  id: string;
  createdAt?: string; // ISO 8601 形式の日付
  updatedAt?: string;
  publishedAt?: string;
  revisedAt?: string;
  title: string;
  description: string;
  date: string; // 日付（例: "2025-03-16T15:00:00.000Z"）
  content: string; // HTML文字列
  ogp?: {
    url: string;
    height?: number;
    width?: number;
  };
};

export default function BlogCard({ data }: { data: BlogData }) {
  const theme = useMantineTheme();
  const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [imageLoading, setImageLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const href = `/blog/${data.id}`;

  // 初期レンダリング時はスケルトンUIを表示
  if (!isClient) {
    return (
      <Card withBorder radius="md" p={0} style={{ overflow: "hidden" }}>
        <div style={{ display: "flex", width: "100%", height: "150px" }}>
          <Card.Section className="pr-4">
            <Skeleton height={150} width={150} />
          </Card.Section>
          <div style={{ flex: 1, padding: "1rem" }} className="flex flex-col justify-between">
            <div>
              <Skeleton height={20} width="80%" mb={6} />
              <Skeleton height={16} width="90%" mb={6} />
              <Skeleton height={16} width="70%" />
            </div>
            <Skeleton height={16} width="40%" />
          </div>
        </div>
      </Card>
    );
  }

  // ✅ 小画面のカード（クリックでリンク）
  if (isSmallScreen) {
    return (
      <Link href={href} passHref>
        <Card
          withBorder
          radius="md"
          p={0}
          style={{ overflow: "hidden", cursor: "pointer" }}
          className={classes.card}
          component="div"
        >
          <div style={{ display: "flex", width: "100%", height: "150px" }}>
            <Card.Section className="pr-4">
              <div className="relative h-full w-[150px]">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50">
                    <Loader size="sm" />
                  </div>
                )}
                <NextImage
                  src={data.ogp?.url ?? "/default.jpg"}
                  alt={data.title}
                  fill
                  className="object-cover"
                  priority
                  loading="eager"
                  onLoadingComplete={() => setImageLoading(false)}
                />
              </div>
            </Card.Section>

            <div
              style={{ flex: 1, padding: "1rem" }}
              className="flex flex-col justify-between"
            >
              <div>
                <Text fw={600} size="md" mb={6} lineClamp={1}>
                  {data.title}
                </Text>

                <Text fz="xs" c="dimmed" lineClamp={3}>
                  {data.description}
                </Text>
              </div>

              <Group gap="xs">
                <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                  {formatToJSTDate(data.date)}
                </Text>
              </Group>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  // ✅ 通常サイズのカード（クリックでリンク）
  return (
    <Link href={href} passHref>
      <Card
        withBorder
        radius="md"
        className={classes.card}
        style={{ height: "400px", cursor: "pointer" }}
        component="div"
      >
        <Card.Section>
          <div className="relative w-full h-[250px]">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50">
                <Loader size="sm" />
              </div>
            )}
            <NextImage
              src={data.ogp?.url ?? "/default.jpg"}
              alt={data.title}
              fill
              className="object-cover"
              priority
              loading="eager"
              onLoadingComplete={() => setImageLoading(false)}
            />
          </div>
        </Card.Section>

        {data.date > "2025/03/01" && (
          <Badge
            className={classes.rating}
            variant="gradient"
            gradient={{ from: "yellow", to: "red" }}
          >
            New
          </Badge>
        )}

        <div style={{ flex: 1 }} className="flex flex-col justify-between">
          <div>
            <Space h="xs" />
            <Text
              className={classes.title + "leading-snug line-clamp-1"}
              fw={600}
              size="md"
            >
              {data.title}
            </Text>
            <Space h="xs" />

            <Text fz="xs" c="dimmed" lineClamp={3}>
              {data.description}
            </Text>
          </div>
          <Group justify="space-between" className={classes.footer}>
            <Center>
              <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                {formatToJSTDate(data.date)}
              </Text>
            </Center>
          </Group>
        </div>
      </Card>
    </Link>
  );
}
