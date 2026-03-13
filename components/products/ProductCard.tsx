"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";
import { Button, Badge, StarRating } from "@/components/ui";
import { useCart } from "@/store/CartContext";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInCart, getItemQuantity } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = isInCart(product.id);
  const qty = getItemQuantity(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <article className="relative flex flex-col h-full bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.08)] hover:-translate-y-0.5">
        <div className="relative bg-white aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {inCart && (
            <div className="absolute top-3 right-3 bg-amber-500 text-stone-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
              {qty}
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 p-4 gap-3">
          <Badge variant="amber">{product.category}</Badge>

          <h3 className="text-sm font-medium text-stone-200 leading-snug line-clamp-2 group-hover:text-amber-400 transition-colors">
            {product.title}
          </h3>

          <div className="mt-auto flex items-center justify-between">
            <StarRating rate={product.rating.rate} count={product.rating.count} />
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-xl font-bold text-stone-100">
              {formatPrice(product.price)}
            </span>
            <Button
              size="sm"
              variant={added ? "secondary" : "primary"}
              onClick={handleAdd}
              className="shrink-0"
            >
              {added ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Added
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add
                </>
              )}
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
}


export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden animate-pulse">
      <div className="bg-stone-800 aspect-square" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-20 bg-stone-800 rounded-full" />
        <div className="h-4 bg-stone-800 rounded w-full" />
        <div className="h-4 bg-stone-800 rounded w-3/4" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-6 w-16 bg-stone-800 rounded" />
          <div className="h-8 w-16 bg-stone-800 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
