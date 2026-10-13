import Link from "next/link";
import type { LegalDoc } from "@/data/legal";

/** Text page for /privacy and /terms: New Kansas display title, Inter body, 861px reading column. */
export function LegalArticle({ doc, other }: { doc: LegalDoc; other: { label: string; href: string } }) {
  return (
    <article className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-4 pt-16 pb-12 lg:px-[60px] lg:pt-[100px] lg:pb-[100px]">
      <div className="flex w-full max-w-[861px] flex-col gap-8 lg:gap-10">
        <header className="flex flex-col items-start gap-3 lg:gap-4">
          <p className="text-[14px] leading-[1.4] text-neutral-400">Last updated {doc.updated}</p>
          <h1 className="font-display text-[38px] leading-[1.2] text-neutral-900 lg:text-[64px]">{doc.title}</h1>
          <p className="text-[16px] leading-[1.4] text-neutral-400 lg:text-[20px] lg:tracking-[-0.2px]">{doc.intro}</p>
        </header>

        <nav aria-label="On this page" className="rounded-[20px] bg-neutral-50 p-5 lg:p-6">
          <p className="mb-2 text-[14px] leading-[1.4] font-medium text-neutral-900">On this page</p>
          <ol className="grid gap-x-6 sm:grid-cols-2">
            {doc.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="inline-flex items-center py-1 text-[14px] leading-[1.4] text-neutral-500 hover:text-neutral-900 hover:underline lg:text-[16px]">
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {doc.sections.map((s) => (
          <section key={s.id} id={s.id} className="flex scroll-mt-24 flex-col gap-3">
            <h2 className="font-display text-[24px] leading-[1.2] font-medium text-neutral-900 lg:text-[32px] lg:font-normal">{s.heading}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i} className="text-[16px] leading-[1.6] text-neutral-500">
                {p}
              </p>
            ))}
            {s.list && (
              <ul className="flex list-disc flex-col gap-2 pl-5 text-[16px] leading-[1.6] text-neutral-500 marker:text-primary-500">
                {s.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <footer className="flex flex-col gap-2 border-t border-neutral-100 pt-6 text-[14px] leading-[1.4] text-neutral-500 sm:flex-row sm:items-center sm:justify-between lg:text-[16px]">
          <span>
            Questions?{" "}
            <Link href="/contact" className="inline-flex text-primary-500 underline underline-offset-4 hover:text-primary-600">
              Contact our team
            </Link>
          </span>
          <Link href={other.href} className="inline-flex text-neutral-900 underline underline-offset-4 hover:text-primary-500">
            Read our {other.label}
          </Link>
        </footer>
      </div>
    </article>
  );
}
