/**
 * Home page content (Figma desktop 232:21757, mobile 232:22155).
 */
import type { CarCategory } from "@/data/cars";

/* ---------- Search card ---------- */

export type DriverOption = "with" | "without";
export type PickupMode = "scheduled" | "now";
export type RentUnit = "hourly" | "daily";

export const DRIVER_OPTIONS: { value: DriverOption; label: string }[] = [
  { value: "with", label: "With driver" },
  { value: "without", label: "Without driver" },
];

export const PICKUP_MODES: { value: PickupMode; label: string; icon: string }[] = [
  { value: "scheduled", label: "Scheduled", icon: "/images/home/calendar.png" },
  { value: "now", label: "Pickup now", icon: "/images/home/clock.png" },
];

export const RENT_UNITS: { value: RentUnit; label: string }[] = [
  { value: "hourly", label: "Hourly" },
  { value: "daily", label: "Daily" },
];

/** Duration choices per unit; the first-listed default matches the Figma ("4 hours"). */
export const DURATIONS: Record<RentUnit, { value: number; label: string }[]> = {
  hourly: [2, 4, 6, 8, 12].map((h) => ({ value: h, label: `${h} hours` })),
  daily: [1, 2, 3, 5, 7, 14, 30].map((d) => ({ value: d, label: d === 1 ? "1 day" : `${d} days` })),
};
export const DEFAULT_DURATION: Record<RentUnit, number> = { hourly: 4, daily: 1 };

/* ---------- Vehicle types ---------- */

export type VehicleType = {
  category: CarCategory;
  image: string;
  /** Image box inside the 288px square, in % (Figma image fill crop). */
  crop: { left: number; top: number; width: number; height: number };
};

export const VEHICLE_TYPES: VehicleType[] = [
  { category: "Bus", image: "/images/3d/bus.png", crop: { left: -12.5, top: 15, width: 125, height: 70.01 } },
  { category: "Sedan", image: "/images/3d/sedan.png", crop: { left: -11.67, top: 15.64, width: 123.33, height: 69.07 } },
  { category: "Minibus", image: "/images/3d/minibus.png", crop: { left: -20.16, top: 10.98, width: 139.59, height: 78.18 } },
  { category: "MPV", image: "/images/3d/mpv.png", crop: { left: -17.69, top: 12.57, width: 133.65, height: 74.85 } },
];

/* ---------- About blurb ---------- */

export const ABOUT_TEXT =
  "CARENT delivers a superior experience through comprehensive transportation solutions, ranging from car, bus, and motorcycle rentals to professional driver services and fleet management. Starting with just five rental cars in 2012, CARENT has since grown into one of Indonesia's largest transportation companies under the umbrella of PT Serasi Autoraya and the Astra International Group.";

/* ---------- Why rent ---------- */

export type Reason = { title: string; body: string; icon: string; tags: string[] };

export const WHY = {
  title: "Why Rent with Trayek",
  intro: "We look after every unit like our own, from cars built in the 70s to this year's models.",
  photo: "/images/home/why-driver.jpg",
  reasons: [
    {
      title: "Well-maintained fleet",
      body: "Routine servicing and inspection before every rental, for classic and modern cars alike.",
      icon: "/images/home/why-fleet.png",
      tags: ["Serviced", "Inspected", "Clean"],
    },
    {
      title: "Transparent pricing",
      body: "No hidden fees. What you see at search time is what you pay.",
      icon: "/images/home/why-pricing.png",
      tags: ["No fees", "Insured", "Taxes in"],
    },
    {
      title: "24-hour pick-up & drop-off",
      body: "Collect whenever suits your schedule; we'll bring the car to your chosen meeting point.",
      icon: "/images/home/why-clock.png",
      tags: ["24/7", "Delivery", "Flexible"],
    },
  ] satisfies Reason[],
};

/* ---------- How it works ---------- */

export type Step = { title: string; body: string; image: string };

export const STEPS = {
  title: "How Renting Works, in Four Steps",
  intro: "We look after every unit like our own, from cars built in the 70s to this year's models.",
  steps: [
    { title: "Search & filter", body: "Pick a category, type, and the dates you need.", image: "/images/home/step-search.png" },
    { title: "Fill in your details", body: "Add your information and pick-up location.", image: "/images/home/step-details.png" },
    { title: "Pay", body: "Bank transfer, e-wallet, or credit card", image: "/images/home/step-pay.png" },
    { title: "Drive", body: "Your car is ready for pick-up at the time you chose.", image: "/images/home/step-drive.png" },
  ] satisfies Step[],
};

/* ---------- Testimonials ---------- */

export type Testimonial = { id: string; name: string; rating: number; quote: string };

export const TESTIMONIAL_PHOTO = "/images/home/testimonial.jpg";

export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", name: "Jonathan Gill", rating: 4.8, quote: "The Fortuner was spotless with a full tank at pick-up. Delivery was right on time as well." },
  { id: "t2", name: "Ayu Pratiwi", rating: 4.9, quote: "Booked a minibus for a family trip to Bandung. The driver knew every shortcut and waited without fuss." },
  { id: "t3", name: "Marco Lim", rating: 4.7, quote: "Price on the checkout page was exactly what I paid. No surprises at the counter, which is rare." },
  { id: "t4", name: "Siti Rahma", rating: 5.0, quote: "Late-night drop-off at the airport was effortless. Someone was there at 2 AM to collect the keys." },
  { id: "t5", name: "Daniel Hartono", rating: 4.8, quote: "Rented a classic Galant for a weekend. It drove like it had just left the showroom." },
];
