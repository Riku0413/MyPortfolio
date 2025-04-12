"use client";

import { Pagination } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";

export default function ClientPagination({ total }: { total: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");

  const handleChange = (page: number) => {
    router.push(`/blog?page=${page}`);
  };

  return (
    <Pagination
      total={total}
      value={currentPage}
      onChange={handleChange}
      color="gray"
    />
  );
}

