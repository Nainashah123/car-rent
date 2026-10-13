/**
 * Extra per-car content for the detail page (`/cars/[slug]`), keyed by car slug.
 * The Nissan Silvia copy is the Figma "Detail/Description" text (232:22751);
 * the other cars follow the same voice. Prices live in `cars.ts`.
 */
import type { Car, CarCategory, Crop, Transmission } from "@/data/cars";

export type GalleryImage = { src: string; alt: string; crop?: Crop };

export type FeatureIcon =
  | "air"
  | "bluetooth"
  | "usb"
  | "camera"
  | "gps"
  | "cruise"
  | "engine"
  | "seat"
  | "wifi"
  | "luggage"
  | "shield"
  | "battery"
  | "music"
  | "sun"
  | "key"
  | "steering"
  | "child"
  | "tv";

export type Feature = { icon: FeatureIcon; label: string };

export type Review = {
  id: string;
  name: string;
  city: string;
  /** ISO date. */
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
};

export type CarDetail = {
  /** Display title when it differs from the catalogue card name. */
  title?: string;
  /** Overrides for the spec row (catalogue values are shown otherwise). */
  transmission?: Transmission;
  seats?: number;
  /** Body-type chip ("Coupe", "Sedan"…). */
  bodyType: string;
  description: string;
  /** First image is the hero photo. Omit to use the catalogue photo only. */
  gallery?: GalleryImage[];
  features: Feature[];
  specs: { label: string; value: string }[];
  terms: string[];
  reviews: Review[];
};

/** 3D icon for each body type chip (Figma "Icon 3d", 58:2065). */
export const BODY_ICON: Record<CarCategory, string> = {
  Sport: "/images/3d/coupe.png",
  Sedan: "/images/3d/sedan.png",
  SUV: "/images/3d/car-sedan.png",
  MPV: "/images/3d/mpv.png",
  Bus: "/images/3d/bus.png",
  Minibus: "/images/3d/minibus.png",
};

/** Daily driver fee and hourly rate rules used by the booking card. */
export const DRIVER_FEE_PER_DAY = 25;
export const HOURS_PER_DAY_RATE = 8;
export const HOURLY_OPTIONS = [2, 3, 4, 5, 6, 8, 10, 12] as const;

const STANDARD_TERMS = [
  "Minimum driver age 21 with a valid driving licence held for at least 2 years.",
  "Pick up with a full tank and return it full, or pay the refuelling fee at cost.",
  "Free cancellation up to 2 days before pick-up; later cancellations are charged one day.",
  "Basic insurance included. Damage excess is capped at $350 per rental.",
];

export const CAR_DETAILS: Record<string, CarDetail> = {
  "nissan-silvia": {
    title: "Nissan Silvia S15 (A9)",
    transmission: "MT",
    seats: 2,
    bodyType: "Coupe",
    description:
      "The Nissan Silvia S15 is one of the most iconic JDM sports coupes ever built a rear-wheel-drive legend known for its balanced chassis, sharp styling, and deep-rooted drift heritage. Its turbocharged engine and responsive handling reward a confident driver, making it a favorite for enthusiasts, photo shoots, and weekend drives. Renting this S15 means getting behind the wheel of a genuine piece of JDM history.",
    features: [
      { icon: "engine", label: "SR20DET turbo engine" },
      { icon: "steering", label: "Rear-wheel drive" },
      { icon: "air", label: "Air conditioning" },
      { icon: "bluetooth", label: "Bluetooth audio" },
      { icon: "usb", label: "USB charging" },
      { icon: "seat", label: "Bucket seats" },
      { icon: "camera", label: "Dash camera" },
      { icon: "shield", label: "Basic insurance" },
    ],
    specs: [
      { label: "Year", value: "2002" },
      { label: "Engine", value: "2.0L turbo inline-4" },
      { label: "Power", value: "250 hp" },
      { label: "Gearbox", value: "6-speed manual" },
      { label: "Drive", value: "Rear-wheel drive" },
      { label: "Fuel use", value: "10.5 L / 100 km" },
    ],
    terms: [
      "Minimum driver age 25 with at least 3 years of manual driving experience.",
      "No track days or drifting events; the car is fitted with a GPS tracker.",
      ...STANDARD_TERMS.slice(1),
    ],
    reviews: [
      { id: "r1", name: "Raka Pratama", city: "Bali", date: "2026-09-21", rating: 5, text: "A dream come true. The S15 was spotless, the turbo pulls hard and the handover took five minutes." },
      { id: "r2", name: "Nadia Putri", city: "Jakarta", date: "2026-09-02", rating: 5, text: "Booked it for a pre-wedding shoot. It looked incredible on camera and the team helped us with the location." },
      { id: "r3", name: "Kevin Wijaya", city: "Surabaya", date: "2026-08-15", rating: 4, text: "Clutch is heavy in traffic but on the coast road it is pure fun. Would rent again for a weekend." },
      { id: "r4", name: "Dimas Saputra", city: "Bandung", date: "2026-07-30", rating: 5, text: "Real JDM history. Original interior, great tyres and the staff clearly love this car." },
      { id: "r5", name: "Sarah Lim", city: "Bali", date: "2026-07-11", rating: 4, text: "Only two seats so pack light. Otherwise flawless and the price is fair for a classic." },
    ],
  },
  "scania-type-ab": {
    bodyType: "Bus",
    description:
      "The Scania Touring coach is built for long journeys in comfort. With 50 reclining seats, air suspension and a quiet, efficient powertrain, it is ideal for company trips, school tours and wedding guests. Every rental comes with an experienced, certified driver who knows the regional routes.",
    gallery: [
      { src: "/images/cars/scania-bus.png", alt: "Scania coach, front three-quarter view", crop: { left: -5.47, top: 0, width: 152.24, height: 100 } },
      { src: "/images/cars/scania-bus-2.png", alt: "Scania coach driving on the highway" },
    ],
    features: [
      { icon: "air", label: "Dual-zone air conditioning" },
      { icon: "seat", label: "50 reclining seats" },
      { icon: "tv", label: "Overhead screens" },
      { icon: "music", label: "PA & karaoke system" },
      { icon: "wifi", label: "Onboard Wi-Fi" },
      { icon: "usb", label: "USB at every row" },
      { icon: "luggage", label: "Large luggage bay" },
      { icon: "shield", label: "Passenger insurance" },
    ],
    specs: [
      { label: "Year", value: "2023" },
      { label: "Engine", value: "13L inline-6" },
      { label: "Power", value: "410 hp" },
      { label: "Gearbox", value: "Opticruise automated" },
      { label: "Length", value: "12.1 m" },
      { label: "Luggage", value: "11 m³" },
    ],
    terms: [
      "Always rented with a certified driver; driver meals and tolls are billed separately.",
      "Maximum 12 driving hours per day. Overnight trips include driver lodging.",
      "Free refund up to 7 days before departure.",
      "No smoking or open food on board.",
    ],
    reviews: [
      { id: "r1", name: "PT Sinar Abadi", city: "Yogyakarta", date: "2026-09-18", rating: 5, text: "Took 46 staff to Borobudur. Clean coach, punctual driver and the Wi-Fi actually worked." },
      { id: "r2", name: "Maya Anggraini", city: "Semarang", date: "2026-08-27", rating: 5, text: "Wedding guest shuttle went perfectly. The driver even helped carry the decorations." },
      { id: "r3", name: "Budi Hartono", city: "Jakarta", date: "2026-07-05", rating: 4, text: "Comfortable seats and strong AC. Booking the karaoke system was a hit with the kids." },
    ],
  },
  "toyota-camry": {
    bodyType: "Sedan",
    description:
      "The Toyota Camry Hybrid pairs executive comfort with remarkable efficiency. Its quiet cabin, soft leather seats and smooth hybrid drive make it the go-to choice for business trips, airport transfers and long highway drives, all while sipping fuel in city traffic.",
    features: [
      { icon: "battery", label: "Self-charging hybrid" },
      { icon: "air", label: "Dual-zone climate" },
      { icon: "gps", label: "Built-in navigation" },
      { icon: "bluetooth", label: "Apple CarPlay & Android Auto" },
      { icon: "cruise", label: "Adaptive cruise control" },
      { icon: "camera", label: "Reverse camera" },
      { icon: "seat", label: "Leather seats" },
      { icon: "luggage", label: "2 large suitcases" },
    ],
    specs: [
      { label: "Year", value: "2024" },
      { label: "Engine", value: "2.5L hybrid" },
      { label: "Power", value: "215 hp" },
      { label: "Gearbox", value: "e-CVT automatic" },
      { label: "Fuel use", value: "4.2 L / 100 km" },
      { label: "Boot", value: "524 L" },
    ],
    terms: STANDARD_TERMS,
    reviews: [
      { id: "r1", name: "Andreas Gunawan", city: "Jakarta", date: "2026-09-25", rating: 5, text: "Silent, smooth and barely used any fuel on the Jakarta–Bandung run." },
      { id: "r2", name: "Fitri Handayani", city: "Jakarta", date: "2026-09-09", rating: 4, text: "Perfect for client meetings. The with-driver option saved me a lot of stress." },
      { id: "r3", name: "Yoga Prasetyo", city: "Bogor", date: "2026-08-19", rating: 5, text: "Very clean, CarPlay worked instantly and pick-up was on time." },
    ],
  },
  "byd-han-ev": {
    bodyType: "Sedan",
    description:
      "The BYD Han EV is a fast, refined electric sedan with a long range and a premium cabin. Instant torque, a panoramic glass roof and a large rotating touchscreen make every drive feel special, and charging is easy at our partner stations across the city.",
    features: [
      { icon: "battery", label: "605 km range" },
      { icon: "sun", label: "Panoramic roof" },
      { icon: "gps", label: "Rotating 15.6\" screen" },
      { icon: "bluetooth", label: "Bluetooth & CarPlay" },
      { icon: "cruise", label: "Driver assistance" },
      { icon: "camera", label: "360° camera" },
      { icon: "air", label: "Heat-pump climate" },
      { icon: "key", label: "NFC card key" },
    ],
    specs: [
      { label: "Year", value: "2025" },
      { label: "Motor", value: "Dual motor AWD" },
      { label: "Power", value: "510 hp" },
      { label: "0–100 km/h", value: "3.9 s" },
      { label: "Range", value: "605 km (NEDC)" },
      { label: "Fast charge", value: "30–80% in 25 min" },
    ],
    terms: [
      "Delivered with at least 80% charge; return with 50% or more to avoid a charging fee.",
      ...STANDARD_TERMS.slice(0, 1),
      ...STANDARD_TERMS.slice(2),
    ],
    reviews: [
      { id: "r1", name: "Clara Tanoto", city: "Jakarta", date: "2026-09-30", rating: 5, text: "My first EV and I am sold. Charging card was included and range was more than enough." },
      { id: "r2", name: "Rizky Ramadhan", city: "Tangerang", date: "2026-09-12", rating: 5, text: "Acceleration is wild. Interior feels more expensive than the price suggests." },
    ],
  },
  "mitsubishi-galant-v6": {
    bodyType: "Sedan",
    description:
      "A well-kept Mitsubishi Galant V6 with a smooth six-cylinder engine and a spacious cabin. A great-value sedan for family visits and out-of-town trips, now offered at a promo rate.",
    features: [
      { icon: "engine", label: "2.5L V6 engine" },
      { icon: "air", label: "Air conditioning" },
      { icon: "music", label: "Premium audio" },
      { icon: "seat", label: "Spacious rear seats" },
      { icon: "luggage", label: "Large boot" },
      { icon: "shield", label: "Basic insurance" },
    ],
    specs: [
      { label: "Year", value: "2019" },
      { label: "Engine", value: "2.5L V6" },
      { label: "Power", value: "161 hp" },
      { label: "Gearbox", value: "CVT automatic" },
      { label: "Fuel use", value: "9.8 L / 100 km" },
      { label: "Boot", value: "430 L" },
    ],
    terms: STANDARD_TERMS,
    reviews: [
      { id: "r1", name: "Hendra Kusuma", city: "Bandung", date: "2026-09-03", rating: 5, text: "Discount made it a steal. Comfortable for four adults on the way to Lembang." },
      { id: "r2", name: "Rina Marlina", city: "Bandung", date: "2026-08-08", rating: 4, text: "Older car but very well maintained. Engine is smooth." },
    ],
  },
  "toyota-avanza": {
    bodyType: "MPV",
    description:
      "Indonesia's favourite family MPV. Seven seats, easy handling and low running costs make it the practical pick for holidays with kids, airport runs and trips out of town.",
    features: [
      { icon: "seat", label: "7 seats" },
      { icon: "air", label: "Rear AC vents" },
      { icon: "usb", label: "USB charging" },
      { icon: "child", label: "Child seat on request" },
      { icon: "luggage", label: "Fold-flat third row" },
      { icon: "shield", label: "Basic insurance" },
    ],
    specs: [
      { label: "Year", value: "2022" },
      { label: "Engine", value: "1.5L petrol" },
      { label: "Power", value: "106 hp" },
      { label: "Gearbox", value: "CVT automatic" },
      { label: "Fuel use", value: "7.1 L / 100 km" },
      { label: "Seats", value: "7" },
    ],
    terms: STANDARD_TERMS,
    reviews: [
      { id: "r1", name: "Siti Rahmawati", city: "Yogyakarta", date: "2026-09-14", rating: 5, text: "Fit our family of six plus luggage. The child seat was already installed." },
      { id: "r2", name: "Agus Salim", city: "Klaten", date: "2026-08-22", rating: 4, text: "Simple and reliable. Exactly what we needed for the Lebaran trip." },
    ],
  },
  "toyota-grand-innova": {
    bodyType: "MPV",
    description:
      "The Toyota Grand Innova is a roomy, comfortable MPV with captain seats in the second row. Its smooth ride and generous space make long drives relaxed for every passenger.",
    features: [
      { icon: "seat", label: "Captain seats" },
      { icon: "air", label: "Rear climate control" },
      { icon: "tv", label: "Rear entertainment" },
      { icon: "usb", label: "USB at every row" },
      { icon: "camera", label: "Reverse camera" },
      { icon: "luggage", label: "Large boot" },
    ],
    specs: [
      { label: "Year", value: "2023" },
      { label: "Engine", value: "2.0L petrol" },
      { label: "Power", value: "172 hp" },
      { label: "Gearbox", value: "CVT automatic" },
      { label: "Fuel use", value: "8.4 L / 100 km" },
      { label: "Seats", value: "7" },
    ],
    terms: STANDARD_TERMS,
    reviews: [
      { id: "r1", name: "Lukas Halim", city: "Surabaya", date: "2026-09-19", rating: 5, text: "Captain seats are so comfortable. Parents slept the whole way to Malang." },
      { id: "r2", name: "Dewi Lestari", city: "Sidoarjo", date: "2026-08-03", rating: 4, text: "Clean and spacious. Pick-up took a little longer than planned but staff were friendly." },
    ],
  },
  "subaru-brz": {
    bodyType: "Coupe",
    description:
      "The Subaru BRZ is a lightweight, rear-wheel-drive sports coupe tuned for pure driving joy. Low centre of gravity, a free-revving boxer engine and precise steering make every corner on the island roads feel like an event.",
    features: [
      { icon: "engine", label: "2.4L boxer engine" },
      { icon: "steering", label: "Rear-wheel drive" },
      { icon: "air", label: "Climate control" },
      { icon: "bluetooth", label: "CarPlay & Android Auto" },
      { icon: "seat", label: "Sport seats" },
      { icon: "shield", label: "Basic insurance" },
    ],
    specs: [
      { label: "Year", value: "2024" },
      { label: "Engine", value: "2.4L flat-4" },
      { label: "Power", value: "228 hp" },
      { label: "Gearbox", value: "6-speed" },
      { label: "Weight", value: "1,270 kg" },
      { label: "Seats", value: "2 + 2" },
    ],
    terms: ["Minimum driver age 25.", ...STANDARD_TERMS.slice(1)],
    reviews: [
      { id: "r1", name: "Made Wirawan", city: "Bali", date: "2026-09-27", rating: 5, text: "Drove it up to Kintamani. Handles like a go-kart, absolutely loved it." },
      { id: "r2", name: "Jessica Tan", city: "Bali", date: "2026-08-30", rating: 5, text: "Promo price made it a no-brainer. Car looked brand new." },
    ],
  },
  "toyota-innova": {
    bodyType: "MPV",
    description:
      "A dependable Toyota Innova with plenty of room for seven and their luggage. Robust, comfortable and economical — the workhorse of Indonesian road trips.",
    features: [
      { icon: "seat", label: "7 seats" },
      { icon: "air", label: "Double blower AC" },
      { icon: "usb", label: "USB charging" },
      { icon: "luggage", label: "Roof rack" },
      { icon: "shield", label: "Basic insurance" },
    ],
    specs: [
      { label: "Year", value: "2021" },
      { label: "Engine", value: "2.0L petrol" },
      { label: "Power", value: "137 hp" },
      { label: "Gearbox", value: "Automatic" },
      { label: "Fuel use", value: "9.0 L / 100 km" },
      { label: "Seats", value: "7" },
    ],
    terms: STANDARD_TERMS,
    reviews: [
      { id: "r1", name: "Taufik Hidayat", city: "Semarang", date: "2026-09-06", rating: 4, text: "Solid car for a long family trip to Dieng. AC was strong even at noon." },
    ],
  },
  "toyota-new-voxy": {
    bodyType: "Minibus",
    description:
      "The new Toyota Voxy is a premium people-mover with sliding doors, a flat floor and eight comfortable seats. Ideal for groups who want space without giving up a car-like drive.",
    features: [
      { icon: "seat", label: "8 seats" },
      { icon: "key", label: "Power sliding doors" },
      { icon: "air", label: "Rear ceiling AC" },
      { icon: "cruise", label: "Toyota Safety Sense" },
      { icon: "camera", label: "Panoramic view monitor" },
      { icon: "usb", label: "USB-C at every row" },
    ],
    specs: [
      { label: "Year", value: "2024" },
      { label: "Engine", value: "2.0L petrol" },
      { label: "Power", value: "170 hp" },
      { label: "Gearbox", value: "Direct Shift CVT" },
      { label: "Fuel use", value: "6.9 L / 100 km" },
      { label: "Seats", value: "8" },
    ],
    terms: STANDARD_TERMS,
    reviews: [
      { id: "r1", name: "Irene Santoso", city: "Jakarta", date: "2026-09-23", rating: 5, text: "Sliding doors are a lifesaver with toddlers. Super quiet cabin." },
      { id: "r2", name: "Bayu Nugroho", city: "Depok", date: "2026-08-12", rating: 5, text: "Took eight friends to Puncak in total comfort." },
    ],
  },
  "mitsubishi-destinator": {
    bodyType: "SUV",
    description:
      "The all-new Mitsubishi Destinator is a confident, high-riding SUV with a rugged stance and a modern cabin. Its manual gearbox and generous ground clearance make it a fun companion for mountain roads and weekend adventures.",
    features: [
      { icon: "engine", label: "1.5L turbo engine" },
      { icon: "steering", label: "Drive modes" },
      { icon: "air", label: "Climate control" },
      { icon: "gps", label: "12.3\" touchscreen" },
      { icon: "camera", label: "360° camera" },
      { icon: "luggage", label: "Roof rails" },
    ],
    specs: [
      { label: "Year", value: "2025" },
      { label: "Engine", value: "1.5L turbo" },
      { label: "Power", value: "161 hp" },
      { label: "Gearbox", value: "Manual" },
      { label: "Ground clearance", value: "214 mm" },
      { label: "Fuel use", value: "7.6 L / 100 km" },
    ],
    terms: STANDARD_TERMS,
    reviews: [
      { id: "r1", name: "Gilang Permana", city: "Bandung", date: "2026-09-29", rating: 5, text: "Brand new and climbed to Kawah Putih without breaking a sweat." },
      { id: "r2", name: "Anisa Rahma", city: "Cimahi", date: "2026-09-01", rating: 4, text: "Great value with the promo. The 360 camera makes parking easy." },
    ],
  },
  "byd-m6-ev": {
    bodyType: "MPV",
    description:
      "The BYD M6 is a seven-seat electric MPV that makes family trips quiet, smooth and cheap to run. Long range, a big screen and flexible seating make it a modern alternative to petrol MPVs.",
    features: [
      { icon: "battery", label: "530 km range" },
      { icon: "seat", label: "7 seats" },
      { icon: "gps", label: "Rotating 12.8\" screen" },
      { icon: "air", label: "Rear AC vents" },
      { icon: "camera", label: "360° camera" },
      { icon: "key", label: "NFC card key" },
    ],
    specs: [
      { label: "Year", value: "2025" },
      { label: "Motor", value: "Single motor FWD" },
      { label: "Power", value: "201 hp" },
      { label: "Range", value: "530 km (NEDC)" },
      { label: "Fast charge", value: "30–80% in 30 min" },
      { label: "Seats", value: "7" },
    ],
    terms: [
      "Delivered with at least 80% charge; return with 50% or more to avoid a charging fee.",
      ...STANDARD_TERMS.slice(0, 1),
      ...STANDARD_TERMS.slice(2),
    ],
    reviews: [
      { id: "r1", name: "Kartika Sari", city: "Surabaya", date: "2026-09-17", rating: 5, text: "So quiet the kids fell asleep instantly. Charging card worked at every station we tried." },
    ],
  },
};

const FALLBACK: Omit<CarDetail, "bodyType"> = {
  description: "A well-maintained car from the CARENT fleet, cleaned and inspected before every rental.",
  features: [
    { icon: "air", label: "Air conditioning" },
    { icon: "bluetooth", label: "Bluetooth audio" },
    { icon: "shield", label: "Basic insurance" },
  ],
  specs: [],
  terms: STANDARD_TERMS,
  reviews: [],
};

/** Detail content for a car, with a generic fallback for cars added later. */
export function detailFor(car: Car): CarDetail {
  return CAR_DETAILS[car.slug] ?? { ...FALLBACK, bodyType: car.category };
}

/** Gallery for a car: detail gallery or the catalogue photo. */
export function galleryFor(car: Car): GalleryImage[] {
  return detailFor(car).gallery ?? [{ src: car.image, alt: car.name, crop: car.crop }];
}
