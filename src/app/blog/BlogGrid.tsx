"use client";

import { Container, Grid } from "@mantine/core";
import BlogCard from "./BlogCard";
import { BlogData } from "./BlogCard";

export default function BlogGrid({ dataArray }: { dataArray: BlogData[] }) {
  return (
    <Container my="md">
      <Grid>
        {dataArray.map((data, index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 4 }}>
            <BlogCard data={data} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
