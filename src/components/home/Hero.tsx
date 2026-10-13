import Image from "next/image";
import { HeroMosaic } from "@/components/home/HeroMosaic";
import { SearchCard } from "@/components/home/SearchCard";

/** Figma 232:21760 (desktop 1440×849) / 232:22157 (mobile 375×979). */
export function Hero() {
  return (
    <section data-home="hero" className="mx-auto flex w-full max-w-[1440px] flex-col items-center bg-white px-2 pt-3 pb-20 lg:px-3">
      <div className="mb-[-20px] flex w-full flex-col lg:mb-[-236px] lg:gap-5">
        <div className="flex flex-col items-start gap-10 py-5 lg:flex-row lg:items-end lg:justify-between lg:p-5">
          <h1 className="font-display text-[40px] leading-[1.2] text-ink lg:w-[680px] lg:text-[80px]">Find the Best Car Rental Deals</h1>
          <Image src="/icons/logo.svg" alt="CARENT" width={85} height={40} unoptimized className="h-10 w-[85px] shrink-0" />
        </div>
        <HeroMosaic className="w-[calc(100%-8px)] lg:w-full" />
      </div>
      <div className="relative flex w-full justify-center px-2 lg:px-0">
        <SearchCard />
      </div>
    </section>
  );
}
