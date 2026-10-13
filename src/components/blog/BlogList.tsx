"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react";
import { PostCard } from "@/components/blog/BlogCards";
import { POSTS, POSTS_PER_PAGE, type BlogCategory } from "@/data/blog";
import { cn } from "@/lib/cn";

const CATEGORIES = new Set<string>(POSTS.map((p) => p.category));

function hrefFor(page: number, category?: BlogCategory) {
  const q = new URLSearchParams();
  if (category) q.set("category", category);
  if (page > 1) q.set("page", String(page));
  const s = q.toString();
  return s ? `/blog?${s}` : "/blog";
}

/** Reads ?page and ?category. Must render inside <Suspense>. */
export function BlogListFromParams() {
  const params = useSearchParams();
  const raw = params.get("category");
  const category = raw && CATEGORIES.has(raw) ? (raw as BlogCategory) : undefined;
  const page = Number.parseInt(params.get("page") ?? "1", 10);
  return <BlogList page={Number.isFinite(page) ? page : 1} category={category} />;
}

/** Grid of default cards + pagination (Figma 233:49212). */
export function BlogList({ page: requested, category }: { page: number; category?: BlogCategory }) {
  const posts = category ? POSTS.filter((p) => p.category === category) : POSTS;
  const pages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const page = Math.min(Math.max(1, requested), pages);
  const visible = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  // Bring the grid into view when the page or filter changes (not on first load).
  const ref = useRef<HTMLElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page, category]);

  return (
    <section ref={ref} id="articles" aria-label="Articles" className="flex w-full scroll-mt-6 flex-col gap-7 lg:gap-15">
      {category && (
        <div className="flex flex-wrap items-center gap-3 text-[14px] leading-[1.4] text-neutral-500 lg:text-[16px]">
          <p>
            Showing <span className="font-medium text-neutral-900">{category}</span> · {posts.length}{" "}
            {posts.length === 1 ? "article" : "articles"}
          </p>
          <Link
            href="/blog"
            scroll={false}
            className="inline-flex items-center gap-1 rounded-pill bg-neutral-100 px-2.5 py-1 font-medium text-neutral-900 hover:bg-stroke"
          >
            Clear filter
            <IconX size={14} stroke={1.5} aria-hidden />
          </Link>
        </div>
      )}

      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-3 lg:gap-10">
        {visible.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>

      {pages > 1 && <Pagination page={page} pages={pages} category={category} />}
    </section>
  );
}

function Pagination({ page, pages, category }: { page: number; pages: number; category?: BlogCategory }) {
  // Window of three page numbers, then "…" which jumps to the next hidden page.
  const start = Math.max(1, Math.min(page - 1, pages - 2));
  const nums = Array.from({ length: Math.min(3, pages) }, (_, i) => start + i);
  const last = nums[nums.length - 1];

  const step = "flex h-[30px] items-center justify-center gap-1 rounded-[90px] p-1 text-[12px] leading-[1.4] lg:text-[14px]";
  const pill = "flex size-6 items-center justify-center rounded-[90px] p-0.5 text-[14px] leading-[1.2] font-medium lg:size-[30px] lg:p-1 lg:text-[16px] lg:leading-[1.4]";

  return (
    <nav aria-label="Pagination" className="flex w-full items-center justify-between">
      {page > 1 ? (
        <Link href={hrefFor(page - 1, category)} scroll={false} className={cn(step, "text-primary-500 hover:text-primary-600")}>
          <IconChevronLeft size={16} stroke={1.5} aria-hidden />
          Previous
        </Link>
      ) : (
        <span aria-disabled="true" className={cn(step, "cursor-not-allowed text-neutral-300")}>
          <IconChevronLeft size={16} stroke={1.5} aria-hidden />
          Previous
        </span>
      )}

      <ul className="flex items-center gap-1">
        {nums.map((n) => (
          <li key={n}>
            <Link
              href={hrefFor(n, category)}
              scroll={false}
              aria-label={`Page ${n}`}
              aria-current={n === page ? "page" : undefined}
              className="flex items-center justify-center"
            >
              <span className={cn(pill, n === page ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-300 hover:text-neutral-900")}>
                {n}
              </span>
            </Link>
          </li>
        ))}
        {last < pages && (
          <li>
            <Link href={hrefFor(last + 1, category)} scroll={false} aria-label={`Page ${last + 1}`} className="flex items-center justify-center">
              <span className={cn(pill, "bg-neutral-100 text-neutral-300 hover:text-neutral-900")}>...</span>
            </Link>
          </li>
        )}
      </ul>

      {page < pages ? (
        <Link href={hrefFor(page + 1, category)} scroll={false} className={cn(step, "w-[81px] text-primary-500 hover:text-primary-600")}>
          Next
          <IconChevronRight size={16} stroke={1.5} aria-hidden />
        </Link>
      ) : (
        <span aria-disabled="true" className={cn(step, "w-[81px] cursor-not-allowed text-neutral-300")}>
          Next
          <IconChevronRight size={16} stroke={1.5} aria-hidden />
        </span>
      )}
    </nav>
  );
}
