# car-rental (CARENT)

Next.js implementation of the Figma design **"CARENT - KIT RENT CAR 2"** (file `B5ENtxw4u0iQpz6jfrje1z`).
Built with the `figma-to-nextjs` skill — its checklist is the definition of done for every screen.
Design system reference: **`DESIGN.md`** (tokens, type, components, assets, Figma node ids). Read it before building UI.

## Stack

| Thing | Version / detail |
|---|---|
| Next.js | 16.4.0, App Router, Turbopack, Cache Components (`cacheComponents: true`) |
| React | 19.3.0 |
| TypeScript | strict |
| Tailwind | v4, tokens in `src/app/globals.css` (`:root` + `@theme inline`) |
| Icons | `@tabler/icons-react` (the Figma icon page *is* Tabler Outline — exact match) |
| QA | `playwright` (headless) via `scripts/qa/qa.mjs` |
| Package manager | npm |

Import alias `@/*` → `./src/*`. Read `node_modules/next/dist/docs/` before writing caching/routing code.
Under Cache Components, anything reading `params`, `searchParams`, `useSearchParams`, cookies or storage must sit inside `<Suspense>`.

## Standing requirements

1. **Live and dynamic.** Every control works. Data from typed mocks in `src/data/`, never inlined. No button is a no-op: action, route, or visibly `disabled`. `python ~/.claude/skills/figma-to-nextjs/scripts/dead_buttons.py src` prints nothing.
2. **Pixel-exact desktop** at 1440 (Figma frame size, mouse). Below `lg` (1024) is our reflow: no unintended sideways scroll at 390/768, 44px tap targets.
3. **Routing.** `next/link` / `router.push` only. Every route reachable. Every flow has an exit.
4. **Validation.** `noValidate` forms, rules in `src/lib/validation.ts`, errors clear on edit, submit blocked while errors exist.
5. **Tested before done.** `npm run lint` + `npm run build` clean; geometry vs Figma; `node scripts/qa/qa.mjs audit <paths>` clean.

## Conventions

- Tokens only — no raw hex in components (add a token to `globals.css` `:root` + `@theme inline` if Figma has a new colour).
- Shared UI: `components/ui/Button` (`Button`, `ButtonLink`, `buttonClass`), `components/ui/FormField` (`TextField`, `PasswordField`, `FieldShell`, `boxClass`, `inputClass`), `components/ui/Tag`, `components/cars/CarCard` (`CarCard`, `CarPhoto`, `CarSpecs`), `components/app/Toaster` (`toast()`).
- Layouts: `app/(site)` = Navbar + page + CTA + Footer; `app/(auth)` = Navbar + page.
- Mock stores: `lib/session.ts` (sessionStorage user), `lib/favorites.ts` (localStorage favourite car ids). Both `useSyncExternalStore`.
- Figma strokes are inset: bordered boxes get explicit heights.
- Touch: the touch-target block in `globals.css` grows controls to 44px below `lg`. Draw small pill visuals in an inner `<span>` so the button can grow (see CarCard heart). Opt-outs `data-tap="exempt"` / `data-tap="height"`.
- QA paths: in Git Bash pass paths without the leading slash (`node scripts/qa/qa.mjs shot cars 1440 out.png`).

## Screen status

Figma "Preview screen" (`232:32229`, Component page) holds every screen: **10 desktop frames + 11 mobile frames**
(9 distinct screens; Signup has Fill + Error states; Blog appears twice). The cover's "60+ screens" is not in this file.

| Route | Desktop frame | Mobile frame | Status |
|---|---|---|---|
| `/` Home | 232:21757 | 232:22155 | in progress |
| `/login` | 233:42114 | 233:42822 | built |
| `/signup` (Fill / Error states) | 232:26106 | 232:26396 / 232:28389 | built |
| `/cars` Search (Find a car) | 233:43662 | 233:46579 | in progress |
| `/cars/[slug]` Detail/Description | 232:22751 | 232:22813 | in progress |
| `/profile` Profile/Default (`?tab=active\|history`) | 233:41637 | 233:42393 | in progress |
| `/blog` | 233:49208 (also 232:26926) | 233:50031 / 232:28118 | in progress |
| `/blog/[slug]` Detail blog | 232:27331 | 233:49767 | in progress |
| `/contact` Contact us/Fill | 233:46026 | 233:48232 | in progress |
| `/promo` | — (Navbar "Promo" variant; Search layout filtered to promo cars) | — | in progress |
| `/about` | — (built from components: Header about us 139:10449, Vision & Mission 139:10580, FAQs 139:10838) | — | in progress |
| `/help` | — (FAQs 139:10838 + contact links) | — | in progress |
| `/privacy`, `/terms` | — (footer links; text pages in the design's type styles) | — | in progress |

## Navigation map

| Route | Reached from |
|---|---|
| `/` | Logo (navbar, footer) |
| `/blog`, `/blog/[slug]` | Navbar "Blog"; blog cards |
| `/cars` | Navbar "Find a car", footer, CTA "Booking", Home search |
| `/cars/[slug]` | Every CarCard |
| `/promo` | Navbar "Promo" |
| `/about` | Navbar "About us", footer |
| `/help`, `/contact` | Navbar "Help center" dropdown, footer |
| `/login` | Navbar "Login", signup footer link |
| `/signup` | Login "Sign up" link |
| `/profile` | After login / sign-up / social login; footer Account column |
| `/privacy`, `/terms` | Footer Legal column |

## Mocked until a backend exists

- Auth: login / sign-up / social buttons validate, store a session user in sessionStorage, toast, then go to `/profile`.
- Favourites: localStorage.
- Bookings, contact form, newsletter: validated client-side, confirmation toast, no network.
- Call center buttons are `tel:` links.
