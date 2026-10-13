/** About us copy — Figma components "Header about us" (139:10449) and "Vision & Mission" (139:10580). */

export const ABOUT_HEADER = {
  title: "Caring for Old Cars, Preparing New Ones.",
  wordmark: "/images/about/wordmark.svg",
};

export type AboutPoint = { title: string; body: string };
export type AboutBlock = { id: "vision" | "mission"; title: string; lead: string; points: AboutPoint[] };

export const ABOUT_BLOCKS: AboutBlock[] = [
  {
    id: "vision",
    title: "Our Vision",
    lead: "We believe renting a car should feel as easy as booking a ride — fast, fair, and stress-free for everyone, everywhere.",
    points: [
      { title: "Accessible", body: "available in every city we serve, for anyone who needs a ride, any time of day" },
      { title: "Effortless", body: "from search to pick-up, the entire process takes minutes, not hours" },
      { title: "Reliable", body: "the platform people turn to first, because it simply works every time" },
    ],
  },
  {
    id: "mission",
    title: "Our Mission",
    lead: "CARENT exists to connect renters with the right vehicle, through a platform built on speed, transparency, and trust.",
    points: [
      { title: "Instant access", body: "search, compare, and book any vehicle in minutes, without calls, queues, or paperwork" },
      { title: "Fair pricing", body: "every price shown is the price you pay, with no hidden fees or surprise charges at pick-up" },
      { title: "Every need covered", body: "a fleet ranging from daily commuter cars to vehicles for special occasions and business trips" },
      { title: "Trust at the core", body: "every listed vehicle is verified, every payment secured, and support available whenever it's needed" },
    ],
  },
];
