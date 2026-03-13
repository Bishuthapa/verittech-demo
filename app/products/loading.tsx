import { ProductCardSkeleton } from "@/components/products/ProductCard";

export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="h-9 w-48 bg-stone-800 rounded-lg animate-pulse" />
        <div className="h-4 w-72 bg-stone-800/60 rounded mt-2 animate-pulse" />
      </div>
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
    </div>
  );
}
