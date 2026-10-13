"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Toast = { id: number; text: string; tone: "success" | "info" | "error" };

const listeners = new Set<(t: Toast) => void>();
let seq = 0;

/** Show a short confirmation from anywhere in the client tree. */
export function toast(text: string, tone: Toast["tone"] = "success") {
  const t = { id: ++seq, text, tone };
  listeners.forEach((l) => l(t));
}

/** Renders toasts raised with `toast()`. Mounted once in the root layout. */
export function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => {
    const add = (t: Toast) => {
      setItems((prev) => [...prev.slice(-2), t]);
      setTimeout(() => setItems((prev) => prev.filter((x) => x.id !== t.id)), 3200);
    };
    listeners.add(add);
    return () => {
      listeners.delete(add);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-6 left-1/2 z-[100] flex w-[calc(100%-2rem)] max-w-[420px] -translate-x-1/2 flex-col items-center gap-2"
    >
      {items.map((t) => (
        <p
          key={t.id}
          role="status"
          className={cn(
            "w-full rounded-lg border px-3 py-2.5 text-center text-[14px] leading-[20px] font-medium shadow-field",
            t.tone === "success" && "border-information-light bg-information-lighter text-information",
            t.tone === "info" && "border-brand-light bg-accent-lighter text-brand",
            t.tone === "error" && "border-error-light bg-error-lighter text-error",
          )}
        >
          {t.text}
        </p>
      ))}
    </div>
  );
}
