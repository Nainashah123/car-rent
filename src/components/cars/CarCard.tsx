"use client";

import Image from "next/image";
import Link from "next/link";
import { IconArmchair, IconGasStation, IconHeart, IconHeartFilled, IconManualGearbox } from "@tabler/icons-react";
import { toast } from "@/components/app/Toaster";
import { Tag } from "@/components/ui/Tag";
import { formatPrice, type Car } from "@/data/cars";
import { cn } from "@/lib/cn";
import { toggleFavorite, useFavorites } from "@/lib/favorites";

/**
 * Figma "Card list car" (60:4449).
 * - default: photo + name + specs (Home, 312w desktop / 161w mobile)
 * - result:  photo + name + price/day + specs + tag (Search)
 * Below lg both switch to the "Responsive=Yes" sizes automatically.
 */
export function CarCard({ car, variant = "result", className, sizes = "(min-width:1024px) 260px, 50vw" }: { car: Car; variant?: "default" | "result"; className?: string; sizes?: string }) {
  const favs = useFavorites();
  const fav = favs.includes(car.id);
  const href = `/cars/${car.slug}`;

  return (
    <article className={cn("relative flex min-w-0 flex-col items-start", className)}>
      <div className="relative h-[163px] w-full overflow-hidden rounded-[24px] border border-card-stroke lg:h-[245px]">
        <Link href={href} aria-label={car.name} className="absolute inset-0 block" tabIndex={-1}>
          <CarPhoto car={car} sizes={sizes} />
        </Link>
        <button
          type="button"
          aria-label={fav ? `Remove ${car.name} from favourites` : `Add ${car.name} to favourites`}
          aria-pressed={fav}
          onClick={() => {
            const on = toggleFavorite(car.id);
            toast(on ? "Added to favourites" : "Removed from favourites", "info");
          }}
          className="absolute top-1.5 right-1.5 z-10 flex items-start justify-end p-1.5 lg:top-3 lg:right-3 lg:p-0"
        >
          {/* Visual pill lives in a span so the button can grow to 44px on touch without changing the look. */}
          <span className="flex items-center rounded-pill bg-white p-1.5 text-neutral-900 lg:p-2">
            {fav ? (
              <IconHeartFilled className="size-3 text-primary-500 lg:size-4" />
            ) : (
              <IconHeart className="size-3 lg:size-4" stroke={1.5} />
            )}
          </span>
        </button>
      </div>
      <div className="flex w-full flex-col items-start gap-1 p-3">
        <Link
          href={href}
          className={cn(
            "w-full text-[14px] leading-[1.4] font-medium text-black hover:underline lg:text-[16px] lg:font-semibold",
          )}
        >
          {car.name}
        </Link>
        {variant === "result" && (
          <p className="flex items-start gap-2 text-[14px] leading-[1.4] whitespace-nowrap lg:text-[16px]">
            <span className="text-black">{formatPrice(car.pricePerDay)}</span>
            <span className="text-neutral-400">/day</span>
          </p>
        )}
        <CarSpecs car={car} />
        {variant === "result" && car.tag && <Tag tone={car.tag.tone}>{car.tag.text}</Tag>}
      </div>
    </article>
  );
}

/** Photo with the Figma crop (absolute % box) or object-cover. */
export function CarPhoto({ car, sizes, priority }: { car: Car; sizes: string; priority?: boolean }) {
  if (!car.crop) return <Image src={car.image} alt="" fill sizes={sizes} priority={priority} className="object-cover" />;
  const c = car.crop;
  return (
    <span
      className="absolute block"
      style={{ left: `${c.left}%`, top: `${c.top}%`, width: `${c.width}%`, height: `${c.height}%` }}
    >
      <Image src={car.image} alt="" fill sizes={sizes} priority={priority} className="object-fill" />
    </span>
  );
}

/** Transmission · fuel · seats row. */
export function CarSpecs({ car, className }: { car: Car; className?: string }) {
  const items = [
    { icon: IconManualGearbox, label: car.transmission },
    { icon: IconGasStation, label: car.fuel },
    { icon: IconArmchair, label: String(car.seats) },
  ];
  return (
    <ul className={cn("flex items-center gap-2 lg:gap-4", className)}>
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-1 lg:gap-2">
          <Icon className="size-2.5 text-neutral-400 lg:size-[14.5px]" stroke={1.5} aria-hidden />
          <span className="text-[11px] leading-[1.4] whitespace-nowrap text-neutral-400 lg:text-[14px]">{label}</span>
        </li>
      ))}
    </ul>
  );
}
