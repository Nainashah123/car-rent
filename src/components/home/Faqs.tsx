"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { IconChevronDown, IconPhone } from "@tabler/icons-react";
import type { FaqItem } from "@/data/faqs";
import { cn } from "@/lib/cn";

export type { FaqItem } from "@/data/faqs";

/**
 * Figma "FAQs" (139:10838; desktop 1440×625 / mobile 375×720).
 * Items are grouped by `category`; each group header toggles its answers.
 * The first group starts open, like the design. Reused by /about and /help.
 */
export function Faqs({ items, title, className }: { items: FaqItem[]; title?: string; className?: string }) {
  const groups = items.reduce<{ category: string; items: FaqItem[] }[]>((acc, it) => {
    const g = acc.find((x) => x.category === it.category);
    if (g) g.items.push(it);
    else acc.push({ category: it.category, items: [it] });
    return acc;
  }, []);
  const [open, setOpen] = useState<Set<string>>(() => new Set(groups.slice(0, 1).map((g) => g.category)));
  const uid = useId();

  const toggle = (c: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });

  return (
    <section
      data-faqs
      className={cn(
        "mx-auto flex w-full max-w-[1440px] flex-col items-center gap-8 bg-white px-4 py-8 lg:flex-row lg:items-start lg:justify-center lg:gap-10 lg:p-[60px]",
        className,
      )}
    >
      <div className="flex w-full flex-col items-start gap-4 lg:min-w-0 lg:flex-1">
        <h2 className="font-display text-[32px] leading-[1.2] text-neutral-900 lg:h-[156px] lg:w-[463px] lg:text-[56px] lg:leading-[1.4]">
          {title ?? (
            <>
              Your{" "}
              <Image src="/images/home/question.png" alt="" width={56} height={56} className="-my-2 inline-block size-8 align-[-0.15em] lg:-my-4 lg:size-14 lg:align-middle" />{" "}
              questions, answered
            </>
          )}
        </h2>
        <div className="flex flex-col items-start gap-2">
          <p className="text-[16px] leading-[1.4] tracking-[-0.01em] text-neutral-400 lg:w-[424px] lg:text-[20px]">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-1.5 border-b border-primary-500 px-1.5 py-1 text-[14px] leading-[1.2] font-medium text-primary-500 hover:text-primary-600 lg:gap-2 lg:text-[20px] lg:leading-[1.4] lg:font-normal lg:tracking-[-0.01em]"
          >
            <IconPhone className="size-[18px] lg:size-5" stroke={1.5} aria-hidden />
            Contact our team
          </Link>
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-6 lg:min-w-0 lg:flex-1 lg:gap-8">
        {groups.map((g, gi) => {
          const isOpen = open.has(g.category);
          const panel = `${uid}-p${gi}`;
          return (
            <div key={g.category} className="flex w-full flex-col items-start gap-3 lg:w-[610px]">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => toggle(g.category)}
                className="flex w-full items-center gap-3 text-left text-[18px] leading-[1.2] font-semibold text-neutral-900 lg:text-[24px]"
              >
                <IconChevronDown
                  className={cn("size-[18px] shrink-0 transition-transform lg:size-[22px]", !isOpen && "-rotate-90")}
                  stroke={1.5}
                  aria-hidden
                />
                {g.category}
              </button>
              <dl id={panel} hidden={!isOpen} className="w-full">
                {g.items.map((it) => (
                  <div key={it.id} className="flex flex-col gap-2.5 p-4">
                    <dt className="text-[16px] leading-[1.4] font-medium tracking-[-0.01em] text-neutral-900 lg:text-[20px]">{it.question}</dt>
                    <dd className="text-[12px] leading-[1.4] text-neutral-500 lg:text-[16px]">{it.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}
      </div>
    </section>
  );
}
