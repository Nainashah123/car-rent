import type { Metadata } from "next";
import { ContactStrip } from "@/components/contact/ContactStrip";
import { HelpCenter } from "@/components/contact/HelpCenter";

export const metadata: Metadata = { title: "Help center" };

/** Help center — FAQs component (139:10838) with live search, plus a contact strip. No dedicated Figma frame. */
export default function HelpPage() {
  return (
    <>
      <HelpCenter />
      <ContactStrip />
    </>
  );
}
