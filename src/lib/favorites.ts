"use client";

import { useSyncExternalStore } from "react";

const KEY = "carent:favorites";
const listeners = new Set<() => void>();

function read(): string {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

export function toggleFavorite(id: string) {
  const ids = new Set<string>(JSON.parse(read()) as string[]);
  if (ids.has(id)) ids.delete(id);
  else ids.add(id);
  try {
    localStorage.setItem(KEY, JSON.stringify([...ids]));
  } catch {}
  listeners.forEach((l) => l());
  return ids.has(id);
}

/** Favourite car ids (JSON string snapshot keeps the store stable). */
export function useFavorites(): string[] {
  const raw = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    read,
    () => "[]",
  );
  return JSON.parse(raw) as string[];
}
