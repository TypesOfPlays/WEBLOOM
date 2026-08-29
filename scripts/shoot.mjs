/**
 * Capture review screenshots into .impeccable/review/.
 *
 *   npm run build && node scripts/shoot.mjs
 *   node scripts/shoot.mjs http://localhost:3000   (against a dev server)
 *
 * With no argument it serves the static export in out/ itself, so the captures
 * are of the shipped build and carry no dev-only overlay. Uses the locally
 * installed Chromium browser rather than downloading one.
 */
import puppeteer from "puppeteer-core";
import { createServer } from "node:http";
import { mkdirSync, existsSync, readFileSync, statSync } from "node:fs";
import { resolve, join, extname } from "node:path";

const OUT = resolve(process.cwd(), ".impeccable/review");
const DIST = resolve(process.cwd(), "out");
const PORT = 4173;

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

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json",
};

let server = null;
let base = process.argv[2];

if (!base) {
  if (!existsSync(DIST)) {
    console.error("No out/ directory. Run `npm run build` first.");
    process.exit(1);
  }
  server = createServer((req, res) => {
    let p = join(DIST, decodeURIComponent(req.url.split("?")[0]));
    try {
      if (statSync(p).isDirectory()) p = join(p, "index.html");
    } catch {
      p = join(DIST, "404.html");
    }
    try {
      const body = readFileSync(p);
      res.writeHead(200, {
        "content-type": TYPES[extname(p)] ?? "application/octet-stream",
      });
      res.end(body);
    } catch {
      res.writeHead(404).end("not found");
    }
  });
  await new Promise((r) => server.listen(PORT, r));
  base = `http://localhost:${PORT}`;
  console.log(`serving out/ at ${base}`);
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

  await page.goto(base, { waitUntil: "networkidle0", timeout: 60000 });

  // Reveal every section and settle the drifting field so the capture is
  // deterministic — we are photographing layout, not the animation.
  await page.evaluate(() => {
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("shown"));
    document.querySelectorAll(".drift-a, .drift-b, .drift-c").forEach((el) => {
      el.style.animationPlayState = "paused";
      el.style.animationDelay = "-13s";
    });
    document.querySelectorAll(".k-char").forEach((el) => {
      el.style.transform = "none";
    });
    window.scrollTo(0, 0);
  });

  // the GPU field fades in over roughly 1.4s; capture after it settles
  await new Promise((r) => setTimeout(r, Number(process.env.SHOOT_WAIT ?? 2800)));

  await page.screenshot({ path: `${OUT}/${vp.name}-fold.png` });
  await page.screenshot({ path: `${OUT}/${vp.name}.png`, fullPage: true });

  console.log(`captured ${vp.name} (${vp.width}x${vp.height})`);
  await page.close();
}

await browser.close();
if (server) server.close();
console.log("→ " + OUT);
