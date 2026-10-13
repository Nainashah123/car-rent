/**
 * Car catalogue. Names, specs, tags and photo crops come from the Figma
 * Search results grid (233:43794); prices are realistic mock values.
 * Screens may ADD optional fields here; never rename/remove existing ones.
 */
export type Transmission = "CVT" | "AT" | "MT";
export type Fuel = "Gasoline" | "Hybrid" | "Electric" | "Diesel";
export type CarCategory = "Sedan" | "SUV" | "MPV" | "Bus" | "Minibus" | "Sport";
export type TagTone = "green" | "grey" | "blue" | "red" | "yellow";

/** Absolute crop of the photo inside its frame, in % (Figma image fill transform). */
export type Crop = { left: number; top: number; width: number; height: number };

export type Car = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CarCategory;
  image: string;
  /** Omit to use object-cover. */
  crop?: Crop;
  pricePerDay: number;
  /** Original price when discounted (shown struck through where designed). */
  originalPrice?: number;
  transmission: Transmission;
  fuel: Fuel;
  seats: number;
  tag?: { text: string; tone: TagTone };
  city: string;
  rating: number;
  reviews: number;
  year: number;
  promo?: boolean;
};

export const CARS: Car[] = [
  { id: "c01", slug: "scania-type-ab", name: "Scania type AB", brand: "Scania", category: "Bus", image: "/images/cars/scania-bus.png", crop: { left: -5.47, top: 0, width: 152.24, height: 100 }, pricePerDay: 989.99, transmission: "CVT", fuel: "Gasoline", seats: 50, tag: { text: "Free refund", tone: "green" }, city: "Yogyakarta", rating: 4.8, reviews: 126, year: 2023 },
  { id: "c02", slug: "toyota-camry", name: "Toyota Camry", brand: "Toyota", category: "Sedan", image: "/images/cars/toyota-camry.png", crop: { left: -28.93, top: 0, width: 191.41, height: 100 }, pricePerDay: 109.99, transmission: "AT", fuel: "Hybrid", seats: 4, city: "Jakarta", rating: 4.7, reviews: 342, year: 2024 },
  { id: "c03", slug: "byd-han-ev", name: "BYD Han EV", brand: "BYD", category: "Sedan", image: "/images/cars/byd-han-ev.png", crop: { left: -0.15, top: 0, width: 135.73, height: 100 }, pricePerDay: 129.99, transmission: "CVT", fuel: "Electric", seats: 4, city: "Jakarta", rating: 4.9, reviews: 88, year: 2025 },
  { id: "c04", slug: "mitsubishi-galant-v6", name: "Mitsubishi Galant V6", brand: "Mitsubishi", category: "Sedan", image: "/images/cars/mitsubishi-galant.png", crop: { left: -3.26, top: 0, width: 144.34, height: 100 }, pricePerDay: 65.99, originalPrice: 109.99, transmission: "CVT", fuel: "Gasoline", seats: 4, tag: { text: "Discount up to 40%", tone: "green" }, city: "Bandung", rating: 4.5, reviews: 57, year: 2019, promo: true },
  { id: "c05", slug: "toyota-avanza", name: "Scania type AB", brand: "Toyota", category: "MPV", image: "/images/cars/scania-ab-2.png", pricePerDay: 59.99, transmission: "CVT", fuel: "Gasoline", seats: 7, city: "Yogyakarta", rating: 4.6, reviews: 211, year: 2022 },
  { id: "c06", slug: "toyota-grand-innova", name: "Toyota Grand", brand: "Toyota", category: "MPV", image: "/images/cars/toyota-grand.png", pricePerDay: 79.99, transmission: "CVT", fuel: "Gasoline", seats: 7, city: "Surabaya", rating: 4.7, reviews: 164, year: 2023 },
  { id: "c07", slug: "nissan-silvia", name: "Scania type AB", brand: "Nissan", category: "Sport", image: "/images/cars/scania-ab-3.png", pricePerDay: 149.99, transmission: "CVT", fuel: "Gasoline", seats: 4, city: "Bali", rating: 4.8, reviews: 73, year: 2002 },
  { id: "c08", slug: "subaru-brz", name: "Subaru BRZ", brand: "Subaru", category: "Sport", image: "/images/cars/subaru-brz.png", pricePerDay: 119.99, originalPrice: 199.99, transmission: "CVT", fuel: "Gasoline", seats: 4, tag: { text: "Save up to 40%", tone: "grey" }, city: "Bali", rating: 4.9, reviews: 102, year: 2024, promo: true },
  { id: "c09", slug: "toyota-innova", name: "Scania type AB", brand: "Toyota", category: "MPV", image: "/images/cars/scania-ab-4.png", crop: { left: 0, top: -21.16, width: 100, height: 130.61 }, pricePerDay: 69.99, transmission: "CVT", fuel: "Gasoline", seats: 7, city: "Semarang", rating: 4.4, reviews: 49, year: 2021 },
  { id: "c10", slug: "toyota-new-voxy", name: "Toyota New Voxy", brand: "Toyota", category: "Minibus", image: "/images/cars/toyota-voxy.png", pricePerDay: 89.99, transmission: "AT", fuel: "Gasoline", seats: 8, city: "Jakarta", rating: 4.8, reviews: 190, year: 2024 },
  { id: "c11", slug: "mitsubishi-destinator", name: "Mitsubishi Destinator", brand: "Mitsubishi", category: "SUV", image: "/images/cars/mitsubishi-destinator.png", crop: { left: 0, top: 0.16, width: 100, height: 99.84 }, pricePerDay: 74.99, originalPrice: 124.99, transmission: "MT", fuel: "Gasoline", seats: 4, tag: { text: "Save up to 40%", tone: "grey" }, city: "Bandung", rating: 4.6, reviews: 38, year: 2025, promo: true },
  { id: "c12", slug: "byd-m6-ev", name: "BYD M6 EV", brand: "BYD", category: "MPV", image: "/images/cars/byd-m6.png", crop: { left: -71.79, top: -25.71, width: 226.39, height: 133.06 }, pricePerDay: 99.99, transmission: "CVT", fuel: "Electric", seats: 7, city: "Surabaya", rating: 4.7, reviews: 66, year: 2025 },
];

export const CITIES = ["Jakarta", "Yogyakarta", "Bandung", "Surabaya", "Semarang", "Bali"] as const;

export function carBySlug(slug: string) {
  return CARS.find((c) => c.slug === slug);
}

export function formatPrice(n: number) {
  return `$${n.toFixed(2)}`;
}
