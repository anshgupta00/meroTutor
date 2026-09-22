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
        "inline-flex items-center gap-1 bg-green-50 text-green-700 rounded-full font-600 border border-green-200",
        size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1",
        className
      )}
    >
      <ShieldCheck className={cn(size === "sm" ? "h-3 w-3" : "h-4 w-4")} />
      Verified
    </span>
  );
}
