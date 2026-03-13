import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProducts, getCategories } from "@/lib/services";
import { ProductsClient } from "@/components/products/ProductsClient";
import type { SortOrder } from "@/types";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse all our products — electronics, clothing, jewellery and more.",
};

function ProductListJsonLd({ count }: { count: number }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "FakeShop Products",
    description: `Browse ${count} products across multiple categories`,
    url: "https://fakeshop.example.com/products",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface PageProps {
  searchParams: { sort?: string };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const sort = (searchParams.sort as SortOrder) ?? "asc";

  const [products, categories] = await Promise.all([
    getAllProducts(sort),
    getCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <ProductListJsonLd count={products.length} />

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-stone-100 tracking-tight">
          All Products
        </h1>
        <p className="text-stone-500 mt-1">
          {products.length} products • server-side fetched, client-side filtered
        </p>
      </div>

      <Suspense>
        <ProductsClient initialProducts={products} categories={categories} />
      </Suspense>
    </div>
  );
}
