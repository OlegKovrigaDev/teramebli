"use client";

import { Button } from "../ui";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxDisplayed = 5;
    let start = Math.max(1, currentPage - Math.floor(maxDisplayed / 2));
    let end = start + maxDisplayed - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxDisplayed + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="mt-4 flex items-center justify-center space-x-2">
      <Button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 transition 
          ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Первая
      </Button>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 transition 
          ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Предыдущая
      </Button>
      {pageNumbers.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 transition 
            ${page === currentPage ? "font-bold bg-blue-800" : ""}`}
        >
          {page}
        </Button>
      ))}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 transition 
          ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Следующая
      </Button>
      <Button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 transition 
          ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Последняя
      </Button>
    </div>
  );
};

export default Pagination;
