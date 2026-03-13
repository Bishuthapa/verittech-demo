import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, getProductById } from "@/lib/services";
import { Badge, StarRating } from "@/components/ui";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { formatPrice } from "@/lib/utils";


export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((p) => ({ id: String(p.id) }));
  } catch {
    return [];
  }
}


export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const product = await getProductById(Number(params.id));
    return {
      title: product.title,
      description: product.description.slice(0, 160),
      openGraph: {
        title: product.title,
        description: product.description.slice(0, 160),
        images: [{ url: product.image }],
      },
    };
  } catch {
    return { title: "Product Not Found" };
  }
}


export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) notFound();

  let product;
  try {
    product = await getProductById(id);
  } catch {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.rate,
      reviewCount: product.rating.count,
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="flex items-center gap-2 text-sm text-stone-500 mb-8">
        <Link href="/" className="hover:text-stone-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-stone-300 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-stone-300 truncate max-w-[200px]">{product.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        <div className="relative">
          <div className="aspect-square bg-white rounded-3xl overflow-hidden border border-stone-200/10 shadow-2xl">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-10"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <Badge variant="amber" className="mb-3">{product.category}</Badge>
            <h1 className="text-3xl font-extrabold text-stone-100 leading-tight mb-4">
              {product.title}
            </h1>
            <StarRating
              rate={product.rating.rate}
              count={product.rating.count}
              size="md"
            />
          </div>

          <div className="text-4xl font-extrabold text-stone-100">
            {formatPrice(product.price)}
          </div>

          <p className="text-stone-400 leading-relaxed">{product.description}</p>

          <div className="border-t border-stone-800 pt-6 space-y-4">
            <AddToCartButton product={product} />

            <Link
              href="/products"
              className="flex items-center gap-2 text-sm text-stone-500 hover:text-amber-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to products
            </Link>
          </div>

          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3">
            <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wider">
              Product Details
            </h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-stone-500">Product ID</dt>
                <dd className="text-stone-200 font-medium">#{product.id}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Category</dt>
                <dd className="text-stone-200 font-medium capitalize">{product.category}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Rating</dt>
                <dd className="text-stone-200 font-medium">{product.rating.rate}/5</dd>
              </div>
              <div>
                <dt className="text-stone-500">Reviews</dt>
                <dd className="text-stone-200 font-medium">{product.rating.count}</dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
