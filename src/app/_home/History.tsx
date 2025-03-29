"use client";

import { Table } from "@mantine/core";

const data = [
  {
    title: "EEIS enrollment",
    content:
      "Advanced to EEIS (the Department of Electrical Engineering and Information Systems), Graduate School of Engineering, the University of Tokyo.",
    year: "Apr 2025",
  },
  {
    title: "EEIC graduation",
    content: "Graduated from EEIC at the University of Tokyo.",
    year: "Mar 2025",
  },
  {
    title: "WPTCE acceptance",
    content:
      "First-author paper accepted at IEEE WPTCE (Wiress Power Technology Conference and Expo) 2025, Rome, Italy.",
    year: "Mar 2025",
  },
  {
    title: "IEICE Society Conference",
    content:
      "Presented at the 2024 IEICE Society Conference, organized by the Institute of Electronics, Information and Communication Engineers in Japan.",
    year: "Sep 2024",
  },
  {
    title: "EEIC enrollment",
    content:
      "Entered EEIC (the Department of Electrical and Electronic Engineering, Information and Communication Engineering) at the University of Tokyo",
    year: "Apr 2023",
  },
  {
    title: "UTokyo enrollment",
    content: "Entered the University of Tokyo, Science Stream I",
    year: "Apr 2021",
  },
];

export default function History() {
  const rows = data.map((row) => {
    return (
      <Table.Tr key={row.title}>
        <Table.Td className="min-w-[120px]">{row.year}</Table.Td>
        <Table.Td>
          {/* <Anchor component="button" fz="sm"> */}
          {row.content}
          {/* </Anchor> */}
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div>
      <Table.ScrollContainer minWidth={400}>
        <Table
          verticalSpacing="xs"
          className="bg-white max-w-[90%] md:max-w-[70%] lg:max-w-[904px] mx-auto"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="min-w-[120px]">MM/YYYY</Table.Th>
              <Table.Th>Description</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}
