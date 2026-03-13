"use client";

import React, { Suspense } from "react";
import type { Product } from "@/types";
import { ProductCard, ProductCardSkeleton } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState, Button } from "@/components/ui";
import { useProductFilters } from "@/hooks/useProductFilters";
import { usePagination } from "@/hooks/usePagination";
import Link from "next/link";

interface ProductsClientProps {
  initialProducts: Product[];
  categories: string[];
}

function ProductsClientInner({ initialProducts, categories }: ProductsClientProps) {
  const {
    filters,
    filteredProducts,
    setCategory,
    setMinPrice,
    setMaxPrice,
    setSearch,
    setSort,
    resetFilters,
    priceRange,
  } = useProductFilters(initialProducts);

  const pagination = usePagination(filteredProducts, 8);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-64 xl:w-72 shrink-0">
        <div className="sticky top-20 bg-stone-900/50 border border-stone-800 rounded-2xl p-5 backdrop-blur-sm">
          <ProductFilters
            filters={filters}
            categories={categories}
            priceRange={priceRange}
            onCategoryChange={setCategory}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            onSearchChange={setSearch}
            onSortChange={setSort}
            onReset={resetFilters}
            resultCount={filteredProducts.length}
          />
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        {filteredProducts.length === 0 ? (
          <EmptyState
            title="No products found"
            description="Try adjusting your filters or search terms."
            action={
              <Button variant="outline" onClick={resetFilters}>
                Clear filters
              </Button>
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mb-10">
              {pagination.paginatedItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              pageNumbers={pagination.pageNumbers}
              onPageChange={pagination.goToPage}
              canGoPrev={pagination.canGoPrev}
              canGoNext={pagination.canGoNext}
            />
          </>
        )}
      </div>
    </div>
  );
}

export function ProductsClient({ initialProducts, categories }: ProductsClientProps) {
  return (
    <Suspense fallback={
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 xl:w-72 shrink-0">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl h-96 animate-pulse" />
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    }>
      <ProductsClientInner initialProducts={initialProducts} categories={categories} />
    </Suspense>
  );
}
