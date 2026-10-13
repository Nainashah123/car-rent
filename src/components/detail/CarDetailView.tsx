import Image from "next/image";
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";
import { BookingCard } from "@/components/detail/BookingCard";
import { CarGallery } from "@/components/detail/CarGallery";
import { DetailTabs } from "@/components/detail/DetailTabs";
import { galleryFor, type CarDetail } from "@/data/carDetails";
import type { Car } from "@/data/cars";

/** Pink paint band behind the top of the page (Figma "image 20", rotated 90°). */
function HeroBand() {
  return (
    <div aria-hidden className="absolute inset-x-0 top-0 h-[100px] overflow-hidden bg-white lg:h-[172px]">
      <div className="absolute bottom-0 left-1/2 h-[307px] w-[545px] -translate-x-1/2 lg:-bottom-[141px] lg:h-[851px] lg:w-[1512px]">
        <Image src="/images/detail/hero-band.jpg" alt="" fill priority sizes="(min-width:1024px) 1512px, 545px" className="object-cover" />
      </div>
    </div>
  );
}

/** Detail/Description body: band, car info + tabs (left), booking card (right). */
export function CarDetailView({ car, detail }: { car: Car; detail: CarDetail }) {
  const title = detail.title ?? car.name;
  return (
    <section className="relative mx-auto w-full max-w-[1440px]">
      <HeroBand />
      <div className="relative flex flex-col px-4 pt-[120px] pb-10 lg:min-h-[1152px] lg:flex-row lg:items-start lg:px-[60px] lg:pt-0 lg:pb-0">
        <div data-detail="main" className="flex w-full min-w-0 flex-col gap-6 pb-10 lg:w-[794px] lg:shrink-0 lg:pt-[200px] lg:pr-10 lg:pb-[58px]">
          <div className="flex w-full flex-col gap-6">
            <Link href="/cars" className="flex items-center gap-3 self-start text-neutral-900 hover:underline">
              <IconChevronLeft className="size-5 lg:size-6" stroke={1.5} aria-hidden />
              <span className="text-[16px] leading-[1.3] font-medium lg:text-[20px] lg:leading-[1.4] lg:tracking-[-0.2px]">Detail information</span>
            </Link>
            <h1 className="font-display text-[32px] leading-[1.2] font-medium text-neutral-900 lg:text-[56px] lg:leading-[1.4]">
              {title}
            </h1>
            <CarGallery car={car} title={title} images={galleryFor(car)} />
          </div>
          <DetailTabs car={car} detail={detail} />
        </div>
        <BookingCard car={car} className="lg:sticky lg:top-6 lg:mt-[100px] lg:w-[526px] lg:shrink-0" />
      </div>
    </section>
  );
}

/** Suspense fallback while the slug resolves. */
export function CarDetailSkeleton() {
  return (
    <section aria-busy className="relative mx-auto w-full max-w-[1440px]">
      <HeroBand />
      <div className="relative flex flex-col gap-6 px-4 pt-[120px] pb-10 lg:min-h-[1152px] lg:flex-row lg:px-[60px] lg:pt-[200px]">
        <div className="flex w-full flex-col gap-6 lg:w-[754px]">
          <div className="h-7 w-48 animate-pulse rounded-pill bg-neutral-100" />
          <div className="h-10 w-3/4 animate-pulse rounded-pill bg-neutral-100 lg:h-[78px]" />
          <div className="h-[249px] w-full animate-pulse rounded-2xl bg-neutral-100 lg:h-[397px] lg:rounded-3xl" />
        </div>
      </div>
    </section>
  );
}
