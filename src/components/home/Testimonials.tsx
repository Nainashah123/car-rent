"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TESTIMONIALS, TESTIMONIAL_PHOTO } from "@/data/home";
import { cn } from "@/lib/cn";

const INTERVAL = 6000;

/**
 * Figma 232:21973 (desktop 1440×667) / 232:22370 (mobile 375×812).
 * Review card over a photo; the five bars ("Frame 53") pick a review and
 * it auto-advances every 6s (paused on hover/focus or reduced motion).
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = TESTIMONIALS[index];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), INTERVAL);
    return () => window.clearTimeout(id);
  }, [index, paused]);

  return (
    <section
      data-home="reviews"
      aria-roledescription="carousel"
      aria-label="Customer reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative mx-auto flex h-[812px] w-full max-w-[1440px] flex-col items-center justify-end overflow-hidden bg-white px-4 py-5 lg:block lg:h-[667px] lg:bg-neutral-50 lg:p-0"
    >
      <Image
        src={TESTIMONIAL_PHOTO}
        alt=""
        fill
        sizes="(min-width:1024px) 1440px, 1440px"
        className="object-cover object-[70%_center] lg:object-center"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[390px] bg-gradient-to-b from-base-black/0 to-base-black" />

      <figure
        aria-live="polite"
        className="relative flex h-[408px] w-full flex-col items-start justify-between rounded-[20px] bg-white p-10 lg:absolute lg:top-[60px] lg:left-[60px] lg:h-[547px] lg:w-[666px] lg:rounded-[40px] lg:bg-neutral-50"
      >
        <p className="flex items-center gap-2">
          <Image src="/images/home/star.png" alt="" width={56} height={56} className="size-[25px] lg:size-14" />
          <span className="font-display text-[28px] leading-[1.2] text-ink lg:text-[32px] lg:font-medium lg:text-neutral-900">
            <span className="sr-only">Rated </span>
            {t.rating.toFixed(1)}
          </span>
        </p>
        <div key={t.id} className="flex w-full flex-col gap-6">
          <figcaption className="flex items-center gap-3">
            <span aria-hidden className="size-6 rounded-full bg-stroke lg:size-7" />
            <span className="text-[14px] leading-[1.2] font-medium text-ink lg:text-[16px] lg:leading-[1.4] lg:text-neutral-900">{t.name}</span>
          </figcaption>
          <blockquote className="font-display text-[28px] leading-[1.2] text-ink lg:text-[40px] lg:text-neutral-900">{t.quote}</blockquote>
        </div>
      </figure>

      <div
        role="group"
        aria-label="Choose review"
        className="relative z-10 order-first mb-2 flex items-center gap-3 lg:absolute lg:top-[583px] lg:left-[1132px] lg:mb-0"
      >
        {TESTIMONIALS.map((r, i) => (
          <button
            key={r.id}
            type="button"
            aria-pressed={i === index}
            aria-label={`Review ${i + 1} of ${TESTIMONIALS.length}, ${r.name}`}
            onClick={() => setIndex(i)}
            data-tap="height"
            className="flex h-11 w-10 items-center"
          >
            <span className={cn("h-1 w-10 bg-stroke transition-opacity", i === index ? "opacity-100" : "opacity-30 hover:opacity-60")} />
          </button>
        ))}
      </div>
    </section>
  );
}
