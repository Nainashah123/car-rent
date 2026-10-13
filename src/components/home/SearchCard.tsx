"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { IconCalendarDue, IconChevronDown, IconClock } from "@tabler/icons-react";
import { toast } from "@/components/app/Toaster";
import { Button } from "@/components/ui/Button";
import { FieldShell, boxClass, inputClass } from "@/components/ui/FormField";
import { CITIES } from "@/data/cars";
import {
  DEFAULT_DURATION,
  DRIVER_OPTIONS,
  DURATIONS,
  PICKUP_MODES,
  RENT_UNITS,
  type DriverOption,
  type PickupMode,
  type RentUnit,
} from "@/data/home";
import { cn } from "@/lib/cn";
import { cityError, compact, pickupTimeError, startDateError, todayISO } from "@/lib/validation";

type Errors = Partial<Record<"city" | "date" | "time", string>>;

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return todayISO(d);
}

/**
 * Figma "card booking" (63:11047 desktop 1134w / 63:11046 mobile 343w).
 * Validates, then routes to /cars with city / from / to (+ driver, time, unit, duration).
 */
export function SearchCard() {
  const router = useRouter();
  const [driver, setDriver] = useState<DriverOption>("with");
  const [mode, setMode] = useState<PickupMode>("scheduled");
  const [unit, setUnit] = useState<RentUnit>("hourly");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(DEFAULT_DURATION.hourly);
  const [durationTouched, setDurationTouched] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const radioName = useId();
  const listId = useId();
  const now = mode === "now";

  function pickMode(m: PickupMode) {
    setMode(m);
    setErrors((x) => ({ ...x, date: undefined, time: undefined }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const next = compact({
      city: cityError(city, CITIES),
      date: now ? undefined : startDateError(date),
      time: now ? undefined : pickupTimeError(time, date),
    });
    setErrors(next);
    if (Object.keys(next).length) return;

    const at = new Date();
    const from = now ? todayISO(at) : date;
    const hhmm = now ? `${String(at.getHours()).padStart(2, "0")}:${String(at.getMinutes()).padStart(2, "0")}` : time;
    let to = from;
    if (unit === "daily") to = addDays(from, duration);
    else {
      const [h, m] = hhmm.split(":").map(Number);
      if (h * 60 + m + duration * 60 >= 24 * 60) to = addDays(from, 1);
    }
    const match = CITIES.find((c) => c.toLowerCase() === city.trim().toLowerCase()) ?? city.trim();
    const qs = new URLSearchParams({ city: match, from, to, time: hhmm, driver, unit, duration: String(duration) });
    toast(`Showing available cars in ${match}`, "info");
    router.push(`/cars?${qs.toString()}`);
  }

  return (
    <form
      noValidate
      onSubmit={submit}
      aria-label="Find available car"
      className="relative flex w-full flex-col items-start gap-6 rounded-[24px] border border-neutral-100 bg-white p-4 drop-shadow-[0_8px_12px_rgb(0_0_0/0.06)] lg:w-[1134px] lg:gap-5 lg:rounded-[40px] lg:p-5 lg:drop-shadow-[0_12px_16px_rgb(0_0_0/0.06)]"
      data-home="card"
    >
      {/* Header */}
      <div className="flex w-full flex-col items-start gap-2 lg:px-4 lg:py-3">
        <h2 className="flex items-center font-display text-[18px] leading-[1.2] text-neutral-900 lg:text-[32px] lg:text-ink">
          Find available
          <Image src="/images/home/car-emoji.png" alt="" width={48} height={48} className="mx-[5px] -my-1 size-[26px] lg:mx-[9px] lg:-my-[5px] lg:size-12" />
          car
        </h2>
        <p className="text-[14px] leading-[1.2] text-neutral-400 lg:text-[16px] lg:leading-[1.4] lg:text-muted">
          Wherever you&apos;re headed #SafeWithCARENT
        </p>
      </div>

      <div className="flex w-full flex-col items-start gap-4 rounded-[12px] bg-white lg:gap-3 lg:p-2">
        {/* With / without driver */}
        <fieldset className="flex items-center gap-8 lg:h-[22px]">
          <legend className="sr-only">Driver</legend>
          {DRIVER_OPTIONS.map((o) => (
            <label key={o.value} className="flex cursor-pointer items-center gap-2.5">
              <input
                type="radio"
                name={radioName}
                value={o.value}
                checked={driver === o.value}
                onChange={() => setDriver(o.value)}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className="flex size-[18px] items-center justify-center rounded-full peer-focus-visible:ring-2 peer-focus-visible:ring-radio-on/40 lg:size-[22px]"
              >
                <span
                  className={cn(
                    "flex size-[13px] items-center justify-center rounded-full border-[0.9px] lg:size-4",
                    driver === o.value ? "border-radio-on" : "border-radio-off",
                  )}
                >
                  {driver === o.value && <span className="size-2 rounded-full bg-radio-on lg:size-2.5" />}
                </span>
              </span>
              <span className="text-[14px] leading-[1.2] font-medium text-black lg:text-[16px] lg:leading-[1.4]">{o.label}</span>
            </label>
          ))}
        </fieldset>

        {/* Scheduled / Pickup now */}
        <div role="radiogroup" aria-label="Pick-up time" className="flex w-full items-center gap-1 rounded-pill bg-neutral-50 p-1 lg:gap-2 lg:p-2">
          {PICKUP_MODES.map((m) => {
            const on = mode === m.value;
            return (
              <button
                key={m.value}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => pickMode(m.value)}
                className={cn(
                  "flex min-w-0 flex-1 items-center justify-center gap-2.5 py-1 pr-4 pl-3 text-[14px] leading-[1.4] font-medium text-ink transition-[background-color,box-shadow] lg:px-3.5 lg:py-1.5 lg:text-[16px]",
                  on ? "rounded-pill bg-white drop-shadow-[0_6px_4px_rgb(0_0_0/0.08)]" : "rounded-[8px] hover:bg-white/60",
                )}
              >
                <Image src={m.icon} alt="" width={32} height={32} className="size-6 lg:size-8" />
                {m.label}
              </button>
            );
          })}
        </div>

        <div className="flex w-full flex-col items-start gap-3 pt-3 lg:px-4 lg:pb-4">
          {/* Hourly / Daily */}
          <div role="radiogroup" aria-label="Rental unit" className="flex items-start gap-3">
            {RENT_UNITS.map((u) => {
              const on = unit === u.value;
              return (
                <button
                  key={u.value}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => {
                    setUnit(u.value);
                    setDuration(DEFAULT_DURATION[u.value]);
                    setDurationTouched(false);
                  }}
                  className="flex items-center"
                >
                  <span
                    className={cn(
                      "flex items-center justify-center rounded-[10px] border bg-white px-2.5 py-1.5 text-[12px] leading-[1.4] font-medium lg:rounded-[12px] lg:px-3 lg:py-2 lg:text-[16px]",
                      on ? "border-neutral-900 text-neutral-900" : "border-chip-stroke text-black hover:border-neutral-400 lg:text-neutral-400",
                    )}
                  >
                    {u.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex w-full flex-col items-start gap-3 lg:flex-row lg:gap-4">
            <Field label="City" id={`${listId}-city`} error={errors.city}>
              <input
                id={`${listId}-city`}
                list={listId}
                autoComplete="address-level2"
                placeholder="Yogyakarta"
                value={city}
                aria-invalid={errors.city ? true : undefined}
                aria-describedby={errors.city ? `${listId}-city-error` : undefined}
                onChange={(e) => {
                  setCity(e.target.value);
                  setErrors((x) => ({ ...x, city: undefined }));
                }}
                className={inputClass(errors.city)}
              />
              <datalist id={listId}>
                {CITIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </Field>

            <Field label="Start date" id={`${listId}-date`} error={errors.date}>
              <PickerInput
                id={`${listId}-date`}
                kind="date"
                value={now ? "" : date}
                placeholder={now ? "Today" : "DD/MM/YY"}
                disabled={now}
                error={errors.date}
                withMin
                onChange={(v) => {
                  setDate(v);
                  setErrors((x) => ({ ...x, date: undefined, time: undefined }));
                }}
                icon={<IconCalendarDue className="size-4 lg:size-5" stroke={1.5} />}
              />
            </Field>

            <Field label="Pick up" id={`${listId}-time`} error={errors.time}>
              <PickerInput
                id={`${listId}-time`}
                kind="time"
                value={now ? "" : time}
                placeholder={now ? "Now" : "09:00 AM"}
                disabled={now}
                error={errors.time}
                onChange={(v) => {
                  setTime(v);
                  setErrors((x) => ({ ...x, time: undefined }));
                }}
                icon={<IconClock className="size-4 lg:size-5" stroke={1.5} />}
              />
            </Field>

            <Field label="Duration" id={`${listId}-dur`}>
              <select
                id={`${listId}-dur`}
                value={duration}
                onChange={(e) => {
                  setDuration(Number(e.target.value));
                  setDurationTouched(true);
                }}
                data-untouched={durationTouched ? undefined : ""}
                className={cn(inputClass(), "h-full cursor-pointer appearance-none data-untouched:text-neutral-400")}
              >
                {DURATIONS[unit].map((d) => (
                  <option key={d.value} value={d.value} className="text-neutral-900">
                    {d.label}
                  </option>
                ))}
              </select>
              <IconChevronDown className="pointer-events-none size-4 shrink-0 text-neutral-900 lg:size-5" stroke={1.5} aria-hidden />
            </Field>

            <Button type="submit" variant="primary" size="auto" className="h-[38px] w-full lg:mt-[28.6px] lg:h-[53px] lg:w-[104px]">
              Search
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: ReactNode }) {
  return (
    <FieldShell label={label} htmlFor={id} error={error} className="min-w-0 lg:flex-1 [&>label]:leading-[1.2] lg:[&>label]:leading-[1.4]">
      <div className={boxClass(error, "justify-between")}>{children}</div>
    </FieldShell>
  );
}

/**
 * Date / time input that shows the Figma placeholder ("DD/MM/YY", "09:00 AM")
 * while empty, then switches to the native picker on focus.
 */
function PickerInput({
  id,
  kind,
  value,
  placeholder,
  disabled,
  error,
  withMin,
  onChange,
  icon,
}: {
  id: string;
  kind: "date" | "time";
  value: string;
  placeholder: string;
  disabled?: boolean;
  error?: string;
  withMin?: boolean;
  onChange: (v: string) => void;
  icon: ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  const native = focused || !!value;
  const open = (el: HTMLInputElement) => {
    try {
      el.showPicker?.();
    } catch {
      /* not allowed without a user gesture in some browsers */
    }
  };
  return (
    <>
      <input
        id={id}
        type={native ? kind : "text"}
        inputMode="none"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onFocus={(e) => {
          setFocused(true);
          const el = e.currentTarget;
          if (withMin) el.min = todayISO();
          requestAnimationFrame(() => open(el));
        }}
        onBlur={() => setFocused(false)}
        onClick={(e) => open(e.currentTarget)}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          inputClass(error),
          "h-full cursor-pointer disabled:cursor-not-allowed disabled:text-neutral-400 [&::-webkit-calendar-picker-indicator]:hidden",
        )}
      />
      <span aria-hidden className={cn("shrink-0", disabled ? "text-neutral-300" : "text-neutral-900")}>
        {icon}
      </span>
    </>
  );
}
