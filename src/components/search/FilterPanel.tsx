"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { IconCheck, IconChevronDown, IconInfoCircle } from "@tabler/icons-react";
import { Chip } from "@/components/search/Chip";
import { PriceRange } from "@/components/search/PriceRange";
import type { SearchState } from "@/components/search/query";
import { Button } from "@/components/ui/Button";
import {
  CATEGORY_OPTIONS,
  EXTRA_CATEGORY_OPTIONS,
  FUEL_OPTIONS,
  SEAT_OPTIONS,
  TRANSMISSION_OPTIONS,
  YEAR_OPTIONS,
} from "@/data/search";
import { cn } from "@/lib/cn";

const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

function Section({ title, hint, children, aside }: { title: string; hint: string; children?: ReactNode; aside?: ReactNode }) {
  return (
    <section className={cn("flex w-full gap-4", aside ? "items-center justify-between" : "flex-col items-start")}>
      <div className="flex w-[195px] flex-col gap-2 text-[16px] leading-[1.4]">
        <h3 className="font-semibold text-ink">{title}</h3>
        <p className="text-[14px] text-neutral-500">{hint}</p>
      </div>
      {aside}
      {children}
    </section>
  );
}

/**
 * Figma filter sidebar (233:43684): header "Filter", sections, footer Reset / Show N.
 * Used as the desktop sidebar and inside the mobile bottom sheet.
 */
export function FilterPanel({
  state,
  update,
  reset,
  count,
  onShow,
  headerAction,
  collapsed = false,
  bodyId,
  className,
}: {
  state: SearchState;
  update: (patch: Partial<SearchState>) => void;
  reset: () => void;
  count: number;
  onShow: () => void;
  headerAction: ReactNode;
  collapsed?: boolean;
  bodyId?: string;
  className?: string;
}) {
  const categories = [...CATEGORY_OPTIONS, ...EXTRA_CATEGORY_OPTIONS.filter((o) => state.types.includes(o.value))];

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-[20px] border border-neutral-100 bg-white shadow-[0_8px_20px_0_rgb(0_0_0/0.05)]", className)}>
      <div className="flex h-[73px] shrink-0 items-center justify-between border-b border-neutral-100 px-5 lg:px-7">
        <h2 className="font-display text-[32px] leading-[1.2] text-ink">Filter</h2>
        {headerAction}
      </div>
      {!collapsed && (
        <>
          <div id={bodyId} className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto overscroll-contain border-b border-neutral-100 p-5 lg:p-7">
            <Section title="Price" hint="Trip price, including all costs">
              <PriceRange
                key={`${state.min}-${state.max}`}
                min={state.min}
                max={state.max}
                onCommit={(min, max) => update({ min, max })}
              />
            </Section>

            <Section title="Transmition" hint="Trip price, including all costs">
              <div className="flex w-full items-start gap-4">
                {TRANSMISSION_OPTIONS.map((o) => {
                  const on = state.tr.includes(o.value);
                  return (
                    <button
                      key={o.value}
                      type="button"
                      aria-pressed={on}
                      onClick={() => update({ tr: toggle(state.tr, o.value) })}
                      className={cn(
                        "flex h-[121px] min-w-0 flex-1 flex-col items-center gap-3 overflow-hidden rounded-[16px] border bg-white px-2 py-2 transition-colors lg:px-4",
                        on ? "border-neutral-900" : "border-transparent hover:border-chip-stroke",
                      )}
                    >
                      <span className="relative block size-[70px] shrink-0" aria-hidden>
                        <span
                          className="absolute top-1/2 left-1/2 block overflow-hidden"
                          style={{
                            width: o.box.w,
                            height: o.box.h,
                            transform: `translate(calc(-50% + ${o.box.dx}px), calc(-50% + ${o.box.dy}px))`,
                          }}
                        >
                          <span
                            className="absolute block"
                            style={{ left: `${o.crop.left}%`, top: `${o.crop.top}%`, width: `${o.crop.width}%`, height: `${o.crop.height}%` }}
                          >
                            <Image src={o.image} alt="" fill sizes="100px" className="object-fill" />
                          </span>
                        </span>
                      </span>
                      <span className="flex items-center justify-center gap-1.5 text-center text-[16px] leading-[1.4] font-medium text-black" title={o.hint}>
                        {o.label}
                        <IconInfoCircle className="size-[14.5px] shrink-0 text-neutral-400" stroke={1.5} aria-hidden />
                        <span className="sr-only">: {o.hint}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Section>

            <Section title="Passenger capacity" hint="Trip price, including all costs">
              <div className="flex flex-wrap items-start gap-3">
                {SEAT_OPTIONS.map((o) => (
                  <Chip key={o.value} label={o.label} active={state.seats.includes(o.value)} onToggle={() => update({ seats: toggle(state.seats, o.value) })} />
                ))}
              </div>
            </Section>

            <Section title="Category" hint="Trip price, including all costs">
              <div className="flex w-full flex-wrap items-start gap-3">
                {categories.map((o) => (
                  <Chip
                    key={o.value}
                    label={o.label}
                    icon={o.icon}
                    crop={o.crop}
                    active={state.types.includes(o.value)}
                    onToggle={() => update({ types: toggle(state.types, o.value) })}
                  />
                ))}
              </div>
            </Section>

            <Section title="Fuel type" hint="Trip price, including all costs">
              <div className="flex w-full flex-wrap items-start gap-3">
                {FUEL_OPTIONS.map((o) => (
                  <Chip key={o.value} label={o.label} icon={o.icon} active={state.fuel.includes(o.value)} onToggle={() => update({ fuel: toggle(state.fuel, o.value) })} />
                ))}
              </div>
            </Section>

            <Section
              title="Years"
              hint="Trip price, including all costs"
              aside={<YearSelect value={state.year} onChange={(year) => update({ year })} />}
            />
          </div>
          <div className="flex shrink-0 items-center justify-between bg-white px-5 py-4 lg:px-7">
            <Button variant="white" size="md" className="w-[100px]" onClick={reset}>
              Reset
            </Button>
            <Button variant="black" size="md" className="min-w-[100px]" onClick={onShow}>
              Show {count}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

/** "Years" dropdown: minimum model year. Listbox popover, Esc + outside click close. */
function YearSelect({ value, onChange }: { value?: number; onChange: (v?: number) => void }) {
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

  const options: { v?: number; label: string }[] = [{ label: "Any" }, ...YEAR_OPTIONS.map((y) => ({ v: y, label: String(y) }))];

  return (
    <div ref={root} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Minimum model year: ${value ?? "any"}`}
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 items-center justify-center gap-2.5 rounded-[12px] border border-chip-stroke bg-white px-4 text-[16px] leading-[1.4] font-medium text-black hover:border-neutral-300"
      >
        {value ?? "Any"}
        <IconChevronDown className={cn("size-[18px] transition-transform", open && "rotate-180")} stroke={1.5} aria-hidden />
      </button>
      {open && (
        <ul role="listbox" aria-label="Minimum model year" className="absolute right-0 bottom-[calc(100%+6px)] z-20 max-h-64 w-36 overflow-y-auto rounded-[12px] border border-neutral-100 bg-white p-1 shadow-[0_8px_20px_0_rgb(0_0_0/0.08)]">
          {options.map((o) => {
            const on = o.v === value;
            return (
              <li key={o.label}>
                <button
                  type="button"
                  role="option"
                  aria-selected={on}
                  onClick={() => {
                    onChange(o.v);
                    setOpen(false);
                  }}
                  className="flex h-9 w-full items-center justify-between rounded-[8px] px-3 text-left text-[14px] leading-[1.4] text-neutral-900 hover:bg-neutral-50"
                >
                  {o.v ? `${o.label} or newer` : "Any year"}
                  {on && <IconCheck className="size-4" stroke={1.5} aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

