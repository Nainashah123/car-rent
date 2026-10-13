"use client";

import Image from "next/image";
import { useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import {
  IconAirConditioning,
  IconArmchair,
  IconBattery3,
  IconBluetooth,
  IconGauge,
  IconCamera,
  IconChevronDown,
  IconDeviceTv,
  IconBabyCarriage,
  IconEngine,
  IconGasStation,
  IconKey,
  IconLuggage,
  IconManualGearbox,
  IconMapPin,
  IconMusic,
  IconShieldCheck,
  IconSteeringWheel,
  IconStarFilled,
  IconSun,
  IconUsb,
  IconWifi,
  type Icon,
} from "@tabler/icons-react";
import { BODY_ICON, type CarDetail, type FeatureIcon, type Review } from "@/data/carDetails";
import type { Car } from "@/data/cars";
import { cn } from "@/lib/cn";

const TABS = ["Description", "Facilities", "Review"] as const;
type Tab = (typeof TABS)[number];

const FEATURE_ICONS: Record<FeatureIcon, Icon> = {
  air: IconAirConditioning,
  bluetooth: IconBluetooth,
  usb: IconUsb,
  camera: IconCamera,
  gps: IconMapPin,
  cruise: IconGauge,
  engine: IconEngine,
  seat: IconArmchair,
  wifi: IconWifi,
  luggage: IconLuggage,
  shield: IconShieldCheck,
  battery: IconBattery3,
  music: IconMusic,
  sun: IconSun,
  key: IconKey,
  steering: IconSteeringWheel,
  child: IconBabyCarriage,
  tv: IconDeviceTv,
};

/** Figma "Frame 2147241011" tab bar + the panel under it. */
export function DetailTabs({ car, detail }: { car: Car; detail: CarDetail }) {
  const [tab, setTab] = useState<Tab>("Description");
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: KeyboardEvent, i: number) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + TABS.length) % TABS.length;
    setTab(TABS[next]);
    refs.current[next]?.focus();
  }

  return (
    <div className="flex w-full flex-col gap-6 lg:gap-8">
      <div role="tablist" aria-label="Car information" className="flex w-full items-start">
        {TABS.map((t, i) => {
          const on = t === tab;
          return (
            <button
              key={t}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${i}`}
              aria-selected={on}
              aria-controls={`${base}-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setTab(t)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "flex flex-1 items-center justify-center px-3 py-2 text-[16px] leading-[1.3] whitespace-nowrap transition-colors lg:w-[132px] lg:flex-none lg:px-4 lg:py-3 lg:text-[20px] lg:leading-[1.4] lg:tracking-[-0.2px]",
                on ? "border-b border-neutral-900 font-medium text-neutral-900" : "text-neutral-400 hover:text-neutral-900",
              )}
            >
              {t}
            </button>
          );
        })}
      </div>
      {TABS.map((t, i) => (
        <div
          key={t}
          role="tabpanel"
          id={`${base}-panel-${i}`}
          aria-labelledby={`${base}-tab-${i}`}
          hidden={t !== tab}
          className="w-full"
        >
          {t === "Description" && <DescriptionPanel car={car} detail={detail} />}
          {t === "Facilities" && <FacilitiesPanel detail={detail} />}
          {t === "Review" && <ReviewPanel car={car} reviews={detail.reviews} />}
        </div>
      ))}
    </div>
  );
}

function DescriptionPanel({ car, detail }: { car: Car; detail: CarDetail }) {
  const specs = [
    { icon: IconManualGearbox, label: detail.transmission ?? car.transmission },
    { icon: IconGasStation, label: car.fuel },
    { icon: IconArmchair, label: String(detail.seats ?? car.seats) },
  ];
  return (
    <div data-detail="description" className="flex w-full flex-col items-start gap-4">
      <span className="flex h-10 items-center justify-center gap-2.5 rounded-xl border border-chip-stroke bg-white px-3 text-[16px] leading-[1.4] font-medium text-black">
        <span className="relative size-5 shrink-0 overflow-hidden" aria-hidden>
          <span className="absolute block" style={{ left: "-11.67%", top: "15.64%", width: "123.33%", height: "69.07%" }}>
            <Image src={BODY_ICON[car.category]} alt="" fill sizes="25px" className="object-fill" />
          </span>
        </span>
        {detail.bodyType}
      </span>
      <ul className="flex items-center gap-8">
        {specs.map(({ icon: SpecIcon, label }) => (
          <li key={label} className="flex items-center gap-2">
            <SpecIcon className="size-4 text-neutral-900 lg:size-5" stroke={1.5} aria-hidden />
            <span className="text-[14px] leading-[1.2] whitespace-nowrap text-neutral-900 lg:text-[16px] lg:leading-[1.4]">{label}</span>
          </li>
        ))}
      </ul>
      <p className="text-[16px] leading-[1.3] font-medium text-neutral-900 lg:text-[20px] lg:leading-[1.4] lg:tracking-[-0.2px]">{detail.description}</p>
    </div>
  );
}

function SubTitle({ children }: { children: string }) {
  return <h2 className="text-[18px] leading-[1.3] font-medium text-neutral-900 lg:text-[24px] lg:leading-[1.2]">{children}</h2>;
}

function FacilitiesPanel({ detail }: { detail: CarDetail }) {
  return (
    <div className="flex w-full flex-col gap-8">
      <section className="flex flex-col gap-4">
        <SubTitle>What&apos;s included</SubTitle>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {detail.features.map((f) => {
            const FIcon = FEATURE_ICONS[f.icon];
            return (
              <li key={f.label} className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-pill bg-neutral-50 text-neutral-900">
                  <FIcon className="size-5" stroke={1.5} aria-hidden />
                </span>
                <span className="text-[14px] leading-[1.2] text-neutral-900 lg:text-[16px] lg:leading-[1.4]">{f.label}</span>
              </li>
            );
          })}
        </ul>
      </section>
      {detail.specs.length > 0 && (
        <section className="flex flex-col gap-4">
          <SubTitle>Specification</SubTitle>
          <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-neutral-100 sm:grid-cols-3">
            {detail.specs.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 border-neutral-100 p-4 not-last:border-b sm:border-r">
                <dt className="text-[12px] leading-[1.4] text-neutral-400 lg:text-[14px]">{s.label}</dt>
                <dd className="text-[14px] leading-[1.2] font-medium text-neutral-900 lg:text-[16px] lg:leading-[1.4]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
      <section className="flex flex-col gap-4">
        <SubTitle>Rental terms</SubTitle>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-[14px] leading-[1.4] text-neutral-500 lg:text-[16px]">
          {detail.terms.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("flex items-center gap-0.5", className)} aria-label={`${value} out of 5 stars`} role="img">
      {[1, 2, 3, 4, 5].map((n) => (
        <IconStarFilled key={n} className={cn("size-3.5 lg:size-4", n <= Math.round(value) ? "text-warning-600" : "text-neutral-100")} aria-hidden />
      ))}
    </span>
  );
}

const SORTS = { newest: "Newest first", highest: "Highest rating", lowest: "Lowest rating" } as const;
type Sort = keyof typeof SORTS;
const PAGE = 3;

function formatReviewDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function ReviewPanel({ car, reviews }: { car: Car; reviews: Review[] }) {
  const [sort, setSort] = useState<Sort>("newest");
  const [shown, setShown] = useState(PAGE);
  const sortId = useId();

  const sorted = useMemo(() => {
    const list = [...reviews];
    if (sort === "newest") list.sort((a, b) => b.date.localeCompare(a.date));
    if (sort === "highest") list.sort((a, b) => b.rating - a.rating || b.date.localeCompare(a.date));
    if (sort === "lowest") list.sort((a, b) => a.rating - b.rating || b.date.localeCompare(a.date));
    return list;
  }, [reviews, sort]);

  const dist = [5, 4, 3, 2, 1].map((s) => ({ s, n: reviews.filter((r) => r.rating === s).length }));

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-6 rounded-3xl border border-neutral-100 p-5 sm:flex-row sm:items-center lg:gap-10">
        <div className="flex flex-col gap-1">
          <p className="font-display text-[40px] leading-[1.2] text-neutral-900">{car.rating.toFixed(1)}</p>
          <Stars value={car.rating} />
          <p className="text-[14px] leading-[1.4] text-neutral-400">Based on {car.reviews} reviews</p>
        </div>
        <ul className="flex flex-1 flex-col gap-1.5" aria-label="Ratings in latest reviews">
          {dist.map(({ s, n }) => (
            <li key={s} className="flex items-center gap-3 text-[12px] leading-[1.4] text-neutral-500 lg:text-[14px]">
              <span className="w-3">{s}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-pill bg-neutral-100">
                <span className="block h-full rounded-pill bg-warning-600" style={{ width: reviews.length ? `${(n / reviews.length) * 100}%` : 0 }} />
              </span>
              <span className="w-4 text-right">{n}</span>
            </li>
          ))}
        </ul>
      </div>

      {reviews.length === 0 ? (
        <p className="text-[16px] leading-[1.4] text-neutral-400">No written reviews yet. Be the first to rent this car!</p>
      ) : (
        <>
          <div className="flex items-center justify-between gap-3">
            <SubTitle>{`Latest reviews (${reviews.length})`}</SubTitle>
            <label htmlFor={sortId} className="sr-only">
              Sort reviews
            </label>
            <div className="relative flex h-10 items-center rounded-pill border border-stroke bg-white shadow-field focus-within:border-neutral-900">
              <select
                id={sortId}
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value as Sort);
                  setShown(PAGE);
                }}
                className="h-full cursor-pointer appearance-none bg-transparent pr-9 pl-4 text-[14px] leading-[1.2] text-neutral-900 outline-none"
              >
                {Object.entries(SORTS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
              <IconChevronDown className="pointer-events-none absolute right-3 size-4 text-neutral-900" stroke={1.5} aria-hidden />
            </div>
          </div>
          <ul className="flex flex-col">
            {sorted.slice(0, shown).map((r) => (
              <li key={r.id} className="flex flex-col gap-2 border-b border-neutral-100 py-4 first:pt-0">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-pill bg-primary-50 text-[14px] font-medium text-primary-500">
                    {r.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="truncate text-[14px] leading-[1.4] font-medium text-neutral-900 lg:text-[16px]">{r.name}</p>
                    <p className="text-[12px] leading-[1.4] text-neutral-400 lg:text-[14px]">
                      {r.city} · <time dateTime={r.date}>{formatReviewDate(r.date)}</time>
                    </p>
                  </div>
                  <Stars value={r.rating} />
                </div>
                <p className="text-[14px] leading-[1.4] text-neutral-900 lg:text-[16px]">{r.text}</p>
              </li>
            ))}
          </ul>
          {shown < sorted.length ? (
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE)}
              className="self-start rounded-pill border border-stroke bg-white px-4 py-2.5 text-[14px] leading-[1.2] font-medium text-neutral-900 hover:bg-neutral-50 lg:text-[16px] lg:leading-[1.4]"
            >
              Show more reviews
            </button>
          ) : (
            sorted.length > PAGE && (
              <button
                type="button"
                onClick={() => setShown(PAGE)}
                className="self-start rounded-pill border border-stroke bg-white px-4 py-2.5 text-[14px] leading-[1.2] font-medium text-neutral-900 hover:bg-neutral-50 lg:text-[16px] lg:leading-[1.4]"
              >
                Show fewer
              </button>
            )
          )}
        </>
      )}
    </div>
  );
}
