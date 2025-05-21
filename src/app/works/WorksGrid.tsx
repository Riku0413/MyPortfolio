"use client";

import { Container, SimpleGrid } from "@mantine/core";
import WorksCard from "./WorksCard";
import { WorksData } from "./WorksCard";

export default function WorksGrid({ dataArray }: { dataArray: WorksData[] }) {
  const cards = dataArray.map((article) => (
    <WorksCard key={article.id} article={article} />
  ));

  return (
    <Container>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
}
