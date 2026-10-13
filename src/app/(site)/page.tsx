import type { Metadata } from "next";
import { AboutBlurb } from "@/components/home/AboutBlurb";
import { Faqs } from "@/components/home/Faqs";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { VehicleTypes } from "@/components/home/VehicleTypes";
import { WhyRent } from "@/components/home/WhyRent";
import { FAQS } from "@/data/faqs";

export const metadata: Metadata = { title: "Find the Best Car Rental Deals" };

/** Home — Figma desktop 232:21757 (1440×5851), mobile 232:22155 (375×6013). */
export default function HomePage() {
  return (
    <>
      <Hero />
      <VehicleTypes />
      <AboutBlurb />
      <WhyRent />
      <HowItWorks />
      <Faqs items={FAQS} />
      <Testimonials />
    </>
  );
}
