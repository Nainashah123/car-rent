import { ButtonLink } from "@/components/ui/Button";

export default function CarNotFound() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-4 px-4 py-20 text-center lg:gap-6 lg:px-[60px] lg:py-[140px]">
      <h1 className="font-display text-[32px] leading-[1.2] font-medium text-neutral-900 lg:text-[56px] lg:leading-[1.4]">
        Car not found
      </h1>
      <p className="max-w-[520px] text-[16px] leading-[1.3] text-neutral-400 lg:text-[20px] lg:leading-[1.4] lg:tracking-[-0.2px]">
        This car is no longer in our fleet or the link is wrong. Browse the available cars instead.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/cars" variant="primary">
          Find a car
        </ButtonLink>
        <ButtonLink href="/" variant="white">
          Back to home
        </ButtonLink>
      </div>
    </section>
  );
}
