import Image from "next/image";
import { WHY } from "@/data/home";

/** Figma 232:21844 (desktop 1440×900, two 703px panels) / 232:22241 (mobile 375×1108). */
export function WhyRent() {
  return (
    <section data-home="why" className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 bg-white px-4 py-5 lg:h-[900px] lg:flex-row lg:gap-2.5 lg:bg-neutral-50 lg:p-3">
      <div className="flex flex-col gap-5 lg:w-[703px] lg:shrink-0 lg:justify-between lg:py-12 lg:pl-12">
        <div className="flex flex-col gap-2 lg:gap-4">
          <h2 className="font-display text-[32px] leading-[1.2] text-ink lg:w-[400px] lg:text-[56px] lg:leading-[1.4] lg:text-neutral-900">{WHY.title}</h2>
          <p className="text-[16px] leading-[1.4] tracking-[-0.01em] text-muted lg:w-[424px] lg:text-[20px] lg:text-neutral-400">{WHY.intro}</p>
        </div>
        <ul className="flex flex-col lg:w-[504px]">
          {WHY.reasons.map((r) => (
            <li key={r.title} className="flex items-start gap-3 p-3 lg:gap-5 lg:p-5">
              <Image src={r.icon} alt="" width={56} height={56} className="size-8 shrink-0 lg:size-14" />
              <div className="flex min-w-0 flex-1 flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[16px] leading-[1.2] font-medium text-ink lg:text-[24px] lg:text-neutral-900">{r.title}</h3>
                  <p className="text-[14px] leading-[1.4] text-muted lg:text-[16px] lg:text-neutral-400">{r.body}</p>
                </div>
                <ul className="flex gap-2.5">
                  {r.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-[6px] bg-chip-bg px-2 py-[3px] text-[12px] leading-[1.4] font-medium whitespace-nowrap text-muted lg:rounded-[8px] lg:px-2.5 lg:py-1 lg:text-[14px] lg:text-neutral-400"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative h-[516px] overflow-hidden rounded-[16px] bg-neutral-100 lg:h-full lg:min-w-0 lg:flex-1">
        <Image
          src={WHY.photo}
          alt="A driver's hand on the steering wheel of a dark car"
          fill
          sizes="(min-width:1024px) 708px, 100vw"
          className="object-cover object-[0_64.4%] lg:object-[0_64.4%]"
        />
      </div>
    </section>
  );
}
