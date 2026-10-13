import type { ReactNode } from "react";
import type { TagTone } from "@/data/cars";
import { cn } from "@/lib/cn";

/** Figma "Label tag" (60:4207). Desktop 14px / 6px radius, mobile 12px / 4px. */
const tones: Record<TagTone, string> = {
  blue: "bg-primary-50 text-primary-500",
  grey: "bg-neutral-100 text-neutral-900",
  green: "bg-success-50 text-success-600",
  red: "bg-danger-50 text-danger",
  yellow: "bg-warning-50 text-warning-600",
};

export function Tag({ tone, children, size = "auto", className }: { tone: TagTone; children: ReactNode; size?: "md" | "sm" | "auto"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1.5 font-medium whitespace-nowrap",
        size === "md" && "rounded-md px-2 py-1 text-[14px] leading-[1.4]",
        size === "sm" && "rounded px-1.5 py-0.5 text-[12px] leading-[1.4]",
        size === "auto" && "rounded px-1.5 py-0.5 text-[12px] leading-[1.4] lg:rounded-md lg:px-2 lg:py-1 lg:text-[14px]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
