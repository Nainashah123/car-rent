"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Modal surface: bottom sheet below lg, centred dialog from lg (unless
 * `mobileOnly`). Esc and backdrop click close; body scroll is locked;
 * focus moves into the panel and back to the opener on close.
 */
export function Sheet({
  open,
  onClose,
  label,
  children,
  className,
  mobileOnly,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
  /** Hide the whole sheet (backdrop included) from lg up. */
  mobileOnly?: boolean;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className={cn("fixed inset-0 z-50 flex items-end justify-center lg:items-center", mobileOnly && "lg:hidden")}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={cn(
          "relative flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-t-[24px] bg-white outline-none lg:max-w-[480px] lg:rounded-[24px]",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
