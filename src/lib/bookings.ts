"use client";

import { useSyncExternalStore } from "react";

/**
 * Mock booking store (localStorage `carent:bookings`).
 * Written by the car detail booking card, read by Profile (active / history tabs).
 */
export const BOOKINGS_KEY = "carent:bookings";

export type BookingStatus = "Not yet paid off" | "Paid" | "Completed";

export type Booking = {
  id: string;
  /** `Car.id` from `src/data/cars.ts`. */
  carId: string;
  /** ISO date `YYYY-MM-DD`. */
  from: string;
  /** ISO date `YYYY-MM-DD` (same as `from` for hourly rentals). */
  to: string;
  total: number;
  status: BookingStatus;
  /** Human booking code, e.g. `CRN-7K2Q9P`. */
  code: string;
};

const listeners = new Set<() => void>();

function read(): string {
  try {
    return localStorage.getItem(BOOKINGS_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function parse(raw: string): Booking[] {
  try {
    const v = JSON.parse(raw) as unknown;
    return Array.isArray(v) ? (v as Booking[]) : [];
  } catch {
    return [];
  }
}

function write(list: Booking[]) {
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(list));
  } catch {}
  listeners.forEach((l) => l());
}

function randomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `CRN-${s}`;
}

/** Saves a new booking (status "Not yet paid off") and returns it. */
export function addBooking(input: Pick<Booking, "carId" | "from" | "to" | "total"> & Partial<Pick<Booking, "status">>): Booking {
  const booking: Booking = {
    id: `bk_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    carId: input.carId,
    from: input.from,
    to: input.to,
    total: Math.round(input.total * 100) / 100,
    status: input.status ?? "Not yet paid off",
    code: randomCode(),
  };
  write([booking, ...parse(read())]);
  return booking;
}

export function updateBookingStatus(id: string, status: BookingStatus) {
  write(parse(read()).map((b) => (b.id === id ? { ...b, status } : b)));
}

export function removeBooking(id: string) {
  write(parse(read()).filter((b) => b.id !== id));
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key === BOOKINGS_KEY && cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

/** All bookings, newest first. Empty on the server. */
export function useBookings(): Booking[] {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");
  return parse(raw);
}
