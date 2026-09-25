import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationBadgeProps {
  size?: "sm" | "md";
  className?: string;
}

export default function VerificationBadge({ size = "sm", className }: VerificationBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 rounded-full font-[700] border border-emerald-200/80",
        size === "sm" ? "text-xs px-2.5 py-0.5" : "text-sm px-3 py-1",
        className
      )}
    >
      <ShieldCheck className={cn("text-emerald-600", size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4")} />
      Verified
    </span>
  );
}
