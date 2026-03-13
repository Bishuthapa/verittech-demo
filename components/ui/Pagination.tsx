"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageNumbers: number[];
  onPageChange: (page: number) => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  pageNumbers,
  onPageChange,
  canGoPrev,
  canGoNext,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex items-center justify-center gap-1.5"
      aria-label="Pagination"
    >
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        aria-label="Previous page"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </PageButton>

      {pageNumbers.map((page, i) =>
        page < 0 ? (
          <span key={`ellipsis-${i}`} className="px-1 text-stone-600">
            …
          </span>
        ) : (
          <PageButton
            key={page}
            onClick={() => onPageChange(page)}
            active={page === currentPage}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </PageButton>
        )
      )}

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        aria-label="Next page"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </PageButton>
    </nav>
  );
}

interface PageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: React.ReactNode;
}

function PageButton({ active, children, className, disabled, ...props }: PageButtonProps) {
  return (
    <button
      className={cn(
        "min-w-[2.25rem] h-9 px-2 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
        active
          ? "bg-amber-500 text-stone-900 shadow-sm"
          : disabled
          ? "text-stone-700 cursor-not-allowed"
          : "text-stone-400 hover:text-stone-200 hover:bg-stone-800",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
