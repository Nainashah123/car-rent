import Image from "next/image";
import { STEPS } from "@/data/home";

/** Figma 232:21891 (desktop 1440×665) / 232:22287 (mobile 375×427, steps swipe sideways). */
export function HowItWorks() {
  const [head, tail] = STEPS.title.split(", in ");
  return (
    <section data-home="steps" className="mx-auto flex w-full max-w-[1440px] flex-col gap-2.5 bg-white pt-5 pb-5 lg:gap-10 lg:bg-neutral-50 lg:p-[60px]">
      <div className="flex flex-col gap-2 px-4 lg:px-0">
        <h2 className="font-display text-[32px] leading-[normal] text-ink lg:h-[156px] lg:w-[564px] lg:text-[56px] lg:leading-[1.4] lg:text-neutral-900">
          <span className="lg:hidden">{STEPS.title.charAt(0) + STEPS.title.slice(1).toLowerCase()}</span>
          <span className="hidden lg:inline">
            {head}, in{" "}
            <Image src="/images/home/notepad.png" alt="" width={56} height={56} className="mx-[3px] -my-4 inline-block size-14 align-middle" />{" "}
            {tail}
          </span>
        </h2>
        <p className="text-[16px] leading-[1.4] tracking-[-0.01em] text-muted lg:hidden">{STEPS.intro}</p>
      </div>
      <ol data-swipe className="relative flex snap-x gap-6 overflow-x-auto px-4 [scrollbar-width:none] lg:w-[1320px] lg:overflow-visible lg:px-0">
        {STEPS.steps.map((s, i) => (
          <li key={s.title} className="flex w-[195px] shrink-0 snap-start flex-col lg:w-auto lg:flex-1">
            <Image
              src={s.image}
              alt=""
              width={624}
              height={490}
              sizes="(min-width:1024px) 312px, 195px"
              className="h-[153px] w-full rounded-[24px] object-cover lg:h-[245px]"
            />
            <div className="flex flex-col gap-2 p-3">
              <h3 className="text-[16px] leading-[1.4] font-semibold tracking-[-0.01em] text-black lg:text-[20px] lg:text-neutral-900">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="text-[14px] leading-[1.4] text-muted lg:text-[16px] lg:text-neutral-400">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
