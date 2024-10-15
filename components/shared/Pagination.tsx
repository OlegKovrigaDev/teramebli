"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onShowMore: () => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onShowMore,
}: PaginationProps) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxDisplayed = 3;
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
  const remainingItems = totalItems - currentPage * itemsPerPage;
  const showMoreLabel = `Показати ще ${Math.min(
    remainingItems,
    itemsPerPage
  )} товарів`;

  return (
    <div className="mt-4 flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 text-white bg-gray-400 rounded 
          ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {currentPage === 1 ? "1" : "..."}
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded 
            ${
              page === currentPage
                ? "bg-black text-white font-bold"
                : "bg-gray-400 text-black"
            }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 text-white bg-gray-400 rounded 
          ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {currentPage === totalPages ? totalPages : "..."}
      </button>
      <button
        onClick={onShowMore}
        disabled={remainingItems <= 0}
        className={`ml-4 px-4 py-2 text-purple-600 border border-purple-600 rounded hover:bg-purple-100 transition 
          ${remainingItems <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {showMoreLabel}
      </button>
    </div>
  );
};

export default Pagination;
