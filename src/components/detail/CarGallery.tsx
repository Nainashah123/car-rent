"use client";

import Image from "next/image";
import { useState } from "react";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { toast } from "@/components/app/Toaster";
import type { GalleryImage } from "@/data/carDetails";
import type { Car } from "@/data/cars";
import { cn } from "@/lib/cn";
import { toggleFavorite, useFavorites } from "@/lib/favorites";

function Photo({ img, sizes, priority }: { img: GalleryImage; sizes: string; priority?: boolean }) {
  if (!img.crop) return <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className="object-cover" />;
  const c = img.crop;
  return (
    <span className="absolute block" style={{ left: `${c.left}%`, top: `${c.top}%`, width: `${c.width}%`, height: `${c.height}%` }}>
      <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className="object-fill" />
    </span>
  );
}

/** Figma "Frame 33": main photo with favourite toggle; thumbnails switch the photo when a car has several. */
export function CarGallery({ car, title, images }: { car: Car; title: string; images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const favs = useFavorites();
  const fav = favs.includes(car.id);
  const current = images[active] ?? images[0];

  return (
    <div data-detail="photo" className="relative h-[249px] w-full overflow-hidden rounded-2xl border border-card-stroke lg:h-[397px] lg:rounded-3xl">
      <Photo key={current.src} img={current} sizes="(min-width:1024px) 754px, 100vw" priority />
      <button
        type="button"
        aria-label={fav ? `Remove ${title} from favourites` : `Add ${title} to favourites`}
        aria-pressed={fav}
        onClick={() => {
          const on = toggleFavorite(car.id);
          toast(on ? "Added to favourites" : "Removed from favourites", "info");
        }}
        className="absolute top-1.5 right-1.5 z-10 flex items-start justify-end p-1.5 lg:top-3 lg:right-3 lg:p-0"
      >
        <span className="flex items-center rounded-pill bg-white p-2 text-neutral-900 shadow-field">
          {fav ? <IconHeartFilled className="size-4 text-primary-500" /> : <IconHeart className="size-4" stroke={1.5} />}
        </span>
      </button>
      {images.length > 1 && (
        <div role="group" aria-label="Photos" className="absolute bottom-2 left-2 z-10 flex gap-1 lg:bottom-3 lg:left-3 lg:gap-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`Show photo ${i + 1} of ${images.length}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className="flex items-center justify-center"
            >
              <span
                className={cn(
                  "relative block h-9 w-14 overflow-hidden rounded-lg border-2 bg-white transition-opacity lg:h-11 lg:w-[68px]",
                  i === active ? "border-white" : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <Photo img={{ ...img, alt: "" }} sizes="68px" />
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
