"use client";

import { useState, useMemo } from "react";

interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  paginatedItems: T[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  pageNumbers: number[];
}

export function usePagination<T>(
  items: T[],
  itemsPerPage = 8
): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  // reset to page 1 when items list changes length 
  useMemo(() => {
    setCurrentPage(1);
  }, [items.length]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const pageNumbers = useMemo(() => {
    const delta = 2;
    const range: number[] = [];
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);
    for (let i = left; i <= right; i++) range.push(i);
    if (left > 1) range.unshift(-1, 1);
    if (right < totalPages) range.push(-2, totalPages);
    return range;
  }, [currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage: () => goToPage(currentPage + 1),
    prevPage: () => goToPage(currentPage - 1),
    canGoPrev: currentPage > 1,
    canGoNext: currentPage < totalPages,
    pageNumbers,
  };
}
