"use client";

import { useSyncExternalStore } from "react";
import { SESSION_KEY } from "@/data/auth";

export type SessionUser = { name: string; email: string };

const listeners = new Set<() => void>();

function read(): string | null {
  try {
    return sessionStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

/** Mock sign-in: remembers the user for this tab until sign-out. */
export function signIn(user: SessionUser) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch {}
  listeners.forEach((l) => l());
}

export function signOut() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** Raw JSON string so the snapshot is referentially stable. */
export function useSessionRaw() {
  return useSyncExternalStore(subscribe, read, () => null);
}

export function parseSession(raw: string | null): SessionUser | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}
