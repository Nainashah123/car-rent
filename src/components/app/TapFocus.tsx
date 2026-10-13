"use client";

import { useEffect } from "react";

const FIELD =
  ':scope > input:not([type="checkbox"], [type="radio"], [type="file"], [hidden]), :scope > textarea, :scope > select';

/**
 * Text fields are drawn as a bordered box around a 20px-tall input, so a tap
 * on the box's padding would miss the input. A tap anywhere in such a box
 * focuses its field. Renders nothing.
 */
export function TapFocus() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target || target.closest("input, textarea, select, button, a, label")) return;
      // The box is the target or one level up (an icon inside it).
      for (const box of [target, target.parentElement]) {
        const field = box?.querySelector<HTMLElement>(FIELD);
        if (field) {
          field.focus();
          return;
        }
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
