import Link from "next/link";
import { getCategories } from "@/lib/services";

export default async function HomePage() {
  const categories = await getCategories().catch(() => []);

  const categoryIcons: Record<string, string> = {
    electronics: "💻",
    jewelery: "💎",
    "men's clothing": "👔",
    "women's clothing": "👗",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="py-24 md:py-32 text-center relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 text-amber-400 text-sm font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          New arrivals every week
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-stone-50 leading-none mb-6">
          Shop the
          <span className="text-amber-400"> latest</span>
          <br />
          trends
        </h1>

        <p className="text-xl text-stone-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover the latest products across electronics, fashion, jewellery and more.
          Built with Next.js &amp; TypeScript.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-8 py-3.5 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:-translate-y-0.5"
          >
            Browse Products
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-stone-100 font-medium px-8 py-3.5 rounded-xl transition-all"
          >
            Sign in
          </Link>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="pb-24">
          <h2 className="text-2xl font-bold text-stone-100 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                className="group flex flex-col items-center gap-4 p-6 bg-stone-900 border border-stone-800 rounded-2xl hover:border-amber-500/40 hover:bg-stone-800/50 transition-all hover:-translate-y-0.5"
              >
                <span className="text-4xl">{categoryIcons[cat] ?? "🛍️"}</span>
                <span className="text-sm font-medium text-stone-300 group-hover:text-amber-400 capitalize transition-colors text-center">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="pb-24 grid md:grid-cols-3 gap-6">
        {[
          {
            icon: "🚀",
            title: "Server-Side Rendering",
            desc: "Products fetched at server time for instant first paint and SEO.",
          },
          {
            icon: "🔍",
            title: "Smart Filtering",
            desc: "Filter by category, price range, and keyword — synced to the URL.",
          },
          {
            icon: "🛒",
            title: "Persistent Cart",
            desc: "Cart state lives in localStorage via React Context — no backend needed.",
          },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            className="p-6 bg-stone-900 border border-stone-800 rounded-2xl"
          >
            <div className="text-3xl mb-3">{icon}</div>
            <h3 className="font-bold text-stone-100 mb-2">{title}</h3>
            <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
