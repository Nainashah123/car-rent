"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { IconCalendarEvent } from "@tabler/icons-react";
import { CarPhoto } from "@/components/cars/CarCard";
import { toast } from "@/components/app/Toaster";
import { Modal } from "@/components/profile/Modal";
import { panelCard } from "@/components/profile/styles";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { CARS, formatPrice, type Car } from "@/data/cars";
import { BOOKING_TONE } from "@/data/profile";
import { removeBooking, updateBookingStatus, useBookings, type Booking } from "@/lib/bookings";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m: m - 1, d };
}

/** "2-6 October 2026", "28 September - 2 October 2026", "2 October 2026". */
export function formatRange(from: string, to: string) {
  const a = parts(from);
  const b = parts(to || from);
  if (a.y === b.y && a.m === b.m) return a.d === b.d ? `${a.d} ${MONTHS[a.m]} ${a.y}` : `${a.d}-${b.d} ${MONTHS[a.m]} ${a.y}`;
  if (a.y === b.y) return `${a.d} ${MONTHS[a.m].slice(0, 3)} - ${b.d} ${MONTHS[b.m].slice(0, 3)} ${a.y}`;
  return `${a.d} ${MONTHS[a.m].slice(0, 3)} ${a.y} - ${b.d} ${MONTHS[b.m].slice(0, 3)} ${b.y}`;
}

type Pending = { kind: "pay" | "cancel"; booking: Booking; car: Car };

/** Active rental / Transaction History lists, built from the "Card list car" List variant. */
export function BookingsPanel({ mode }: { mode: "active" | "history" }) {
  const all = useBookings();
  const [pending, setPending] = useState<Pending | null>(null);

  const rows = all
    .filter((b) => (mode === "history" ? b.status === "Completed" : b.status !== "Completed"))
    .map((b) => ({ booking: b, car: CARS.find((c) => c.id === b.carId) }))
    .filter((r): r is { booking: Booking; car: Car } => Boolean(r.car))
    .sort((x, y) => (mode === "history" ? y.booking.from.localeCompare(x.booking.from) : x.booking.from.localeCompare(y.booking.from)));

  function confirm() {
    if (!pending) return;
    if (pending.kind === "pay") {
      updateBookingStatus(pending.booking.id, "Paid");
      toast(`Payment received for ${pending.car.name}`);
    } else {
      removeBooking(pending.booking.id);
      toast("Booking cancelled", "info");
    }
    setPending(null);
  }

  const heading = mode === "history" ? "Transaction History" : "Active rental";

  return (
    <div className={`${panelCard} gap-5 lg:gap-6`}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-display text-[24px] leading-[1.2] text-neutral-900 lg:text-[32px]">{heading}</h2>
        <span className="text-[14px] leading-[1.4] text-neutral-400 lg:text-[16px]">
          {rows.length} {rows.length === 1 ? "booking" : "bookings"}
        </span>
      </div>

      {rows.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-[16px] bg-neutral-50 px-5 py-10 text-center">
          <p className="text-[14px] leading-[1.4] text-neutral-500 lg:text-[16px]">
            {mode === "history" ? "No finished rentals yet." : "You have no active rentals."}
          </p>
          <ButtonLink href="/cars" variant="primary">
            Find a car
          </ButtonLink>
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-neutral-100">
          {rows.map(({ booking, car }) => (
            <li key={booking.id} className="py-4 first:pt-0 last:pb-0 lg:py-5">
              <BookingCard booking={booking} car={car}>
                {mode === "history" ? (
                  <ButtonLink href={`/cars/${car.slug}`} variant="black" size="sm">
                    Rent again
                  </ButtonLink>
                ) : (
                  <>
                    <Button variant="white" size="sm" onClick={() => setPending({ kind: "cancel", booking, car })}>
                      Cancel booking
                    </Button>
                    {booking.status === "Not yet paid off" && (
                      <Button variant="primary" size="sm" onClick={() => setPending({ kind: "pay", booking, car })}>
                        Pay now
                      </Button>
                    )}
                  </>
                )}
              </BookingCard>
            </li>
          ))}
        </ul>
      )}

      {pending && (
        <Modal
          title={pending.kind === "pay" ? "Pay for this booking?" : "Cancel this booking?"}
          onClose={() => setPending(null)}
          footer={
            <>
              <Button variant="white" onClick={() => setPending(null)}>
                {pending.kind === "pay" ? "Not now" : "Keep booking"}
              </Button>
              <Button variant={pending.kind === "pay" ? "primary" : "black"} onClick={confirm}>
                {pending.kind === "pay" ? `Pay ${formatPrice(pending.booking.total)}` : "Cancel booking"}
              </Button>
            </>
          }
        >
          <p className="text-[14px] leading-[1.4] text-neutral-500 lg:text-[16px]">
            {pending.car.name} · {formatRange(pending.booking.from, pending.booking.to)} · {pending.booking.code}
            <br />
            {pending.kind === "pay"
              ? "The total will be charged to your saved payment method."
              : "Your reservation will be released and cannot be restored."}
          </p>
        </Modal>
      )}
    </div>
  );
}

/** Figma "Card list car" State=List (153:16892 desktop 566×151 / 153:17032 mobile 343×122). */
export function BookingCard({ booking, car, children }: { booking: Booking; car: Car; children?: ReactNode }) {
  const href = `/cars/${car.slug}`;
  return (
    <article className="flex w-full flex-col gap-3" data-booking={booking.id}>
      <div className="flex w-full items-start">
        <Link
          href={href}
          aria-label={car.name}
          tabIndex={-1}
          className="relative block size-[122px] shrink-0 overflow-hidden rounded-[16px] border border-card-stroke lg:size-[151px] lg:rounded-[26.45px]"
        >
          <CarPhoto car={car} sizes="151px" />
        </Link>
        <div className="flex h-[122px] min-w-0 flex-1 flex-col items-start justify-between p-3 lg:h-[151px]">
          <Tag tone={BOOKING_TONE[booking.status]}>{booking.status}</Tag>
          <div className="flex w-full flex-col items-start gap-1">
            <Link href={href} className="relative z-[1] max-w-full text-[14px] leading-[1.4] font-medium text-black hover:underline">
              {car.name}
            </Link>
            <p className="flex flex-wrap items-center gap-x-2 text-[12px] leading-[1.4] whitespace-nowrap text-neutral-400 lg:text-[14px]">
              <span className="flex items-center gap-2">
                <IconCalendarEvent className="size-3.5 lg:size-[14.5px]" stroke={1.5} aria-hidden />
                {formatRange(booking.from, booking.to)}
              </span>
              <span className="size-0.5 rounded-full bg-neutral-400" aria-hidden />
              <span>{booking.code}</span>
            </p>
          </div>
          <p className="text-[14px] leading-[1.2] font-semibold text-black lg:text-[16px] lg:leading-[1.4]">{formatPrice(booking.total)}</p>
        </div>
      </div>
      {children && <div className="flex flex-wrap justify-end gap-2">{children}</div>}
    </article>
  );
}
