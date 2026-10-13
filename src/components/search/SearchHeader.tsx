"use client";

import Link from "next/link";
import { Fragment, useState, type FormEvent } from "react";
import { IconChevronDown, IconChevronRight, IconPencil, IconSearch, IconUserKey, IconX } from "@tabler/icons-react";
import { toast } from "@/components/app/Toaster";
import { durationLabel, formatDate, rentTitle, tripDays, type SearchState, tripOf } from "@/components/search/query";
import { Sheet } from "@/components/search/Sheet";
import { Button } from "@/components/ui/Button";
import { FieldShell, TextField, boxClass, inputClass } from "@/components/ui/FormField";
import { CITIES } from "@/data/cars";
import { DRIVER_LABEL, type Driver } from "@/data/search";
import { cn } from "@/lib/cn";
import { compact, keywordError, pickupDateError, returnDateError, tripCityError } from "@/lib/validation";

export type TripPatch = Pick<SearchState, "city" | "from" | "to" | "driver" | "q">;

/** Figma "Frame 37" (233:43664) / mobile "Frame 585" (233:46581): breadcrumb + trip summary + Edit. */
export function SearchHeader({
  state,
  crumb,
  title,
  onTrip,
}: {
  state: SearchState;
  crumb: string;
  /** Overrides the rent title (Promo). */
  title?: string;
  onTrip: (patch: TripPatch) => void;
}) {
  const [editing, setEditing] = useState(false);
  const trip = tripOf(state);
  const days = tripDays(trip.from, trip.to);
  const items = [trip.city, formatDate(trip.from), durationLabel(days)];
  if (state.q) items.unshift(`“${state.q}”`);

  return (
    <section className="flex flex-col items-center gap-10 px-4 pt-10 pb-4 lg:px-[60px] lg:pt-[60px]">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 text-[12px] leading-[1.4] font-medium lg:gap-3 lg:text-[16px] lg:leading-[22px]">
          <li>
            <Link href="/" className="text-neutral-400 hover:text-neutral-900">
              Home
            </Link>
          </li>
          <li aria-hidden>
            <IconChevronRight className="size-3.5 text-neutral-900 lg:size-[16.33px]" stroke={1.5} />
          </li>
          <li aria-current="page" className="text-neutral-900">
            {crumb}
          </li>
        </ol>
      </nav>
      <div className="flex w-full flex-col items-center justify-center gap-5 rounded-[24px] lg:w-auto lg:px-10 lg:py-5">
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-display text-[18px] leading-[1.2] text-ink lg:text-[32px]">{title ?? rentTitle(days)}</h1>
          <p className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[12px] leading-[1.4] text-neutral-400 lg:text-[16px] lg:leading-[22px]">
            {items.map((t) => (
              <Fragment key={t}>
                <span className="whitespace-nowrap">{t}</span>
                <span className="size-[2.5px] rounded-full bg-neutral-400 lg:size-1" aria-hidden />
              </Fragment>
            ))}
            <span className="flex items-center gap-2 whitespace-nowrap">
              <IconUserKey className="size-3.5 lg:size-[16.33px]" stroke={1.5} aria-hidden />
              {DRIVER_LABEL[trip.driver]}
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditing(true)}
          aria-haspopup="dialog"
          className="flex items-center justify-center gap-1.5 border-b border-neutral-900 px-1.5 py-1 text-[14px] leading-[1.2] font-medium text-neutral-900 hover:opacity-70 lg:gap-2 lg:text-[16px] lg:leading-[1.4]"
        >
          <IconPencil className="size-[18px] lg:size-5" stroke={1.5} aria-hidden />
          Edit
        </button>
      </div>
      <Sheet open={editing} onClose={() => setEditing(false)} label="Edit your trip">
        {editing && (
          <TripForm
            initial={{ ...trip, q: state.q ?? "" }}
            onCancel={() => setEditing(false)}
            onSubmit={(patch) => {
              onTrip(patch);
              setEditing(false);
              toast("Search updated");
            }}
          />
        )}
      </Sheet>
    </section>
  );
}

type Errors = Partial<Record<"city" | "from" | "to" | "q", string>>;

function TripForm({
  initial,
  onCancel,
  onSubmit,
}: {
  initial: { city: string; from: string; to: string; driver: Driver; q: string };
  onCancel: () => void;
  onSubmit: (patch: TripPatch) => void;
}) {
  const [v, setV] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});

  function set<K extends keyof typeof v>(k: K, value: (typeof v)[K]) {
    setV((x) => ({ ...x, [k]: value }));
    setErrors((e) => ({ ...e, [k]: undefined, ...(k === "from" ? { to: undefined } : {}) }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const next = compact({
      city: tripCityError(v.city),
      from: pickupDateError(v.from),
      to: returnDateError(v.from, v.to),
      q: keywordError(v.q),
    });
    setErrors(next);
    if (Object.keys(next).length) return;
    onSubmit({ city: v.city, from: v.from, to: v.to, driver: v.driver, q: v.q.trim() || undefined });
  }

  return (
    <form noValidate onSubmit={submit} className="flex min-h-0 flex-col">
      <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 lg:px-7">
        <h2 className="font-display text-[24px] leading-[1.2] text-ink">Edit your trip</h2>
        <button type="button" aria-label="Close" onClick={onCancel} className="flex size-9 items-center justify-center rounded-pill hover:bg-neutral-50">
          <IconX className="size-5" stroke={1.5} />
        </button>
      </div>
      <div className="flex min-h-0 flex-col gap-4 overflow-y-auto px-5 py-5 lg:px-7">
        <FieldShell label="Pick-up city" htmlFor="trip-city" error={errors.city}>
          <div className={boxClass(errors.city, "relative")}>
            <select
              id="trip-city"
              value={v.city}
              onChange={(e) => set("city", e.target.value)}
              aria-invalid={errors.city ? true : undefined}
              aria-describedby={errors.city ? "trip-city-error" : undefined}
              className={cn(inputClass(errors.city), "appearance-none pr-6")}
            >
              <option value="">Select a city</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <IconChevronDown className="pointer-events-none absolute right-5 size-4 text-neutral-900" stroke={1.5} aria-hidden />
          </div>
        </FieldShell>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField label="Pick-up date" id="trip-from" type="date" value={v.from} error={errors.from} onChange={(e) => set("from", e.target.value)} />
          <TextField label="Return date" id="trip-to" type="date" value={v.to} min={v.from || undefined} error={errors.to} onChange={(e) => set("to", e.target.value)} />
        </div>
        <fieldset className="flex flex-col gap-2.5">
          <legend className="mb-2.5 text-[14px] leading-[1.4] font-medium text-black">Driver</legend>
          <div role="radiogroup" aria-label="Driver" className="flex gap-3">
            {(["without", "with"] as const).map((d) => (
              <button
                key={d}
                type="button"
                role="radio"
                aria-checked={v.driver === d}
                onClick={() => set("driver", d)}
                className={cn(
                  "flex h-10 flex-1 items-center justify-center gap-2 rounded-[12px] border bg-white px-3 text-[14px] leading-[1.4] font-medium lg:text-[16px]",
                  v.driver === d ? "border-neutral-900 text-neutral-900" : "border-chip-stroke text-black hover:border-neutral-300",
                )}
              >
                <IconUserKey className="size-4" stroke={1.5} aria-hidden />
                {DRIVER_LABEL[d]}
              </button>
            ))}
          </div>
        </fieldset>
        <TextField
          label="Keyword (optional)"
          id="trip-q"
          placeholder="Brand, model or type"
          value={v.q}
          error={errors.q}
          onChange={(e) => set("q", e.target.value)}
          leftIcon={<IconSearch className="size-4 shrink-0 text-neutral-400" stroke={1.5} aria-hidden />}
        />
      </div>
      <div className="flex items-center justify-end gap-3 border-t border-neutral-100 px-5 py-4 lg:px-7">
        <Button variant="white" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="black">
          Apply search
        </Button>
      </div>
    </form>
  );
}
