import Image from "next/image";
import Link from "next/link";
import { VEHICLE_TYPES } from "@/data/home";

/** Figma 232:21825 (desktop 1440×377) / 232:22222 (mobile 375×168). Each type opens Search filtered by it. */
export function VehicleTypes() {
  return (
    <section data-home="types" aria-label="Browse by vehicle type" className="mx-auto w-full max-w-[1440px] bg-white py-6 lg:px-[60px] lg:pt-0 lg:pb-[60px]">
      <ul data-swipe className="relative flex snap-x gap-6 overflow-x-auto px-4 [scrollbar-width:none] lg:justify-center lg:gap-16 lg:overflow-visible lg:px-0">
        {VEHICLE_TYPES.map((t) => (
          <li key={t.category} className="shrink-0 snap-start">
            <Link
              href={`/cars?type=${encodeURIComponent(t.category)}`}
              className="group flex flex-col items-center rounded-[24px] outline-offset-4"
              aria-label={`Browse ${t.category} rentals`}
            >
              <span className="relative block size-[98px] overflow-hidden lg:size-[288px]">
                <span
                  className="absolute block transition-transform duration-300 group-hover:scale-105"
                  style={{ left: `${t.crop.left}%`, top: `${t.crop.top}%`, width: `${t.crop.width}%`, height: `${t.crop.height}%` }}
                >
                  <Image src={t.image} alt="" fill sizes="(min-width:1024px) 360px, 125px" className="object-fill" />
                </span>
              </span>
              <span className="font-display text-[18px] leading-[1.2] text-black group-hover:underline lg:text-[24px]">{t.category}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
