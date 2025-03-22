"use client";

import { useMediaQuery } from "@mantine/hooks";
import {
  Badge,
  Card,
  Center,
  Group,
  Text,
  Image,
  useMantineTheme,
} from "@mantine/core";
import classes from "./BlogCard.module.css";
import NextImage from "next/image";

export type BlogData = {
  url: string;
  title: string;
  description: string;
  date: string;
};

export default function BlogCard({ data }: { data: BlogData }) {
  const theme = useMantineTheme();
  const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  if (isSmallScreen) {
    return (
      <Card
        withBorder
        radius="md"
        p={0}
        style={{ overflow: "hidden" }}
        className={classes.card}
      >
        <div style={{ display: "flex", width: "100%", height: "150px" }}>
          <Card.Section className="pr-4">
            <div className="relative h-full w-[150px]">
              <NextImage
                src={data.url}
                alt={data.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </Card.Section>

          <div
            style={{ flex: 1, padding: "1rem" }}
            className="flex flex-col justify-between"
          >
            <div>
              <Text fw={600} size="md" mb={6}>
                {data.title}
              </Text>

              <Text fz="sm" c="dimmed" lineClamp={3}>
                {data.description}
              </Text>
            </div>

            <Group mt="sm" gap="xs">
              <Text size="xs" c="dimmed">
                {data.date}
              </Text>
            </Group>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      withBorder
      radius="md"
      className={classes.card}
      style={{ height: "380px" }}
    >
      <Card.Section>
        <div className="relative w-full h-[200px]">
          <NextImage
            src={data.url}
            alt={data.title}
            fill
            className="object-cover"
            priority
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
          <Text className={classes.title} fw={500} component="a">
            {data.title}
          </Text>

          <Text fz="sm" c="dimmed" lineClamp={4}>
            {data.description}
          </Text>
        </div>
        <Group justify="space-between" className={classes.footer}>
          <Center>
            <Text fz="sm" inline>
              {data.date}
            </Text>
          </Center>
        </Group>
      </div>
    </Card>
  );
}
