"use client";

import {
  AspectRatio,
  Card,
  Container,
  Image,
  SimpleGrid,
  Text,
} from "@mantine/core";
import classes from "./WorksGrid.module.css";
import Link from "next/link";
import { formatToJSTDate } from "../_lib/formatToJSTDate";

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

export default function WorksGrid({ dataArray }: { dataArray: WorksData[] }) {
  const cards = dataArray.map((article) => (
    <Link key={article.id} href={`/works/${article.id}`} passHref>
      <Card
        key={article.title}
        p="md"
        withBorder
        radius="md"
        className={classes.card}
      >
        <AspectRatio ratio={1920 / 1080}>
          <Image src={article.ogp?.url ?? ""} alt="example" />
        </AspectRatio>
        <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
          {formatToJSTDate(article.date)}
        </Text>
        <Text className={classes.title} mt={5} fw={600}>
          {article.title}
        </Text>
      </Card>
    </Link>
  ));

  return (
    <Container>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
}
