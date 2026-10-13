"use client";

import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { FieldShell, boxClass, inputClass } from "@/components/ui/FormField";
import { PRICE_CEIL, PRICE_DEFAULT_MAX, PRICE_HISTOGRAM, PRICE_STEP } from "@/data/search";
import { cn } from "@/lib/cn";
import { priceFieldError, priceRangeError } from "@/lib/validation";

type Thumb = "min" | "max";
const BARS = PRICE_HISTOGRAM.length;
const show = (v: number, def: number) => (v === def ? "" : `$${v}`);

/**
 * Figma "Price" block: histogram (30 bars, primary inside the range, neutral-200
 * outside), 2px track, two 18px thumbs, then $min / $max pill fields.
 * Remount with a new `key` when the committed range changes from outside.
 */
export function PriceRange({ min, max, onCommit }: { min: number; max: number; onCommit: (min: number, max: number) => void }) {
  const [lo, setLo] = useState(min);
  const [hi, setHi] = useState(max);
  const [loText, setLoText] = useState(show(min, 0));
  const [hiText, setHiText] = useState(show(max, PRICE_DEFAULT_MAX));
  const [error, setError] = useState<string>();
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<Thumb | null>(null);
  const uid = useId();

  function set(which: Thumb, v: number) {
    const value = Math.round(Math.min(PRICE_CEIL, Math.max(0, v)) / PRICE_STEP) * PRICE_STEP;
    setError(undefined);
    if (which === "min") {
      const n = Math.min(value, hi);
      setLo(n);
      setLoText(show(n, 0));
      return [n, hi] as const;
    }
    const n = Math.max(value, lo);
    setHi(n);
    setHiText(show(n, PRICE_DEFAULT_MAX));
    return [lo, n] as const;
  }

  function valueAt(clientX: number) {
    const r = track.current!.getBoundingClientRect();
    const usable = r.width - 18;
    return ((clientX - r.left - 9) / usable) * PRICE_CEIL;
  }

  function onDown(e: PointerEvent<HTMLDivElement>) {
    const v = valueAt(e.clientX);
    const which: Thumb = Math.abs(v - lo) <= Math.abs(v - hi) && !(lo === hi && v > hi) ? "min" : "max";
    drag.current = which;
    e.currentTarget.setPointerCapture(e.pointerId);
    set(which, v);
  }
  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (drag.current) set(drag.current, valueAt(e.clientX));
  }
  function onUp() {
    if (!drag.current) return;
    drag.current = null;
    onCommit(lo, hi);
  }

  function onKey(which: Thumb, e: KeyboardEvent) {
    const cur = which === "min" ? lo : hi;
    const delta: Record<string, number> = { ArrowLeft: -PRICE_STEP, ArrowDown: -PRICE_STEP, ArrowRight: PRICE_STEP, ArrowUp: PRICE_STEP, PageDown: -100, PageUp: 100 };
    let next: number | undefined;
    if (e.key in delta) next = cur + delta[e.key];
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = PRICE_CEIL;
    if (next === undefined) return;
    e.preventDefault();
    const [a, b] = set(which, next);
    onCommit(a, b);
  }

  function commitFields() {
    const err = priceFieldError(loText, PRICE_CEIL) ?? priceFieldError(hiText, PRICE_CEIL);
    if (err) return setError(err);
    const a = loText.trim() ? Number(loText.trim().replace(/^\$/, "")) : 0;
    const b = hiText.trim() ? Number(hiText.trim().replace(/^\$/, "")) : PRICE_DEFAULT_MAX;
    const rangeErr = priceRangeError(a, b);
    if (rangeErr) return setError(rangeErr);
    setLo(a);
    setHi(b);
    if (a !== min || b !== max) onCommit(a, b);
  }

  const pct = (v: number) => v / PRICE_CEIL;
  const pos = (v: number) => `calc(${pct(v)} * (100% - 18px) + 9px)`;

  return (
    <div className="flex w-full flex-col gap-4">
      <div
        ref={track}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="relative h-[60px] w-full cursor-pointer touch-none select-none"
      >
        <div className="flex h-[51px] w-full items-end gap-1" aria-hidden>
          {PRICE_HISTOGRAM.map((h, i) => {
            const start = (i / BARS) * PRICE_CEIL;
            const end = ((i + 1) / BARS) * PRICE_CEIL;
            const inside = start >= lo - PRICE_STEP && end <= hi + PRICE_STEP / 2;
            return <span key={i} className={cn("min-w-px flex-1", inside ? "bg-primary-500" : "bg-neutral-200")} style={{ height: h }} />;
          })}
        </div>
        <div className="relative h-0.5 w-full overflow-hidden bg-neutral-200" aria-hidden>
          <span className="absolute inset-y-0 bg-primary-500" style={{ left: pos(lo), right: `calc(100% - ${pos(hi)})` }} />
          {lo === 0 && <span className="absolute inset-y-0 left-0 w-[9px] bg-primary-500" />}
        </div>
        {(["min", "max"] as const).map((which) => {
          const v = which === "min" ? lo : hi;
          return (
            <span
              key={which}
              role="slider"
              tabIndex={0}
              aria-label={which === "min" ? "Minimum price per day" : "Maximum price per day"}
              aria-valuemin={which === "min" ? 0 : lo}
              aria-valuemax={which === "min" ? hi : PRICE_CEIL}
              aria-valuenow={v}
              aria-valuetext={`$${v}`}
              onKeyDown={(e) => onKey(which, e)}
              className="group absolute top-[51px] flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center outline-none lg:size-[18px]"
              style={{ left: pos(v), zIndex: which === "min" && lo >= PRICE_CEIL - 100 ? 2 : 1 }}
            >
              <span className="block size-[18px] rounded-full border border-stroke bg-white shadow-[0_2px_6px_0_rgb(0_0_0/0.16)] group-focus-visible:ring-2 group-focus-visible:ring-neutral-900" />
            </span>
          );
        })}
      </div>
      <FieldShell htmlFor={`${uid}-min`} error={error}>
        <div className="flex w-full items-center gap-7">
          {(
            [
              [`${uid}-min`, "Minimum price", "$0", loText, setLoText],
              [`${uid}-max`, "Maximum price", `$${PRICE_DEFAULT_MAX}`, hiText, setHiText],
            ] as const
          ).map(([id, label, ph, value, setValue]) => (
            <div key={id} className={boxClass(error, "min-w-0 flex-1")}>
              <input
                id={id}
                aria-label={label}
                inputMode="numeric"
                placeholder={ph}
                value={value}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${uid}-min-error` : undefined}
                onChange={(e) => {
                  setValue(e.target.value);
                  setError(undefined);
                }}
                onBlur={commitFields}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    commitFields();
                  }
                }}
                className={inputClass(error)}
              />
            </div>
          ))}
        </div>
      </FieldShell>
    </div>
  );
}
