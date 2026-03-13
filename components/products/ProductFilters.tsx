"use client";

import React from "react";
import type { FilterState, SortOrder } from "@/types";
import { Button } from "@/components/ui";

interface ProductFiltersProps {
  filters: FilterState;
  categories: string[];
  priceRange: { min: number; max: number };
  onCategoryChange: (category: string) => void;
  onMinPriceChange: (price: number) => void;
  onMaxPriceChange: (price: number) => void;
  onSearchChange: (search: string) => void;
  onSortChange: (sort: SortOrder) => void;
  onReset: () => void;
  resultCount: number;
}

export function ProductFilters({
  filters,
  categories,
  priceRange,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSearchChange,
  onSortChange,
  onReset,
  resultCount,
}: ProductFiltersProps) {
  const hasActiveFilters =
    filters.category !== "" ||
    filters.search !== "" ||
    filters.minPrice > priceRange.min ||
    filters.maxPrice < priceRange.max;

  return (
    <aside className="space-y-6">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">
          Search
        </label>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search products…"
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-stone-800 border border-stone-700 rounded-lg pl-9 pr-3 py-2 text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">
          Sort by Price
        </label>
        <div className="flex gap-2">
          {(["asc", "desc"] as SortOrder[]).map((s) => (
            <button
              key={s}
              onClick={() => onSortChange(s)}
              className={`flex-1 py-1.5 text-sm rounded-lg border transition-colors ${
                filters.sort === s
                  ? "bg-amber-500 text-stone-900 border-amber-500 font-semibold"
                  : "bg-stone-800 text-stone-400 border-stone-700 hover:border-stone-500"
              }`}
            >
              {s === "asc" ? "↑ Low → High" : "↓ High → Low"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">
          Category
        </label>
        <div className="space-y-1">
          <CategoryButton
            label="All Categories"
            active={filters.category === ""}
            onClick={() => onCategoryChange("")}
          />
          {categories.map((cat) => (
            <CategoryButton
              key={cat}
              label={cat}
              active={filters.category === cat}
              onClick={() => onCategoryChange(cat)}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">
          Price Range
        </label>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-stone-400">
            <span>${filters.minPrice}</span>
            <span className="text-stone-600">—</span>
            <span>${filters.maxPrice}</span>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={filters.minPrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val < filters.maxPrice) onMinPriceChange(val);
              }}
              className="w-full accent-amber-500"
            />
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={filters.maxPrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val > filters.minPrice) onMaxPriceChange(val);
              }}
              className="w-full accent-amber-500"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-stone-800">
        <div className="flex items-center justify-between">
          <span className="text-sm text-stone-500">
            <span className="text-stone-200 font-semibold">{resultCount}</span>{" "}
            products
          </span>
          {hasActiveFilters && (
            <Button size="sm" variant="ghost" onClick={onReset}>
              Clear all
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}

function CategoryButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-colors ${
        active
          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 font-medium"
          : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
      }`}
    >
      {label}
    </button>
  );
}
