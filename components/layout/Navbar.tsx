"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/store/CartContext";
import { useAuth } from "@/store/AuthContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { toggleCart, totalItems } = useCart();
  const { auth, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/cart", label: "Cart" },
  ];

  return (
    <header className="sticky top-0 z-30 bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-lg font-extrabold tracking-tight text-stone-100 group-hover:text-amber-400 transition-colors">
              FakeShop
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === href
                    ? "text-amber-400 bg-amber-500/10"
                    : "text-stone-400 hover:text-stone-100 hover:bg-stone-800"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {auth.isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-stone-400">
                  Hi, <span className="text-stone-200 font-medium">{auth.username}</span>
                </span>
                <button
                  onClick={logout}
                  className="text-sm text-stone-500 hover:text-stone-300 transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:flex items-center text-sm text-stone-400 hover:text-amber-400 transition-colors font-medium"
              >
                Sign in
              </Link>
            )}

            <button
              onClick={toggleCart}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-400 transition-all"
              aria-label={`Open cart (${totalItems} items)`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[1.2rem] h-5 px-1 bg-amber-500 text-stone-900 text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-stone-800 bg-stone-950 px-4 py-3 space-y-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                pathname === href
                  ? "text-amber-400 bg-amber-500/10"
                  : "text-stone-400 hover:text-stone-100 hover:bg-stone-800"
              )}
            >
              {label}
            </Link>
          ))}
          {auth.isAuthenticated ? (
            <button
              onClick={() => { logout(); setMobileOpen(false); }}
              className="block w-full text-left px-4 py-2.5 rounded-lg text-sm text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
            >
              Sign out ({auth.username})
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
