"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/store/AuthContext";
import { Button } from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, auth } = useAuth();

  const [form, setForm] = useState({ username: "", password: "" });
  const [localError, setLocalError] = useState<string | null>(null);

  if (auth.isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-xl text-stone-200 mb-4">
            You&apos;re already signed in as{" "}
            <span className="text-amber-400 font-bold">{auth.username}</span>
          </p>
          <Link href="/products">
            <Button variant="primary">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!form.username || !form.password) {
      setLocalError("Please fill in all fields.");
      return;
    }
    try {
      await login(form);
      router.push("/products");
    } catch {
      // Error handled by context
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-stone-100">Welcome back</h1>
            <p className="text-stone-500 text-sm mt-1">Sign in to your FakeShop account</p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
            <p className="text-xs text-amber-400 font-semibold uppercase tracking-wide mb-2">
              Demo Credentials
            </p>
            <div className="text-xs text-stone-400 space-y-1">
              <p>Username: <span className="text-stone-200 font-mono">mor_2314</span></p>
              <p>Password: <span className="text-stone-200 font-mono">83r5^_</span></p>
            </div>
          </div>

          {displayError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-red-400 text-sm">{displayError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-stone-400 mb-1.5"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl px-4 py-3 text-stone-100 placeholder:text-stone-600 focus:outline-none transition-colors text-sm"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-stone-400 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl px-4 py-3 text-stone-100 placeholder:text-stone-600 focus:outline-none transition-colors text-sm"
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              {isLoading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-stone-600 mt-6">
          <Link href="/products" className="text-stone-500 hover:text-amber-400 transition-colors">
            Continue without signing in →
          </Link>
        </p>
      </div>
    </div>
  );
}
