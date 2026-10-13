// Link crawl: visits every route, collects internal hrefs, checks every href + route returns 200.
// node scripts/qa/crawl.mjs
import { chromium } from "playwright";
const BASE = process.env.QA_BASE || "http://localhost:3000";
const ROUTES = ["/", "/login", "/signup", "/cars", "/promo", "/cars/toyota-camry", "/profile", "/profile?tab=active", "/profile?tab=history",
  "/blog", "/contact", "/about", "/help", "/privacy", "/terms"];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1024 } });
const linked = new Map();
const consoleErrors = [];
p.on("pageerror", (e) => consoleErrors.push(`${p.url()} ${e}`));
for (const r of ROUTES) {
  await p.goto(BASE + r, { waitUntil: "networkidle", timeout: 60000 });
  for (const h of await p.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")))) {
    if (h.startsWith("/")) { if (!linked.has(h)) linked.set(h, new Set()); linked.get(h).add(r); }
  }
}
const bad = [];
for (const h of new Set([...linked.keys(), ...ROUTES])) {
  const res = await fetch(BASE + h);
  if (!res.ok) bad.push(`${h} ${res.status} (from ${[...(linked.get(h) ?? [])].join(", ")})`);
}
await b.close();
console.log(JSON.stringify({ uniqueLinks: linked.size, bad, notLinked: ROUTES.filter((r) => !linked.has(r)), consoleErrors }, null, 1));
