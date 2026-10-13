import type { Metadata } from "next";
import { LegalArticle } from "@/components/about/LegalArticle";
import { PRIVACY } from "@/data/legal";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return <LegalArticle doc={PRIVACY} other={{ label: "terms of use", href: "/terms" }} />;
}
