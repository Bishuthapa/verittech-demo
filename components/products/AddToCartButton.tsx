"use client";

import React, { useState } from "react";
import type { Product } from "@/types";
import { useCart } from "@/store/CartContext";
import { Button } from "@/components/ui";
import { formatPrice } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem, isInCart, getItemQuantity, toggleCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const inCart = isInCart(product.id);
  const cartQty = getItemQuantity(product.id);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-sm text-stone-400 font-medium">Quantity</label>
        <div className="flex items-center bg-stone-800 rounded-xl overflow-hidden border border-stone-700">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-100 hover:bg-stone-700 transition-colors text-lg"
          >
            −
          </button>
          <span className="w-12 text-center font-bold text-stone-100">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-100 hover:bg-stone-700 transition-colors text-lg"
          >
            +
          </button>
        </div>
        <span className="text-sm text-stone-500">
          = {formatPrice(product.price * qty)}
        </span>
      </div>

      <Button
        variant={added ? "secondary" : "primary"}
        size="lg"
        onClick={handleAdd}
        className="w-full"
      >
        {added ? (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Added to Cart!
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add {qty > 1 ? `${qty}x ` : ""}to Cart
          </>
        )}
      </Button>

      {inCart && (
        <button
          onClick={toggleCart}
          className="w-full flex items-center justify-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors py-2"
        >
          View cart ({cartQty} in cart) →
        </button>
      )}
    </div>
  );
}
