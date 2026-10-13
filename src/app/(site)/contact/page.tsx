import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactIntro } from "@/components/contact/ContactIntro";
import { PatternBand } from "@/components/contact/PatternBand";

export const metadata: Metadata = { title: "Contact us" };

/** Figma Contact us/Fill — desktop 233:46026, mobile 233:48232. */
export default function ContactPage() {
  return (
    <section data-qa="contact-body" className="relative w-full overflow-hidden bg-white">
      <PatternBand className="absolute top-0 left-0 lg:-translate-y-[49.654%]" />
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-start px-4 py-10 lg:h-[869px] lg:flex-row lg:px-[60px] lg:py-[100px]">
        <ContactIntro />
        <ContactForm />
      </div>
    </section>
  );
}
