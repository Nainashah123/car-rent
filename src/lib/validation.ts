/**
 * Client-side form rules shared by the auth and settings forms. Each returns
 * the message to show under the field, or undefined when the value is fine.
 * Server actions must re-check these once auth is wired up.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function emailError(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Enter your email address.";
  if (!EMAIL.test(v)) return "Enter a valid email address.";
  return undefined;
}

export function nameError(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Enter your full name.";
  if (v.length < 2) return "Name must be at least 2 characters.";
  return undefined;
}

/** Sign-in only checks presence; strength rules apply when a password is set. */
export function loginPasswordError(value: string): string | undefined {
  if (!value) return "Enter your password.";
  if (value.length < 8) return "Password must be at least 8 characters.";
  return undefined;
}

export function newPasswordError(value: string): string | undefined {
  if (!value) return "Enter a password.";
  if (value.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value))
    return "Use at least one letter and one number.";
  return undefined;
}

export function confirmError(password: string, confirm: string): string | undefined {
  if (!confirm) return "Confirm your password.";
  if (confirm !== password) return "Password not matched. Check again";
  return undefined;
}

/** Drops undefined entries so `Object.keys(errors).length` means "has errors". */
export function compact<T extends Record<string, string | undefined>>(errors: T) {
  return Object.fromEntries(Object.entries(errors).filter(([, v]) => v)) as Partial<T>;
}

/** Remembers the reset email between the reset and confirmation-code steps. */
export const RESET_EMAIL_KEY = "carent:reset-email";

/** Required short text (first / last name, subject). */
export function requiredNameError(value: string, label: string): string | undefined {
  const v = value.trim();
  if (!v) return `Enter your ${label}.`;
  if (v.length < 2) return `${label[0].toUpperCase()}${label.slice(1)} must be at least 2 characters.`;
  return undefined;
}

/** Contact form message: enough detail for support to act on. */
export function contactMessageError(value: string, min = 20, max = 1000): string | undefined {
  const v = value.trim();
  if (!v) return "Tell us how we can help.";
  if (v.length < min) return `Please add a little more detail (at least ${min} characters).`;
  if (v.length > max) return `Keep your message under ${max} characters.`;
  return undefined;
}

/** Profile: international or local phone, 8–15 digits with optional + / spaces / dashes. */
export function phoneError(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Enter your phone number.";
  if (!/^\+?[\d\s()-]+$/.test(v)) return "Use digits, spaces, dashes or a leading +.";
  const digits = v.replace(/\D/g, "").length;
  if (digits < 8 || digits > 15) return "Phone number must have 8 to 15 digits.";
  return undefined;
}

export function addressError(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Enter your address.";
  if (v.length < 8) return "Address looks too short.";
  return undefined;
}

/* ---------- Search (/cars): price range + trip editor ---------- */

/** Price fields hold whole dollars; empty means "no limit" for that side. */
export function priceFieldError(value: string, ceil: number): string | undefined {
  const v = value.trim().replace(/^\$/, "");
  if (!v) return undefined;
  if (!/^\d+$/.test(v)) return "Use whole dollars, e.g. 120.";
  if (Number(v) > ceil) return `Max is $${ceil}.`;
  return undefined;
}

export function priceRangeError(min: number, max: number): string | undefined {
  if (min > max) return "Min price must be below max price.";
  return undefined;
}

export function tripCityError(value: string): string | undefined {
  if (!value.trim()) return "Choose a pick-up city.";
  return undefined;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function pickupDateError(value: string): string | undefined {
  if (!value) return "Choose a pick-up date.";
  if (!ISO_DATE.test(value)) return "Enter a valid date.";
  return undefined;
}

export function returnDateError(from: string, to: string): string | undefined {
  if (!to) return "Choose a return date.";
  if (!ISO_DATE.test(to)) return "Enter a valid date.";
  if (ISO_DATE.test(from)) {
    const days = (Date.parse(to) - Date.parse(from)) / 86_400_000;
    if (days < 1) return "Return must be at least 1 day after pick-up.";
    if (days > 365) return "Rentals can last up to 1 year.";
  }
  return undefined;
}

export function keywordError(value: string): string | undefined {
  if (value.trim().length > 40) return "Keep the keyword under 40 characters.";
  return undefined;
}

/* ---------- Home search card ---------- */

/** City must be one we serve (case-insensitive). Returns the error message. */
export function cityError(value: string, cities: readonly string[]): string | undefined {
  const v = value.trim();
  if (!v) return "Enter a pick-up city.";
  if (!cities.some((c) => c.toLowerCase() === v.toLowerCase()))
    return `We don't serve that city yet. Try ${cities.slice(0, 3).join(", ")}…`;
  return undefined;
}

/** Local YYYY-MM-DD for today. */
export function todayISO(now = new Date()) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
}

/** Start date: required, YYYY-MM-DD, not in the past, at most 90 days ahead. */
export function startDateError(value: string, now = new Date()): string | undefined {
  if (!value) return "Choose a start date.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) return "Enter a valid date.";
  const today = todayISO(now);
  if (value < today) return "Start date can't be in the past.";
  const max = new Date(now);
  max.setDate(max.getDate() + 90);
  if (value > todayISO(max)) return "You can book up to 90 days ahead.";
  return undefined;
}

/** Pick-up time: required HH:MM; if the date is today it must be later than now. */
export function pickupTimeError(time: string, date: string, now = new Date()): string | undefined {
  if (!time) return "Choose a pick-up time.";
  if (!/^\d{2}:\d{2}$/.test(time)) return "Enter a valid time.";
  if (date === todayISO(now)) {
    const [h, m] = time.split(":").map(Number);
    if (h * 60 + m <= now.getHours() * 60 + now.getMinutes()) return "Pick a time later than now.";
  }
  return undefined;
}

/* ---------- Car detail booking card ---------- */

/** Booking pick-up: required, valid, not in the past, at most 180 days ahead. */
export function bookingPickupError(value: string, now = new Date()): string | undefined {
  if (!value) return "Choose a pick-up date.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) return "Enter a valid date.";
  if (value < todayISO(now)) return "Pick-up date can't be in the past.";
  const max = new Date(now);
  max.setDate(max.getDate() + 180);
  if (value > todayISO(max)) return "You can book up to 180 days ahead.";
  return undefined;
}

/** Hourly rental length: one of the offered options. */
export function rentalHoursError(hours: number, options: readonly number[]): string | undefined {
  if (!hours) return "Choose how many hours.";
  if (!options.includes(hours)) return "Choose a valid duration.";
  return undefined;
}
