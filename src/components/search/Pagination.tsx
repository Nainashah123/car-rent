import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/cn";

/** Page numbers to show: up to 3 around the current page, then "…" when more exist. */
function pageList(current: number, pages: number) {
  const start = Math.max(1, Math.min(current - 1, pages - 2));
  const nums = Array.from({ length: Math.min(3, pages) }, (_, i) => start + i);
  return { nums, more: nums[nums.length - 1] < pages };
}

/** Figma pager (233:43814 desktop / 233:46624 mobile). */
export function Pagination({ current, pages, onPage }: { current: number; pages: number; onPage: (p: number) => void }) {
  const { nums, more } = pageList(current, pages);
  const side = "flex h-[30px] w-[81px] items-center justify-center gap-1 rounded-[90px] p-1 text-[12px] leading-[1.4] lg:text-[14px]";
  const prevOff = current <= 1;
  const nextOff = current >= pages;
  return (
    <nav aria-label="Pagination" className="flex w-full items-center justify-between">
      <button
        type="button"
        disabled={prevOff}
        onClick={() => onPage(current - 1)}
        className={cn(side, "w-auto", prevOff ? "cursor-not-allowed text-neutral-300" : "text-primary-500 hover:text-primary-600")}
      >
        <IconChevronLeft className="size-4" stroke={1.5} aria-hidden />
        Previous
      </button>
      <ul className="flex items-center lg:gap-1">
        {nums.map((n) => {
          const on = n === current;
          return (
            <li key={n}>
              <button
                type="button"
                aria-label={`Page ${n}`}
                aria-current={on ? "page" : undefined}
                onClick={() => onPage(n)}
                className="group flex size-11 items-center justify-center lg:size-[30px]"
              >
                {/* Pill drawn inside so the button can be a 44px target on touch. */}
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-[90px] p-0.5 text-[14px] leading-[1.2] font-medium lg:size-[30px] lg:p-1 lg:text-[16px] lg:leading-[1.4]",
                    on ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-300 group-hover:text-neutral-500",
                  )}
                >
                  {n}
                </span>
              </button>
            </li>
          );
        })}
        {more && (
          <li aria-hidden className="flex size-11 items-center justify-center lg:size-[30px]">
            <span className="flex size-6 items-center justify-center rounded-[90px] bg-neutral-100 text-[14px] leading-[1.2] font-medium text-neutral-300 lg:size-[30px] lg:text-[16px]">...</span>
          </li>
        )}
      </ul>
      <button
        type="button"
        disabled={nextOff}
        onClick={() => onPage(current + 1)}
        className={cn(side, nextOff ? "cursor-not-allowed text-neutral-300" : "text-primary-500 hover:text-primary-600")}
      >
        Next
        <IconChevronRight className="size-4" stroke={1.5} aria-hidden />
      </button>
    </nav>
  );
}
