/**
 * Capture cover images for the live projects listed in lib/content.ts.
 *
 *   node scripts/gen-work-shots.mjs
 *
 * Writes 4:3 JPEGs into public/work/ at two widths. JPEG rather than PNG
 * because these are photographic page captures, and there is no WebP encoder
 * on this machine.
 */
import puppeteer from "puppeteer-core";
import { mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve(process.cwd(), "public/work");
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

const SHOTS = [
  { slug: "swayamsiddha-lab", url: "https://swayamsiddhadiagnostics.in/" },
  {
    slug: "swayamsiddha-collection",
    url: "https://swayamsiddhadiagnostics.info/",
  },
  {
    slug: "atoz-financial",
    url: "https://typesofplays.github.io/atozfinancialsolutionhub/",
  },
];

/** 4:3, captured wide then emitted at two sizes */
const WIDTHS = [1600, 800];

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--force-color-profile=srgb", "--hide-scrollbars"],
});

for (const shot of SHOTS) {
  for (const width of WIDTHS) {
    const height = Math.round((width / 4) * 3);
    const page = await browser.newPage();
    await page.setViewport({
      width: 1440,
      height: 1080,
      deviceScaleFactor: width / 1440,
    });

    try {
      await page.goto(shot.url, {
        waitUntil: "networkidle2",
        timeout: 60000,
      });
    } catch {
      console.warn(`! ${shot.slug} at ${width}: navigation slow, continuing`);
    }

    // let entrance animations and lazy imagery settle
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 3500));

    await page.screenshot({
      path: `${OUT}/${shot.slug}-${width}.jpg`,
      type: "jpeg",
      quality: 82,
      clip: { x: 0, y: 0, width: 1440, height: 1080 },
    });

    console.log(`captured ${shot.slug}-${width}.jpg (${width}x${height})`);
    await page.close();
  }
}

await browser.close();
console.log("→ " + OUT);
