import Link from "next/link";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-black text-stone-800 select-none mb-4">404</p>
        <h1 className="text-3xl font-extrabold text-stone-100 mb-2">Page not found</h1>
        <p className="text-stone-500 mb-8">The page you're looking for doesn't exist.</p>
        <Link href="/">
          <Button variant="primary" size="lg">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
