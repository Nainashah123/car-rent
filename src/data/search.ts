/**
 * Search / Find a car (Figma 233:43662 desktop, 233:46579 mobile) and Promo.
 * Filter options, labels and the default trip come from the Figma text.
 */
import type { CarCategory, Fuel, Transmission } from "@/data/cars";

/** Absolute crop of an image inside its box, in % (Figma image fill transform). */
export type ImgCrop = { left: number; top: number; width: number; height: number };

export type TransmissionOption = {
  value: Transmission;
  label: string;
  hint: string;
  image: string;
  /** Size of the image layer inside the 70×70 slot, and its offset from centre. */
  box: { w: number; h: number; dx: number; dy: number };
  crop: ImgCrop;
};

export const TRANSMISSION_OPTIONS: TransmissionOption[] = [
  {
    value: "CVT",
    label: "CVT",
    hint: "Continuously variable transmission: smooth, gearless automatic.",
    image: "/images/search/gear-cvt.png",
    box: { w: 69.578, h: 52.706, dx: -0.21, dy: -0.41 },
    crop: { left: -18.03, top: -0.14, width: 135.62, height: 100.27 },
  },
  {
    value: "MT",
    label: "Manual",
    hint: "Manual gearbox with clutch pedal.",
    image: "/images/search/gear-manual.png",
    box: { w: 71.99, h: 63, dx: 0.5, dy: 0.5 },
    crop: { left: -29.74, top: -0.03, width: 156.34, height: 100.05 },
  },
  {
    value: "AT",
    label: "Auto",
    hint: "Conventional automatic transmission.",
    image: "/images/search/gear-auto.png",
    box: { w: 70.5, h: 52.109, dx: -0.25, dy: -0.45 },
    crop: { left: -16.3, top: -0.24, width: 132.61, height: 100.48 },
  },
];

export type SeatsValue = "4" | "5-6" | "7+";
export const SEAT_OPTIONS: { value: SeatsValue; label: string; test: (seats: number) => boolean }[] = [
  { value: "4", label: "4", test: (s) => s <= 4 },
  { value: "5-6", label: "5-6", test: (s) => s >= 5 && s <= 6 },
  { value: "7+", label: ">6", test: (s) => s > 6 },
];

export type ChipOption<V extends string> = { value: V; label: string; icon?: string; crop?: ImgCrop };

export const CATEGORY_OPTIONS: ChipOption<CarCategory>[] = [
  { value: "SUV", label: "SUV", icon: "/images/3d/car-sedan.png", crop: { left: -24.62, top: 8.33, width: 147.86, height: 82.81 } },
  { value: "Sedan", label: "Sedan", icon: "/images/3d/car-sedan.png", crop: { left: -24.62, top: 8.33, width: 147.86, height: 82.81 } },
  { value: "Minibus", label: "Minibus", icon: "/images/3d/minibus.png", crop: { left: -20.16, top: 10.98, width: 139.59, height: 78.18 } },
  { value: "MPV", label: "MPV", icon: "/images/3d/mpv.png", crop: { left: -17.69, top: 12.57, width: 133.65, height: 74.85 } },
  { value: "Bus", label: "Bus", icon: "/images/3d/bus.png", crop: { left: -19.97, top: 10.65, width: 138.96, height: 77.83 } },
];

/** Shown only when a category outside the designed chips arrives in the URL (e.g. Home → Sport). */
export const EXTRA_CATEGORY_OPTIONS: ChipOption<CarCategory>[] = [
  { value: "Sport", label: "Sport", icon: "/images/3d/car-sedan.png", crop: { left: -24.62, top: 8.33, width: 147.86, height: 82.81 } },
];

export type FuelValue = Fuel | "Other";
export const FUEL_OPTIONS: ChipOption<FuelValue>[] = [
  { value: "Gasoline", label: "Gasoline", icon: "/images/3d/fuel-gasoline.png" },
  { value: "Electric", label: "Electric", icon: "/images/3d/fuel-electric.png" },
  { value: "Diesel", label: "Diesel", icon: "/images/3d/fuel-electric.png" },
  { value: "Hybrid", label: "Hybrid", icon: "/images/3d/fuel-electric.png" },
  { value: "Other", label: "Other" },
];
export const KNOWN_FUELS: Fuel[] = ["Gasoline", "Electric", "Diesel", "Hybrid"];

/** "Years" dropdown = minimum model year. */
export const YEAR_OPTIONS = [2025, 2024, 2023, 2022, 2021, 2020, 2015, 2010, 2000] as const;

/** Price slider scale ($/day). The Figma max field reads $2300 with its handle at ~71% of the track. */
export const PRICE_CEIL = 3100;
export const PRICE_DEFAULT_MAX = 2300;
export const PRICE_STEP = 10;
/** Price histogram bar heights (px, of 51) from the Figma "Price" chart. */
export const PRICE_HISTOGRAM = [0, 1, 5, 8, 21, 16, 11, 8, 14, 28, 46, 51, 46, 43, 39, 36, 33, 33, 31, 31, 28, 21, 17, 19, 19, 14, 8, 8, 5, 2];

export type SortKey = "recommended" | "price-asc" | "price-desc" | "rating" | "newest";
export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
];

/**
 * Cars per page. Figma page 1 shows all 12 catalogue cars (4 rows desktop,
 * 6 rows mobile), so 12 matches the design; the pager pages for real as
 * soon as results exceed 12 and shows disabled Previous/Next on one page.
 */
export const PAGE_SIZE = 12;

export type Driver = "with" | "without";

/** Trip shown in the header when no search params are given (Figma text). */
export const DEFAULT_TRIP = {
  city: "Yogyakarta",
  from: "2026-10-07",
  to: "2026-11-07",
  driver: "without" as Driver,
};

export const DRIVER_LABEL: Record<Driver, string> = { with: "With driver", without: "Without driver" };

export const PROMO_COPY = {
  title: "Promo",
  crumb: "Promo",
  tagline: "Limited-time deals",
  saving: "Save up to 40%",
};
