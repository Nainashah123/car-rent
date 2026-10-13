import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchView } from "@/components/search/SearchView";

export const metadata: Metadata = { title: "Find a car" };

/** Figma Search — desktop 233:43662, mobile 233:46579. All state lives in the URL. */
export default function CarsPage() {
  return (
    <Suspense fallback={<div className="min-h-[1200px]" aria-busy="true" />}>
      <SearchView />
    </Suspense>
  );
}
