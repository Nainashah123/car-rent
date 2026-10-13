import Image from "next/image";
import { ABOUT_HEADER } from "@/data/about";

/** Figma "Header about us" — desktop 139:10448 (1440×484), mobile 139:10447 (375×484). */
export function AboutHeader() {
  return (
    <section
      data-qa="about-header"
      className="relative mx-auto flex h-[484px] w-full max-w-[1440px] flex-col items-start justify-end overflow-hidden bg-white p-4 lg:p-[60px]"
    >
      <Image
        src={ABOUT_HEADER.wordmark}
        alt=""
        width={1298.75}
        height={264}
        priority
        className="pointer-events-none absolute top-[137px] left-[124px] h-[156.113px] w-[768px] max-w-none lg:top-[160px] lg:left-[815px] lg:h-[264px] lg:w-[1298.749px]"
      />
      <h1 className="relative font-display text-[38px] leading-[1.2] text-neutral-900 lg:w-[786px] lg:text-[64px]">
        {ABOUT_HEADER.title}
      </h1>
    </section>
  );
}
