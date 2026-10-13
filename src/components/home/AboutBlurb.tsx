import Link from "next/link";
import { ABOUT_TEXT } from "@/data/home";

/** Figma 232:21839 (desktop 1440×628) / 232:22236 (mobile 375×628): text fading out under a blur, "Learn more" → /about. */
export function AboutBlurb() {
  return (
    <section data-home="about" className="relative mx-auto h-[628px] w-full max-w-[1440px] overflow-hidden bg-white">
      <p className="mx-auto mt-12 w-[337px] max-w-[calc(100%-32px)] text-center text-[24px] leading-[1.4] text-ink lg:mt-[90px] lg:w-[981px] lg:max-w-none lg:text-[40px] lg:text-neutral-900">
        {ABOUT_TEXT}
      </p>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[350px] bg-gradient-to-b from-fade/0 to-fade backdrop-blur-[8px] lg:h-[386px]"
        style={{ maskImage: "linear-gradient(to bottom, transparent, black 30%)" }}
      />
      <Link
        href="/about"
        className="absolute top-[494px] left-1/2 flex h-11 -translate-x-1/2 items-center justify-center rounded-pill border border-stroke bg-white px-5 text-[14px] leading-[1.4] font-medium text-ink shadow-[0_2px_4px_rgb(0_0_0/0.06)] hover:bg-neutral-50 lg:bg-neutral-50 lg:text-[16px] lg:text-neutral-900 lg:hover:bg-neutral-100"
      >
        Learn more
      </Link>
    </section>
  );
}
