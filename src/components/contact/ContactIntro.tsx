import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import { CONTACT_CHANNELS, CONTACT_INTRO, CONTACT_TESTIMONIAL, type ContactChannel } from "@/data/contact";

const ICONS: Record<ContactChannel["kind"], typeof IconPhone> = {
  phone: IconPhone,
  email: IconMail,
  address: IconMapPin,
};

/** Phone / email / address as real links (tel:, mailto:, Google Maps). */
export function ContactChannels({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {CONTACT_CHANNELS.map((c) => {
        const Icon = ICONS[c.kind];
        return (
          <li key={c.kind}>
            <a
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center gap-2 text-[14px] leading-[1.3] text-neutral-900 underline-offset-4 hover:underline lg:text-[16px] lg:leading-[1.4]"
            >
              <Icon size={16} stroke={1.5} className="shrink-0 text-primary-500" />
              {c.label}
              {c.external && <span className="sr-only"> (opens Google Maps in a new tab)</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Figma "Frame 45" (233:46087 desktop / 233:48293 mobile). */
export function ContactIntro() {
  const t = CONTACT_TESTIMONIAL;
  return (
    <div
      data-qa="contact-left"
      className="flex w-full flex-col items-start gap-10 pt-20 pb-6 lg:h-[669px] lg:w-[754px] lg:shrink-0 lg:gap-0 lg:py-[100px]"
    >
      <div className="flex w-full flex-col items-start gap-3 lg:w-[576px] lg:gap-4">
        <h1 className="font-display text-[38px] leading-[1.2] text-neutral-900 lg:text-[64px]">{CONTACT_INTRO.title}</h1>
        <p className="text-[16px] leading-[1.3] text-neutral-400 lg:text-[20px] lg:leading-[1.4] lg:tracking-[-0.2px]">
          {CONTACT_INTRO.lead}
        </p>
      </div>
      <div className="flex w-full flex-col items-start gap-3 lg:mt-[75px] lg:w-[576px]">
        <p className="text-[16px] leading-[1.3] text-neutral-400 lg:text-[20px] lg:leading-[1.4] lg:tracking-[-0.2px]">
          {CONTACT_INTRO.prompt}
        </p>
        <ContactChannels className="flex flex-col items-start lg:flex-row lg:flex-wrap lg:gap-x-6 lg:gap-y-1" />
      </div>
      <figure className="flex w-full flex-col items-start gap-7 lg:mt-auto lg:w-[576px]">
        <blockquote className="text-[18px] leading-[1.3] font-medium text-neutral-900 lg:text-[24px] lg:leading-[1.2]">
          {t.lead}
          <span className="text-neutral-400">{t.rest}</span>
        </blockquote>
        <figcaption className="flex items-center gap-3">
          <span aria-hidden className="size-6 rounded-full bg-stroke lg:size-7" />
          <span className="text-[16px] leading-[1.3] font-medium text-neutral-900 lg:text-[20px] lg:leading-[1.4] lg:tracking-[-0.2px]">
            {t.author}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
