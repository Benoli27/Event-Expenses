# 8th Sutton Scouts — Design System

A brand design system for **8th Sutton Scouts**, a local Scout Group operating under the UK
Scout Association's brand. Everything here is derived from one supplied source:

- `uploads/Scout Branding.pdf` — *Skills for Life: Scout brand guidelines, Version 1.0, May 2018*
  (The Scout Association, 28 spreads). This is the authoritative source for logo rules, colour,
  typography, photography direction, tone of voice and application.
- Referenced but **not supplied** (noted here in case the reader has access):
  `scouts.org.uk/brand` (brand centre, logo generator, print/social/Office templates, photo library),
  `scouts.org.uk/styleguide` (editorial + digital style guides),
  `fonts.google.com/specimen/Nunito+Sans` (the brand font).

## Context

The Scouts are a UK youth movement — *"we believe in preparing young people with skills for life."*
The brand rests on two elements: **Skills for Life** (what we say — character, employability and
practical skills) and **Belonging** (what we convey — fun, friendship and adventure in a place you
can belong). Values: integrity, respect, care, belief, cooperation.

A Group like 8th Sutton is a **local personalisation** of that national brand, not a separate one.
The Group name sits *below* the Scouts logotype in Nunito Sans Extra Bold, with no extra words
(so "8th Sutton", never "8th Sutton Scouts" or "8th Sutton Group" in the lock-up).

### Surfaces this system serves
Local Scouting produces recruitment flyers, banners and signage, letterheads and name badges,
social media, PowerPoint decks, and a Group website/newsletter. There is no product UI in the
source — so the UI kits here are recreations of the brand's **applied layouts** (flyer, banner,
Group site page, deck), not of an app.

---

## Content fundamentals

**Voice:** confident, active, challenging, inclusive and optimistic — the guidelines call this
*"optimism with attitude."* Public-facing copy leans challenging and emotional; copy to members
and volunteers is warmer and more supportive but still active and confident.

**Person:** "we" for the movement, "you" for the reader. Never institutional third person.
- Inclusive: *"If you have any questions, please phone us"* — not *"If there are any points that
  require explanation we shall be glad to furnish additional details by telephone."*

**Casing:** sentence case everywhere, including headlines and buttons. No ALL CAPS shouting.
Hashtags are camel-cased: `#SkillsForLife`.

**Sentence shape:** short declaratives, often stacked in threes with full stops as a rhythm device:
- *"Do more. Share more. Be more."*
- *"Do more. Learn more. Be more."* (Cymru / N.I. variant)
- *"We encourage our young people to do more, learn more and be more."*

**Claims are concrete and human:** *"Each week, we give over 460,000 young people the opportunity
to enjoy fun and adventure…"*; *"skills that have helped Scouts become everything from teachers and
social workers to astronauts and Olympians."*

**Objection-handling is a house move:** *"Volunteering is easier than you think."* /
*"You don't need to have been a Scout."* / *"Whether you can spare an hour a month or a day a year…"*

**Naming:** "The Scouts" or "Scouts" — only "The Scout Association" in formal documents.
Never "the Scouts organisation", never "Boy Scouts".

**Emoji: no.** The 2018 guidelines contain none, and the voice does its work in words. Hashtags and
the fleur-de-lis carry the informal register instead.

**Italics:** only to distinguish a word or publication title inside body copy — as little as possible.

**Sign-off pattern:** a CTA URL and the hashtag, stacked, in bold —
`scouts.org.uk/join` / `#SkillsForLife`. Local equivalents swap the URL.

---

## Visual foundations

**Overall:** *"bold, clean and contemporary… greatest impact when we use it confidently and with
simplicity."* Flat colour, big type, real photography, generous space. No decoration for its own sake.

**Colour** — eight palette colours plus black and white. Purple `#7413dc` is primary and anchors
everything; teal `#00a794` is the most-used partner. Colours are used **alone or in the defined
pairs** (navy/pink, yellow/red, blue/green). Limit how many appear at once. Large flat fields of a
single colour with white type is the signature move. Tints exist at 5/20/40/60/80% for
backgrounds and charts, never for type. When colour meets an image, pick the palette colour that
complements the photo.

**No gradients.** The only gradient permitted in this system is a legibility scrim over photography
(`--overlay-scrim`) — never a decorative or duotone-purple gradient.

**Typography** — Nunito Sans, five weights, nothing else.
Black 900 for headlines and hashtags · Extra Bold 800 for logo personalisation only ·
Bold 700 for CTAs and contact details · Regular 400 for body on solid colour ·
Light 300 for body on white. Headlines set tight (`--leading-tight`) and stacked; body at 1.5.

**Layout** — grids bring order: 2–4 columns for small print, 5–10 for large format and digital.
Don't cram. Logo clear space equals the height/width of the "u" in Scouts. Minimum logo sizes:
horizontal 40mm (25mm unpersonalised), stack 30mm (20mm unpersonalised). The logo sits in a fixed
preferred position — top-left or bottom-left of a layout — so it is always visible and consistent.

**Backgrounds** — solid palette colour, white, black, or a full-bleed photograph. No patterns,
no textures, no hand-drawn illustration, no repeating motifs. The fleur-de-lis may appear large
and cropped as a graphic element when the Scout context is already clear.

**Photography** — the emotional core of the brand: *"a moment in time."* Candid, available light,
mid-action or immediately after; faces and eye contact; moments of connection, learning, sharing,
achievement and friendship — not activity documentation. Warm daylight, natural greens and
outdoor blues, ordinary UK settings (parks, halls, water, hills, streets). Uniform optional.
No heavy grade, no grain, no black and white, no stock-photo staging.

**Cards & containers** — square or barely-rounded (`--radius-none` / `--radius-sm` 4px).
A card is a flat colour block or a white block with a 2px `--border-subtle` rule; shadows are
optional and shallow (`--shadow-card`). No rounded-corner-plus-coloured-left-border pattern.

**Borders** — 2px is the default weight, 4px for emphasis (the flyer "with border" variant uses a
full-bleed colour frame around white content).

**Transparency & blur** — used only functionally: a scrim behind text on photography, or a
90%-opacity purple panel over an image. No frosted-glass surfaces.

**Motion** — the source is print-first and specifies none, so keep it restrained: short fades and
2–6px translations, `--duration-base` 200ms, `--ease-standard`. No bounce, no spring, no parallax.

**Interaction states** (extrapolated, flagged as such):
- Hover: darken a light surface / lighten a dark one by one tint step (purple → `--purple-80`);
  underline appears on links.
- Press: one further tint step darker, no scale change.
- Focus: 3px `--scout-yellow` ring (`--shadow-focus`) — high contrast on purple and on white.
- Disabled: `--ink-200` surface, `--ink-400` text, no shadow.

---

## Iconography

**The source defines no icon set.** The only mark in the guidelines is the **fleur-de-lis**, which
doubles as the brand's single graphic device and may be used alone when the Scout context is clear.
There is no icon font, no sprite sheet, no PNG icon library, no unicode-glyph convention, and — as
above — no emoji.

Consequences for this system:
- `assets/logo/fleur-de-lis.svg` is the one true brand glyph. Use it as a bullet, a watermark, a
  large cropped background element, or a badge. Single colour only.
- Where UI genuinely needs functional icons (menu, close, chevron, calendar), **Lucide** is used
  from CDN (`https://unpkg.com/lucide-static`) as the closest match to the brand's clean,
  contemporary, even-stroke character. **This is a substitution, not brand canon — flagged below.**
- Never draw bespoke illustrative icons; never mix icon families; never recolour the fleur-de-lis
  into more than one colour.

---

## Assets

- `assets/logo/fleur-de-lis.svg` — the mark, extracted as vector from the guidelines PDF.
- `assets/logo/scouts-wordmark.svg` — the "Scouts" logotype.
- `assets/logo/logo-horizontal.svg` — horizontal lock-up (use when space is tight).
- `assets/logo/logo-stack.svg` — stack lock-up (preferred when there is room).
  All four use `fill="currentColor"`: colour them purple, black or white via CSS. Inline them
  (or set `color`) rather than loading as `<img>`, which cannot inherit `currentColor`.
- `assets/logo/group/8th-sutton-{purple,black,white}.png` — **the supplied 8th Sutton (TSGG) Group
  lock-up**, 1920×1722 with transparency: fleur, "Scouts" logotype and the Group line as one piece of
  artwork. Single colour, never recoloured or boxed. Rendered by the `GroupLogo` component.
- `assets/photography/*.jpg` — 24 images extracted from the guidelines: candid Scout photography
  plus the applied-brand mockups (banners, flyers, signage, merchandise, vehicle livery) that show
  the identity in use.

Nothing here was drawn, redrawn or generated: logo geometry and photography were extracted
programmatically from the supplied PDF.

---

## Index

| Path | What it is |
|---|---|
| `styles.css` | Global entry point — `@import`s only |
| `tokens/fonts.css` | Nunito Sans (Google Fonts) |
| `tokens/colors.css` | Palette, tints, semantic aliases |
| `tokens/typography.css` | Font stacks, weights, scale, leading |
| `tokens/spacing.css` | 8px scale, grid, container widths, logo clear space |
| `tokens/effects.css` | Radii, borders, shadows, easing, overlays |
| `guidelines/*.card.html` | 21 foundation specimen cards (Colors, Type, Spacing, Brand) |
| `components/` | Reusable UI primitives — see below |
| `ui_kits/group_website/` | Click-through recreation of a Group website (home, sections, what we do, join) |
| `ui_kits/print_campaign/` | Applied print layouts — flyer, pull-up banner, sign, stationery |
| `templates/` | Copyable starting folders — deck, A5 recruitment flyer, Group web page (see `templates/README.md`) |
| `assets/logo/` | Logo + fleur-de-lis SVGs |
| `assets/photography/` | Brand photography and application mockups |
| `SKILL.md` | Agent Skills front matter, for using this system outside this project |

## Components

`components/brand/`
- **GroupLogo** — the supplied 8th Sutton (TSGG) lock-up, in purple, black and white. Use this wherever the Group identifies itself
- **Logo** — the national Scouts logotype in four supplied lock-ups, with local personalisation
- **Fleur** — the fleur-de-lis alone: bullet, badge, watermark, cropped graphic
- **Icon** — functional UI icon wrapper (Lucide from CDN; *intentional addition*, see Substitutions)

`components/core/`
- **Button** — primary/secondary/outline/inverse/ghost, three sizes
- **IconButton** — icon-only square control, 44px minimum
- **Link** — inline link, purple or inverse, bold for the sign-off pattern
- **Card** — flat content block: white with a rule, solid palette tone, or photo-topped
- **Badge** — small solid label for sections, ages and status
- **Tag** — selectable filter chip

`components/forms/`
- **Input** — single-line text field
- **Textarea** — multi-line field
- **Select** — native dropdown in the brand field treatment
- **Checkbox** — square, purple fill with a white tick
- **Radio** — radio group, two to five options
- **Switch** — binary toggle for instant-effect settings

`components/feedback/`
- **Dialog** — modal panel over a dark scrim
- **Toast** — brief status bar in palette status colours
- **Tooltip** — small black hover/focus label

`components/navigation/`
- **Tabs** — underlined tab row, light and inverse

### Intentional additions
The 2018 guidelines are a brand book, not a component library, so this primitive set was authored
from scratch against the brand's rules. One addition is worth naming explicitly: **Icon**, a thin
wrapper over the Lucide CDN, exists because functional UI needs glyphs the brand does not supply —
it keeps that substitution in one place instead of scattered through screens.

## Templates

Three starting folders under `templates/`, each a single `.dc.html` entry plus a `ds-base.js` that
loads this system's CSS and component bundle:

- **Slide deck** (`templates/slide-deck/`) — 16:9, eight slides covering the layouts a Group actually
  needs: title over photography, purple section divider, photo split, flat-colour number tiles,
  90%-purple quote panel, photo grid, sign-off with URL and hashtag.
- **Recruitment flyer** (`templates/recruitment-flyer/`) — two-sided A5, print-ready: full-bleed photo
  front with the "Do more. Share more. Be more." stack, and the guidelines' low-ink bordered variant
  on the back with meeting times and contact details.
- **Group web page** (`templates/group-page/`) — one-page site composed from the primitives: sticky
  header, photo hero with scrim, five section cards, volunteering CTA over a cropped fleur, join form.

All three carry placeholder 8th Sutton copy. Replace the words; keep the structure, the weights and
the one-or-two-colours-at-a-time discipline.

---

## Substitutions & flags

1. **Font files.** No font binaries were supplied. Nunito Sans is loaded from Google Fonts, which
   is exactly what the guidelines instruct ("This is a free Google font… used at no cost"), but if
   you need self-hosted `.woff2` files, please supply them.
2. **Icons.** Lucide from CDN stands in for a functional icon set the brand does not define.
3. **Interaction states, motion, radii and shadows** are extrapolated from a print-first 2018
   guideline. The digital style guide at `scouts.org.uk/styleguide` would supersede them — it was
   not supplied.
4. **Group identity.** The 8th Sutton (TSGG) lock-up is now supplied artwork (three PNGs in
   `assets/logo/group/`) and is used throughout — no longer generated by personalising the national
   logotype. Vector (SVG/EPS) versions and Group-specific photography would still be welcome.
