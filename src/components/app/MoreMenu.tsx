"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type MoreItem =
  | { label: string; href: string; danger?: boolean }
  | { label: string; onSelect: () => void; danger?: boolean };

/** The ⋮ button used in page headers, with a small dropdown of actions. */
export function MoreMenu({ items, className }: { items: MoreItem[]; className?: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative shrink-0">
      <button
        type="button"
        aria-label="More actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-stroke-primary bg-white p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
          className,
        )}
      >
        <Image src="/icons/action/more-vertical.svg" alt="" width={20} height={20} aria-hidden />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute top-[calc(100%+6px)] right-0 z-50 flex w-[200px] flex-col gap-0.5 rounded-lg bg-surface p-1 [box-shadow:0_4px_104px_0_rgb(199_199_199/0.55)]"
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                if ("href" in item) router.push(item.href);
                else item.onSelect();
              }}
              className={cn(
                "flex h-9 w-full cursor-pointer items-center rounded-sm px-2.5 text-left text-[14px] leading-[20px] font-medium hover:bg-surface-neutral",
                item.danger ? "text-error" : "text-text-primary",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
