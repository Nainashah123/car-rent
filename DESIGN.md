# CARENT — design system (from Figma)

Source: Figma file `B5ENtxw4u0iQpz6jfrje1z` ("CARENT - KIT RENT CAR 2").
Pages: `⌘ Cover` (2002:22106), `✤ Component` (48:6764), `✤ Icon` (3:2).
All screens live in the **Preview screen** component `232:32229` on the Component page.

## Frames

Desktop frames are 1440 wide, mobile frames 375 wide.

| Screen | Desktop | Mobile |
|---|---|---|
| Home | 232:21757 (1440×5851) | 232:22155 |
| Login/Default | 233:42114 (1440×972) | 233:42822 |
| Signup/Fill | 232:26106 | 232:26396 |
| Signup/Error | — | 232:28389 |
| Search | 233:43662 (1440×3249) | 233:46579 |
| Detail/Description | 232:22751 (1440×2292) | 232:22813 |
| Profile/Default | 233:41637 (1440×1913) | 233:42393 |
| Blog | 233:49208 / 232:26926 (1440×2671) | 233:50031 / 232:28118 |
| Detail blog | 232:27331 (1440×3034) | 233:49767 |
| Contact us/Fill | 233:46026 (1440×2009) | 233:48232 |

Every site screen = Navbar (72) + body + **CTA** (480) + **Footer** (588 desktop / 619 mobile).
Auth screens = Navbar + 900px body, with no CTA and no footer.

## Colour tokens (`src/app/globals.css`)

| Token | Hex | Figma variable / use |
|---|---|---|
| `white` | #ffffff | White |
| `black` | #000000 | Black |
| `base-black` | #010101 | Base/Black |
| `neutral-50` | #f6f6f6 | CTA panel, light fills |
| `neutral-100` | #ededed | grey tag, pagination pills |
| `neutral-200` | #bebebe | |
| `neutral-300` | #9d9d9d | inactive nav, disabled text |
| `neutral-400` | #7d7d7d | placeholders, specs, "/day" |
| `neutral-500` | #5c5c5c | |
| `neutral-900` | #090909 | body text |
| `stroke` | #d9d9d9 | field + white-button borders |
| `card-stroke` | #e0e0e0 | car-card photo border |
| `ink` | #111111 | section titles ("Show 12 available car") |
| `ink-top` | #2d2d2d | black-button gradient top |
| `primary-50` … `primary-600` | #ffebef #ffb0be #fe889d #fe617d **#fe395c** #ce2e4a | brand pink (500 = ✨ main) |
| `danger` | #f33636 | field error |
| `success-50/600` | #e6fae8 / #288c34 | green tag |
| `warning-50/600` | #fcf7e5 / #d99338 | yellow tag |
| `danger-50` | #f6e7e7 | red tag bg |

Utilities: `btn-primary` (gradient primary-400→600 + 1px primary-600 ring), `btn-black` (gradient #2d2d2d→#010101 + 1px black ring).
Shadows: `shadow-field` (0 2 1.5 /6%), `shadow-field-active` (3px 5% ring + 0 2 3 /6%). Radii: `rounded-pill` (99), `rounded-card` (28).

## Typography

| Figma style | Family | Size / line-height | Tailwind |
|---|---|---|---|
| Desktop/H1 | New Kansas 400 | 80 / 1.2 | `font-display text-[80px] leading-[1.2]` |
| Desktop/H2 | New Kansas 400 | 64 / 1.2 | |
| Desktop/H3 | New Kansas 400/500 | 56 / 1.4 | |
| Desktop/H4 | New Kansas 400/500 | 40 / 1.2 | |
| Desktop/H5 | New Kansas 400/500 | 32 / 1.2 | |
| Desktop/Display text-1 | Inter Display 400 | 40 / 1.4 | |
| Desktop/Title-1 | Inter Display 500/600 | 24 / 1.2 | |
| Desktop/Bodytext-20 | Inter Display 400/500 | 20 / 1.4, tracking −1% | |
| Desktop/Bodytext-16 | Inter Display 400/500/600 | 16 / 1.4 | |
| Desktop/smalltext-14 | Inter Display 400/500 | 14 / 1.4 | |
| Desktop/Button-16 | Geist 400 | 16 / 1.4 | `font-geist` |
| Responsive/H1 | New Kansas | 40 / 1.2 | |
| Responsive/H2 | New Kansas | 38 / 1.2 | |
| Responsive/H3 | New Kansas | 32 / 1.2 | |
| Responsive/H4 | New Kansas 500 | 24 / 1.2 | |
| Responsive/H5 | New Kansas | 18 / 1.2 | |
| Responsive/Title-1 | Inter Display 500 | 18 / 1.3 | |
| Responsive/Bodytext-16 | Inter Display | 16 / 1.3 | |
| Responsive/Bodytext-14 | Inter Display | 14 / 1.2 | |
| Responsive/Bodytext-12 | Inter Display | 12 / 1.4 | |

Font substitutions, because these files aren't on Google Fonts:
- **Inter Display** is Inter (`next/font/google`) at `opsz 32`. That optical size is how Inter Display is defined.
- **New Kansas** is a commercial face, so we use **Fraunces** (`SOFT 100, WONK 0`) via the `font-display` utility. Drop the licensed New Kansas woff2 into `src/app/fonts/` and swap `--font-kansas` in `layout.tsx` to match the design exactly.

## Spacing scale (Figma number variables)

2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 60, 80, 90, 100. These match Tailwind's 4px scale: `p-3` = 12, `gap-5` = 20, and so on.
Page gutters are 60px desktop (content 1320 wide) and 16px mobile.

## Components (Component page)

| Component | Node | Code |
|---|---|---|
| Navbar (Default / Blog / Find / Promo / About us / Help center × desktop/mobile) | 80:23888 | `components/layout/Navbar.tsx`. Active item 500 neutral-900, others neutral-300. Mobile is the logo, a 52×44 menu button and a 400px sheet |
| Footer | 64:11308 | `components/layout/Footer.tsx`. Photo masked by the "CARENT" wordmark |
| CTA | 63:10539 | `components/layout/Cta.tsx` |
| Button (Primary / Black / White / Ghost × Default/Hover/Pressed/Disable × desktop/mobile) | 63:10727 | `components/ui/Button.tsx`. Desktop is 46px tall, px16, 16px text. Mobile is 40px, px14, 14px text |
| Form field (Default / Active / Fill / Error) | 48:7044 | `components/ui/FormField.tsx`. Pill, 1px #d9d9d9, active border neutral-900 + ring, error border/text #f33636 + info-circle message |
| Text box (textarea) | 76:22638 | build on `FieldShell` + `boxClass` |
| Card list car (Default / Result search / List) | 60:4449 | `components/cars/CarCard.tsx` (list variant: build in Profile) |
| Favorite | 63:7800 | heart pill inside CarCard |
| card booking | 63:11048 | Profile / Detail |
| Card Blog (Featured / Default) | 141:13219 | Blog |
| Label selection (3d / Icon × Active/Default/Hover/Disable) | 58:2107 | filter chips (Search, Home) |
| Label tag (Blue/Grey/Green/Red/Yellow) | 60:4207 | `components/ui/Tag.tsx` |
| Icon 3d (SUV, Sedan, Minibus, MPV, Bus, Calendar, Clock, …) | 58:2065 | PNG illustrations, export per need into `public/images/3d/` |
| Tab profile | 89:31532 | Profile tabs |
| Radio button | 112:43729 | |
| Toggle button | 125:50698 | |
| Header about us / Vision & Mission / FAQs | 139:10449 / 139:10580 / 139:10838 | About / Help / Home FAQs |

## Assets

- `public/icons/`: logo (85×40), footer logo, footer mask, social logos (Google = colour group + mask, Apple SVG, Facebook PNG).
- `public/images/`: auth photo, footer photo, `cars/*` (12 catalogue photos with their Figma crops in `src/data/cars.ts`), `3d/*` (3D icons).
- **Icons:** the Figma icon vectors are corrupted (every exported path is stretched about 200× vertically, e.g. phone = 20×1848). The icon set is Tabler Outline (6,184 symbols with Tabler names), so the code uses `@tabler/icons-react` with the same names. Instance names drop the " 1" suffix: `manual-gearbox 1` → `IconManualGearbox`. Stroke 1.5 at 16–20px.
- Never leave `figma.com/api/mcp/asset` URLs in code. Asset URLs expire after 7 days.
