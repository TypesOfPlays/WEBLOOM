# WEBLOOM

Portfolio site for a frontend web developer. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, shipped as a static export to GitHub Pages.

**Live:** https://typesofplays.github.io/WEBLOOM

---

## Fill in your details

Everything you need to change is in one file: **[`lib/content.ts`](lib/content.ts)**.

Anything wrapped in `<<< >>>` is a placeholder and renders in italic grey on the page. Replace the value and flip the matching `…Placeholder: true` flag to `false` — the placeholder styling disappears on its own.

Still waiting on you:

| Field | Where it shows |
| --- | --- |
| `site.owner` | About section, "Behind WEBLOOM" |
| `site.email` | The big contact link |
| `site.location` | Hero meta row + About |
| `site.timezone` | Bottom-right of the hero |
| `socials[]` | Contact section links |
| `projects[]` | The whole Selected work list |

### Projects

The four entries in `projects` are **example shapes, not real work** — each renders a `PLACEHOLDER` badge until you set `placeholder: false`. Replace them with your own:

```ts
{
  title: "Client Name",
  kind: "E-commerce",
  blurb: "One or two sentences on what it is and what you did.",
  stack: ["Next.js", "TypeScript", "Stripe"],
  year: "2025",
  href: "https://the-live-site.com",   // makes the row clickable
  schematic: "commerce",               // commerce | dashboard | editorial | product
  placeholder: false,
}
```

Project covers are hand-drawn SVG schematics in [`components/Schematic.tsx`](components/Schematic.tsx) rather than screenshots, so nothing on the page can be mistaken for a product that does not exist. Swap them for real screenshots whenever you have them.

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
node scripts/shoot.mjs
```

Captures desktop (1440×900) and mobile (390×844) PNGs into `.impeccable/review/`, with animations paused so the captures are deterministic. Requires a local Chromium-based browser and a dev server already running.

---

## Design notes

- **Type:** Manrope throughout, with Bodoni Moda italic for the single amber accent word.
- **Palette:** near-black navy ground (`#05070E`), amber `#FFAB00` and mint `#00FFE0` as the only accents.
- **Motion:** one authored moment — a slow-drifting light field that leans toward the pointer. Built from raw radial gradients with no `filter: blur()`, because a blurred layer that size re-rasterises the whole surface every frame.
- **Accessibility:** WCAG AA contrast on the dark ground, visible focus rings, full keyboard operation, and `prefers-reduced-motion` honoured for every animation.

Durable product context lives in [`PRODUCT.md`](PRODUCT.md).
