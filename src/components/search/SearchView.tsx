"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { IconFilter, IconLayoutSidebarRightExpand, IconLayoutSidebarRightCollapse, IconX } from "@tabler/icons-react";
import { CarCard } from "@/components/cars/CarCard";
import { FilterPanel } from "@/components/search/FilterPanel";
import { Pagination } from "@/components/search/Pagination";
import { PromoCard } from "@/components/search/PromoCard";
import { activeFilterCount, clearFilters, filterCars, paginate, parseSearch, toQuery, type SearchState } from "@/components/search/query";
import { SearchHeader } from "@/components/search/SearchHeader";
import { Sheet } from "@/components/search/Sheet";
import { SortMenu } from "@/components/search/SortMenu";
import { Button } from "@/components/ui/Button";
import { PROMO_COPY } from "@/data/search";
import { cn } from "@/lib/cn";

const SIZES = "(min-width:1024px) 256px, (min-width:768px) 33vw, 50vw";

/** Figma Search (233:43662 / 233:46579). `promo` = same layout limited to promo cars. */
export function SearchView({ mode = "all" }: { mode?: "all" | "promo" }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const state = useMemo(() => parseSearch(params), [params]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const results = useRef<HTMLDivElement>(null);
  const promo = mode === "promo";

  const cars = useMemo(() => filterCars(state, { promoOnly: promo }), [state, promo]);
  const { pages, current, slice } = paginate(cars, state.page);
  const filters = activeFilterCount(state);

  const go = useCallback((next: SearchState) => router.replace(`${pathname}${toQuery(next)}`, { scroll: false }), [router, pathname]);
  const update = (patch: Partial<SearchState>) => go({ ...state, ...patch, page: 1 });
  const reset = () => go(clearFilters(state));
  const toResults = () => results.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const closeSheet = useCallback(() => setSheetOpen(false), []);

  const panelProps = { state, update, reset, count: cars.length };

  return (
    <>
      <SearchHeader
        state={state}
        crumb={promo ? PROMO_COPY.crumb : "Search"}
        title={promo ? PROMO_COPY.title : undefined}
        onTrip={(trip) => go({ ...state, ...trip, page: 1 })}
      />
      <section className="mx-auto flex w-full max-w-[1440px] items-start gap-10 px-4 py-5 lg:p-[60px]">
        <aside aria-label="Filters" className="hidden w-[464px] shrink-0 lg:block">
          <FilterPanel
            {...panelProps}
            collapsed={collapsed}
            bodyId="filter-body"
            onShow={toResults}
            headerAction={
              <button
                type="button"
                aria-expanded={!collapsed}
                aria-controls="filter-body"
                aria-label={collapsed ? "Expand filters" : "Collapse filters"}
                onClick={() => setCollapsed((c) => !c)}
                className="flex size-6 items-center justify-center text-neutral-900 hover:opacity-70"
              >
                {collapsed ? <IconLayoutSidebarRightCollapse className="size-6" stroke={1.5} /> : <IconLayoutSidebarRightExpand className="size-6" stroke={1.5} />}
              </button>
            }
          />
        </aside>

        <div ref={results} className="flex min-w-0 flex-1 scroll-mt-4 flex-col lg:w-[816px] lg:flex-none">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[16px] leading-[1.3] font-medium text-ink lg:text-[20px] lg:leading-[1.4] lg:tracking-[-0.2px]" aria-live="polite">
              Show {cars.length} available car
            </p>
            <SortMenu value={state.sort} onChange={(sort) => update({ sort })} />
          </div>

          {slice.length ? (
            <ul className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:mt-6 lg:gap-6">
              {slice.map((car) => (
                <li key={car.id} className="min-w-0">
                  {promo ? <PromoCard car={car} sizes={SIZES} /> : <CarCard car={car} variant="result" sizes={SIZES} />}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8 flex flex-col items-center gap-4 rounded-[24px] border border-neutral-100 px-6 pt-14 pb-24 text-center lg:mt-6 lg:pb-14">
              <Image src="/images/3d/key-car.png" alt="" width={96} height={96} className="size-24 object-contain" />
              <h2 className="font-display text-[24px] leading-[1.2] text-ink">No cars match your filters</h2>
              <p className="max-w-[360px] text-[14px] leading-[1.4] text-neutral-500 lg:text-[16px]">
                Try a wider price range or fewer filters{state.city ? `, or another city than ${state.city}` : ""}.
              </p>
              <Button variant="black" onClick={() => go({ ...clearFilters(state), city: undefined })}>
                Reset filters
              </Button>
            </div>
          )}

          {/* Mobile: floating Filter button (Figma 233:46640), sticks to the viewport bottom while the results are on screen. */}
          <div className="pointer-events-none sticky bottom-6 z-20 flex h-0 justify-center lg:hidden">
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              aria-haspopup="dialog"
              className="btn-black pointer-events-auto flex h-[46px] -translate-y-[calc(100%+12px)] items-center gap-2 rounded-pill px-4 text-[16px] leading-[1.4] font-medium"
              style={{ boxShadow: "0 8px 32px 0 rgb(0 0 0 / 0.32), 0 0 0 1px var(--black)" }}
            >
              <IconFilter className="size-5" stroke={1.5} aria-hidden />
              Filter
              {filters > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-primary-500 text-[12px] leading-none text-white">{filters}</span>
              )}
            </button>
          </div>

          <div className={cn("mt-8 lg:mt-6", pages <= 1 && cars.length === 0 && "hidden")}>
            <Pagination
              current={current}
              pages={pages}
              onPage={(page) => {
                go({ ...state, page });
                toResults();
              }}
            />
          </div>
        </div>
      </section>

      <Sheet open={sheetOpen} onClose={closeSheet} label="Filters" mobileOnly>
        <FilterPanel
          {...panelProps}
          className="min-h-0 flex-1 rounded-none border-0 shadow-none"
          onShow={() => {
            closeSheet();
            toResults();
          }}
          headerAction={
            <button type="button" aria-label="Close filters" onClick={closeSheet} className="flex size-6 items-center justify-center text-neutral-900">
              <IconX className="size-6" stroke={1.5} />
            </button>
          }
        />
      </Sheet>
    </>
  );
}
