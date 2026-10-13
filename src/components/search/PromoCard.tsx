import { CarCard } from "@/components/cars/CarCard";
import { formatPrice, type Car } from "@/data/cars";

/**
 * Promo wrapper around the shared CarCard (left untouched): a discount pill on
 * the photo and the original price struck through under the card.
 */
export function PromoCard({ car, sizes }: { car: Car; sizes?: string }) {
  const off = car.originalPrice ? Math.round((1 - car.pricePerDay / car.originalPrice) * 100) : 0;
  return (
    <div className="relative flex min-w-0 flex-col">
      <CarCard car={car} variant="result" sizes={sizes} />
      {off > 0 && (
        <span className="pointer-events-none absolute top-3 left-3 z-10 rounded-pill bg-primary-500 px-2 py-0.5 text-[12px] leading-[1.4] font-semibold text-white lg:top-4 lg:left-4 lg:px-2.5 lg:py-1 lg:text-[14px]">
          -{off}%
        </span>
      )}
      {car.originalPrice && (
        <p className="-mt-2 px-3 pb-1 text-[12px] leading-[1.4] text-neutral-400 lg:text-[14px]">
          <span className="sr-only">Original price </span>
          <s>{formatPrice(car.originalPrice)}</s>
          <span className="text-neutral-400"> /day</span>
        </p>
      )}
    </div>
  );
}
