"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/CartContext";
import { Button, EmptyState } from "@/components/ui";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const {
    state,
    removeItem,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          title="Your cart is empty"
          description="Looks like you haven't added any products yet."
          action={
            <Link href="/products">
              <Button variant="primary">Browse Products</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-stone-100">Shopping Cart</h1>
          <p className="text-stone-500 mt-1">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={clearCart}>
          Clear all
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-4">
          {state.items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-4 bg-stone-900 border border-stone-800 rounded-2xl p-4"
            >
              <Link href={`/products/${product.id}`}>
                <div className="relative w-24 h-24 bg-white rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-medium text-stone-200 hover:text-amber-400 line-clamp-2 transition-colors text-sm">
                    {product.title}
                  </h3>
                </Link>
                <p className="text-xs text-stone-500 capitalize mt-0.5">
                  {product.category}
                </p>
                <p className="text-sm text-stone-400 mt-1">
                  {formatPrice(product.price)} each
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center bg-stone-800 rounded-lg overflow-hidden border border-stone-700">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-100 hover:bg-stone-700 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-stone-100">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-100 hover:bg-stone-700 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-xs text-stone-600 hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="font-bold text-stone-100">
                  {formatPrice(product.price * quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sticky top-20">
            <h2 className="font-bold text-stone-100 text-lg mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-400">
                <span>Subtotal ({totalItems} items)</span>
                <span className="text-stone-200">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Shipping</span>
                <span className="text-emerald-400">Free</span>
              </div>
              <div className="border-t border-stone-800 pt-3 flex justify-between font-bold text-stone-100">
                <span>Total</span>
                <span className="text-xl">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <Button variant="primary" size="lg" className="w-full mt-6">
              Proceed to Checkout
            </Button>

            <Link href="/products" className="block text-center text-sm text-stone-500 hover:text-amber-400 transition-colors mt-4">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
