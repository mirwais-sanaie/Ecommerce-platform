"use client";

import { useRouter } from "next/navigation";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  pageCount: number;
}

function Pagination({ page, setPage, pageCount }: PaginationProps) {
  const router = useRouter();

  // Create array of page numbers
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  // Navigate when page changes
  function goToPage(p: number) {
    setPage(p);
    router.push(`/shop?_page=${p}&_per_page=5`);
  }

  return (
    <div className="flex gap-2 items-center justify-center mt-4">
      <button
        disabled={page <= 1}
        onClick={() => goToPage(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        &lt; Previous
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => goToPage(p)}
          className={`px-3 py-1 border rounded ${
            p === page ? "bg-black text-white font-bold" : ""
          }`}
        >
          {p}
        </button>
      ))}

      <button
        disabled={page >= pageCount}
        onClick={() => goToPage(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next &gt;
      </button>
    </div>
  );
}

export default Pagination;
