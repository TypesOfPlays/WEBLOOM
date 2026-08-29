/**
 * Bake the aurora field's light blobs into transparent PNGs.
 *
 *   node scripts/gen-aurora.mjs
 *
 * The field wants a soft, volumetric blur. Doing that with a live
 * `filter: blur()` on a 60vw layer forces a full-surface re-rasterise every
 * animation frame; doing it with raw radial gradients bands visibly on a dark
 * ground. So the Gaussian is baked once, here, and the page ships flat images
 * that only ever get a cheap transform.
 */
import puppeteer from "puppeteer-core";
import { mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve(process.cwd(), "public/aurora");
mkdirSync(OUT, { recursive: true });

const CANDIDATES = [
  "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];
const executablePath = CANDIDATES.find((p) => existsSync(p));
if (!executablePath) {
  console.error("No Chromium-based browser found.");
  process.exit(1);
}

/** core colour, mid colour, baked blur radius as a fraction of the canvas */
const BLOBS = [
  {
    name: "blue",
    core: "rgba(46,110,255,0.92)",
    mid: "rgba(28,64,180,0.52)",
    edge: "rgba(16,34,104,0.14)",
    squash: 0.82,
  },
  {
    name: "mint",
    core: "rgba(0,228,208,0.5)",
    mid: "rgba(0,138,186,0.26)",
    edge: "rgba(0,70,120,0.06)",
    squash: 1,
  },
  {
    name: "amber",
    core: "rgba(255,176,10,0.52)",
    mid: "rgba(255,116,0,0.24)",
    edge: "rgba(150,60,0,0.05)",
    squash: 0.9,
  },
];

const SIZES = [1400, 700];

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--force-color-profile=srgb", "--hide-scrollbars"],
});

const page = await browser.newPage();

for (const size of SIZES) {
  for (const blob of BLOBS) {
    const blur = Math.round(size * 0.085);
    const inset = Math.round(size * 0.16);

    await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
    await page.setContent(
      `<!doctype html><html><body style="margin:0;background:transparent">
        <div style="
          position:absolute;
          inset:${inset}px;
          transform:scaleY(${blob.squash});
          border-radius:50%;
          filter:blur(${blur}px);
          background:radial-gradient(closest-side,
            ${blob.core},
            ${blob.mid} 46%,
            ${blob.edge} 72%,
            transparent 100%);
        "></div>
      </body></html>`,
      { waitUntil: "load" },
    );

    // let the blur rasterise before capture
    await new Promise((r) => setTimeout(r, 250));

    await page.screenshot({
      path: `${OUT}/${blob.name}-${size}.png`,
      omitBackground: true,
    });
    console.log(`baked ${blob.name}-${size}.png (blur ${blur}px)`);
  }
}

await browser.close();
console.log("→ " + OUT);
