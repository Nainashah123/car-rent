import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

/** Figma CTA (63:10538 desktop 1440×480, 63:10537 mobile 374×480). */
export function Cta() {
  return (
    <section className="mx-auto flex h-[480px] w-full max-w-[1440px] flex-col bg-white p-2 lg:p-5">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 rounded-[24px] bg-neutral-50 px-4 lg:gap-10 lg:rounded-[32px]">
        <h2 className="w-[288px] text-center font-display text-[32px] leading-[1.2] text-neutral-900 lg:w-[472px] lg:text-[56px] lg:leading-[1.4]">
          Your Next Drive Starts{" "}
          <Image
            src="/images/3d/key-car.png"
            alt=""
            width={56}
            height={56}
            className="inline-block size-10 align-[-0.15em] lg:size-14"
          />{" "}
          Here
        </h2>
        <ButtonLink href="/cars" variant="primary" className="w-[143.3px] lg:w-[151px]">
          Booking
        </ButtonLink>
      </div>
    </section>
  );
}
