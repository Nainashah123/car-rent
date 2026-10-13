import { IconMail, IconMessage, IconPhone } from "@tabler/icons-react";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { SUPPORT_EMAIL } from "@/data/contact";
import { HELP_COPY } from "@/data/help";
import { CALL_CENTER } from "@/data/nav";

/** "Still need help" panel on /help: contact form, call center (tel:) and email (mailto:). */
export function ContactStrip() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pb-10 lg:px-[60px] lg:pb-[60px]">
      <div className="flex flex-col items-start gap-6 rounded-[20px] bg-neutral-50 p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:rounded-card lg:px-12 lg:py-10">
        <div className="flex flex-col items-start gap-2 lg:w-[576px]">
          <h2 className="font-display text-[24px] leading-[1.2] font-medium text-neutral-900 lg:text-[40px] lg:font-normal">
            {HELP_COPY.stripTitle}
          </h2>
          <p className="text-[14px] leading-[1.3] text-neutral-400 lg:text-[16px] lg:leading-[1.4]">{HELP_COPY.stripLead}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:w-auto lg:justify-end">
          <ButtonLink href="/contact" variant="primary">
            <IconMessage className="size-4 lg:size-5" stroke={1.5} aria-hidden />
            Contact us
          </ButtonLink>
          <a href={`tel:${CALL_CENTER.tel}`} className={buttonClass({ variant: "black" })}>
            <IconPhone className="size-4 lg:size-5" stroke={1.5} aria-hidden />
            {CALL_CENTER.label}
          </a>
          <a href={`mailto:${SUPPORT_EMAIL}`} className={buttonClass({ variant: "white" })}>
            <IconMail className="size-4 lg:size-5" stroke={1.5} aria-hidden />
            Email us
          </a>
        </div>
      </div>
    </section>
  );
}
