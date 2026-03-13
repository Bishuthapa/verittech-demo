import React from "react";
import { cn } from "@/lib/utils";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-amber-500 hover:bg-amber-400 text-stone-900 focus-visible:ring-amber-500 shadow-sm hover:shadow-md",
    secondary:
      "bg-stone-800 hover:bg-stone-700 text-stone-100 focus-visible:ring-stone-500",
    ghost:
      "bg-transparent hover:bg-stone-800 text-stone-300 hover:text-stone-100 focus-visible:ring-stone-500",
    danger:
      "bg-red-600 hover:bg-red-500 text-white focus-visible:ring-red-500",
    outline:
      "border border-stone-600 hover:border-amber-500 text-stone-300 hover:text-amber-400 bg-transparent focus-visible:ring-amber-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}


interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "amber" | "green" | "red";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-stone-700 text-stone-300",
    amber: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    green: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    red: "bg-red-500/20 text-red-400 border border-red-500/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}


export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin h-5 w-5 text-amber-500", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}


interface StarRatingProps {
  rate: number;
  count?: number;
  size?: "sm" | "md";
}

export function StarRating({ rate, count, size = "sm" }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rate);
    const partial = !filled && i < rate;
    return { filled, partial };
  });

  const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {stars.map((star, i) => (
          <svg
            key={i}
            className={cn(
              starSize,
              star.filled
                ? "text-amber-400"
                : star.partial
                ? "text-amber-400/60"
                : "text-stone-600"
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs text-stone-500">({count})</span>
      )}
    </div>
  );
}


interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-stone-800 flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-stone-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-stone-200 mb-1">{title}</h3>
      {description && (
        <p className="text-stone-500 text-sm max-w-xs mb-4">{description}</p>
      )}
      {action}
    </div>
  );
}


export function ErrorCard({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
      <p className="text-red-400 font-medium mb-1">Something went wrong</p>
      <p className="text-stone-400 text-sm mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
