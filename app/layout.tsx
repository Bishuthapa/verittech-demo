import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/store/CartContext";
import { AuthProvider } from "@/store/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/cart/CartDrawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | FakeShop",
    default: "FakeShop — Modern E-Commerce",
  },
  description:
    "A full-featured e-commerce store built with Next.js, TypeScript, and the Fake Store API.",
  keywords: ["e-commerce", "shop", "products", "nextjs", "typescript"],
  openGraph: {
    type: "website",
    siteName: "FakeShop",
    title: "FakeShop — Modern E-Commerce",
    description: "Browse our curated collection of products.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-stone-950 text-stone-100 antialiased min-h-screen`}
      >
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>
            <footer className="border-t border-stone-800 mt-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-stone-600">
                © {new Date().getFullYear()} FakeShop — Built with Next.js &amp;{" "}
                <a
                  href="https://fakestoreapi.com"
                  className="hover:text-amber-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fake Store API
                </a>
              </div>
            </footer>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
