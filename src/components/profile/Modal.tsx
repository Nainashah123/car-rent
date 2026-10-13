"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { IconX } from "@tabler/icons-react";

/** Centered dialog: closes on Esc, backdrop click and the X button; locks page scroll. */
export function Modal({ title, onClose, children, footer }: { title: string; onClose: () => void; children: ReactNode; footer?: ReactNode }) {
  const id = useId();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" role="presentation">
      <div className="absolute inset-0 bg-black/40" aria-hidden onClick={onClose} data-testid="modal-backdrop" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={id}
        tabIndex={-1}
        className="relative flex max-h-[calc(100dvh-32px)] w-full max-w-[480px] flex-col gap-5 overflow-y-auto rounded-[20px] bg-white p-5 shadow-field outline-none lg:rounded-card lg:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={id} className="font-display text-[24px] leading-[1.2] text-neutral-900 lg:text-[32px]">
            {title}
          </h2>
          <button type="button" aria-label="Close" onClick={onClose} className="flex shrink-0 items-center justify-center rounded-pill p-1 text-neutral-900 hover:bg-neutral-50">
            <IconX size={20} stroke={1.5} />
          </button>
        </div>
        {children}
        {footer && <div className="flex flex-wrap justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}
