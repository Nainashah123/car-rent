"use client";

import { useEffect, useRef, useState } from "react";
import { IconCheck, IconFilter2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";
import { SORT_OPTIONS, type SortKey } from "@/data/search";

/** Figma "Sort by" white button (233:43797) + dropdown of sort orders. */
export function SortMenu({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = SORT_OPTIONS.find((o) => o.value === value);

  return (
    <div ref={root} className="relative shrink-0">
      <Button
        variant="white"
        size="auto"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Sort by: ${current?.label ?? "Recommended"}`}
        onClick={() => setOpen((o) => !o)}
        className="h-[38px] lg:h-[46px]"
      >
        <IconFilter2 className="size-[18px] lg:size-5" stroke={1.5} aria-hidden />
        Sort by
      </Button>
      {open && (
        <div role="menu" aria-label="Sort cars" className="absolute top-[calc(100%+8px)] right-0 z-30 flex w-56 flex-col gap-0.5 rounded-[16px] border border-neutral-100 bg-white p-1.5 shadow-[0_8px_20px_0_rgb(0_0_0/0.08)]">
          {SORT_OPTIONS.map((o) => {
            const on = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                role="menuitemradio"
                aria-checked={on}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className="flex h-10 w-full items-center justify-between rounded-[10px] px-3 text-left text-[14px] leading-[1.4] text-neutral-900 hover:bg-neutral-50 lg:text-[16px]"
              >
                {o.label}
                {on && <IconCheck className="size-4" stroke={1.5} aria-hidden />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
