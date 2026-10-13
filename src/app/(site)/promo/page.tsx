import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchView } from "@/components/search/SearchView";

export const metadata: Metadata = { title: "Promo" };

/** Navbar "Promo": the Search layout limited to discounted cars. */
export default function PromoPage() {
  return (
    <Suspense fallback={<div className="min-h-[1200px]" aria-busy="true" />}>
      <SearchView mode="promo" />
    </Suspense>
  );
}
