---
name: WEBLOOM
description: A deep navy-black portfolio lit by one drifting aurora, set in poster-scale Manrope with a single Bodoni italic word in amber.
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
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.35rem, 11.4vw, 9.25rem)"
    fontWeight: 600
    lineHeight: 0.86
    letterSpacing: "-0.045em"
  display-accent:
    fontFamily: "Bodoni Moda, ui-serif, Georgia, serif"
    fontSize: "clamp(3.35rem, 11.4vw, 9.25rem)"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: "-0.02em"
    fontStyle: "italic"
  headline:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.03em"
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
  placeholder-text:
    textColor: "{colors.faint}"
    typography: "{typography.body-small}"
---

# Design System: WEBLOOM

## Overview

**Creative North Star: "The Lit Room After Dark"**

WEBLOOM is a single dark room with one light source in it. The ground is a deep navy-black that is never pure black, and behind everything drifts one aurora — a blue body with mint and amber lobes — that moves slowly enough that you notice it only on the second look. Film grain lies over the whole surface at 3.2% opacity, which is both the room's texture and the thing that kills gradient banding on a dark ground. Every element in the build sits on that atmosphere at `z-index: 10`; nothing gets its own box.

The system's density is editorial, not app-like. There are no cards: work is a list of large typographic rows separated by hairlines, capabilities are a definition list separated by hairlines, and the only rectangles with corners on them are photographs of real sites. Type does the structural work that borders and panels do elsewhere — a 9.25rem display line, a 0.6875rem label tracked out to 0.22em, and almost nothing in between doing decoration.

The palette is deliberately two-accent. Amber acts (the italic word, hover states, the email mark, the primary affordance in every schematic); mint measures (the live dot, the focus ring, the caret, data lines). No third hue is admitted, which is why real project screenshots rest desaturated. The build's confirmed rejection is the resume grid of equal cards; the confirmed material rejection is a live `filter: blur()` on the atmosphere, whose Gaussian is baked into transparent PNGs at build time so the shipped layers only ever transform.

**Key Characteristics:**
- One drifting aurora field behind everything; the page itself has no other background treatment.
- Exactly two accents — amber for action, mint for status and focus — on a navy-black ground.
- Hairline rules and wide-tracked micro-labels instead of cards, panels, or fills.
- Poster-scale Manrope with a single Bodoni Moda italic word per display line.
- Visible-by-default content: motion is additive, and every animation is off under reduced motion.

## Colors

A navy-black ground with hue-tinted neutrals — never a neutral gray anywhere — carrying two saturated accents that are each assigned one job.

### Primary
- **Signal Amber** (`{colors.amber}`): the acting accent. It is the italic word in each display headline, the hover and focus-visible colour of every project row, capability term and link, the fill of the email call-to-action mark, the placeholder badge border, and the `::selection` background. It is the only colour allowed to change on interaction.

### Secondary
- **Instrument Mint** (`{colors.mint}`): the measuring accent. It is the availability dot and its ping, the wordmark's period, the `:focus-visible` outline, the caret colour on every element, the social-link hover, and the data stroke in the schematic drawings. Mint reports state; it never invites a click.

### Neutral
- **Deep Navy Void** (`{colors.void}`): the page ground and the colour text sits on top of amber and mint fills. Deliberately not `#000000` — pure black smears on OLED and halates against the glow.
- **Shelf Navy** (`{colors.shelf}`): the one raised tone, used at 60% for the availability pill and solid behind the sticky cover panel.
- **Hairline Navy** (`{colors.line}`): every rule, divider, border and scrollbar thumb in the build. This one value carries the entire structural grammar.
- **Chalk** (`{colors.chalk}`): display type, headlines, project titles, the wordmark, and answers in the hero meta list.
- **Mute** (`{colors.mute}`): all running prose, lead paragraphs, blurbs and secondary links.
- **Faint** (`{colors.faint}`): micro-labels, stack lists, timezone, and unfilled placeholder content.

### Named Rules
**The Two-Accent Rule.** Amber and mint are the entire accent vocabulary. A third hue may not enter the page from any source — including imported imagery, which is why project screenshots rest at reduced saturation.

**The Contrast Floor Rule.** Faint is the darkest text tone the system permits, at 4.83:1 on the void ground. Anything that carries words — labels, stack lists, years, placeholder copy — sits at faint or lighter. No new dimmer neutral gets invented for "quieter" text.

**The Tinted Neutral Rule.** Every neutral in the system carries the ground's blue hue. A neutral gray is out of world.

## Typography

**Display Font:** Manrope (with `ui-sans-serif`, `system-ui`, sans-serif)
**Accent Font:** Bodoni Moda, italic only (with `ui-serif`, Georgia, serif)
**Body Font:** Manrope

**Character:** One geometric grotesque doing everything, interrupted once per display line by a high-contrast Didone italic in amber. The pairing reads as engineering with a single deliberate flourish — the flourish is rationed to one word, which is what makes it read as taste rather than decoration.

### Hierarchy
- **Display** (`{typography.display}`): the hero headline and the contact headline. Set left-aligned, tight to −0.045em, leading below 1, and balanced with `text-wrap: balance`.
- **Display Accent** (`{typography.display-accent}`): exactly one word inside a display line, italic Bodoni in amber, tracked slightly looser than its host at −0.02em to compensate for the serif's narrower fit.
- **Headline** (`{typography.headline}`): section headings ("Selected work") and the about statement, the latter held to a 20–26ch measure so it breaks as a poster, not a paragraph.
- **Title** (`{typography.title}`): project row names and capability terms. Chalk at rest, amber on hover or keyboard focus.
- **Body** (`{typography.body}`): lead and running prose in mute, capped at 46–68ch depending on column. Small body (`{typography.body-small}`) carries blurbs, meta answers and footer links.
- **Label** (`{typography.label}`): every micro-label — hero meta keys, nav links, stack lists, timezone, footer credit. Uppercase, tracked to 0.22em, in faint.
- **Wordmark** (`{typography.wordmark}`): "WEBLOOM" in nav and footer, extrabold and tracked to 0.3em, followed by a 4px mint dot.

Numerals in years, indices and timezones use tabular figures (`font-variant-numeric: tabular-nums`) so they never wobble between states.

### Named Rules
**The One Italic Word Rule.** A display line gets at most one Bodoni italic word, and it is always amber. Two italic words in one composition is out of world; the accent face never sets a whole line, a paragraph, or a label.

**The Label-or-Nothing Rule.** Small text is either body-small in mute or a 0.22em-tracked uppercase label in faint. There is no third small-text style, and labels are never set in an accent colour.

**The Tightening Ramp Rule.** Tracking tightens as size grows: −0.045em at display, −0.035em at headline, −0.03em at title, normal at body, +0.22em at label. Any new size picks its tracking off this ramp.

## Layout

One column, one container: `max-width: 1400px`, centred, with gutters stepping 20px → 32px → 48px at 640px and 1024px. Every section carries `position: relative; z-index: 10` so it floats above the fixed aurora, and the aurora itself is `position: fixed; inset: 0; z-index: 0` with `contain: strict`.

Vertical rhythm is section-scale: 96px of padding per section rising to 128px at 640px, with the hero at `min-height: 100svh` and, from 1024px, bottom-aligned so the meta rule lands on the fold. Content rows inside a section are 32px → 40px → 56px of vertical padding, each closed by a hairline bottom border rather than separated by a gap.

Breakpoints are 640px (`sm`), 768px (`md`) and 1024px (`lg`), and each does distinct work:
- **640px** widens gutters and steps type up.
- **768px** relocates the availability pill: it lives inside the hero below this width and in the nav at and above it, because at 390px the nav bar cannot hold the wordmark, three links and the pill.
- **1024px** is where the system changes shape. The work section becomes two columns (`minmax(0,30rem)` cover rail + `minmax(0,1fr)` rows) with a sticky cover; below it, every row carries its own inline cover. Project covers also go from lightly tamed to strongly tamed with a full-colour engaged state only above this width. The about section splits into a 1fr/1.1fr two-column body.

The aurora's four layers are positioned per breakpoint rather than scaled, because the desktop composition pushes the blue body far enough off the top-left that a 390px viewport would render the field's dominant colour entirely above the fold.

### Named Rules
**The Hairline Grid Rule.** Structure is drawn with 1px borders in hairline navy, never with background fills, gaps alone, or boxes. A section header is a heading above a `border-b`; a list is rows with `border-b`.

**The Fold Composition Rule.** Aurora geometry is authored per breakpoint, not derived from the desktop layout. Any new atmospheric layer specifies its mobile placement explicitly.

## Elevation & Depth

The system is flat by construction. There is no shadow scale, no elevation ramp, and no surface tint hierarchy: depth comes entirely from the aurora behind the content plane, a radial vignette, and a bottom gradient floor that darkens the field to solid void so text never lands on the brightest part of the light.

Two depth devices exist and only two. The atmosphere is layered light: four pre-blurred transparent PNGs at 0.95 / 0.80 / 0.75 / 0.32 opacity, drifting on 26s, 34s and 30s loops with a pointer-led fourth layer that lerps toward the cursor. And the fixed nav gains material only when scrolled past 24px, fading in a 70% void background with a 24px backdrop blur and a hairline bottom border over 500ms.

### Shadow Vocabulary
- **Cover drop** (`box-shadow: 0 30px 70px -28px rgba(2,4,10,0.9)`): the single shadow in the build, on the desktop sticky cover panel only. It reads as the photograph being held slightly off the page, and it is the only place a shadow is licensed.

### Named Rules
**The Baked Blur Rule.** Atmospheric softness is baked into raster assets at build time (`scripts/gen-aurora.mjs`). A live `filter: blur()` on a full-bleed layer re-rasterises the whole surface every frame and stalled the compositor hard enough to time out screenshot capture; raw radial gradients avoid the cost but band visibly on the dark ground. Shipped atmosphere layers only ever transform.

**The One Shadow Rule.** Surfaces are flat. The cover drop is the system's entire shadow vocabulary; new components get separation from a hairline or from the ground, not from a shadow.

## Shapes

Two silhouettes, and nothing between them. Content is either a full-round pill (`{rounded.full}` — the availability chip, the placeholder badge, the email mark, the scroll-hint capsule, every status dot) or an unrounded region bounded by hairlines. Rectangles get corners only when they hold an image: 12px on the desktop sticky cover, 8px on the inline mobile covers, 9px inside the schematic browser frames.

Rules are 1px hairline navy, drawn as `border-b` / `border-t` on the element itself or as a `h-px flex-1` span filling the remainder of a labelled divider line. Focus rings are a 2px mint outline at 3px offset with a 2px corner radius. Icons are inline SVG stroke drawings at 11–20px with 1.4–1.8 stroke width and round caps — never an icon font, never a glyph character.

## Components

### Navigation
Fixed, full-width, transparent at rest with a transparent bottom border so no layout shift occurs when it materialises. Past 24px of scroll it transitions background, border and backdrop-filter over 500ms into 70% void with a 24px blur and a hairline border. Height 64px, 80px from 640px. The wordmark is extrabold 0.3em-tracked chalk with a 4px mint dot that scales 2.2× on hover while the text goes amber; nav links are labels in faint that go chalk on hover over 300ms. No active or current-section state is drawn.

### Availability Pill
A full-round chip on 60% shelf with a hairline border and a backdrop blur, holding a 6px mint dot with a pinging halo behind it and 0.6875rem mute text tracked to 0.14em. It renders in the nav at 768px and above, and inside the hero above the headline below that width — one instance either way, never both.

### Buttons and Calls to Action
There is no filled button component. The primary action is a link pairing a 48px (64px from 640px) amber circle holding a stroked arrow in void with the email address set at title scale, underlined in hairline navy at 0.3em offset. On hover the circle scales 1.1× over 500ms and both the text and its underline go amber. The secondary action is the scroll hint: a 24×40px hairline capsule containing a 3px amber bar sweeping downward on a 2.4s loop, whose border goes amber on hover.

### Work Row (Signature Component)
The system's refusal of the card grid. Each project is a full-width anchor with a hairline bottom border and 56px of vertical padding at desktop: title at title scale in chalk, an outbound arrow in mute on the right, blurb at body-small in mute capped at 58ch, and a stack list as a label. Hover or keyboard focus turns title and arrow amber over 500ms and translates the arrow 4px right. A project with no live URL renders as a `div` rather than an anchor and carries an amber-outlined "Placeholder" pill.

### Sticky Cover (Signature Component)
Above 1024px, a 4:3 panel on shelf with a hairline border, 12px radius and the cover drop shadow, parked with `top: max(7rem, calc(50vh - 13rem))` — viewport centre rather than under the nav, because the rows column is shorter than the section and a top-anchored panel strands a dead rail beneath itself at the section's end. Covers cross-fade over 700ms. The active project follows scroll position (nearest row centre to viewport centre), with hover and keyboard focus overriding until the pointer leaves the grid. Below 1024px the panel does not exist and each row carries its own cover.

### Project Cover Image
Real screenshots of the owner's live sites, never recoloured, but tamed at rest: `saturate(0.78) brightness(0.9)` below 1024px and `saturate(0.5) brightness(0.8)` above it, released to `filter: none` on hover or focus at desktop over 600ms. Covers load eagerly and decode synchronously — lazy-loading these three near-top images painted an undecoded cover as an empty hole on a fast scroll.

### Schematic (Signature Component)
Where a project has no screenshot, an authored SVG wireframe on a 400×300 frame stands in: a browser chrome bar, hairline structure at `#28324a`, filled blocks at `#3d4a68`, exactly one amber primary affordance and one mint data or status element per drawing. Schematics read as "this is the structure I built" and can never be mistaken for a screenshot of a product that does not exist.

### Browser Surfaces
The chrome the build did not draw still carries the world: amber selection with void text, mint caret on every element, mint focus outline, faint placeholder text, and a thin scrollbar with a hairline-navy thumb on a void track that lightens to faint on hover.

### Named Rules
**The Visible-By-Default Rule.** Content ships visible; the `js` class on `<html>` is what opts an element into being hidden before its reveal. A failed or blocked script leaves a complete page, never a blank one.

**The Reduced-Motion Kill Rule.** Under `prefers-reduced-motion: reduce` the aurora drift, the hero line rise, the scroll hint sweep, smooth scrolling and all reveal transitions are switched off, reveals are marked shown immediately, and every remaining animation and transition is clamped to 0.001ms. Motion is never load-bearing for legibility.

## Do's and Don'ts

### Do:
- **Do** put every new section on the shared container (`max-width: 1400px`, gutters 20/32/48px) with `relative z-10` so it sits above the fixed aurora.
- **Do** separate content with 1px hairline-navy rules and let type carry hierarchy.
- **Do** ration the Bodoni italic to one amber word per display line.
- **Do** keep small text at either body-small in mute or a 0.22em-tracked uppercase label in faint at 4.83:1 or better on the ground.
- **Do** give amber the acting job and mint the measuring job; hover and focus resolve to amber, status and focus rings resolve to mint.
- **Do** bake atmospheric blur into raster assets and animate only `transform` and `opacity` on full-bleed layers.
- **Do** render one instance of a responsive element and move it between breakpoints, as the availability pill does at 768px.
- **Do** gate every animation behind `prefers-reduced-motion` and ship content visible without JavaScript.

### Don't:
- **Don't** build a card: no filled panel, no rounded box, no shadowed tile for text content. Rows and rules only.
- **Don't** introduce a third hue. Imported imagery that carries one gets desaturated at rest rather than admitted.
- **Don't** apply `filter: blur()` to a full-bleed animated layer.
- **Don't** add a shadow to anything but an image panel; the cover drop is the whole vocabulary.
- **Don't** use a neutral gray, or a text tone dimmer than faint.
- **Don't** use icon fonts or glyph characters — icons are inline stroked SVG at 1.4–1.8 stroke width.
- **Don't** derive mobile atmosphere placement from the desktop composition; author aurora geometry per breakpoint.
- **Don't** lazy-load an image that can appear in the first screenful or two of a fast scroll.
