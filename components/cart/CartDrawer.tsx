"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/CartContext";
import { Button } from "@/components/ui";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { state, removeItem, updateQuantity, clearCart, toggleCart, totalPrice, totalItems } =
    useCart();

  if (!state.isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={toggleCart}
        aria-hidden="true"
      />

      <aside className="fixed inset-y-0 right-0 w-full max-w-md bg-stone-950 border-l border-stone-800 z-50 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-800">
          <div>
            <h2 className="text-lg font-bold text-stone-100">Shopping Cart</h2>
            <p className="text-sm text-stone-500">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={toggleCart}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-stone-800 flex items-center justify-center">
                <svg className="w-8 h-8 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-stone-300">Your cart is empty</p>
                <p className="text-sm text-stone-500 mt-1">Add some products to get started</p>
              </div>
              <Button variant="primary" onClick={toggleCart} size="sm">
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-stone-800 px-4">
              {state.items.map(({ product, quantity }) => (
                <li key={product.id} className="py-4 flex gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded-xl overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${product.id}`}
                      onClick={toggleCart}
                      className="text-sm font-medium text-stone-200 hover:text-amber-400 line-clamp-2 transition-colors"
                    >
                      {product.title}
                    </Link>
                    <p className="text-amber-400 font-bold text-sm mt-1">
                      {formatPrice(product.price * quantity)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-stone-800 rounded-lg overflow-hidden border border-stone-700">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-100 hover:bg-stone-700 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-stone-200">
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
                        className="text-stone-600 hover:text-red-400 transition-colors text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {state.items.length > 0 && (
          <div className="border-t border-stone-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Subtotal</span>
              <span className="text-xl font-bold text-stone-100">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <Button variant="primary" size="lg" className="w-full">
              Checkout
            </Button>
            <Button variant="ghost" size="sm" className="w-full" onClick={clearCart}>
              Clear cart
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
