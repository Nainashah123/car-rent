// Auth form tests: empty / invalid / valid -> route. node scripts/qa/auth-flow.mjs
import { chromium } from "playwright";
const BASE = process.env.QA_BASE || "http://localhost:3000";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1024 } });
const errs = () => p.$$eval("[role=alert]", (n) => n.map((e) => e.textContent.trim()));
const log = [];
const submit = async () => { await p.click("button[type=submit]"); await p.waitForTimeout(300); };

await p.goto(BASE + "/login", { waitUntil: "networkidle" });
await submit(); log.push(["login empty", await errs()]);
await p.fill("input[type=email]", "bad@x"); await p.fill("input[autocomplete=current-password]", "123");
await submit(); log.push(["login invalid", await errs()]);
await p.fill("input[type=email]", "a@carent.dev"); log.push(["login after edit (email error cleared?)", await errs()]);
await p.fill("input[autocomplete=current-password]", "secret123"); await submit();
await p.waitForURL("**/profile", { timeout: 15000 }).catch(() => {}); log.push(["login valid ->", new URL(p.url()).pathname]);

await p.goto(BASE + "/signup", { waitUntil: "networkidle" });
await submit(); log.push(["signup empty", await errs()]);
await p.fill("input[autocomplete=name]", "J"); await p.fill("input[type=email]", "john@");
const pw = await p.$$("input[autocomplete=new-password]");
await pw[0].fill("password"); await pw[1].fill("different1");
await submit(); log.push(["signup invalid", await errs()]);
await p.fill("input[autocomplete=name]", "John Doe"); await p.fill("input[type=email]", "johndoe@gmail.com");
await pw[0].fill("secret123"); await pw[1].fill("secret123"); await submit();
await p.waitForURL("**/profile", { timeout: 15000 }).catch(() => {}); log.push(["signup valid ->", new URL(p.url()).pathname]);
await b.close();
for (const l of log) console.log(JSON.stringify(l));
