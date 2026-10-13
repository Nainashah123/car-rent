"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_SETTINGS, SEED_BOOKINGS, type AccountSettings, type ProfileDetails } from "@/data/profile";
import { BOOKINGS_KEY } from "@/lib/bookings";

/**
 * Profile-only mock stores (localStorage):
 * - `carent:profile`  edited details (phone, address, photo…) on top of the session user
 * - `carent:settings` Account setting toggles / radio
 * Both keep a JSON string snapshot so useSyncExternalStore stays stable.
 */
const PROFILE_KEY = "carent:profile";
const SETTINGS_KEY = "carent:settings";
const SEEDED_KEY = "carent:bookings-seeded";

const listeners = new Set<() => void>();

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function parse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function useProfileOverrides(): Partial<ProfileDetails> {
  const raw = useSyncExternalStore(subscribe, () => read(PROFILE_KEY), () => null);
  return parse<Partial<ProfileDetails>>(raw) ?? {};
}

export function saveProfile(details: Partial<ProfileDetails>) {
  write(PROFILE_KEY, details);
}

export function useAccountSettings(): AccountSettings {
  const raw = useSyncExternalStore(subscribe, () => read(SETTINGS_KEY), () => null);
  return { ...DEFAULT_SETTINGS, ...(parse<Partial<AccountSettings>>(raw) ?? {}) };
}

export function saveSettings(next: AccountSettings) {
  write(SETTINGS_KEY, next);
}

/**
 * First visit: merge the Figma example bookings into `carent:bookings`
 * (kept alongside anything booked from a car detail page). Runs once per browser.
 */
export function seedBookingsOnce() {
  try {
    if (localStorage.getItem(SEEDED_KEY)) return;
    const existing = parse<{ id: string }[]>(localStorage.getItem(BOOKINGS_KEY)) ?? [];
    const ids = new Set(existing.map((b) => b.id));
    const merged = [...existing, ...SEED_BOOKINGS.filter((b) => !ids.has(b.id))];
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(merged));
    localStorage.setItem(SEEDED_KEY, "1");
    // The bookings store listens for storage events on its key.
    window.dispatchEvent(new StorageEvent("storage", { key: BOOKINGS_KEY }));
  } catch {}
}
