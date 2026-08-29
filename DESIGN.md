---
name: WEBLOOM
description: A deep navy-black portfolio lit by one live aurora, set in poster-scale Bodoni Moda with a single amber italic word.
colors:
  void: "#05070e"
  shelf: "#090d18"
  line: "#1a2133"
  amber: "#ffab00"
  mint: "#00ffe0"
  chalk: "#eef2fa"
  mute: "#929fba"
  faint: "#6f7c9c"
typography:
  display:
    fontFamily: "Bodoni Moda, ui-serif, Didot, Georgia, serif"
    fontSize: "clamp(3.6rem, 12.5vw, 11.5rem)"
    fontWeight: 500
    lineHeight: 0.84
    letterSpacing: "-0.025em"
    fontVariation: "\"opsz\" 96"
  display-lg:
    fontFamily: "Bodoni Moda, ui-serif, Didot, Georgia, serif"
    fontSize: "clamp(2.6rem, 7vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "-0.015em"
    fontVariation: "\"opsz\" 96"
  display-accent:
    fontFamily: "Bodoni Moda, ui-serif, Georgia, serif"
    fontWeight: 400
    lineHeight: 0.84
    letterSpacing: "0"
    fontStyle: "italic"
  statement:
    fontFamily: "Bodoni Moda, ui-serif, Didot, Georgia, serif"
    fontSize: "clamp-by-step: 2.1rem / 3rem / 4.4rem"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Bodoni Moda, ui-serif, Didot, Georgia, serif"
    fontSize: "clamp(2.9rem, 9vw, 8rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Bodoni Moda, ui-serif, Didot, Georgia, serif"
    fontSize: "clamp-by-step: 1.75rem / 2.25rem / 3rem"
    fontWeight: 500
    lineHeight: 0.92
    letterSpacing: "-0.015em"
  title-sm:
    fontFamily: "Bodoni Moda, ui-serif, Didot, Georgia, serif"
    fontSize: "clamp-by-step: 1.875rem / 2.25rem"
    fontWeight: 500
    lineHeight: 0.92
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  body-small:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.22em"
    textTransform: "uppercase"
  wordmark:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.3em"
    textTransform: "uppercase"
rounded:
  hair: "2px"
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  gutter-sm: "20px"
  gutter-md: "32px"
  gutter-lg: "48px"
  row: "56px"
  section: "96px"
  section-lg: "128px"
components:
  wordmark:
    textColor: "{colors.chalk}"
    typography: "{typography.wordmark}"
  wordmark-hover:
    textColor: "{colors.amber}"
  nav-link:
    textColor: "{colors.faint}"
    typography: "{typography.label}"
    padding: "8px 0"
  nav-link-hover:
    textColor: "{colors.chalk}"
  availability-pill:
    backgroundColor: "{colors.shelf}"
    textColor: "{colors.mute}"
    rounded: "{rounded.full}"
    padding: "6px 14px 6px 10px"
  work-row:
    textColor: "{colors.chalk}"
    typography: "{typography.title}"
    padding: "56px 0"
  work-row-hover:
    textColor: "{colors.amber}"
  email-cta-mark:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.void}"
    rounded: "{rounded.full}"
    height: "64px"
    width: "64px"
  cover-panel:
    backgroundColor: "{colors.shelf}"
    rounded: "{rounded.lg}"
  cursor-ring:
    rounded: "{rounded.full}"
    height: "34px"
    width: "34px"
  cursor-dot:
    backgroundColor: "{colors.chalk}"
    rounded: "{rounded.full}"
    height: "5px"
    width: "5px"
  placeholder-text:
    textColor: "{colors.faint}"
    typography: "{typography.body-small}"
---

# Design System: WEBLOOM

## Overview

**Creative North Star: "The Lit Room After Dark"**

WEBLOOM is a single dark room with one light source in it. The ground is a deep navy-black that is never pure black, and behind everything the aurora burns — on capable desktops as live domain-warped noise on the GPU, everywhere else as pre-blurred transparent PNGs drifting on slow loops. Film grain lies over the whole surface at 3.2% opacity, which is both the room's texture and the thing that kills gradient banding on a dark ground. Every element of content sits on that atmosphere at `z-index: 10`; nothing gets its own box.

The display voice is a Didone. Bodoni Moda is loaded variable with the optical-size axis exposed and pushed to `"opsz" 96` at display scale, because a didone's entire character is the hairline-to-stem contrast and that contrast collapses if opsz is left tracking a body size. Manrope does everything below the display line: prose, labels, the wordmark, UI. The single amber italic word inside each display line survives from the previous world and is still the signature — it is now the same family as its host line, differing only in style, weight and tracking, which makes it read as an inflection rather than a collision.

The system's density is editorial, not app-like. There are no cards: work is a list of large typographic rows separated by hairlines, capabilities are a definition list separated by hairlines, and the only rectangles with corners on them are photographs of real sites. The palette is deliberately two-accent — amber acts, mint measures — and no third hue is admitted, which is why real project screenshots rest desaturated and why the live shader is coloured strictly out of the same five values. The build's confirmed rejection is the resume grid of equal cards.

**Key Characteristics:**
- One aurora field behind everything — live on the GPU where the device can carry it, baked raster everywhere else — and no other background treatment.
- Exactly two accents, amber for action and mint for status and focus, on a navy-black ground.
- Poster-scale Bodoni Moda with the optical-size axis driven to 96; Manrope for every non-display word.
- Hairline rules and wide-tracked micro-labels instead of cards, panels, or fills.
- Display type arrives by rising out of per-word masks; everything is visible by default and dead under reduced motion.

## Colors

A navy-black ground with hue-tinted neutrals — never a neutral gray anywhere — carrying two saturated accents that are each assigned one job.

### Primary
- **Signal Amber** (`{colors.amber}`): the acting accent. It is the italic word in each display headline, the hover and focus-visible colour of every project row, capability term and link, the fill of the email call-to-action mark, the placeholder badge border, the custom cursor ring's interactive state, and the `::selection` background. It is the only colour allowed to change on interaction.

### Secondary
- **Instrument Mint** (`{colors.mint}`): the measuring accent. It is the availability dot and its ping, the wordmark's period, the `:focus-visible` outline, the caret colour on every element, the skip-link fill, the social-link hover, and the data stroke in the schematic drawings. Mint reports state; it never invites a click.

### Neutral
- **Deep Navy Void** (`{colors.void}`): the page ground, the colour text sits in on amber and mint fills, and the value every scrim gradient resolves to. Deliberately not `#000000` — pure black smears on OLED and halates against the glow.
- **Shelf Navy** (`{colors.shelf}`): the one raised tone, used at 60% for the availability pill and solid behind the sticky cover panel.
- **Hairline Navy** (`{colors.line}`): every rule, divider, border, link underline and scrollbar thumb in the build. This one value carries the entire structural grammar.
- **Chalk** (`{colors.chalk}`): display type, project titles, the wordmark, the cursor dot, and answers in the hero meta list.
- **Mute** (`{colors.mute}`): all running prose, lead paragraphs, blurbs and secondary links.
- **Faint** (`{colors.faint}`): micro-labels, stack lists, timezone, and unfilled placeholder content.

### Named Rules
**The Two-Accent Rule.** Amber and mint are the entire accent vocabulary. A third hue may not enter the page from any source — not from imported imagery, which is why project screenshots rest at reduced saturation, and not from the shader, whose fragment output is mixed only from void, blue-body, mint and amber.

**The Contrast Floor Rule.** Faint is the darkest text tone the system permits, at 4.83:1 on the void ground. Anything that carries words — labels, stack lists, years, placeholder copy — sits at faint or lighter. No new dimmer neutral gets invented for "quieter" text.

**The Tinted Neutral Rule.** Every neutral in the system carries the ground's blue hue. A neutral gray is out of world.

## Typography

**Display Font:** `Rader` — Räder by Valerio Monopoli, Pangram Pangram; the CSS family name is `Rader` — licensed, self-hosted from `public/fonts`, leading the stack; **Bodoni Moda**, variable with the `opsz` axis exposed, is the declared fallback and is what renders wherever the licensed files are absent (then `ui-serif`, Didot, Georgia, serif)
**Body / UI Font:** Manrope (with `ui-sans-serif`, `system-ui`, sans-serif)
**Accent:** display-face italic, amber — one word per display line

**Character:** An expressive display face at poster scale over a quiet geometric grotesque. Every headline and the wordmark are the display face; every sentence, label and piece of chrome is the sans. The one amber italic word is the only ornament the system owns.

### Hierarchy
- **Display** (`{typography.display}`): the hero headline only. Left-aligned, `text-wrap: balance`, leading crushed to 0.84.
- **Display Large** (`{typography.display-lg}`): section headings — "Selected work". The same face and axis setting, one step down the ramp.
- **Headline** (`{typography.headline}`): the contact headline, the page's second-largest moment.
- **Statement** (`{typography.statement}`): the about statement, stepping 2.1rem → 3rem → 4.4rem and held to a 22–28ch measure so it breaks as a poster, not a paragraph.
- **Title** (`{typography.title}`): project row names, stepping 1.75rem → 2.25rem → 3rem. Chalk at rest, amber on hover or keyboard focus. Small title (`{typography.title-sm}`) carries the owner name in the about column.
- **Body** (`{typography.body}`): lead and running prose in mute, capped at 46–68ch depending on column. Small body (`{typography.body-small}`) carries blurbs, meta answers and footer links.
- **Label** (`{typography.label}`): every micro-label — hero meta keys, nav links, stack lists, timezone, footer credit. Uppercase, tracked to 0.22em, in faint.
- **Wordmark** (`{typography.wordmark}`): "WEBLOOM" in nav and footer, extrabold and tracked to 0.3em, followed by a 4px mint dot.

Numerals in years, indices and timezones use tabular figures (`font-variant-numeric: tabular-nums`) so they never wobble between states.

### Named Rules
**The Optical Size Rule.** Every use of the display face at display scale sets `font-variation-settings: "opsz" 96`. The hairline-to-stem contrast is the whole reason the face is here, and at a default opsz the letterforms thicken into a generic serif. Correspondingly, the display face is never used below roughly 1.5rem — small Bodoni is unreadable on a dark ground and is what Manrope is for.

**The One Italic Word Rule.** A display line gets at most one italic word, and it is always amber. Two italic words in one composition is out of world; the italic never sets a whole line, a paragraph, or a label.

**The Sans-Below-The-Headline Rule.** Anything that is not a headline is Manrope: prose, labels, wordmark, buttons, meta, footer. There is no third face, and the serif never runs a sentence.

**The Label-or-Nothing Rule.** Small text is either body-small in mute or a 0.22em-tracked uppercase label in faint. There is no third small-text style, and labels are never set in an accent colour.

**The Word-Mask Rule.** Display type reveals out of masks that are one word wide, never one line wide, so the effect survives any wrap at any viewport. A revealed line must be verifiable: `scripts/kinetic-check.mjs` asserts that no split character is left stuck inside a mask anywhere on the page.

### The Licensed Face Rule

The display face is **PP Räder** (Valerio Monopoli, Pangram Pangram), self-hosted from `public/fonts` as five static weights — Thin, Regular and Bold plus Thin Italic and Italic — converted from the foundry's OTFs to Latin-subsetted WOFF2 at roughly 70KB each. **Bodoni Moda remains the declared fallback** and renders wherever those files are absent, so removing them reverts the site with no code change.

The files currently in the repo came from the foundry's *free for personal use* package. This site advertises freelance services, which is commercial use, so that entitlement does not cover it; a commercial licence is outstanding. Recorded here as a known exception rather than left implicit.

The `@font-face` blocks live in `app/layout.tsx`, not in the stylesheet, because `src` has to carry the GitHub Pages base path and CSS `url()` cannot read a custom property. A probe calls `document.fonts.load('1em Rader')` and stamps `rader-live` on `<html>` only on success; the `.rader-live` rules then drop the `opsz` axis Räder does not have and open the tracking Bodoni needed closed. Never tune one face's spacing on the other's cascade.

### The Hairline Headline Rule

Above 1024px the hero drops to weight 100 and the amber accent word drops with it. Räder's hairline is the reason to use this family at poster scale, and it lets the light field read through the headline instead of being blocked by it. The accent word is set apart by colour and slope alone — leaving it at 400 inside a hairline line reads as a word accidentally bolded. Below 1024px both return to 400: at 3.6rem a hairline on a dark ground goes too thin to hold.

## Layout

One column, one container: `max-width: 1400px`, centred, with gutters stepping 20px → 32px → 48px at 640px and 1024px. Content sections carry `position: relative; z-index: 10`. Beneath them the field stack is fixed and strictly ordered: the aurora (baked PNG or live shader) at `z-index: 0`, the scrim that protects legibility at `z-index: 1`, the grain at `z-index: 60`, the cursor at `z-index: 90`, and the intro curtain at `z-index: 100`. Both field layers use `contain: strict`.

Vertical rhythm is section-scale: 96px of padding per section rising to 128px at 640px, with the hero at `min-height: 100svh` and, from 1024px, bottom-aligned so the meta rule lands on the fold. Content rows inside a section are 32px → 40px → 56px of vertical padding, each closed by a hairline bottom border rather than separated by a gap.

Breakpoints are 640px (`sm`), 768px (`md`) and 1024px (`lg`), and each does distinct work:
- **640px** widens gutters and steps type up.
- **768px** relocates the availability pill: it lives inside the hero below this width and in the nav at and above it, because at 390px the nav bar cannot hold the wordmark, three links and the pill.
- **1024px** is where the system changes shape. The work section becomes two columns (`minmax(0,30rem)` cover rail + `minmax(0,1fr)` rows) with a sticky, tilting cover; below it, every row carries its own inline cover. Covers go from lightly tamed to strongly tamed with a full-colour engaged state only above this width. The about section splits into a 1fr/1.1fr two-column body. It is also the gate for every pointer-driven enhancement — shader, tilt, magnetism — each of which additionally requires `pointer: fine`.

The baked aurora's four layers are positioned per breakpoint rather than scaled, because the desktop composition pushes the blue body far enough off the top-left that a 390px viewport would render the field's dominant colour entirely above the fold.

### Named Rules
**The Hairline Grid Rule.** Structure is drawn with 1px borders in hairline navy, never with background fills, gaps alone, or boxes. A section header is a heading above a `border-b`; a list is rows with `border-b`.

**The Fold Composition Rule.** Field geometry is authored per breakpoint, not derived from the desktop layout. Any new atmospheric layer specifies its mobile placement explicitly.

## Elevation & Depth

The system is flat by construction. There is no shadow scale, no elevation ramp, and no surface tint hierarchy: depth comes from the aurora behind the content plane, from the scrim that sits between them, and — on desktop only — from one genuinely three-dimensional element.

Depth devices, and only these. **The field** is either the live shader (fbm noise, domain-warped twice, leaning 0.30 toward the pointer and stretching up to 55% vertically with scroll velocity) or the baked fallback: four pre-blurred transparent PNGs at 0.95 / 0.80 / 0.75 / 0.32 opacity drifting on 26s, 34s and 30s loops with a pointer-led fourth layer. **The scrim** is a radial vignette plus two stacked bottom gradients that resolve the field to solid void behind the hero copy. **The nav** gains material only when scrolled past 24px, fading in a 70% void background with a 24px backdrop blur and a hairline bottom border over 500ms. **The cover** rotates on X and Y toward the pointer with a `translateZ` lift inside a 1200px perspective.

### Shadow Vocabulary
- **Cover drop** (`box-shadow: 0 30px 70px -28px rgba(2,4,10,0.9)`): the single shadow in the build, on the desktop sticky cover panel only. It reads as the photograph being held slightly off the page, and it is the only place a shadow is licensed.

### Named Rules
**The Scrim-Above-The-Field Rule.** The vignette and floor are legibility, not decoration, so they paint above every field layer at `z-[1]`. A field drawn on top of its own protection puts the headline on a wall of blue; any new atmospheric layer goes under the scrim, never over it.

**The Enhancement-Not-Foundation Rule.** The live shader is an enhancement over a design that is complete without it. It boots on `requestIdleCallback`, only at ≥1024px with `pointer: fine`, never under reduced motion, and fades its own uniform in; when it succeeds it stamps `shader-live` on `<html>` and the baked layers cross-fade out over 1.6s. If OGL fails to import or the context fails to create, the PNG field simply stays. Phones get the PNG field by design, not by degradation.

**The Baked Blur Rule.** Atmospheric softness in the raster path is baked at build time (`scripts/gen-aurora.mjs`). A live `filter: blur()` on a full-bleed layer re-rasterises the whole surface every frame and stalled the compositor hard enough to time out screenshot capture; raw radial gradients avoid the cost but band visibly on the dark ground. Shipped raster atmosphere layers only ever transform.

**The One Shadow Rule.** Surfaces are flat. The cover drop is the system's entire shadow vocabulary; new components get separation from a hairline or from the ground, not from a shadow.

## Shapes

Two silhouettes, and nothing between them. Content is either a full-round pill (`{rounded.full}` — the availability chip, the placeholder badge, the email mark, the scroll-hint capsule, the cursor ring and dot, every status dot) or an unrounded region bounded by hairlines. Rectangles get corners only when they hold an image: 12px on the desktop sticky cover, 8px on the inline mobile covers, 9px inside the schematic browser frames.

Rules are 1px hairline navy, drawn as `border-b` / `border-t` on the element itself or as a `h-px flex-1` span filling the remainder of a labelled divider line. Focus rings are a 2px mint outline at 3px offset with a 2px corner radius. Icons are inline SVG stroke drawings at 11–20px with 1.4–1.8 stroke width and round caps — never an icon font, never a glyph character.

## Components

### Navigation
Fixed, full-width, transparent at rest with a transparent bottom border so no layout shift occurs when it materialises. Past 24px of scroll it transitions background, border and backdrop-filter over 500ms into 70% void with a 24px blur and a hairline border. Height 64px, 80px from 640px. The wordmark is extrabold 0.3em-tracked chalk with a 4px mint dot that scales 2.2× on hover while the text goes amber; nav links are labels in faint that go chalk on hover over 300ms. No active or current-section state is drawn.

### Availability Pill
A full-round chip on 60% shelf with a hairline border and a backdrop blur, holding a 6px mint dot with a pinging halo behind it and 0.6875rem mute text tracked to 0.14em. It renders in the nav at 768px and above, and inside the hero above the headline below that width — one instance either way, never both.

### Buttons and Calls to Action
There is no filled button component. The primary action is a link pairing a 48px (64px from 640px) amber circle holding a stroked arrow in void with the email address in Manrope at 1.25rem → 1.875rem → 2.25rem, underlined in hairline navy at 0.3em offset. On hover the circle scales 1.1× over 500ms and both the text and its underline go amber. The circle — and only the circle — is magnetic. The secondary action is the scroll hint: a 24×40px hairline capsule containing a 3px amber bar sweeping downward on a 2.4s loop, whose border goes amber on hover.

### Work Row (Signature Component)
The system's refusal of the card grid. Each project is a full-width anchor with a hairline bottom border and 56px of vertical padding at desktop: title in the display face at title scale in chalk, an outbound arrow in mute on the right, blurb at body-small in mute capped at 58ch, and a stack list as a label. Hover or keyboard focus turns title and arrow amber over 500ms and translates the arrow 4px right. A project with no live URL renders as a `div` rather than an anchor and carries an amber-outlined "Placeholder" pill.

### Sticky Cover (Signature Component)
Above 1024px, a 4:3 panel on shelf with a hairline border, 12px radius and the cover drop shadow, parked with `top: max(7rem, calc(50vh - 13rem))` — viewport centre rather than under the nav, because the rows column is shorter than the section and a top-anchored panel strands a dead rail beneath itself at the section's end (`scripts/sticky-check.mjs` guards the column lengths). Covers cross-fade over 700ms. The active project follows scroll position (nearest row centre to viewport centre), with hover and keyboard focus overriding until the pointer leaves the grid. The panel tilts up to 7.5° on each axis with a 30px `translateZ` lift, driven from the pointer's position across the whole viewport so it keeps responding while the visitor reads the rows beside it. Below 1024px the panel does not exist and each row carries its own cover.

### Project Cover Image
Real screenshots of the owner's live sites, never recoloured, but tamed at rest: `saturate(0.78) brightness(0.9)` below 1024px and `saturate(0.5) brightness(0.8)` above it, released to `filter: none` when engaged at desktop over 600ms. Covers load eagerly and decode synchronously — lazy-loading these three near-top images painted an undecoded cover as an empty hole on a fast scroll — and `scripts/cover-check.mjs` asserts every cover decodes at both widths.

### Kinetic Display Type (Signature Component)
The reveal that belongs to the display face. Characters — or whole words, for passages long enough that a per-character stagger would read as a loading bar — rise out of per-word masks with a slight rotateX. It waits on `document.fonts.ready`, because a didone's widths change enormously between the fallback serif and Bodoni and animating before the swap makes letters visibly jump mid-flight. GSAP takes ownership of the transform with an explicit `gsap.set` before tweening, since the CSS start state computes to a pixel matrix that a `yPercent` tween alone would not clear. The readable string is exposed once to assistive tech and the split copy is hidden from it. The hero triggers on load; everything else triggers on intersection.

### Custom Cursor
A 34px ring that trails and a 5px chalk dot that tracks exactly, both in `mix-blend-mode: difference` so one cursor works over the dark ground and the light covers alike. Over any interactive element the ring scales 2.1× and takes an amber border with a 10% amber fill. It reveals only on the first real pointer move — a ring parked in a corner reads as a rendering bug — and the native cursor is hidden only by the `cursor-custom` class the script adds itself, so a failed script, a coarse pointer or a reduced-motion visitor keeps a normal pointer.

### Intro Curtain
A full-bleed void panel carrying the wordmark at 0.42em tracking, whose letters rise, exit upward and take the panel with them while the hero characters are already animating behind it. It renders only after mount, so the served HTML is the page itself; it is skipped entirely on reduced motion, on arrival at a `#hash`, and when the page is already scrolled.

### Browser Surfaces
The chrome the build did not draw still carries the world: amber selection with void text, mint caret on every element, mint focus outline, faint placeholder text, and a thin scrollbar with a hairline-navy thumb on a void track that lightens to faint on hover.

### Named Rules
**The Visible-By-Default Rule.** Content ships visible; the `js` class on `<html>` is what opts an element into being hidden before its reveal. A failed or blocked script leaves a complete page, never a blank one — which is also why the curtain mounts client-side only and the native cursor is hidden from inside the cursor script.

**The Rationed Magnetism Rule.** Magnetic attraction is applied to the contact CTA mark and nothing else. A page where everything is magnetic feels loose; the effect is a reward for reaching the one thing the page wants you to click.

**The Reduced-Motion Kill Rule.** Under `prefers-reduced-motion: reduce` the shader never mounts, the curtain never renders, the custom cursor is `display: none` and the native pointer is left alone, kinetic characters are set to `transform: none` and marked ready, drift, sweep, smooth scrolling and reveal transitions are switched off, and every remaining animation and transition is clamped to 0.001ms. Motion is never load-bearing for legibility.

**The Verified-Craft Rule.** Every effect that can fail silently has a script that fails loudly: `kinetic-check.mjs` (no character stranded in a mask), `cover-check.mjs` (every cover decodes at both widths), `sticky-check.mjs` (column lengths), `shoot.mjs` (capture from the production export, not the dev server). A motion effect without a check is not finished.

## Do's and Don'ts

### Do:
- **Do** put every new section on the shared container (`max-width: 1400px`, gutters 20/32/48px) with `relative z-10` so it sits above the field stack.
- **Do** set `font-variation-settings: "opsz" 96` on any display-scale use of Bodoni Moda, and use Manrope for everything that is not a headline.
- **Do** separate content with 1px hairline-navy rules and let type carry hierarchy.
- **Do** ration the amber italic to one word per display line.
- **Do** keep small text at either body-small in mute or a 0.22em-tracked uppercase label in faint at 4.83:1 or better on the ground.
- **Do** give amber the acting job and mint the measuring job; hover and focus resolve to amber, status and focus rings resolve to mint.
- **Do** mask kinetic reveals per word so they survive a wrap, and let GSAP own a transform with an explicit `set` before tweening it.
- **Do** paint legibility scrims above every atmospheric layer, and gate GPU and pointer effects behind `≥1024px`, `pointer: fine`, idle-time boot and a working fallback.
- **Do** gate every animation behind `prefers-reduced-motion` and ship content visible without JavaScript.

### Don't:
- **Don't** build a card: no filled panel, no rounded box, no shadowed tile for text content. Rows and rules only.
- **Don't** introduce a third hue. Imported imagery that carries one gets desaturated at rest; the shader mixes only from the world's own five colours.
- **Don't** set the display face below ~1.5rem, or set a sentence, a label or the wordmark in it.
- **Don't** animate display type before `document.fonts.ready` — the didone's metrics shift on swap and the letters jump.
- **Don't** apply `filter: blur()` to a full-bleed animated layer.
- **Don't** add a shadow to anything but an image panel; the cover drop is the whole vocabulary.
- **Don't** use a neutral gray, or a text tone dimmer than faint.
- **Don't** use icon fonts or glyph characters — icons are inline stroked SVG at 1.4–1.8 stroke width.
- **Don't** hide the native cursor from CSS alone; only the mounted cursor script may add `cursor-custom`.
- **Don't** make an enhancement load-bearing: a device without a GPU field, a magnet or a tilt must still get the finished page.
- **Don't** derive mobile atmosphere placement from the desktop composition; author field geometry per breakpoint.
- **Don't** lazy-load an image that can appear in the first screenful or two of a fast scroll.
