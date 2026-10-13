"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { cn } from "@/lib/cn";

type Item = { id: string; title: string };

/** "On this page" sidebar (Figma 232:27374). Highlights the section in view. */
export function ArticleToc({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    // Active = the last section whose heading has reached the top of the viewport.
    function update() {
      const line = 96;
      let current: string | undefined;
      for (const i of items) {
        const el = document.getElementById(i.id);
        if (el && el.getBoundingClientRect().top <= line) current = i.id;
      }
      setActive(current);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  function go(e: MouseEvent<HTMLAnchorElement>, id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  }

  return (
    <nav aria-labelledby="toc-title" className="flex w-[263px] flex-col items-start gap-2">
      <p id="toc-title" className="text-[16px] leading-[1.4] font-medium whitespace-nowrap text-neutral-900">
        On this page
      </p>
      <ul className="flex w-full flex-col items-start">
        {items.map((i) => (
          <li key={i.id} className="w-full">
            <a
              href={`#${i.id}`}
              onClick={(e) => go(e, i.id)}
              aria-current={active === i.id ? "location" : undefined}
              className={cn(
                "block w-full px-3 py-1.5 text-[16px] leading-[1.4] transition-colors hover:text-neutral-900",
                active === i.id ? "text-neutral-900" : "text-neutral-400",
              )}
            >
              {i.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
