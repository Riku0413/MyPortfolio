"use client";

import { Anchor, Table } from "@mantine/core";

const data = [
  {
    title: "EEIS",
    content: "EEIS",
    year: "04/2025 - Present",
  },
  {
    title: "EEIC",
    content: "EEIC",
    year: "04/2023 - 03/2025",
  },
  {
    title: "UT",
    content: "The University of Tokyo, Science I",
    year: "04/2021 - 03/2023",
  },
];

export default function History() {
  const rows = data.map((row) => {
    return (
      <Table.Tr key={row.title}>
        <Table.Td>{row.year}</Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {row.content}
          </Anchor>
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
              <Table.Th>MM/YYYY</Table.Th>
              <Table.Th>Description</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}
