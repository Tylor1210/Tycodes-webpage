import { ArrowRight } from "lucide-react";
import { BOOKING_URL, CTA_LONG } from "@/lib/constants";

interface BookButtonProps {
  analyticsId: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "inverse";
  className?: string;
  arrow?: boolean;
}

const sizes = {
  sm: "whitespace-nowrap px-3.5 py-2 text-sm",
  md: "px-5 py-3 text-center text-sm",
  lg: "px-6 py-3.5 text-center text-base",
};

const variants = {
  solid: "bg-brand-700 text-white hover:bg-brand-800",
  outline: "border border-brand-700 text-brand-700 hover:bg-brand-50",
  inverse: "bg-white text-brand-800 hover:bg-brand-50",
};

// All booking buttons link to the same calendar. Plain anchor, no JS needed.
export default function BookButton({
  analyticsId,
  label = CTA_LONG,
  size = "md",
  variant = "solid",
  className = "",
  arrow = true,
}: BookButtonProps) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics-id={analyticsId}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {label}
      {arrow && <ArrowRight size={size === "lg" ? 18 : 16} aria-hidden />}
    </a>
  );
}
