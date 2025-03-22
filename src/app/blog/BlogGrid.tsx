"use client";

import { Container, Grid } from "@mantine/core";
import BlogCard from "./BlogCard";
import { BlogData } from "./BlogCard";

const dataArray: BlogData[] = [
  {
    url: "https://i.imgur.com/Cij5vdL.png",
    title: "Card 1",
    description:
      "Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very different direction to its predecessor, namely the fact that this time round instead of fighting against various mutated zombies, you’re now dealing with more occult enemies like werewolves and vampires.",
    date: "2025/03/15",
  },
  {
    url: "/oist.jpg",
    title: "Card 2",
    description: "Description 2",
    date: "2024/12/01",
  },
  {
    url: "/radwimps.jpg",
    title: "Card 3",
    description: "Description 3",
    date: "2024/10/10",
  },
];

export default function BlogGrid() {
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
