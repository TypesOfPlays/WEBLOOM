/**
 * Capture review screenshots into .impeccable/review/.
 *
 *   node scripts/shoot.mjs [baseUrl]
 *
 * Uses the locally installed Chromium browser rather than downloading one.
 */
import puppeteer from "puppeteer-core";
import { mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const BASE = process.argv[2] || "http://localhost:3000";
const OUT = resolve(process.cwd(), ".impeccable/review");

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

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844, isMobile: true },
];

mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--force-color-profile=srgb", "--hide-scrollbars"],
});

for (const vp of VIEWPORTS) {
  const page = await browser.newPage();
  await page.setViewport({
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: 2,
    isMobile: Boolean(vp.isMobile),
    hasTouch: Boolean(vp.isMobile),
  });

  await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });

  // Reveal every section and settle the drifting field so the capture is
  // deterministic — we are photographing layout, not the animation.
  await page.evaluate(() => {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("shown"));
    document.querySelectorAll(".drift-a, .drift-b, .drift-c").forEach((el) => {
      el.style.animationPlayState = "paused";
      el.style.animationDelay = "-13s";
    });
    const hero = document.querySelectorAll(".hero-line");
    hero.forEach((el) => {
      el.style.animation = "none";
      el.style.transform = "none";
    });
    window.scrollTo(0, 0);
  });

  await new Promise((r) => setTimeout(r, 900));

  await page.screenshot({
    path: `${OUT}/${vp.name}-fold.png`,
    captureBeyondViewport: false,
  });
  await page.screenshot({ path: `${OUT}/${vp.name}.png`, fullPage: true });

  console.log(`captured ${vp.name} (${vp.width}x${vp.height})`);
  await page.close();
}

await browser.close();
console.log("→ " + OUT);
