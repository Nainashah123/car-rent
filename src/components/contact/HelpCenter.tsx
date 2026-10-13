"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { IconSearch, IconX } from "@tabler/icons-react";
import { Faqs } from "@/components/home/Faqs";
import { TextField } from "@/components/ui/FormField";
import { HELP_COPY } from "@/data/help";
import { FAQS } from "@/data/faqs";

/** Help center body: live FAQ search, falling back to the grouped FAQs accordion (139:10838). */
export function HelpCenter() {
  const [query, setQuery] = useState("");
  const q = useDeferredValue(query.trim().toLowerCase());
  const results = q
    ? FAQS.filter((f) => `${f.question} ${f.answer} ${f.category}`.toLowerCase().includes(q))
    : FAQS;

  return (
    <>
      <section className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-6 px-4 pt-16 pb-4 lg:gap-8 lg:px-[60px] lg:pt-[100px] lg:pb-0">
        <div className="flex w-full flex-col items-start gap-3 lg:w-[576px] lg:gap-4">
          <h1 className="font-display text-[38px] leading-[1.2] text-neutral-900 lg:text-[64px]">{HELP_COPY.title}</h1>
          <p className="text-[16px] leading-[1.3] text-neutral-400 lg:text-[20px] lg:leading-[1.4] lg:tracking-[-0.2px]">
            {HELP_COPY.lead}
          </p>
        </div>
        <div role="search" className="w-full lg:w-[576px]">
          <TextField
            type="search"
            aria-label="Search help articles"
            placeholder={HELP_COPY.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leftIcon={<IconSearch className="size-4 shrink-0 text-neutral-400 lg:size-5" stroke={1.5} aria-hidden />}
            rightSlot={
              query ? (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="flex shrink-0 items-center justify-center text-neutral-900"
                >
                  <IconX className="size-4 lg:size-5" stroke={1.5} />
                </button>
              ) : null
            }
          />
        </div>
      </section>

      {q ? (
        <section aria-live="polite" className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-4 px-4 py-8 lg:px-[60px] lg:py-[60px]">
          <p className="text-[14px] leading-[1.4] text-neutral-400 lg:text-[16px]">
            {results.length} {results.length === 1 ? "result" : "results"} for “{query.trim()}”
          </p>
          {results.length ? (
            <dl className="flex w-full flex-col lg:w-[861px]">
              {results.map((it) => (
                <div key={it.id} className="flex flex-col gap-2.5 border-b border-neutral-100 py-4">
                  <dt className="text-[12px] leading-[1.4] font-medium tracking-wide text-primary-500 uppercase">{it.category}</dt>
                  <dd className="flex flex-col gap-2.5">
                    <span className="text-[16px] leading-[1.4] font-medium tracking-[-0.01em] text-neutral-900 lg:text-[20px]">{it.question}</span>
                    <span className="text-[14px] leading-[1.4] text-neutral-500 lg:text-[16px]">{it.answer}</span>
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-[16px] leading-[1.4] text-neutral-900 lg:text-[20px]">
              No answers match that yet.{" "}
              <Link href="/contact" className="text-primary-500 underline underline-offset-4 hover:text-primary-600">
                Ask our team
              </Link>{" "}
              and we&apos;ll get back to you.
            </p>
          )}
        </section>
      ) : (
        <Faqs items={FAQS} />
      )}
    </>
  );
}
