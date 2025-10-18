"use client";

import Pagination from "./Pagination";
import { useState } from "react";

interface PaginationControllerProps {
  page: number;
  pageCount: number;
}

function PaginagtionController({ page, pageCount }: PaginationControllerProps) {
  const [currentPage, setCurrentPage] = useState(page);

  return (
    <Pagination
      page={currentPage}
      setPage={setCurrentPage}
      pageCount={pageCount}
    />
  );
}

export default PaginagtionController;
