"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Product, FilterState, SortOrder } from "@/types";

const DEFAULT_MAX_PRICE = 1000;

interface UseProductFiltersReturn {
  filters: FilterState;
  filteredProducts: Product[];
  setCategory: (category: string) => void;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  setSearch: (search: string) => void;
  setSort: (sort: SortOrder) => void;
  resetFilters: () => void;
  priceRange: { min: number; max: number };
}

export function useProductFilters(products: Product[]): UseProductFiltersReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const priceRange = useMemo(() => {
    if (products.length === 0) return { min: 0, max: DEFAULT_MAX_PRICE };
    const prices = products.map((p) => p.price);
    return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
  }, [products]);

  // Initialise filters from URL params
  const [filters, setFilters] = useState<FilterState>(() => ({
    category: searchParams.get("category") ?? "",
    minPrice: Number(searchParams.get("minPrice") ?? priceRange.min),
    maxPrice: Number(searchParams.get("maxPrice") ?? priceRange.max),
    search: searchParams.get("search") ?? "",
    sort: (searchParams.get("sort") as SortOrder) ?? "asc",
  }));

  // Sync URL params
  const syncUrl = useCallback(
    (newFilters: FilterState) => {
      const params = new URLSearchParams();
      if (newFilters.category) params.set("category", newFilters.category);
      if (newFilters.search) params.set("search", newFilters.search);
      if (newFilters.sort !== "asc") params.set("sort", newFilters.sort);
      if (newFilters.minPrice > priceRange.min)
        params.set("minPrice", String(newFilters.minPrice));
      if (newFilters.maxPrice < priceRange.max)
        params.set("maxPrice", String(newFilters.maxPrice));
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [pathname, router, priceRange]
  );

  const update = useCallback(
    (partial: Partial<FilterState>) => {
      setFilters((prev) => {
        const next = { ...prev, ...partial };
        syncUrl(next);
        return next;
      });
    },
    [syncUrl]
  );

  const resetFilters = useCallback(() => {
    const reset: FilterState = {
      category: "",
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      search: "",
      sort: "asc",
    };
    setFilters(reset);
    router.replace(pathname, { scroll: false });
  }, [priceRange, pathname, router]);

  // Re-sync maxPrice when price-range is determined
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      maxPrice:
        prev.maxPrice === DEFAULT_MAX_PRICE || prev.maxPrice === 0
          ? priceRange.max
          : prev.maxPrice,
    }));
  }, [priceRange.max]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filters.category && product.category !== filters.category) return false;
      if (product.price < filters.minPrice || product.price > filters.maxPrice)
        return false;
      if (
        filters.search &&
        !product.title.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [products, filters]);

  return {
    filters,
    filteredProducts,
    setCategory: (category) => update({ category }),
    setMinPrice: (minPrice) => update({ minPrice }),
    setMaxPrice: (maxPrice) => update({ maxPrice }),
    setSearch: (search) => update({ search }),
    setSort: (sort) => update({ sort }),
    resetFilters,
    priceRange,
  };
}
