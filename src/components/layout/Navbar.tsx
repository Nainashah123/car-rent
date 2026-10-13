"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IconChevronDown, IconMenu2, IconPhone, IconX } from "@tabler/icons-react";
import { Logo } from "@/components/layout/Logo";
import { buttonClass } from "@/components/ui/Button";
import { CALL_CENTER, HELP_LINKS, NAV_LINKS, navKeyFor } from "@/data/nav";
import { cn } from "@/lib/cn";
import { useSessionRaw } from "@/lib/session";

/** Figma Navbar (80:23888): desktop 1440×72, mobile 375×72 + 400px menu sheet. */
export function Navbar() {
  const pathname = usePathname();
  const active = navKeyFor(pathname);
  // Signed-in (mock session): the Login button becomes Profile.
  const signedIn = useSessionRaw() !== null;
  const account = signedIn ? { href: "/profile", label: "Profile" } : { href: "/login", label: "Login" };
  const [menuOpen, setMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);

  // Close menus on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setHelpOpen(false);
  }

  useEffect(() => {
    if (!helpOpen && !menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setHelpOpen(false);
        setMenuOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (helpRef.current && !helpRef.current.contains(e.target as Node)) setHelpOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [helpOpen, menuOpen]);

  const itemTone = (on: boolean) =>
    active === undefined ? "text-neutral-900" : on ? "font-medium text-neutral-900" : "text-neutral-300 hover:text-neutral-500";

  return (
    <header className="relative z-40 bg-white">
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between p-5">
        <div className="flex items-center gap-8 lg:w-[842px]">
          <Logo className="block h-10 w-[85px] shrink-0" />
          <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.key}
                href={l.href}
                aria-current={active === l.key ? "page" : undefined}
                className={cn("text-[16px] leading-[1.4] transition-colors", itemTone(active === l.key))}
              >
                {l.label}
              </Link>
            ))}
            <div ref={helpRef} className="relative">
              <button
                type="button"
                aria-expanded={helpOpen}
                aria-haspopup="menu"
                onClick={() => setHelpOpen((o) => !o)}
                className={cn("flex items-center gap-2.5 text-[16px] leading-[1.4] transition-colors", itemTone(active === "help"))}
              >
                Help center
                <IconChevronDown
                  size={16}
                  stroke={1.5}
                  className={cn("transition-transform", helpOpen && "rotate-180")}
                />
              </button>
              {helpOpen && (
                <div
                  role="menu"
                  className="absolute top-[calc(100%+12px)] left-0 z-50 flex w-[180px] flex-col gap-0.5 rounded-2xl border border-stroke bg-white p-1.5 shadow-[0_8px_24px_rgb(0_0_0/0.08)]"
                >
                  {HELP_LINKS.map((h) => (
                    <Link
                      key={h.href}
                      role="menuitem"
                      href={h.href}
                      className="rounded-xl px-3 py-2 text-[14px] leading-[1.4] text-neutral-900 hover:bg-neutral-50"
                    >
                      {h.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${CALL_CENTER.tel}`} className={buttonClass({ variant: "black", size: "md" })}>
            <IconPhone size={20} stroke={1.5} />
            {CALL_CENTER.label}
          </a>
          <Link href={account.href} className={buttonClass({ variant: "white", size: "md", className: "w-[100px]" })}>
            {account.label}
          </Link>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-11 w-[52px] items-center justify-center rounded-pill border border-stroke bg-white lg:hidden"
        >
          {menuOpen ? <IconX size={20} stroke={1.5} /> : <IconMenu2 size={20} stroke={1.5} />}
        </button>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 top-[72px] z-30 bg-black/20 lg:hidden"
          />
          <div
            id="mobile-menu"
            className="absolute top-[72px] right-0 z-40 flex min-h-[400px] w-full max-w-[375px] flex-col justify-between gap-6 bg-white p-4 shadow-[0_12px_24px_rgb(0_0_0/0.08)] lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.key}
                  href={l.href}
                  aria-current={active === l.key ? "page" : undefined}
                  className={cn(
                    "flex items-center p-2 text-[16px] leading-[1.4]",
                    active === l.key ? "font-medium text-neutral-900" : "text-neutral-300",
                  )}
                >
                  {l.label}
                </Link>
              ))}
              {HELP_LINKS.map((h) => (
                <Link
                  key={h.href}
                  href={h.href}
                  className={cn(
                    "flex items-center p-2 text-[16px] leading-[1.4]",
                    pathname.startsWith(h.href) ? "font-medium text-neutral-900" : "text-neutral-300",
                  )}
                >
                  {h.label === "FAQs" ? "Help center" : h.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <Link href={account.href} className={buttonClass({ variant: "white", size: "sm", className: "w-full" })}>
            {account.label}
          </Link>
              <a href={`tel:${CALL_CENTER.tel}`} className={buttonClass({ variant: "black", size: "sm", className: "w-full" })}>
                <IconPhone size={18} stroke={1.5} />
                {CALL_CENTER.label}
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
