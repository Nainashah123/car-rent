import type { Metadata } from "next";
import { LegalArticle } from "@/components/about/LegalArticle";
import { TERMS } from "@/data/legal";

export const metadata: Metadata = { title: "Terms of use" };

export default function TermsPage() {
  return <LegalArticle doc={TERMS} other={{ label: "privacy policy", href: "/privacy" }} />;
}
