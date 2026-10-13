// Headless QA helpers (own browser per run, safe to use in parallel).
//   node scripts/qa/qa.mjs shot  <path> <width> <out.png> [--full]
//   node scripts/qa/qa.mjs geo   <path> '<json {"css selector":[x,y,w,h]}>'   (1440 wide)
//   node scripts/qa/qa.mjs audit <path> [<path> ...]   (overflow + tap targets at 390 & 768, console errors)
// Paths may omit the leading "/" (Git Bash rewrites "/x" into a Windows path; or set MSYS_NO_PATHCONV=1).
// BASE defaults to http://localhost:3000 (env QA_BASE to override).
import { chromium } from "playwright";

const BASE = process.env.QA_BASE || "http://localhost:3000";
const [cmd, ...args] = process.argv.slice(2);
const browser = await chromium.launch();

async function open(path, width, height = 1024) {
  const page = await browser.newPage({ viewport: { width, height } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  const p = path.startsWith("/") ? path : "/" + path;
  await page.goto(BASE + p, { waitUntil: "networkidle", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  return { page, errors };
}

try {
  if (cmd === "shot") {
    const [path, w, out, full] = args;
    const { page, errors } = await open(path, Number(w));
    await page.screenshot({ path: out, fullPage: full === "--full" });
    console.log(JSON.stringify({ saved: out, errors }));
  } else if (cmd === "geo") {
    const [path, json] = args;
    const expect = JSON.parse(json);
    const { page } = await open(path, 1440);
    const res = await page.evaluate((expect) => {
      const out = {};
      for (const [sel, want] of Object.entries(expect)) {
        const el = document.querySelector(sel);
        if (!el) { out[sel] = "MISSING"; continue; }
        const r = el.getBoundingClientRect();
        const got = [r.x, r.y + scrollY, r.width, r.height].map((v) => Math.round(v * 10) / 10);
        out[sel] = { got, want, delta: got.map((v, i) => Math.round((v - want[i]) * 10) / 10) };
      }
      return out;
    }, expect);
    console.log(JSON.stringify(res, null, 1));
  } else if (cmd === "audit") {
    const report = [];
    for (const W of [390, 768]) for (const path of args) {
      const { page, errors } = await open(path, W, 844);
      const r = await page.evaluate((W) => {
        const d = document;
        const scrollers = [d.documentElement, ...d.querySelectorAll("body *")].filter((e) =>
          (e === d.documentElement || /auto|scroll/.test(getComputedStyle(e).overflowX)) &&
          e.scrollWidth > e.clientWidth + 1 && e.getBoundingClientRect().width > 0 && !e.closest("[data-swipe]"));
        const overflow = scrollers.map((s) => `${s.tagName}.${String(s.className).slice(0, 50)} by ${s.scrollWidth - s.clientWidth}`);
        const fails = [];
        const H = innerHeight;
        // Check every control by scrolling it into view.
        const els = [...d.querySelectorAll("button, a[href], input:not([type=hidden]):not([hidden]), select, textarea, [role=tab]")]
          .filter((e) => e.dataset.tap !== "exempt" && !e.closest("[aria-hidden=true]"));
        for (const el of els) {
          el.scrollIntoView({ block: "center", inline: "center" });
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) continue;
          const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
          if (cx < 0 || cx > W || cy < 0 || cy > H) continue;
          const isField = /INPUT|TEXTAREA|SELECT/.test(el.tagName) && !/checkbox|radio/.test(el.type);
          const box = isField ? el.parentElement : null;
          const owns = (h) => h && (h === el || el.contains(h) || (el.labels && [...el.labels].some((l) => l.contains(h))) || (box && box.contains(h) && !h.closest("button, a")));
          if (!owns(d.elementFromPoint(cx, cy))) continue;
          const miss = [[cx - 21, cy], [cx + 21, cy], [cx, cy - 21], [cx, cy + 21]]
            .filter(([x, y]) => x >= 0 && x <= W && y >= 0 && y <= H && !owns(d.elementFromPoint(x, y)));
          if (miss.length) fails.push(`${el.tagName}[${(el.getAttribute("aria-label") || el.textContent || el.placeholder || "").trim().slice(0, 24)}] ${Math.round(r.width)}x${Math.round(r.height)} misses ${miss.length}`);
        }
        return { overflow, fails };
      }, W);
      if (r.overflow.length || r.fails.length || errors.length) report.push({ W, path, ...r, errors });
      await page.close();
    }
    console.log(report.length ? JSON.stringify(report, null, 1) : "AUDIT CLEAN");
  } else {
    console.log("usage: shot|geo|audit");
  }
} finally {
  await browser.close();
}
