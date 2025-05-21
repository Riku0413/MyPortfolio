"use client";

import { Space } from "@mantine/core";
import ResearchCard from "./ResearchCard";
import { ResearchData } from "./ResearchCard";

export default function ResearchGrid({ dataArray }: { dataArray: ResearchData[] }) {
  return (
    <div className="bg-gray-100">
      {dataArray.map((data) => (
        <div key={data.id}>
          <ResearchCard key={data.id} data={data} />
          <Space h="md" />
        </div>
      ))}
      <Space h="md" />
    </div>
  );
} 