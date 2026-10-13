import type { Metadata } from "next";
import { AboutHeader } from "@/components/about/AboutHeader";
import { VisionMission } from "@/components/about/VisionMission";
import { Faqs } from "@/components/home/Faqs";
import { FAQS } from "@/data/faqs";

export const metadata: Metadata = { title: "About us" };

/**
 * About us — composed from Figma components on the Component page:
 * Header about us (139:10449), Vision & Mission (139:10580), FAQs (139:10838).
 */
export default function AboutPage() {
  return (
    <>
      <AboutHeader />
      <VisionMission />
      <Faqs items={FAQS} />
    </>
  );
}
