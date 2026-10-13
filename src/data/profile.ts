/**
 * Profile screen mocks (Figma "Profile/Default" 233:41637 / 233:42393).
 * The user, tab labels and the booking seed come from the Figma text; the
 * extra fields (phone, address, reviews, settings) are realistic mock values.
 */

export type ProfileTabId = "profile" | "active" | "history" | "settings";

export type ProfileTab = { id: ProfileTabId; label: string; icon: string };

/** Figma "Tab profile" (89:31532) — order as designed. */
export const PROFILE_TABS: ProfileTab[] = [
  { id: "profile", label: "About me", icon: "/images/profile/tab-about.png" },
  { id: "active", label: "Active rental", icon: "/images/profile/tab-active.png" },
  { id: "history", label: "Transaction History", icon: "/images/profile/tab-history.png" },
  { id: "settings", label: "Account setting", icon: "/images/profile/tab-setting.png" },
];

export function isProfileTab(v: string | null | undefined): v is ProfileTabId {
  return PROFILE_TABS.some((t) => t.id === v);
}

export type ProfileDetails = {
  name: string;
  email: string;
  phone: string;
  address: string;
  /** Data URL of an uploaded photo; falls back to DEFAULT_AVATAR. */
  avatar?: string;
};

export const DEFAULT_AVATAR = "/images/profile/avatar.png";

/** Shown when nobody is signed in (the page never blocks). */
export const MOCK_USER: ProfileDetails = {
  name: "John Doe",
  email: "johndoe244@gmail.com",
  phone: "+62 812 3456 7890",
  address: "Jl. Malioboro No. 52, Yogyakarta",
};

export type BookingStatus = "Not yet paid off" | "Paid" | "Completed";

export type BookingSeed = {
  id: string;
  carId: string;
  /** ISO dates (yyyy-mm-dd). */
  from: string;
  to: string;
  total: number;
  status: BookingStatus;
  code: string;
};

/** Seeded into localStorage `carent:bookings` the first time it is empty. */
export const SEED_BOOKINGS: BookingSeed[] = [
  { id: "b-220017", carId: "c01", from: "2026-10-02", to: "2026-10-06", total: 340.99, status: "Not yet paid off", code: "TRK220017" },
  { id: "b-220031", carId: "c03", from: "2026-10-18", to: "2026-10-21", total: 389.97, status: "Paid", code: "TRK220031" },
  { id: "b-219874", carId: "c02", from: "2026-08-11", to: "2026-08-14", total: 329.97, status: "Completed", code: "TRK219874" },
  { id: "b-219502", carId: "c10", from: "2026-06-20", to: "2026-06-24", total: 359.96, status: "Completed", code: "TRK219502" },
  { id: "b-219133", carId: "c08", from: "2026-04-03", to: "2026-04-05", total: 239.98, status: "Completed", code: "TRK219133" },
];

export const BOOKING_TONE = {
  "Not yet paid off": "yellow",
  Paid: "green",
  Completed: "grey",
} as const;

export type MyReview = { id: string; carId: string; rating: number; date: string; text: string };

/** "Show my review" modal. */
export const MY_REVIEWS: MyReview[] = [
  { id: "r1", carId: "c02", rating: 5, date: "15 August 2026", text: "Clean car, smooth pick-up at the airport and the hybrid barely needed fuel for the whole trip." },
  { id: "r2", carId: "c10", rating: 4, date: "25 June 2026", text: "Plenty of room for the family and luggage. Return took a little longer than expected." },
  { id: "r3", carId: "c08", rating: 5, date: "6 April 2026", text: "So much fun on the coastal roads. Would rent the BRZ again in a heartbeat." },
];

export type SettingToggle = { id: "email" | "sms" | "promo"; label: string; hint: string };

export const SETTING_TOGGLES: SettingToggle[] = [
  { id: "email", label: "Email notifications", hint: "Booking confirmations and receipts" },
  { id: "sms", label: "SMS reminders", hint: "A reminder the day before pick-up" },
  { id: "promo", label: "Promo newsletter", hint: "Discounts and seasonal deals" },
];

export const DRIVER_OPTIONS = ["With driver", "Without driver"] as const;
export type DriverOption = (typeof DRIVER_OPTIONS)[number];

export type AccountSettings = Record<SettingToggle["id"], boolean> & { driver: DriverOption };

export const DEFAULT_SETTINGS: AccountSettings = { email: true, sms: true, promo: false, driver: "Without driver" };
