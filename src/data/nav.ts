export type NavKey = "blog" | "cars" | "promo" | "about" | "help";

export type NavLink = { key: NavKey; label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { key: "blog", label: "Blog", href: "/blog" },
  { key: "cars", label: "Find a car", href: "/cars" },
  { key: "promo", label: "Promo", href: "/promo" },
  { key: "about", label: "About us", href: "/about" },
];

/** Items under the "Help center" dropdown. */
export const HELP_LINKS = [
  { label: "FAQs", href: "/help" },
  { label: "Contact us", href: "/contact" },
] as const;

export const CALL_CENTER = { label: "Call center", tel: "+18001234567" };

export const FOOTER_COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Find a car", href: "/cars" },
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Profile", href: "/profile" },
      { label: "Active rental", href: "/profile?tab=active" },
      { label: "History", href: "/profile?tab=history" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of use", href: "/terms" },
    ],
  },
] as const;

/** Which nav item is active for a pathname. */
export function navKeyFor(pathname: string): NavKey | "help" | undefined {
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/cars")) return "cars";
  if (pathname.startsWith("/promo")) return "promo";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/help") || pathname.startsWith("/contact")) return "help";
  return undefined;
}
