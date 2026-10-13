"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { IconCalendarEvent, IconChevronDown, IconInfoCircle } from "@tabler/icons-react";
import { toast } from "@/components/app/Toaster";
import { Button } from "@/components/ui/Button";
import { FieldShell, boxClass, inputClass } from "@/components/ui/FormField";
import { DRIVER_FEE_PER_DAY, HOURLY_OPTIONS, HOURS_PER_DAY_RATE } from "@/data/carDetails";
import { formatPrice, type Car } from "@/data/cars";
import { addBooking } from "@/lib/bookings";
import { cn } from "@/lib/cn";
import { bookingPickupError, compact, rentalHoursError, returnDateError, todayISO } from "@/lib/validation";

type Mode = "hourly" | "daily";
type Errors = Partial<Record<"from" | "to" | "hours", string>>;

/* ---------- date helpers (local, ISO YYYY-MM-DD) ---------- */

function addDays(iso: string, n: number) {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + n);
  return todayISO(d);
}
function daysBetween(from: string, to: string) {
  return Math.round((Date.parse(`${to}T00:00:00`) - Date.parse(`${from}T00:00:00`)) / 86_400_000);
}
/** Figma shows dates as dd/mm/yy. */
function shortDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y.slice(2)}`;
}
function dayMonth(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

/** Today's date, client-only (empty during prerender so no stale date is baked into HTML). */
const noop = () => () => {};
function useToday() {
  return useSyncExternalStore(noop, () => todayISO(), () => "");
}

/** Pill date field (Figma "Form field" with calendar-event icon) over a native date input. */
function DateField({ label, value, min, error, onChange }: { label: string; value: string; min?: string; error?: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <FieldShell label={label} error={error} htmlFor={id} className="min-w-0 flex-1">
      <div className={boxClass(error, "relative justify-between")}>
        <span className={cn(inputClass(error), "pointer-events-none", !value && "text-neutral-400")}>{value ? shortDate(value) : "dd/mm/yy"}</span>
        <IconCalendarEvent className="pointer-events-none size-4 shrink-0 text-neutral-900 lg:size-5" stroke={1.5} aria-hidden />
        <input
          id={id}
          type="date"
          value={value}
          min={min}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => onChange(e.target.value)}
          onClick={(e) => {
            try {
              e.currentTarget.showPicker();
            } catch {}
          }}
          className="absolute inset-0 size-full cursor-pointer rounded-pill opacity-0"
        />
      </div>
    </FieldShell>
  );
}

function HoursField({ value, error, onChange }: { value: number; error?: string; onChange: (v: number) => void }) {
  const id = useId();
  return (
    <FieldShell label="Duration" error={error} htmlFor={id} className="min-w-0 flex-1">
      <div className={boxClass(error, "relative")}>
        <select
          id={id}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => onChange(Number(e.target.value))}
          className={cn(inputClass(error), "h-full cursor-pointer appearance-none pr-6")}
        >
          {HOURLY_OPTIONS.map((h) => (
            <option key={h} value={h}>
              {h} hours
            </option>
          ))}
        </select>
        <IconChevronDown className="pointer-events-none absolute right-[18px] size-4 text-neutral-900 lg:right-5 lg:size-5" stroke={1.5} aria-hidden />
      </div>
    </FieldShell>
  );
}

function Radio({ name, checked, onChange, children }: { name: string; checked: boolean; onChange: () => void; children: ReactNode }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-[16px] leading-[1.4] font-medium whitespace-nowrap text-black">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden
        className="flex size-[22px] shrink-0 items-center justify-center rounded-full peer-focus-visible:ring-2 peer-focus-visible:ring-radio-on/40"
      >
        <span className={cn("flex size-4 items-center justify-center rounded-full border-[0.9px]", checked ? "border-radio-on" : "border-radio-off")}>
          {checked && <span className="size-2.5 rounded-full bg-radio-on" />}
        </span>
      </span>
      {children}
    </label>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button type="button" aria-pressed={active} onClick={onClick} className="flex items-center">
      <span
        className={cn(
          "flex items-center justify-center rounded-[10px] border bg-white px-2.5 py-1.5 text-[12px] leading-[1.4] font-medium transition-colors lg:rounded-xl lg:px-3 lg:py-2 lg:text-[16px]",
          active ? "border-neutral-900 text-neutral-900" : "border-chip-stroke text-black hover:border-neutral-400 lg:text-neutral-400",
        )}
      >
        {children}
      </span>
    </button>
  );
}

/** Figma booking card (232:22783 desktop / 232:22845 mobile, component "card booking" 63:11048). */
export function BookingCard({ car, className }: { car: Car; className?: string }) {
  const router = useRouter();
  const today = useToday();
  const [withDriver, setWithDriver] = useState(true);
  const [mode, setMode] = useState<Mode>("daily");
  const [fromRaw, setFrom] = useState<string | null>(null);
  const [toRaw, setTo] = useState<string | null>(null);
  const [hours, setHours] = useState<number>(4);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);

  // Defaults: pick-up tomorrow, return 5 days later (until the user edits).
  const from = fromRaw ?? (today ? addDays(today, 1) : "");
  const to = toRaw ?? (today ? addDays(today, 6) : "");

  const days = from && to ? daysBetween(from, to) : 0;
  const dayRate = car.pricePerDay + (withDriver ? DRIVER_FEE_PER_DAY : 0);
  const hourRate = dayRate / HOURS_PER_DAY_RATE;
  const valid = mode === "daily" ? days >= 1 : Boolean(from);
  const total = mode === "daily" ? dayRate * Math.max(days, 0) : hourRate * hours;
  const unit = mode === "daily" ? `/${days} day${days === 1 ? "" : "s"}` : `/${hours} hours`;

  const refundBy = from && today ? (addDays(from, -2) < today ? today : addDays(from, -2)) : "";

  function clear(key: keyof Errors) {
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    const now = new Date();
    const next = compact(
      mode === "daily"
        ? { from: bookingPickupError(from, now), to: returnDateError(from, to) }
        : { from: bookingPickupError(from, now), hours: rentalHoursError(hours, HOURLY_OPTIONS) },
    );
    setErrors(next);
    if (Object.keys(next).length) {
      toast("Check the highlighted fields.", "error");
      return;
    }
    setBusy(true);
    const booking = addBooking({ carId: car.id, from, to: mode === "daily" ? to : from, total });
    toast(`Booking ${booking.code} created. Complete payment in your profile.`);
    router.push("/profile?tab=active");
  }

  return (
    <form
      noValidate
      onSubmit={submit}
      aria-label={`Book ${car.name}`}
      data-detail="booking"
      className={cn(
        "flex w-full flex-col items-start gap-6 rounded-[18px] border border-neutral-100 bg-white p-5 shadow-[0_12px_16px_rgb(0_0_0/0.06)] lg:gap-8 lg:rounded-[32px]",
        className,
      )}
    >
      <p className="flex items-center gap-1.5 rounded bg-neutral-100 px-1.5 py-0.5 text-[12px] leading-[1.4] font-medium text-neutral-500 lg:gap-2.5 lg:rounded-md lg:px-2 lg:py-1 lg:text-[14px] lg:font-normal">
        <IconInfoCircle className="size-[14.5px] shrink-0 lg:size-[18px]" stroke={1.5} aria-hidden />
        {refundBy ? `Full refund if cancellation before ${dayMonth(refundBy)}` : "Full refund if cancelled 2 days before pick-up"}
      </p>

      <div className="flex w-full flex-col items-start gap-6">
        <fieldset className="flex items-center gap-8">
          <legend className="sr-only">Driver</legend>
          <Radio name={`${car.id}-driver`} checked={withDriver} onChange={() => setWithDriver(true)}>
            With driver
          </Radio>
          <Radio name={`${car.id}-driver`} checked={!withDriver} onChange={() => setWithDriver(false)}>
            Without driver
          </Radio>
        </fieldset>

        <div role="group" aria-label="Rental type" className="flex items-start gap-3">
          <Chip
            active={mode === "hourly"}
            onClick={() => {
              setMode("hourly");
              setErrors({});
            }}
          >
            Hourly
          </Chip>
          <Chip
            active={mode === "daily"}
            onClick={() => {
              setMode("daily");
              setErrors({});
            }}
          >
            Daily
          </Chip>
        </div>

        <div className="flex w-full flex-col gap-5 lg:flex-row lg:items-start">
          <DateField
            label="Pick up date"
            value={from}
            min={today || undefined}
            error={errors.from}
            onChange={(v) => {
              setFrom(v);
              clear("from");
              clear("to");
            }}
          />
          {mode === "daily" ? (
            <DateField
              label="Return date"
              value={to}
              min={from ? addDays(from, 1) : today || undefined}
              error={errors.to}
              onChange={(v) => {
                setTo(v);
                clear("to");
              }}
            />
          ) : (
            <HoursField
              value={hours}
              error={errors.hours}
              onChange={(v) => {
                setHours(v);
                clear("hours");
              }}
            />
          )}
        </div>
      </div>

      <div className="flex w-full items-center justify-between gap-3 whitespace-nowrap">
        <p className="text-[14px] leading-[1.2] text-black lg:text-[16px] lg:leading-[1.4]">Estimated total</p>
        <p className="flex items-end gap-3" aria-live="polite">
          <span data-detail="total" className="font-display text-[18px] leading-[1.2] text-black lg:text-[32px]">
            {formatPrice(valid ? total : dayRate)}
          </span>
          <span className="text-[14px] leading-[1.4] font-medium text-neutral-400">{valid ? unit : "/day"}</span>
        </p>
      </div>

      <div className="flex w-full flex-col gap-4">
        <Button type="submit" variant="primary" className="w-full" disabled={busy}>
          Booking now
        </Button>
        <p className="text-center text-[12px] leading-[1.4] text-neutral-400 lg:hidden">
          By submitting this form, you agree to our{" "}
          <Link href="/terms" className="underline-offset-2 hover:underline">
            terms
          </Link>
          . You can opt-out anytime.
        </p>
      </div>
      <p className="hidden w-full text-center text-[14px] leading-[1.4] text-neutral-400 lg:block">
        By booking, you agree to our{" "}
        <Link href="/terms" className="hover:text-neutral-900 hover:underline">
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="hover:text-neutral-900 hover:underline">
          Privacy Policy
        </Link>
      </p>
    </form>
  );
}
