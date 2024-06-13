import React from "react";

interface IProps {
  limit: number;
  initialPage: number;
}

interface IPagination {
  limit: number;
  page: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

const usePagination = ({
  limit = 10,
  initialPage = 0,
}: IProps): IPagination => {
  const [currentPage, setCurrentPage] = React.useState(initialPage);

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return {
    page: currentPage,
    limit,
    setPage,
    nextPage,
    prevPage,
  };
};

export default usePagination;
