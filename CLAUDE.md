# exotic-real-estate

Next.js implementation of the Figma design **"Exotic Real Estate"** (file `{{fileKey}}`, page `{{pageId}}`).
Built with the `figma-to-nextjs` skill — its checklist is the definition of done for every screen.

## Stack (verify versions after scaffolding, then fill in)

| Thing | Version / detail |
|---|---|
| Next.js | {{version}}, App Router, Turbopack, Cache Components |
| React | {{version}} |
| TypeScript | strict |
| Tailwind | v4, tokens in `src/app/globals.css` `@theme inline` |
| Package manager | npm |

Import alias `@/*` → `./src/*`. Read `node_modules/next/dist/docs/` before writing caching/routing code.

## Standing requirements

1. **Live and dynamic.** Every control works. Data from typed mocks in `src/data/`, never inlined. No button is a no-op: action, route, or visibly `disabled`.
2. **Pixel-exact desktop** (Figma frame size, mouse). Below `lg` is our reflow: no unintended sideways scroll at 390/768, 44px tap targets.
3. **Routing.** `next/link` / `router.push` only. Every route reachable (sidebar, links, ⋮ menus, palette `searchOnly` "Pages" group). Every flow has an exit.
4. **Validation.** `noValidate` forms, rules in `src/lib/validation.ts`, errors clear on edit, server re-validates once a backend exists.
5. **Tested before done.** Lint + build clean; Playwright geometry vs Figma x/y/w/h; overflow, tap-target, link-crawl and form audits. Report what was measured.

## Styling

- Tailwind utilities, tokens only (no raw hex in components). `var()`-referenced values also on `:root`. One-line custom properties.
- Figma strokes are inset: bordered boxes get explicit heights.
- Touch targets: `touch-targets.css` block in `globals.css`; `TapFocus` + `Toaster` mounted in the root layout. Opt-outs `data-tap="exempt"` / `data-tap="height"`.

## Screen status

Screens in the Figma page: **{{N}}** (other top-level frames are section banners).

| Route | Frames (node ids) | Status |
|---|---|---|
| | | |

## Navigation map

| Route | Reached from |
|---|---|
| | |

## Mocked until a backend exists

- Auth: forms validate then navigate (login → app, sign-up → onboarding → app, reset → code → new password → login).
