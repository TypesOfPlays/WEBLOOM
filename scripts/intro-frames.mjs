/**
 * Capture the boot sequence as frames so it can actually be judged, rather
 * than guessed at from a single settled screenshot.
 *
 *   npm run build && node scripts/intro-frames.mjs
 *
 * Writes .impeccable/review/intro-<ms>.png
 */
import puppeteer from "puppeteer-core";
import { createServer } from "node:http";
import { readFileSync, statSync, existsSync, mkdirSync } from "node:fs";
import { join, extname, resolve } from "node:path";

const DIST = resolve(process.cwd(), "out");
const OUT = resolve(process.cwd(), ".impeccable/review");
mkdirSync(OUT, { recursive: true });

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};
const CANDIDATES = [
  "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
];
const executablePath = CANDIDATES.find((p) => existsSync(p));

const server = createServer((req, res) => {
  let p = join(DIST, decodeURIComponent(req.url.split("?")[0]));
  try {
    if (statSync(p).isDirectory()) p = join(p, "index.html");
  } catch {
    p = join(DIST, "404.html");
  }
  try {
    res.writeHead(200, {
      "content-type": TYPES[extname(p)] ?? "application/octet-stream",
    });
    res.end(readFileSync(p));
  } catch {
    res.writeHead(404).end("nope");
  }
});
await new Promise((r) => server.listen(4180, r));

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--hide-scrollbars", "--force-color-profile=srgb"],
});

const FRAMES = process.argv.length > 2
  ? process.argv.slice(2).map(Number)
  : [500, 1000, 1500, 2100, 2700, 3600, 5200];

for (const at of FRAMES) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  const started = Date.now();
  await page.goto("http://localhost:4180", { waitUntil: "domcontentloaded" });
  const wait = at - (Date.now() - started);
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  await page.screenshot({ path: `${OUT}/intro-${at}.png` });
  console.log(`frame @${at}ms`);
  await page.close();
}

await browser.close();
server.close();
