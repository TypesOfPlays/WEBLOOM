# WEBLOOM

Portfolio site for a frontend web developer. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, shipped as a static export to GitHub Pages.

**Live:** https://typesofplays.github.io/WEBLOOM

---

## Edit the content

Everything you would want to change is in one file: **[`lib/content.ts`](lib/content.ts)**.

Still outstanding — the only placeholder left:

| Field | Where it shows |
| --- | --- |
| `socials[]` → LinkedIn | Contact section. Replace the `<<< >>>` URL and delete `placeholder: true`. |

Worth confirming when you get a chance: the `stack` list on each project names only what was detectable from the live build (Next.js, React). If you also used TypeScript, Tailwind, a CMS or anything else, add it — but only what you actually used.

### Projects

The three entries in `projects` are your real, live sites. Adding another:

```ts
{
  title: "Client Name",
  kind: "Sector · City",
  blurb: "One or two sentences on what it is and what you did.",
  stack: ["Next.js", "React"],
  href: "https://the-live-site.com",
  image: "client-slug",     // omit to fall back to a drawn schematic
  schematic: "editorial",   // commerce | dashboard | editorial | product
}
```

Then add the URL to `scripts/gen-work-shots.mjs` and run it to capture the cover:

```bash
node scripts/gen-work-shots.mjs
```

Covers are real screenshots of the live sites, at 1600 and 800 wide. A project with no `image` falls back to a hand-drawn SVG schematic from [`components/Schematic.tsx`](components/Schematic.tsx).

---

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

Outputs a static site to `out/`. Locally this builds at the root path; the deploy workflow sets `GITHUB_PAGES=true` so the production build gets the `/WEBLOOM` base path GitHub Pages needs.

## Deploy

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the export and publishes it to GitHub Pages.

**One-time setup:** in the repository, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.

## Review screenshots

```bash
npm run build && node scripts/shoot.mjs
```

Captures desktop (1440×900) and mobile (390×844) PNGs into `.impeccable/review/`, with animations paused so the captures are deterministic. With no argument it serves the static export in `out/` itself, so the shots are of the shipped build with no dev-only overlay. Pass a URL to shoot a running dev server instead. Requires a local Chromium-based browser.

The aurora field's blurred layers are generated, not committed by hand:

```bash
node scripts/gen-aurora.mjs
```

---

## Design notes

- **Type:** Manrope throughout, with Bodoni Moda italic for the single amber accent word.
- **Palette:** near-black navy ground (`#05070E`), amber `#FFAB00` and mint `#00FFE0` as the only accents.
- **Motion:** one authored moment — a slow-drifting light field that leans toward the pointer. Its blur is baked into PNGs at build time rather than applied with `filter: blur()`, because a blurred layer that size re-rasterises the whole surface every frame; the layers only ever transform.
- **Accessibility:** WCAG AA contrast on the dark ground, visible focus rings, full keyboard operation, and `prefers-reduced-motion` honoured for every animation.

Durable product context lives in [`PRODUCT.md`](PRODUCT.md).
