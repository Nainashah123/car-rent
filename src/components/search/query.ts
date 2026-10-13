/**
 * URL <-> search state for /cars and /promo, plus the pure filter/sort.
 * Params: city, type (categories, comma list), q, from, to, driver,
 * tr (transmissions), seats, fuel, year (min), min, max ($/day), sort, page.
 */
import { CARS, type Car, type CarCategory, type Transmission } from "@/data/cars";
import {
  DEFAULT_TRIP,
  KNOWN_FUELS,
  PAGE_SIZE,
  PRICE_CEIL,
  PRICE_DEFAULT_MAX,
  SEAT_OPTIONS,
  SORT_OPTIONS,
  type Driver,
  type FuelValue,
  type SeatsValue,
  type SortKey,
} from "@/data/search";

export type SearchState = {
  city?: string;
  q?: string;
  from?: string;
  to?: string;
  driver?: Driver;
  types: CarCategory[];
  tr: Transmission[];
  seats: SeatsValue[];
  fuel: FuelValue[];
  year?: number;
  min: number;
  max: number;
  sort: SortKey;
  page: number;
};

type Params = { get(name: string): string | null };

const list = <T extends string>(v: string | null, allowed: readonly string[]) =>
  (v ? v.split(",").filter((x) => allowed.includes(x)) : []) as T[];

const CATEGORIES: CarCategory[] = ["Sedan", "SUV", "MPV", "Bus", "Minibus", "Sport"];
const TRANSMISSIONS: Transmission[] = ["CVT", "AT", "MT"];
const SEATS: SeatsValue[] = ["4", "5-6", "7+"];
const FUELS: FuelValue[] = [...KNOWN_FUELS, "Other"];
const ISO = /^\d{4}-\d{2}-\d{2}$/;

function int(v: string | null, fallback: number, lo: number, hi: number) {
  const n = v === null || v === "" ? NaN : Number(v);
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, Math.round(n))) : fallback;
}

export function parseSearch(p: Params): SearchState {
  // Home sends ?type=SUV (any case); accept case-insensitively.
  const rawType = p.get("type");
  const types = rawType
    ? (rawType.split(",").map((t) => CATEGORIES.find((c) => c.toLowerCase() === t.trim().toLowerCase())).filter(Boolean) as CarCategory[])
    : [];
  const sort = p.get("sort");
  const year = p.get("year");
  const from = p.get("from");
  const to = p.get("to");
  const driver = p.get("driver");
  const min = int(p.get("min"), 0, 0, PRICE_CEIL);
  const max = int(p.get("max"), PRICE_DEFAULT_MAX, 0, PRICE_CEIL);
  return {
    city: p.get("city")?.trim() || undefined,
    q: p.get("q")?.trim() || undefined,
    from: from && ISO.test(from) ? from : undefined,
    to: to && ISO.test(to) ? to : undefined,
    driver: driver === "with" || driver === "without" ? driver : undefined,
    types,
    tr: list<Transmission>(p.get("tr"), TRANSMISSIONS),
    seats: list<SeatsValue>(p.get("seats"), SEATS),
    fuel: list<FuelValue>(p.get("fuel"), FUELS),
    year: year && /^\d{4}$/.test(year) ? Number(year) : undefined,
    min: Math.min(min, max),
    max: Math.max(min, max),
    sort: SORT_OPTIONS.some((o) => o.value === sort) ? (sort as SortKey) : "recommended",
    page: int(p.get("page"), 1, 1, 999),
  };
}

/** Serialises only non-default values so URLs stay short. */
export function toQuery(s: SearchState) {
  const q = new URLSearchParams();
  if (s.city) q.set("city", s.city);
  if (s.q) q.set("q", s.q);
  if (s.from) q.set("from", s.from);
  if (s.to) q.set("to", s.to);
  if (s.driver) q.set("driver", s.driver);
  if (s.types.length) q.set("type", s.types.join(","));
  if (s.tr.length) q.set("tr", s.tr.join(","));
  if (s.seats.length) q.set("seats", s.seats.join(","));
  if (s.fuel.length) q.set("fuel", s.fuel.join(","));
  if (s.year) q.set("year", String(s.year));
  if (s.min > 0) q.set("min", String(s.min));
  if (s.max !== PRICE_DEFAULT_MAX) q.set("max", String(s.max));
  if (s.sort !== "recommended") q.set("sort", s.sort);
  if (s.page > 1) q.set("page", String(s.page));
  const str = q.toString();
  return str ? `?${str}` : "";
}

/** Filters that live in the sidebar (Reset clears these, keeps the trip). */
export function clearFilters(s: SearchState): SearchState {
  return { ...s, types: [], tr: [], seats: [], fuel: [], year: undefined, min: 0, max: PRICE_DEFAULT_MAX, q: undefined, page: 1 };
}

export function activeFilterCount(s: SearchState) {
  return (
    s.types.length + s.tr.length + s.seats.length + s.fuel.length + (s.year ? 1 : 0) + (s.min > 0 || s.max !== PRICE_DEFAULT_MAX ? 1 : 0) + (s.q ? 1 : 0)
  );
}

export function filterCars(s: SearchState, opts: { promoOnly?: boolean } = {}): Car[] {
  const q = s.q?.toLowerCase();
  const out = CARS.filter((c) => {
    if (opts.promoOnly && !c.promo) return false;
    if (s.city && c.city.toLowerCase() !== s.city.toLowerCase()) return false;
    if (q && ![c.name, c.brand, c.category, c.city].some((v) => v.toLowerCase().includes(q))) return false;
    if (s.types.length && !s.types.includes(c.category)) return false;
    if (s.tr.length && !s.tr.includes(c.transmission)) return false;
    if (s.seats.length && !SEAT_OPTIONS.some((o) => s.seats.includes(o.value) && o.test(c.seats))) return false;
    if (s.fuel.length) {
      const f: FuelValue = KNOWN_FUELS.includes(c.fuel) ? c.fuel : "Other";
      if (!s.fuel.includes(f)) return false;
    }
    if (s.year && c.year < s.year) return false;
    if (c.pricePerDay < s.min || c.pricePerDay > s.max) return false;
    return true;
  });
  const by: Record<SortKey, ((a: Car, b: Car) => number) | null> = {
    recommended: null,
    "price-asc": (a, b) => a.pricePerDay - b.pricePerDay,
    "price-desc": (a, b) => b.pricePerDay - a.pricePerDay,
    rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
    newest: (a, b) => b.year - a.year,
  };
  const cmp = by[s.sort];
  return cmp ? [...out].sort(cmp) : out;
}

export function paginate<T>(items: T[], page: number) {
  const pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  return { pages, current, slice: items.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE) };
}

/* ---------- Trip (header) ---------- */

const DAY = 86_400_000;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function parseISO(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  return Date.UTC(y, m - 1, day);
}

export function formatDate(d: string) {
  const t = new Date(parseISO(d));
  return `${String(t.getUTCDate()).padStart(2, "0")} ${MONTHS[t.getUTCMonth()]} ${t.getUTCFullYear()}`;
}

export function tripDays(from: string, to: string) {
  return Math.round((parseISO(to) - parseISO(from)) / DAY);
}

export function durationLabel(days: number) {
  const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;
  if (days >= 28) return plural(Math.max(1, Math.round(days / 30)), "month");
  if (days >= 7 && days % 7 === 0) return plural(days / 7, "week");
  return plural(Math.max(1, days), "day");
}

export function rentTitle(days: number) {
  if (days >= 28) return "Monthly rent";
  if (days >= 7) return "Weekly rent";
  return "Daily rent";
}

/** Trip shown in the header: URL values, falling back to the Figma default trip. */
export function tripOf(s: SearchState) {
  const from = s.from ?? DEFAULT_TRIP.from;
  let to = s.to ?? (s.from ? undefined : DEFAULT_TRIP.to);
  if (!to || parseISO(to) <= parseISO(from)) to = new Date(parseISO(from) + DAY).toISOString().slice(0, 10);
  return { city: s.city ?? DEFAULT_TRIP.city, from, to, driver: s.driver ?? DEFAULT_TRIP.driver };
}
